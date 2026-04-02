"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";

const stats = [
  { value: "$0", label: "Open Source Cost" },
  { value: "4", label: "Security Engines" },
  { value: "25+", label: "File Formats" },
  { value: "6", label: "Compliance Frameworks" }
];

export default function HomeMission() {
  return (
    <section className="relative px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 text-center mb-6">
          Our Mission
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-center text-slate-300 text-base leading-relaxed"
        >
          <p>
            Atlas Synapse exists because AI systems deployed in regulated industries—banking, insurance, healthcare, legal—require a fundamentally different infrastructure approach.
          </p>
          <p>
            We build <strong className="text-slate-100">sovereign, deterministic, and auditable</strong> AI infrastructure that makes regulatory compliance not just possible, but provable.
          </p>
          <p>
            Where competitors offer developer tools, we deliver fiduciary-grade systems that turn AI compliance into a competitive advantage.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-atlas-soft/60 px-6 py-5 text-center glass-panel"
            >
              <p className="font-display text-2xl font-bold text-atlas-primary">{item.value}</p>
              <p className="mt-1 text-sm text-slate-400">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors">
            About us
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
