"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import { Shield, Lock, Check, Circle } from "lucide-react";

const aegisBullets = [
  "4 scanning engines + Gemini AI",
  "SBOM generation & 6 compliance frameworks",
  "25+ file formats (code, docs, media)",
  "FinTech/Insurance regulatory rules"
];

const shieldBullets = [
  "Continuous model performance tracking",
  "Fair Lending Act proxy detection",
  "SHAP value validation & audit trails",
  "Evidence-grade compliance reports"
];

export default function HomeProducts() {
  return (
    <section id="products" data-section="solutions" className="relative border-y border-white/5 bg-atlas-elevated/40 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 text-center mb-2">
          Our Products
        </h2>
        <p className="text-center text-slate-400 text-base mb-14 max-w-2xl mx-auto">
          Enterprise-grade AI security and compliance tools
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-atlas-primary/20 ring-1 ring-atlas-primary/40">
                <Shield className="h-7 w-7 text-atlas-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-bold text-slate-100">Aegis Prime Auditor</h3>
                <span className="mt-1 inline-block rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-400/40">
                  Live now
                </span>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Multi-engine security scanner with AI-powered risk analysis. Competes with $60k–300k/year enterprise tools for $0.
                </p>
                <ul className="mt-4 space-y-2">
                  {aegisBullets.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="h-4 w-4 shrink-0 text-atlas-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="https://www.atlassynapseai.com/Aegis-Prime-Auditor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors"
                >
                  Launch Aegis Prime
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-atlas-secondary/20 ring-1 ring-atlas-secondary/40">
                <Lock className="h-7 w-7 text-atlas-secondary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-bold text-slate-100">Atlas Shield</h3>
                <span className="mt-1 inline-block rounded-full bg-slate-500/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-slate-300 ring-1 ring-slate-400/40">
                  Coming Q2 2026
                </span>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Real-time AI model monitoring with logic drift detection and explainability validation for NYDFS compliance.
                </p>
                <ul className="mt-4 space-y-2">
                  {shieldBullets.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <Circle className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm font-medium text-slate-500">Coming Soon</p>
              </div>
            </div>
          </motion.article>
        </div>

        <div className="mt-10 text-center">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors">
            Explore Products
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
