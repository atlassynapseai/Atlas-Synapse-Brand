"use client";

import { motion } from "@/lib/motion";
import { useState } from "react";

const offerings = [
  {
    title: "Policy & Governance Enforcement",
    line: "Map AI behavior directly to board‑approved governance."
  },
  {
    title: "Input Validation & Data Controls",
    line: "Strip, mask, or block sensitive inputs before they hit models."
  },
  {
    title: "Output Verification & Reliability Scoring",
    line: "Continuously grade answers before they reach human or system."
  },
  {
    title: "Audit Trails & Compliance Reporting",
    line: "Full traceability for every prompt, decision, and override."
  },
  {
    title: "Real‑time Guardrails for Agentic Systems",
    line: "Runtime controls for multi‑agent, tool‑calling AI."
  }
];

const OfferingsModule: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section
      id="offerings"
      aria-labelledby="offerings-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-atlas-secondary">
              What we deliver
            </p>
            <h2
              id="offerings-heading"
              className="mt-2 font-display text-2xl tracking-tight text-slate-100 sm:text-3xl"
            >
              A control stack built for executive trust.
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)]">
          {/* Selector */}
          <div className="glass-panel overflow-hidden rounded-3xl p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>Rotate through capabilities</span>
              <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                Arrow keys • Tab + Enter
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {offerings.map((offering, idx) => {
                const selected = idx === active;
                return (
                  <button
                    key={offering.title}
                    onClick={() => setActive(idx)}
                    className={`group flex items-center justify-between rounded-2xl px-3 py-2 text-left text-xs transition-colors ${
                      selected
                        ? "bg-atlas-soft ring-1 ring-atlas-primary-soft text-slate-50 shadow-atlas-soft"
                        : "text-slate-300 hover:bg-atlas-soft/80 hover:text-slate-50"
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{offering.title}</p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {offering.line}
                      </p>
                    </div>
                    <span
                      className={`ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full border text-[11px] ${
                        selected
                          ? "border-atlas-secondary/60 bg-atlas-secondary/15 text-atlas-secondary"
                          : "border-white/10 bg-slate-900/70 text-slate-400"
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live mini-visual */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
            className="glass-panel flex flex-col justify-between rounded-3xl p-6 shadow-atlas-soft"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-emerald-300">
                Live control plane
              </span>
              <span>Atlas Synapse AI</span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-[11px] text-slate-200">
              <div className="flex flex-col gap-2">
                <span className="text-slate-400">Signal</span>
                <span className="rounded-xl bg-slate-900/80 px-3 py-2 ring-1 ring-white/10">
                  Trust score
                  <span className="mt-1 block font-mono text-sm text-emerald-400">
                    0.96
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-slate-400">Interventions</span>
                <span className="rounded-xl bg-slate-900/80 px-3 py-2 ring-1 ring-white/10">
                  Guardrails
                  <span className="mt-1 block text-[11px] text-slate-300">
                    Policies enforced • secrets masked
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-slate-400">Status</span>
                <span className="rounded-xl bg-slate-900/80 px-3 py-2 ring-1 ring-white/10">
                  {active === 2 ? "Verified" : "Protected"}
                  <span className="mt-1 block text-[11px] text-slate-300">
                    Real‑time checks streaming.
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-atlas-primary/30 via-atlas-secondary/30 to-slate-800/80 p-4 text-[11px] text-slate-50 ring-1 ring-atlas-primary-soft">
              <p className="font-semibold">
                {offerings[active].title}
              </p>
              <p className="mt-2 text-slate-200">{offerings[active].line}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfferingsModule;

