"use client";

import { motion } from "@/lib/motion";
import { Building2, HeartPulse, BarChart3, Scale } from "lucide-react";

const industries = [
  { icon: Building2, title: "FinTech", description: "Fair Lending Act compliance, NYDFS explainability, audit trail validation" },
  { icon: HeartPulse, title: "Healthcare", description: "HIPAA PHI detection, patient data classification, access control auditing" },
  { icon: BarChart3, title: "Insurance", description: "Discriminatory claims detection, actuarial model validation, Fair Practice compliance" },
  { icon: Scale, title: "Legal", description: "Contract consistency, document version control, attorney-client privilege protection" }
];

export default function HomeIndustries() {
  return (
    <section className="relative border-y border-white/5 bg-atlas-elevated/40 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 text-center mb-2">
          Built for Regulated Industries
        </h2>
        <p className="text-center text-slate-400 text-base mb-14 max-w-2xl mx-auto">
          Compliance-first AI for enterprises where security is fiduciary duty
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-panel rounded-2xl border border-white/10 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-atlas-primary/15 ring-1 ring-atlas-primary/30">
                <item.icon className="h-6 w-6 text-atlas-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
