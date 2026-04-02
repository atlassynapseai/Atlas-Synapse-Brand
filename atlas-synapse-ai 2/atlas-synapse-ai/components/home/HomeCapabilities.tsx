"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import { Shield, Search, BadgeCheck, FileCheck } from "lucide-react";

const cards = [
  { title: "Govern", description: "Policy and guardrails enforced at the boundary.", icon: Shield },
  { title: "Validate", description: "Inputs checked before they reach your models.", icon: Search },
  { title: "Verify", description: "Outputs scored and verified before release.", icon: BadgeCheck },
  { title: "Audit", description: "Every decision logged for compliance and review.", icon: FileCheck }
];

export default function HomeCapabilities() {
  return (
    <section className="relative border-y border-white/5 bg-atlas-elevated/40 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-h2 font-bold tracking-tight text-slate-100 text-center mb-2">
          What we deliver
        </h2>
        <p className="text-center text-slate-400 text-body mb-16 max-w-xl mx-auto">
          Four pillars. One trust layer.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.06, duration: 0.35 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-white/10 bg-atlas-soft/60 p-6 transition-colors hover:border-atlas-primary/30 hover:bg-atlas-soft/90 glass-panel"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-atlas-primary/15 ring-1 ring-atlas-primary/30 transition-colors group-hover:bg-atlas-primary/25 group-hover:ring-atlas-primary/50">
                <card.icon className="h-6 w-6 text-atlas-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-100">{card.title}</h3>
              <p className="mt-2 text-small text-slate-400 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors"
          >
            Explore Platform
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
