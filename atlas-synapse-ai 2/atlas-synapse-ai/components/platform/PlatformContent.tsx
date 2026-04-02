"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import { Shield, Search, BadgeCheck, FileCheck } from "lucide-react";

const sections = [
  {
    id: "governance",
    title: "Policy & Governance",
    icon: Shield,
    description: "Map AI behavior directly to board‑approved governance. Define policies once and enforce them at the boundary.",
    examples: ["Role-based access to sensitive flows", "Approval workflows for high-risk actions", "Policy versioning and rollback"]
  },
  {
    id: "input",
    title: "Input Controls",
    icon: Search,
    description: "Strip, mask, or block sensitive inputs before they hit models. PII, secrets, and off-policy content never reach your agents.",
    examples: ["PII detection and masking", "Prompt injection detection", "Input schema validation"]
  },
  {
    id: "output",
    title: "Output Verification",
    icon: BadgeCheck,
    description: "Continuously grade answers before they reach a human or downstream system. Confidence scores and redaction at the output gate.",
    examples: ["Hallucination and fabrication checks", "Sensitive output redaction", "Structured output validation"]
  },
  {
    id: "audit",
    title: "Audit Trails",
    icon: FileCheck,
    description: "Full traceability for every prompt, decision, and override. Exportable evidence for compliance and security review.",
    examples: ["End-to-end request traces", "Intervention and override logs", "Compliance-ready exports"]
  }
];

export default function PlatformContent() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <div className="mb-16">
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            Platform
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Four pillars. Deeper breakdown with real examples.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block text-sm font-semibold text-atlas-secondary hover:text-atlas-primary"
          >
            ← Back to home
          </Link>
        </div>

        <div className="space-y-16">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-panel rounded-3xl p-8 sm:p-10"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-atlas-primary/20 ring-1 ring-atlas-primary/40">
                  <section.icon className="h-7 w-7 text-atlas-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold text-slate-100">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-slate-300 leading-relaxed">
                    {section.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {section.examples.map((ex) => (
                      <li
                        key={ex}
                        className="flex items-center gap-2 text-sm text-slate-400"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-atlas-secondary" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
