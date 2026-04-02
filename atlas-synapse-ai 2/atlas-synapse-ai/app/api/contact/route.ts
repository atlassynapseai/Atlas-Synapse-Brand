import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const GMAIL_USER = process.env.GMAIL_USER!;
const GMAIL_PASS = process.env.GMAIL_PASS!;
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || GMAIL_USER;

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const dialCode = String(fd.get("dialCode") ?? "+1").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const how_heard = String(fd.get("how_heard") ?? "").trim();

    // Collect attachment names (files are not stored, just names logged)
    const attachmentNames: string[] = [];
    for (const [key, val] of fd.entries()) {
      if (key === "files" && val instanceof File && val.size > 0) {
        attachmentNames.push(val.name);
      }
    }

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── 1. Save to Supabase ──────────────────────────────────────────────────
    const sbRes = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        name,
        email,
        dial_code: dialCode,
        phone,
        company: company || null,
        subject: subject || null,
        message,
        how_heard: how_heard || null,
        attachment_names: attachmentNames.length > 0 ? attachmentNames : null,
        status: "new",
      }),
    });

    if (!sbRes.ok) {
      const errText = await sbRes.text();
      console.error("Supabase insert failed:", errText);
      // Non-blocking — continue to send emails even if DB write fails
    }

    // ── 2. Send emails ───────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_PASS },
    });

    const fullPhone = `${dialCode} ${phone}`;
    const subjectLine = subject || "New contact form submission";

    // Notification to team
    await transporter.sendMail({
      from: `"Atlas Synapse Contact" <${GMAIL_USER}>`,
      to: NOTIFY_EMAIL,
      subject: `[Contact] ${subjectLine} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#7c3aed">New Contact Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#6b7280;width:120px">Name</td><td style="padding:6px 0"><strong>${name}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#6b7280">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#6b7280">Phone</td><td style="padding:6px 0">${fullPhone}</td></tr>
            ${company ? `<tr><td style="padding:6px 0;color:#6b7280">Company</td><td style="padding:6px 0">${company}</td></tr>` : ""}
            ${subject ? `<tr><td style="padding:6px 0;color:#6b7280">Subject</td><td style="padding:6px 0">${subject}</td></tr>` : ""}
            <tr><td style="padding:6px 0;color:#6b7280">How heard</td><td style="padding:6px 0">${how_heard || "—"}</td></tr>
            ${attachmentNames.length > 0 ? `<tr><td style="padding:6px 0;color:#6b7280">Attachments</td><td style="padding:6px 0">${attachmentNames.join(", ")}</td></tr>` : ""}
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb"/>
          <h3 style="color:#374151">Message</h3>
          <p style="white-space:pre-wrap;color:#1f2937">${message}</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Atlas Synapse" <${GMAIL_USER}>`,
      to: email,
      subject: "We received your message — Atlas Synapse",
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#7c3aed">Thanks for reaching out, ${name}!</h2>
          <p style="color:#374151">We've received your message and will get back to you at <strong>${email}</strong> within 1-2 business days.</p>
          ${message ? `<div style="background:#f9fafb;border-left:3px solid #7c3aed;padding:12px 16px;margin:16px 0"><p style="color:#6b7280;margin:0;font-size:14px">Your message:</p><p style="color:#1f2937;white-space:pre-wrap;margin:8px 0 0">${message}</p></div>` : ""}
          <p style="color:#6b7280;font-size:14px">— The Atlas Synapse Team</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
