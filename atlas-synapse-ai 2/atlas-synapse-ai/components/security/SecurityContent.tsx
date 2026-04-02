"use client";

import Link from "next/link";

const badges = ["Encryption", "Audit Trails", "Access Controls", "Data Minimization"];

export default function SecurityContent() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-block mb-10 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary"
        >
          ← Back to home
        </Link>

        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
          Security & Trust
        </h1>
        <p className="mt-6 text-lg text-slate-400 leading-relaxed">
          Built for privacy‑first, least‑privilege AI operations. We sit at your edges — monitoring inputs and outputs without taking custody of your data estate.
        </p>

        <div className="mt-14 space-y-8">
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-slate-100">
              SOC 2‑aligned practices
            </h2>
            <p className="mt-3 text-slate-300">
              Controls and processes designed to align with SOC 2 expectations and modern enterprise security reviews.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-slate-100">
              Boundary‑respecting by design
            </h2>
            <p className="mt-3 text-slate-300">
              We operate at the boundary. No need to hand us your full data lake or model weights.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-slate-100">
              Clear lines of accountability
            </h2>
            <p className="mt-3 text-slate-300">
              Every intervention, override, and decision is captured so risk, compliance, and engineering share one source of truth.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
