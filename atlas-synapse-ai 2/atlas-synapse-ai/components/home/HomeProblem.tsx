"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";

const risks = [
  { id: "governance", label: "Governance drift", sentence: "Policies slip when models and data change. Without a gate, version drift goes unnoticed until it becomes a compliance finding." },
  { id: "policy", label: "Policy conflict", sentence: "Requests bypass or contradict guardrails. Unchecked inputs can trigger actions that violate internal or regulatory policy." },
  { id: "leakage", label: "Data leakage", sentence: "Sensitive data enters prompts or outputs. PII, PHI, and confidential content can leak into logs or model responses." },
  { id: "fabricated", label: "Fabricated outputs", sentence: "Hallucinations and unsupported claims. Low-confidence or ungrounded outputs ship without verification." },
  { id: "audit", label: "Missing audit trails", sentence: "No evidence for compliance or review. When regulators ask how a decision was made, there’s nothing to show." },
  { id: "agent", label: "Agent unpredictability", sentence: "Autonomous steps deviate from intent. Multi-step agents can drift from approved workflows and produce unexpected outcomes." }
];

export default function HomeProblem() {
  return (
    <section id="risks" data-section="risks" className="relative border-y border-white/5 bg-atlas-elevated/40 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="section-title font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 text-center mb-2">
          When there&apos;s no gate, risk leaks
        </h2>
        <p className="text-center text-slate-400 text-base mb-10 max-w-2xl mx-auto">
          Unchecked inputs and outputs turn into compliance gaps and bad decisions. These are the risks we intercept.
        </p>

        {/* Lifecycle context line */}
        <div className="mb-10 rounded-xl border border-white/10 bg-slate-900/50 px-6 py-4">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            AI lifecycle
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <span>Inputs</span>
            <span className="text-slate-400">→</span>
            <span>Agents</span>
            <span className="text-slate-400">→</span>
            <span>Outputs</span>
          </div>
        </div>

        {/* Risk cards – all visible, no hover */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risks.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel rounded-xl border border-white/10 p-5"
            >
              <h3 className="font-display text-base font-bold text-slate-100">
                {r.label}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {r.sentence}
              </p>
              <Link
                href="/risks"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors"
              >
                Learn more
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/risks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors"
          >
            Explore all risks
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
