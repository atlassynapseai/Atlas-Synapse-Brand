"use client";

import { useState, useRef, FormEvent } from "react";
import { motion } from "@/lib/motion";

const DIAL_CODES = [
  { dial: "+1", label: "+1 US/CA" },
  { dial: "+44", label: "+44 UK" },
  { dial: "+91", label: "+91 India" },
  { dial: "+61", label: "+61 Australia" },
  { dial: "+64", label: "+64 New Zealand" },
  { dial: "+353", label: "+353 Ireland" },
  { dial: "+27", label: "+27 S. Africa" },
  { dial: "+49", label: "+49 Germany" },
  { dial: "+33", label: "+33 France" },
  { dial: "+34", label: "+34 Spain" },
  { dial: "+39", label: "+39 Italy" },
  { dial: "+31", label: "+31 Netherlands" },
  { dial: "+46", label: "+46 Sweden" },
  { dial: "+47", label: "+47 Norway" },
  { dial: "+45", label: "+45 Denmark" },
  { dial: "+41", label: "+41 Switzerland" },
  { dial: "+43", label: "+43 Austria" },
  { dial: "+32", label: "+32 Belgium" },
  { dial: "+48", label: "+48 Poland" },
  { dial: "+86", label: "+86 China" },
  { dial: "+81", label: "+81 Japan" },
  { dial: "+82", label: "+82 S. Korea" },
  { dial: "+65", label: "+65 Singapore" },
  { dial: "+60", label: "+60 Malaysia" },
  { dial: "+66", label: "+66 Thailand" },
  { dial: "+62", label: "+62 Indonesia" },
  { dial: "+63", label: "+63 Philippines" },
  { dial: "+971", label: "+971 UAE" },
  { dial: "+966", label: "+966 Saudi Arabia" },
  { dial: "+974", label: "+974 Qatar" },
  { dial: "+52", label: "+52 Mexico" },
  { dial: "+55", label: "+55 Brazil" },
  { dial: "+54", label: "+54 Argentina" },
  { dial: "+57", label: "+57 Colombia" },
  { dial: "+20", label: "+20 Egypt" },
  { dial: "+234", label: "+234 Nigeria" },
  { dial: "+254", label: "+254 Kenya" },
  { dial: "+7", label: "+7 Russia" },
];

const HOW_HEARD_OPTIONS = [
  "",
  "Google / Search Engine",
  "LinkedIn",
  "X / Twitter",
  "YouTube",
  "GitHub",
  "Colleague or Referral",
  "Industry Event or Conference",
  "News Article or Press",
  "Prefer not to say",
  "Other",
];

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email",
  "10minutemail.com", "yopmail.com", "trashmail.com", "maildrop.cc",
  "sharklasers.com", "spam4.me", "discard.email", "mailnull.com",
  "spamgourmet.com", "trashmail.net", "filzmail.com", "getonemail.com",
  "dispostable.com", "tempinbox.com", "nospam4.us", "trashmail.at",
]);

const ACCEPTED_TYPES = ".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv";
const MAX_FILE_MB = 10;
const MAX_TOTAL_MB = 20;

function validateEmail(email: string): string {
  if (!email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return "Enter a valid email address";
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  if (DISPOSABLE_DOMAINS.has(domain)) return "Please use a business or personal email address";
  return "";
}

function validatePhone(phone: string): string {
  if (!phone.trim()) return "Phone number is required";
  const digits = phone.replace(/[\s\-().]/g, "");
  if (!/^\d{6,15}$/.test(digits)) return "Enter a valid phone number (6-15 digits, no country code)";
  return "";
}

function fmtBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(1)} MB`;
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactContent() {
  const [form, setFormState] = useState({
    name: "", email: "", dialCode: "+1", phone: "",
    company: "", subject: "", message: "", how_heard: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setField = (key: string, value: string) => {
    setFormState((f) => ({ ...f, [key]: value }));
    if (fieldErrors[key]) setFieldErrors((e) => ({ ...e, [key]: "" }));
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = [...files];
    let total = next.reduce((s, f) => s + f.size, 0);
    for (const file of Array.from(incoming)) {
      if (file.size > MAX_FILE_MB * 1048576) {
        setFileError(`"${file.name}" exceeds ${MAX_FILE_MB}MB`);
        return;
      }
      if (total + file.size > MAX_TOTAL_MB * 1048576) {
        setFileError(`Total cannot exceed ${MAX_TOTAL_MB}MB`);
        return;
      }
      if (!next.find((f) => f.name === file.name && f.size === file.size)) {
        next.push(file);
        total += file.size;
      }
    }
    setFileError("");
    setFiles(next);
  };

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (honeypot) return;

    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    const eErr = validateEmail(form.email);
    if (eErr) errs.email = eErr;
    const pErr = validatePhone(form.phone);
    if (pErr) errs.phone = pErr;
    if (!form.how_heard) errs.how_heard = "Please let us know how you heard about us";
    if (!form.message.trim()) errs.message = "Message is required";
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("dialCode", form.dialCode);
      fd.append("phone", form.phone);
      fd.append("company", form.company);
      fd.append("subject", form.subject);
      fd.append("message", form.message);
      fd.append("how_heard", form.how_heard);
      files.forEach((f) => fd.append("files", f));
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      setStatus("success");
    } catch (err: any) {
      setServerError(err.message);
      setStatus("error");
    }
  }

  const inputCls =
    "mt-1.5 w-full rounded-xl border border-white/15 bg-atlas-bg/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary outline-none transition-colors";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen pt-28 pb-20 flex items-start justify-center px-5"
      >
        <div className="glass-panel rounded-2xl p-10 text-center max-w-md w-full mt-8">
          <p className="font-display text-xl font-semibold text-atlas-success">Message sent</p>
          <p className="mt-2 text-body text-slate-400">
            Thanks for reaching out. We&apos;ll follow up at{" "}
            <span className="text-slate-200">{form.email}</span> within 1-2 business days.
          </p>
          <p className="mt-1 text-sm text-slate-500">A confirmation email has been sent to you.</p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFormState({ name: "", email: "", dialCode: "+1", phone: "", company: "", subject: "", message: "", how_heard: "" });
              setFiles([]);
              setFieldErrors({});
            }}
            className="mt-6 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary"
          >
            Send another message
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div data-section="contact" className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-xl px-5 sm:px-8 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title font-display text-display font-bold tracking-tight text-slate-100"
        >
          Contact us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-body text-slate-400"
        >
          Request a demo or send a message. We&apos;ll get back to you shortly.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit}
          noValidate
          className="mt-12 glass-panel rounded-2xl p-6 sm:p-8 space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className={inputCls}
              placeholder="Your full name"
            />
            {fieldErrors.name && <p className="mt-1 text-xs text-rose-400">{fieldErrors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Email <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className={inputCls}
              placeholder="you@company.com"
            />
            {fieldErrors.email && <p className="mt-1 text-xs text-rose-400">{fieldErrors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Phone <span className="text-rose-400">*</span>
            </label>
            <div className="flex mt-1.5">
              <select
                value={form.dialCode}
                onChange={(e) => setField("dialCode", e.target.value)}
                className="rounded-l-xl border border-r-0 border-white/15 bg-atlas-bg/80 px-2 py-3 text-sm text-slate-300 focus:outline-none focus:border-atlas-primary shrink-0"
              >
                {DIAL_CODES.map((d) => (
                  <option key={d.dial + d.label} value={d.dial}>{d.label}</option>
                ))}
              </select>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className="flex-1 rounded-r-xl border border-white/15 bg-atlas-bg/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary outline-none transition-colors"
                placeholder="555 000 0000"
              />
            </div>
            {fieldErrors.phone && <p className="mt-1 text-xs text-rose-400">{fieldErrors.phone}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-slate-300">Company</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setField("company", e.target.value)}
              className={inputCls}
              placeholder="Your company name"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-slate-300">Subject</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setField("subject", e.target.value)}
              className={inputCls}
              placeholder="How can we help?"
            />
          </div>

          {/* How did you hear */}
          <div>
            <label className="block text-sm font-medium text-slate-300">
              How did you hear about us? <span className="text-rose-400">*</span>
            </label>
            <select
              value={form.how_heard}
              onChange={(e) => setField("how_heard", e.target.value)}
              className={`${inputCls} ${!form.how_heard ? "text-slate-500" : ""}`}
            >
              {HOW_HEARD_OPTIONS.map((opt) => (
                <option key={opt} value={opt} disabled={opt === ""} className="text-slate-100 bg-slate-900">
                  {opt === "" ? "Select an option..." : opt}
                </option>
              ))}
            </select>
            {fieldErrors.how_heard && <p className="mt-1 text-xs text-rose-400">{fieldErrors.how_heard}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Message <span className="text-rose-400">*</span>
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              rows={4}
              className={`${inputCls} resize-none`}
              placeholder="Tell us about your AI governance needs..."
            />
            {fieldErrors.message && <p className="mt-1 text-xs text-rose-400">{fieldErrors.message}</p>}
          </div>

          {/* File upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Attachments{" "}
              <span className="text-slate-500 font-normal text-xs">
                (optional — images, PDF, Word, Excel, CSV — max {MAX_FILE_MB}MB each)
              </span>
            </label>
            <div
              className={`rounded-xl border-2 border-dashed px-5 py-6 text-center cursor-pointer transition-colors ${dragOver ? "border-atlas-primary bg-atlas-primary/10" : "border-white/15 hover:border-white/25"
                }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ACCEPTED_TYPES}
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
              <p className="text-sm text-slate-400">
                Drag &amp; drop or <span className="text-atlas-primary font-medium">browse</span>
              </p>
              <p className="text-xs text-slate-600 mt-1">Max {MAX_TOTAL_MB}MB total</p>
            </div>
            {fileError && <p className="mt-1 text-xs text-rose-400">{fileError}</p>}
            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between rounded-xl border border-white/10 bg-atlas-bg/60 px-4 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm text-slate-300 truncate">{f.name}</span>
                      <span className="text-xs text-slate-500 shrink-0">{fmtBytes(f.size)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((_, j) => j !== i))}
                      className="ml-3 text-slate-500 hover:text-rose-400 transition-colors text-xs shrink-0"
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {serverError && <p className="text-sm text-rose-400">{serverError}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="sheen-button w-full rounded-full bg-gradient-to-r from-atlas-primary to-atlas-secondary py-4 text-sm font-semibold tracking-[0.12em] text-slate-950 shadow-atlas-soft disabled:opacity-70"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
