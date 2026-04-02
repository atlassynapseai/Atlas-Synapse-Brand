"use client";

import { useState, FormEvent } from "react";
import { motion } from "@/lib/motion";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
    if (!message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (honeypot) return;
    if (!validate()) return;
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
    }
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
          Request a demo or send a message. We’ll get back to you shortly.
        </motion.p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 glass-panel rounded-2xl p-8 text-center"
          >
            <p className="font-display text-xl font-semibold text-atlas-success">Message sent</p>
            <p className="mt-2 text-body text-slate-400">
              Thanks for reaching out. We’ll follow up with a short discovery session to map Atlas Synapse to your needs.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="mt-12 glass-panel rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300">
                Name <span className="text-rose-400">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-atlas-bg/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary"
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300">
                Email <span className="text-rose-400">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-atlas-bg/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary"
                placeholder="you@company.com"
              />
              {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="contact-company" className="block text-sm font-medium text-slate-300">
                Company
              </label>
              <input
                id="contact-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-atlas-bg/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary"
                placeholder="Company name"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300">
                Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-atlas-bg/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary resize-none"
                placeholder="How can we help?"
              />
              {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-rose-400">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="sheen-button w-full rounded-full bg-gradient-to-r from-atlas-primary to-atlas-secondary py-4 text-sm font-semibold tracking-[0.12em] text-slate-950 shadow-atlas-soft disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
