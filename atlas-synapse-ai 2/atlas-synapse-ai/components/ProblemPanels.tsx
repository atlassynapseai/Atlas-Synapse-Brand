"use client";

import { motion } from "@/lib/motion";
import { useState } from "react";

const problems = [
  {
    id: "governance",
    title: "Governance drift",
    line: "Agents evolve faster than your policies.",
    metric: "Control confidence ↓"
  },
  {
    id: "policy",
    title: "Policy non‑compliance",
    line: "Model behavior escapes written rules.",
    metric: "Compliance risk ↑"
  },
  {
    id: "leakage",
    title: "Data leakage",
    line: "Sensitive inputs echo into outputs.",
    metric: "Privacy exposure ↑"
  },
  {
    id: "hallucination",
    title: "Fabricated outputs",
    line: "Hallucinations enter real workflows.",
    metric: "Decision integrity ↓"
  },
  {
    id: "audit",
    title: "Missing audit trails",
    line: "No reliable who/what/why for decisions.",
    metric: "Auditability ↓"
  },
  {
    id: "agents",
    title: "Agent unpredictability",
    line: "Multi‑agent chains act off‑script.",
    metric: "Operational risk ↑"
  }
];

const ProblemPanels: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = problems[activeIndex];

  return (
    <section
      aria-labelledby="problems-heading"
      className="relative border-y border-white/5 bg-gradient-to-b from-atlas-bg/60 via-atlas-elevated/80 to-atlas-bg/40 px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2
              id="problems-heading"
              className="font-display text-3xl tracking-tight text-slate-100 sm:text-4xl"
            >
              Where uncontrolled AI stacks quietly{" "}
              <span className="bg-gradient-to-r from-rose-400 to-atlas-primary bg-clip-text text-transparent">
                go off‑rails
              </span>
              .
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300">
              Instead of a single big failure, risk leaks in across the entire
              lifecycle — from how inputs enter your systems to how outputs are
              used in real decisions.
            </p>
          </div>
        </div>

        {/* Lifecycle rail */}
        <div className="glass-panel relative overflow-hidden rounded-3xl p-6 shadow-atlas-soft">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0_0,rgba(248,113,113,0.26),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.3),transparent_55%)] opacity-70" />

          <div className="relative space-y-8">
            {/* Timeline nodes */}
            <div className="relative mt-2">
              <div className="h-[2px] w-full bg-gradient-to-r from-rose-500/40 via-amber-400/40 to-slate-600/60" />
              <div className="mt-3 flex justify-between text-[11px] sm:text-xs text-slate-300">
                {problems.map((p, idx) => {
                  const selected = idx === activeIndex;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(idx)}
                      className="group flex flex-col items-center gap-2 outline-none"
                    >
                      <motion.div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-[11px] ${
                          selected
                            ? "border-rose-400 bg-rose-500/20 text-rose-100 shadow-atlas-border-glow"
                            : "border-white/15 bg-slate-900/80 text-slate-200 group-hover:border-rose-300/70"
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {idx + 1}
                      </motion.div>
                      <span
                        className={`w-24 text-center ${
                          selected ? "text-slate-50" : "text-slate-400"
                        }`}
                      >
                        {p.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active incident card */}
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 md:grid-cols-[minmax(0,1.2fr),minmax(0,0.9fr)]"
            >
              <div className="rounded-2xl bg-slate-950/80 p-5 ring-1 ring-rose-500/40">
                <p className="text-xs uppercase tracking-[0.3em] text-rose-300">
                  Active failure mode
                </p>
                <h3 className="mt-3 font-display text-xl text-slate-50">
                  {active.title}
                </h3>
                <p className="mt-3 text-sm text-slate-200">{active.line}</p>

                <div className="mt-4 grid gap-3 text-[11px] sm:grid-cols-3 sm:text-xs text-slate-200">
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-slate-400">Where it shows up</p>
                    <p className="mt-1">
                      Inputs, agents, and outputs misaligned with written intent.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-slate-400">Impact indicator</p>
                    <p className="mt-1">{active.metric}</p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-slate-400">Why it&apos;s subtle</p>
                    <p className="mt-1">
                      Traditional monitoring can&apos;t see inside agent chains or
                      prompts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual risk gauge */}
              <div className="space-y-4 rounded-2xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Unchecked risk trajectory
                </p>
                <div className="mt-2 h-24 rounded-2xl bg-gradient-to-br from-rose-500/40 via-amber-400/30 to-slate-700/40 p-3">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] text-slate-100">
                      <span>Now</span>
                      <span>Incident</span>
                    </div>
                    <div className="relative h-5 rounded-full bg-black/60">
                      <div className="absolute inset-y-1 left-1 right-1 rounded-full bg-gradient-to-r from-emerald-400/40 via-amber-400/60 to-rose-500/80" />
                      <motion.div
                        className="absolute -top-1.5 h-8 w-8 rounded-full bg-slate-900/90 text-[10px] font-semibold text-slate-50 shadow-atlas-soft flex items-center justify-center"
                        animate={{ x: `${20 + activeIndex * 12}%` }}
                        transition={{ type: "spring", stiffness: 140, damping: 20 }}
                      >
                        !
                      </motion.div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-200">
                      <span>Annoyance</span>
                      <span>Regulatory event</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300">
                  Atlas Synapse AI is designed to clamp these modes **before**
                  they move from &quot;annoying&quot; to &quot;reportable&quot;.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemPanels;

