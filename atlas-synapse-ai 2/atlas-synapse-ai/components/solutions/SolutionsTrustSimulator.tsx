"use client";

import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShieldCheck, Shield, Lock, Check, Circle, ArrowRight } from "lucide-react";

type ScenarioKey = "pii" | "policy" | "output";

// Stop positions so packet lands ON each shield (Input Gate, Output Gate) or past for redacted
const STOP_POSITIONS = { policy: "28%", output: "72%", pii: "95%" } as const;
// Green overlay stops here (never past the circle). For pii = first gate only; then circle continues to end with no red.
const FIRST_GATE_POSITION = "28%";
const GREEN_STOP_POSITIONS = { policy: "28%", output: "72%", pii: "28%" } as const;
// Duration for green overlay (and for circle to reach that point). Pii = time to first gate only.
const GREEN_DURATIONS = { policy: 0.7, output: 1.8, pii: 0.55 } as const;
// Full move duration for circle. Pii has two segments: to first gate then to end.
const MOVE_DURATIONS = { policy: 0.7, output: 1.8, pii: 1.55 } as const;
// Start position so circle + green move in lockstep from the same point (circle visible, not clipped)
const START_POSITION = "2%";

const scenarios: { key: ScenarioKey; label: string; description: string }[] = [
  { key: "pii", label: "Sensitive data in prompt", description: "Input Gate — data masked before processing" },
  { key: "policy", label: "Policy conflict", description: "Input Gate — request blocked" },
  { key: "output", label: "Low-confidence output", description: "Output Gate — verified, held for review" },
];

const CASE_SCENARIO_LOGS: Record<ScenarioKey, string[]> = {
  pii: ["[Input Gate] Sensitive data scan started", "[Input Gate] 2 fields masked", "[Audit] SENSITIVE_DATA_MASKED", "[Output Gate] No sensitive data in response"],
  policy: ["[Input Gate] Policy check failed", "[Routing] Escalated to human", "[Audit] BLOCKED_POLICY_VIOLATION", "[Log] Request quarantined"],
  output: ["[Output Gate] Confidence score 0.42", "[Verify] Below threshold — held", "[Audit] HELD_FOR_REVIEW", "[Routing] Sent for human review"],
};

const aegisBullets = [
  "4 scanning engines + Gemini AI",
  "SBOM generation & 6 compliance frameworks",
  "25+ file formats (code, docs, media)",
  "FinTech/Insurance regulatory rules",
];

const shieldBullets = [
  "Continuous model performance tracking",
  "Fair Lending Act proxy detection",
  "SHAP value validation & audit trails",
  "Evidence-grade compliance reports",
];

export default function SolutionsTrustSimulator() {
  const [scenario, setScenario] = useState<ScenarioKey>("pii");
  const [logs, setLogs] = useState<string[]>([]);
  const [packetKey, setPacketKey] = useState(0);

  useEffect(() => {
    setLogs([]);
    const entries = CASE_SCENARIO_LOGS[scenario];
    const timers: NodeJS.Timeout[] = [];
    entries.forEach((entry, i) => {
      timers.push(setTimeout(() => setLogs((prev) => [...prev, entry]), i * 350));
    });
    return () => timers.forEach(clearTimeout);
  }, [scenario]);

  // Loop: advance packet key periodically for replay
  useEffect(() => {
    const t = setTimeout(() => setPacketKey((k) => k + 1), 3800);
    return () => clearTimeout(t);
  }, [packetKey]);

  // Hard reset on scenario change: bump key so pipeline fully remounts (no retained state)
  const handleScenarioChange = (s: ScenarioKey) => {
    setScenario(s);
    setPacketKey((k) => k + 1);
  };

  return (
    <div data-section="solutions" className="min-h-screen pt-20 pb-16" style={{ paddingTop: "clamp(72px, 8vh, 96px)", paddingBottom: "clamp(48px, 6vh, 80px)" }}>
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
        {/* Hero — big main attraction */}
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="section-title font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-slate-100">
                Solutions
              </h1>
              <p className="mt-3 text-lg sm:text-xl text-slate-400 max-w-2xl">
                Enterprise-grade AI security and compliance. Launch Aegis Prime for $0 or see how the trust layer works in the pipeline below.
              </p>
            </div>
            <Link
              href="/"
              className="shrink-0 text-base font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </header>

        {/* Our Products — full detail from original site */}
        <section className="mb-14 sm:mb-16">
          <h2 className="font-display text-3xl font-bold text-slate-100 mb-3">Our Products</h2>
          <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-2xl">
            Enterprise-grade AI security and compliance tools for regulated industries.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl border border-white/10 p-8 sm:p-10"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-atlas-primary/20 ring-1 ring-atlas-primary/40">
                  <Shield className="h-8 w-8 text-atlas-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl font-bold text-slate-100">Aegis Prime Auditor</h3>
                  <span className="mt-2 inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-400/40">
                    Live now
                  </span>
                  <p className="mt-4 text-base text-slate-400 leading-relaxed">
                    Multi-engine security scanner with AI-powered risk analysis. Competes with $60k–300k/year enterprise tools for <strong className="text-slate-200">$0</strong>.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {aegisBullets.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-base text-slate-300">
                        <Check className="h-5 w-5 shrink-0 text-atlas-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="https://www.atlassynapseai.com/Aegis-Prime-Auditor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-atlas-primary to-atlas-secondary px-6 py-3 text-base font-semibold text-slate-950 shadow-atlas-soft hover:opacity-95 transition-opacity"
                  >
                    Launch Aegis Prime
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl border border-white/10 p-8 sm:p-10"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-atlas-secondary/20 ring-1 ring-atlas-secondary/40">
                  <Lock className="h-8 w-8 text-atlas-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl font-bold text-slate-100">Atlas Shield</h3>
                  <span className="mt-2 inline-block rounded-full bg-slate-500/20 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-slate-300 ring-1 ring-slate-400/40">
                    Coming Q2 2026
                  </span>
                  <p className="mt-4 text-base text-slate-400 leading-relaxed">
                    Real-time AI model monitoring with logic drift detection and explainability validation for NYDFS compliance.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {shieldBullets.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-base text-slate-300">
                        <Circle className="h-4 w-4 shrink-0 text-slate-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-base font-medium text-slate-500">Coming Soon</p>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Mission + stats from original site */}
        <section className="mb-20 rounded-2xl border border-white/10 bg-atlas-soft/40 p-8 sm:p-12 glass-panel">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-100 mb-4">Our Mission</h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl">
            Atlas Synapse exists because AI systems deployed in regulated industries—banking, insurance, healthcare, legal—require a fundamentally different infrastructure approach. We build <strong className="text-slate-200">sovereign, deterministic, and auditable</strong> AI infrastructure that makes regulatory compliance not just possible, but provable. Where competitors offer developer tools, we deliver fiduciary-grade systems that turn AI compliance into a competitive advantage.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-atlas-primary">$0</p>
              <p className="mt-1 text-sm font-medium text-slate-400">Open Source Cost</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-atlas-primary">4</p>
              <p className="mt-1 text-sm font-medium text-slate-400">Security Engines</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-atlas-primary">25+</p>
              <p className="mt-1 text-sm font-medium text-slate-400">File Formats</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-atlas-primary">6</p>
              <p className="mt-1 text-sm font-medium text-slate-400">Compliance Frameworks</p>
            </div>
          </div>
        </section>

        {/* Trust layer at a glance — compact, one viewport, single audit log for selected scenario */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-100 mb-2">Trust layer at a glance</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-2xl">
            Select a scenario. Watch the signal through the gates and the audit trail for that case below.
          </p>

          <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-slate-950/50 overflow-hidden max-h-[min(480px,72vh)]">
            {/* Row 1: Pipeline + Scenario sidebar — aligned */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 p-4 sm:p-5 min-h-0 shrink-0">
              {/* Pipeline */}
              <div className="flex flex-col min-h-0 rounded-xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between gap-2 mb-3 text-xs font-medium text-slate-400 shrink-0">
                  <span className="flex-1 text-center">Inputs</span>
                  <span className="flex-1 text-center text-atlas-primary">Input Gate</span>
                  <span className="flex-1 text-center">Agents</span>
                  <span className="flex-1 text-center text-atlas-primary">Output Gate</span>
                  <span className="flex-1 text-center">Outputs</span>
                </div>
                <div
                  key={`pipeline-${scenario}-${packetKey}`}
                  className="relative h-20 rounded-lg bg-slate-950/80 border border-white/10 shrink-0 overflow-hidden"
                >
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center px-3">
                    <div className="flex-1 h-px bg-slate-600" />
                    <div className="flex shrink-0 w-12 items-center justify-center">
                      <ShieldCheck className="h-7 w-7 text-atlas-primary drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    </div>
                    <div className="flex-1 h-px bg-slate-600" />
                    <div className="w-16 shrink-0" />
                    <div className="flex-1 h-px bg-slate-600" />
                    <div className="flex shrink-0 w-12 items-center justify-center">
                      <ShieldCheck className="h-7 w-7 text-atlas-primary drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    </div>
                    <div className="flex-1 h-px bg-slate-600" />
                  </div>
                  {/* Green "passed" overlay — grows dynamically behind the packet (same timing as packet) */}
                  <PipelinePassedOverlay scenario={scenario} />
                  {/* Yellow "redacted" overlay — pii only: follows circle from first gate to end */}
                  {scenario === "pii" && <PipelineRedactedOverlay />}
                  {/* Red "blocked" overlay — only for policy and output; pii passes to end so no red */}
                  {(scenario === "policy" || scenario === "output") && (
                    <PipelineBlockedOverlay scenario={scenario} />
                  )}
                  <AnimatePresence mode="sync">
                    <Packet key="packet" scenario={scenario} />
                  </AnimatePresence>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-1.5 text-[10px] sm:text-xs text-slate-300 shrink-0">
                  {/* Raw input — always "entered" */}
                  <div className="rounded-md bg-slate-800/80 p-2 text-center border border-slate-600/50">
                    <p className="font-semibold text-atlas-secondary">Raw input</p>
                    <p className="mt-0.5 opacity-80">User prompt</p>
                  </div>
                  {/* Validate — pii/output: active (gate passed); policy: blocked (red) */}
                  <div
                    className={`rounded-md p-2 text-center transition-colors ${scenario === "policy"
                        ? "bg-rose-950/40 ring-1 ring-rose-500/30 opacity-70"
                        : "bg-atlas-primary/15 ring-1 ring-atlas-primary/40"
                      }`}
                  >
                    <p className={`font-semibold ${scenario === "policy" ? "text-rose-300/90" : "text-atlas-primary"}`}>Validate</p>
                    <p className="mt-0.5">Mask • Block • Route</p>
                  </div>
                  {/* Process — pii/output: neutral; policy: blocked (red) */}
                  <div
                    className={`rounded-md p-2 text-center transition-colors ${scenario === "policy"
                        ? "bg-rose-950/40 ring-1 ring-rose-500/30 opacity-70"
                        : "bg-slate-800/80"
                      }`}
                  >
                    <p className={`font-semibold ${scenario === "policy" ? "text-rose-300/90" : "text-slate-400"}`}>Process</p>
                    <p className="mt-0.5">Models run</p>
                  </div>
                  {/* Verify — pii: active; output: held (red); policy: blocked (red) */}
                  <div
                    className={`rounded-md p-2 text-center transition-colors ${scenario === "policy" || scenario === "output"
                        ? "bg-rose-950/40 ring-1 ring-rose-500/30 opacity-70"
                        : "bg-atlas-primary/15 ring-1 ring-atlas-primary/40"
                      }`}
                  >
                    <p className={`font-semibold ${scenario === "policy" || scenario === "output" ? "text-rose-300/90" : "text-atlas-primary"}`}>Verify</p>
                    <p className="mt-0.5">Score • Redact • Log</p>
                  </div>
                  {/* Delivered — pii: success (green); policy/output: not reached (red) */}
                  <div
                    className={`rounded-md p-2 text-center transition-colors ${scenario === "policy" || scenario === "output"
                        ? "bg-rose-950/40 ring-1 ring-rose-500/30 opacity-70"
                        : "bg-emerald-500/10 ring-1 ring-emerald-400/30"
                      }`}
                  >
                    <p className={`font-semibold ${scenario === "policy" || scenario === "output" ? "text-rose-300/90" : "text-emerald-300"}`}>Delivered</p>
                    <p className="mt-0.5">Safe output</p>
                  </div>
                </div>
              </div>

              {/* Scenario tabs */}
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 flex flex-col shrink-0 lg:shrink-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Scenario</p>
                <div className="flex flex-col gap-1.5">
                  {scenarios.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => handleScenarioChange(s.key)}
                      className={`w-full rounded-lg border px-3 py-2.5 text-left text-xs transition-colors ${scenario === s.key
                          ? "border-atlas-primary bg-atlas-primary/15 text-slate-50"
                          : "border-white/10 bg-slate-800/60 text-slate-300 hover:border-atlas-primary/40"
                        }`}
                    >
                      <span className="font-semibold">{s.label}</span>
                      <span className="mt-0.5 block text-[10px] opacity-80">{s.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Single live audit log — fixed height, scrolls inside; moved down with clear gap */}
            <div className="rounded-t-xl border-t border-white/10 bg-slate-900/80 p-4 pt-5 shrink-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Live audit log — <span className="text-atlas-primary">{scenarios.find((s) => s.key === scenario)?.label}</span>
              </p>
              <div className="rounded-lg bg-slate-950/90 border border-white/5 p-3 h-28 max-h-28 overflow-y-auto font-mono text-xs sm:text-sm text-slate-300">
                <AnimatePresence mode="wait">
                  {logs.length === 0 ? (
                    <motion.p key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-500">
                      Streaming…
                    </motion.p>
                  ) : (
                    <motion.div
                      key={scenario}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1.5"
                    >
                      {logs.map((log, i) => (
                        <motion.div
                          key={`${log}-${i}`}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="rounded bg-slate-800/80 px-2 py-1.5 text-atlas-secondary/90 shrink-0"
                        >
                          {log}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/** Green overlay: grows only with the circle and stops exactly at the gate; for pii stops at first gate only. Never exists ahead of the circle. */
function PipelinePassedOverlay({ scenario }: { scenario: ScenarioKey }) {
  const endWidth = GREEN_STOP_POSITIONS[scenario];
  const duration = GREEN_DURATIONS[scenario];

  return (
    <motion.div
      className="absolute inset-y-0 left-0 pointer-events-none rounded-l-lg will-change-[width]"
      initial={{ width: START_POSITION }}
      animate={{ width: endWidth }}
      transition={{ duration, ease: "linear" }}
      style={{
        maxWidth: endWidth,
        background: "linear-gradient(90deg, rgba(34,197,94,0.22) 0%, rgba(34,197,94,0.1) 100%)",
        borderBottom: "3px solid rgba(34,197,94,0.55)",
      }}
    />
  );
}

/** Red overlay: pops out only after the circle has reached the blocking gate. Not used for pii (flow passes to end). */
function PipelineBlockedOverlay({ scenario }: { scenario: ScenarioKey }) {
  const left = STOP_POSITIONS[scenario];
  const duration = MOVE_DURATIONS[scenario];
  const delay = duration;

  return (
    <motion.div
      className="absolute inset-y-0 right-0 pointer-events-none overflow-hidden will-change-[width]"
      style={{ left }}
      initial={false}
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-full"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          width: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay },
        }}
        style={{
          background: "linear-gradient(90deg, rgba(244,63,94,0.42) 0%, rgba(244,63,94,0.2) 50%, rgba(244,63,94,0.07) 100%)",
          borderBottom: "3px solid rgba(244,63,94,0.75)",
        }}
      />
    </motion.div>
  );
}

/** Yellow overlay: pii only. Follows the circle from the first gate onwards (redacted path to end). */
function PipelineRedactedOverlay() {
  const delay = GREEN_DURATIONS.pii; // start when circle reaches first gate
  const duration = MOVE_DURATIONS.pii - delay; // 1s = second segment

  return (
    <motion.div
      className="absolute inset-y-0 right-0 pointer-events-none overflow-hidden will-change-[width]"
      style={{ left: FIRST_GATE_POSITION }}
      initial={false}
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-full"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          width: { duration, ease: "linear", delay },
        }}
        style={{
          background: "linear-gradient(90deg, rgba(234,179,8,0.2) 0%, rgba(234,179,8,0.08) 100%)",
          borderBottom: "3px solid rgba(234,179,8,0.5)",
        }}
      />
    </motion.div>
  );
}

function Packet({ scenario }: { scenario: ScenarioKey }) {
  const blocked = scenario === "policy";
  const redacted = scenario === "pii";
  const heldForReview = scenario === "output";

  const moveDuration = MOVE_DURATIONS[scenario];
  const stopLeft = STOP_POSITIONS[scenario];

  // Pii: circle turns yellow (redacted) only after reaching first gate; green stops at first gate, then circle continues to end
  const [pastFirstGate, setPastFirstGate] = useState(false);
  const gateTime = redacted ? GREEN_DURATIONS.pii : 0;
  useEffect(() => {
    if (!redacted) return;
    const t = setTimeout(() => setPastFirstGate(true), gateTime * 1000);
    return () => clearTimeout(t);
  }, [redacted, gateTime]);

  const isPii = redacted;
  const piiKeyframes = isPii
    ? [START_POSITION, FIRST_GATE_POSITION, stopLeft]
    : undefined;
  const piiTimes = isPii ? [0, gateTime / moveDuration, 1] : undefined;

  return (
    <motion.div
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-2"
      initial={{ left: START_POSITION }}
      animate={
        isPii && piiKeyframes
          ? { left: piiKeyframes }
          : { left: stopLeft }
      }
      transition={
        isPii && piiTimes
          ? { duration: moveDuration, ease: "linear" as const, times: piiTimes }
          : { duration: moveDuration, ease: "linear" as const }
      }
    >
      <motion.div
        className={`h-5 w-5 rounded-full border-2 shrink-0 ${blocked
            ? "bg-rose-500/80 border-rose-400"
            : heldForReview
              ? "bg-amber-500/80 border-amber-400"
              : redacted
                ? pastFirstGate
                  ? "bg-amber-500/80 border-amber-400"
                  : "bg-slate-400 border-slate-500"
                : "bg-slate-400 border-white/30"
          }`}
      />
      {blocked && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-md bg-rose-500/25 px-2 py-1 text-[10px] font-bold text-rose-200 ring-1 ring-rose-500/50"
        >
          Blocked
        </motion.span>
      )}
      {redacted && pastFirstGate && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="rounded-md bg-amber-500/25 px-2 py-1 text-[10px] font-bold text-amber-200 ring-1 ring-amber-500/50"
        >
          Redacted
        </motion.span>
      )}
      {heldForReview && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: moveDuration * 0.5 }}
          className="rounded-md bg-amber-500/25 px-2 py-1 text-[10px] font-bold text-amber-200 ring-1 ring-amber-500/50"
        >
          Held for review
        </motion.span>
      )}
    </motion.div>
  );
}
