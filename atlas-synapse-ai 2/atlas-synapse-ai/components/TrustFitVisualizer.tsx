"use client";

import { motion } from "@/lib/motion";
import { useState } from "react";

type ScenarioKey =
  | "pii"
  | "policy"
  | "prompt"
  | "hallucination"
  | "sensitiveOutput";

const scenarios: {
  key: ScenarioKey;
  label: string;
  input: string;
  inputGate: string;
  outputGate: string;
  output: string;
}[] = [
  {
    key: "pii",
    label: "PII detected",
    input: "Customer record with phone + address.",
    inputGate: "Sensitive fields masked and tagged.",
    outputGate: "Sanitized context only.",
    output: "Answer with no PII, fully logged."
  },
  {
    key: "policy",
    label: "Policy conflict",
    input: "Request to bypass internal approval.",
    inputGate: "Blocked and routed to human owner.",
    outputGate: "No AI action without sign‑off.",
    output: "Compliant response or escalation."
  },
  {
    key: "prompt",
    label: "Prompt injection",
    input: "Untrusted site content overrides system prompt.",
    inputGate: "Injection isolated from system instructions.",
    outputGate: "Verified against safe policy.",
    output: "Helpful but constrained response."
  },
  {
    key: "hallucination",
    label: "Hallucination risk",
    input: "Question outside known data.",
    inputGate: "Flagged as low‑context.",
    outputGate: "Fact‑check & confidence scoring.",
    output: "Either verified or clearly uncertain."
  },
  {
    key: "sensitiveOutput",
    label: "Sensitive output",
    input: "Prompt touches roadmap / financials.",
    inputGate: "Marked as sensitive domain.",
    outputGate: "Redaction + strict logging.",
    output: "Only safe, redacted text leaves."
  }
];

const TrustFitVisualizer: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("pii");
  const active = scenarios.find((s) => s.key === activeScenario)!;

  return (
    <section
      id="fit"
      aria-labelledby="fit-heading"
      className="relative px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-atlas-secondary">
              Where Atlas Synapse AI fits
            </p>
            <h2
              id="fit-heading"
              className="mt-3 font-display text-3xl tracking-tight text-slate-100 sm:text-4xl"
            >
              Visualize the trust layer around your agents.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-300">
            Pick a scenario and watch how Atlas Synapse AI intercepts risk
            immediately **after inputs** and **before outputs** — without
            rewriting your stack.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr),minmax(0,0.9fr)]">
          {/* Left: pipeline rows */}
          <div className="glass-panel relative overflow-hidden rounded-3xl p-6 shadow-atlas-soft">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0_0,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.26),transparent_55%)] opacity-80" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-300">
                <span>Inputs</span>
                <span className="text-atlas-secondary">Input Gate (Atlas)</span>
                <span>Agentic Processing</span>
                <span className="text-atlas-secondary">Output Gate (Atlas)</span>
                <span>Outputs</span>
              </div>

              <div className="space-y-3">
                {/* Row 1 */}
                <motion.div
                  key={active.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-2 rounded-2xl bg-slate-950/70 p-3 text-[11px] sm:grid-cols-5 sm:text-xs"
                >
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] text-slate-400">Raw input</p>
                    <p className="mt-1 text-slate-100">{active.input}</p>
                  </div>
                  <div className="rounded-xl bg-atlas-primary/20 px-3 py-2 ring-1 ring-atlas-primary/60">
                    <p className="text-[10px] text-atlas-primary">Input Gate</p>
                    <p className="mt-1 text-slate-100">{active.inputGate}</p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] text-slate-400">Agents / tools</p>
                    <p className="mt-1 text-slate-200">
                      Models, chains, and tools operate on **sanitized** context.
                    </p>
                  </div>
                  <div className="rounded-xl bg-atlas-primary/20 px-3 py-2 ring-1 ring-atlas-primary/60">
                    <p className="text-[10px] text-atlas-primary">
                      Output Gate
                    </p>
                    <p className="mt-1 text-slate-100">{active.outputGate}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/15 px-3 py-2 ring-1 ring-emerald-400/60">
                    <p className="text-[10px] text-emerald-300">Delivered</p>
                    <p className="mt-1 text-slate-100">{active.output}</p>
                  </div>
                </motion.div>

                {/* Row 2: Audit & signals */}
                <div className="grid gap-2 rounded-2xl bg-slate-950/70 p-3 text-[11px] sm:grid-cols-4 sm:text-xs">
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] text-slate-400">Audit log</p>
                    <p className="mt-1 text-slate-200">
                      Input, decisions, overrides and risk scores captured.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] text-slate-400">Trust score</p>
                    <p className="mt-1 font-mono text-sm text-emerald-400">
                      0.96
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] text-slate-400">Routing</p>
                    <p className="mt-1 text-slate-200">
                      Risky flows routed to humans or quarantined.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] text-slate-400">Evidence</p>
                    <p className="mt-1 text-slate-200">
                      Exportable evidence for security / compliance review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: scenario selector */}
          <div className="space-y-4">
            <p className="text-sm text-slate-300">
              Choose a risk mode and see, row by row,{" "}
              <span className="text-atlas-secondary">
                exactly where Atlas Synapse AI intervenes
              </span>{" "}
              — at the input boundary and output boundary — without touching your
              core models.
            </p>

            <div className="grid gap-2 text-sm">
              {scenarios.map((s) => {
                const active = s.key === activeScenario;
                return (
                  <button
                    key={s.key}
                    onClick={() => setActiveScenario(s.key)}
                    className={`flex items-center justify-between rounded-2xl border px-3 py-2 text-left text-xs transition-colors ${
                      active
                        ? "border-atlas-primary-soft bg-atlas-soft/90 text-slate-50 shadow-atlas-border-glow"
                        : "border-white/8 bg-atlas-soft/70 text-slate-300 hover:border-atlas-secondary/40"
                    }`}
                  >
                    <span className="pr-2">
                      <span className="font-semibold">{s.label}</span>
                    </span>
                    <span
                      className={`ml-3 inline-flex h-6 items-center rounded-full px-2 text-[10px] font-semibold uppercase tracking-wide ${
                        active
                          ? "bg-atlas-primary/30 text-atlas-secondary"
                          : "bg-slate-900/80 text-slate-400"
                      }`}
                    >
                      {active ? "Intercepted" : "Simulate"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustFitVisualizer;

