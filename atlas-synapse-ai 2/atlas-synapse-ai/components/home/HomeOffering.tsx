"use client";

import { motion, useInView, useReducedMotion } from "@/lib/motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  FileCheck,
  Filter,
  ShieldCheck,
  ScrollText,
  Shield,
  Sliders,
  CheckCircle,
} from "lucide-react";

const LAYERS = [
  { id: "govern", title: "Govern", line: "Define policy once. Enforce everywhere.", icon: FileCheck },
  { id: "validate", title: "Validate", line: "Mask, block, route risky inputs.", icon: Filter },
  { id: "verify", title: "Verify", line: "Score, redact, and log outputs.", icon: ShieldCheck },
];

const TRUST_SIGNALS = [
  { id: "audit", label: "Audit Trail", icon: ScrollText },
  { id: "policy", label: "Policy Enforcement", icon: Shield },
  { id: "input", label: "Input Controls", icon: Sliders },
  { id: "output", label: "Output Verification", icon: CheckCircle },
];

const AUDIT_LINES = [
  { key: "policy_applied", value: "✅", layerId: "govern" },
  { key: "pii_masked", value: "✅", layerId: "validate" },
  { key: "output_scored", value: "0.94", layerId: "verify" },
  { key: "audit_event_written", value: "✅", layerId: "verify" },
];

const LAYER_HEIGHT_PX = 80;
const LAYER_OVERLAP_PX = 3;
const STACK_WIDTH = "min(560px, 100%)";
const STAGE_HEIGHT = "clamp(320px, 45vh, 480px)";
const SIGNAL_LINE_INSET = 24;
const PACKET_TRAVEL_MS = 2200;
const ASSEMBLY_DURATION = 0.45;
const STAGGER = 0.12;
const SCANLINE_DURATION = 0.6;
const PACKET_INTERVAL_MS = 6000;

/** Layer center Y as fraction of stack height (flex-col-reverse: index 0 = bottom). */
function getLayerCenterFractions(): [number, number, number] {
  const total = LAYER_HEIGHT_PX * 3 - LAYER_OVERLAP_PX * 2;
  const topOf = (i: number) => (2 - i) * LAYER_HEIGHT_PX - (2 - i) * LAYER_OVERLAP_PX;
  const centerY = (i: number) => (topOf(i) + LAYER_HEIGHT_PX / 2) / total;
  return [centerY(0), centerY(1), centerY(2)];
}

const [GOVERN_CENTER_Y, VALIDATE_CENTER_Y, VERIFY_CENTER_Y] = getLayerCenterFractions();

export default function HomeOffering() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2, once: true });
  const reduced = useReducedMotion();
  const [assemblyDone, setAssemblyDone] = useState(false);
  const [packetKey, setPacketKey] = useState(0);
  const [packetPhase, setPacketPhase] = useState<"idle" | "govern" | "validate" | "verify" | "trusted">("idle");
  const [focusedLayer, setFocusedLayer] = useState<string | null>(null);
  const [auditLogOpen, setAuditLogOpen] = useState(false);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = (LAYERS.length * STAGGER + ASSEMBLY_DURATION) * 1000 + SCANLINE_DURATION * 1000 + 100;
    const id = setTimeout(() => setAssemblyDone(true), t);
    return () => clearTimeout(id);
  }, [inView, reduced]);

  useEffect(() => {
    if (!inView || reduced || !assemblyDone) return;
    const id = setInterval(() => setPacketKey((k) => k + 1), PACKET_INTERVAL_MS);
    return () => clearInterval(id);
  }, [inView, reduced, assemblyDone]);

  return (
    <section
      data-section="offering"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(24px, 3.5vh, 48px)",
        paddingBottom: "clamp(24px, 3.5vh, 48px)",
        paddingLeft: "clamp(16px, 4vw, 32px)",
        paddingRight: "clamp(16px, 4vw, 32px)",
      }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div
          className="grid grid-cols-12 gap-6 lg:gap-10 items-center"
          style={{ minHeight: "clamp(400px, 52vh, 600px)" }}
        >
          {/* Left (cols 1-5): Copy + CTA + Trust signals */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-slate-500"
            >
              What we offer
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 }}
              className="mt-2 font-display font-bold tracking-tight text-slate-100"
              style={{ fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.5rem)" }}
            >
              One Trust Stack.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-3 text-slate-400 text-base sm:text-lg leading-snug max-w-[320px]"
            >
              Govern policy. Validate inputs. Verify outputs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="mt-5"
            >
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 text-base font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors"
              >
                Explore Solutions
                <span aria-hidden>→</span>
              </Link>
            </motion.div>

            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {TRUST_SIGNALS.map((sig, idx) => {
                const Icon = sig.icon;
                return (
                  <motion.div
                    key={sig.id}
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + idx * 0.03 }}
                    className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-sky-400/80" strokeWidth={1.8} />
                    <span className="text-xs font-medium text-slate-300 truncate">{sig.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right (cols 6-12): Single bounded TrustStackStage */}
          <div
            className="col-span-12 lg:col-span-7"
            style={{ minHeight: STAGE_HEIGHT }}
          >
            <TrustStackStage
              inView={inView}
              reduced={reduced ?? false}
              assemblyDone={assemblyDone}
              packetKey={packetKey}
              packetPhase={packetPhase}
              setPacketPhase={setPacketPhase}
              focusedLayer={focusedLayer}
              setFocusedLayer={setFocusedLayer}
              auditLogOpen={auditLogOpen}
              setAuditLogOpen={setAuditLogOpen}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStackStage(props: {
  inView: boolean;
  reduced: boolean;
  assemblyDone: boolean;
  packetKey: number;
  packetPhase: "idle" | "govern" | "validate" | "verify" | "trusted";
  setPacketPhase: (p: "idle" | "govern" | "validate" | "verify" | "trusted") => void;
  focusedLayer: string | null;
  setFocusedLayer: (id: string | null) => void;
  auditLogOpen: boolean;
  setAuditLogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { inView, reduced, assemblyDone, packetKey, setPacketPhase, focusedLayer, setFocusedLayer, auditLogOpen, setAuditLogOpen, packetPhase } = props;
  return (
    <div className="relative w-full overflow-visible" style={{ height: STAGE_HEIGHT }} aria-label="Trust stack">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-0 lg:gap-6 h-full items-center">
        <div className="flex justify-center items-center h-full min-h-0">
          <div className="relative flex flex-col justify-center items-center" style={{ width: STACK_WIDTH }}>
            {reduced ? (
              <ReducedStack onFocus={setFocusedLayer} focused={focusedLayer} />
            ) : (
              <>
                <svg className="absolute pointer-events-none" style={{ left: -SIGNAL_LINE_INSET, width: `calc(100% + ${SIGNAL_LINE_INSET * 2}px)`, top: `${VALIDATE_CENTER_Y * 100}%`, height: 2, zIndex: 1 }} aria-hidden>
                  <defs>
                    <linearGradient id="signal-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                      <stop offset="15%" stopColor="rgba(56,189,248,0.2)" />
                      <stop offset="50%" stopColor="rgba(56,189,248,0.45)" />
                      <stop offset="85%" stopColor="rgba(56,189,248,0.2)" />
                      <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="1" x2="100%" y2="1" stroke="url(#signal-line-grad)" strokeWidth="2" />
                </svg>
                <motion.div className="relative w-full flex flex-col-reverse gap-0" style={{ zIndex: 2 }} animate={assemblyDone ? { scale: [1, 1.004, 1], transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } } : {}}>
                  {LAYERS.map((layer, i) => {
                    const Icon = layer.icon;
                    const delay = inView ? i * STAGGER : 0;
                    const isFocused = focusedLayer === layer.id;
                    const isHighlighted = (packetPhase === "govern" && layer.id === "govern") || (packetPhase === "validate" && layer.id === "validate") || (packetPhase === "verify" && layer.id === "verify");
                    return (
                      <motion.div
                        key={layer.id}
                        className="relative w-full flex items-center gap-4 rounded-md border px-5 py-4 cursor-default touch-manipulation backdrop-blur-sm"
                        style={{
                          height: LAYER_HEIGHT_PX,
                          minHeight: LAYER_HEIGHT_PX,
                          marginBottom: i < LAYERS.length - 1 ? -LAYER_OVERLAP_PX : 0,
                          background: "linear-gradient(180deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.95) 100%)",
                          borderColor: isFocused || isHighlighted ? "rgba(56,189,248,0.5)" : "rgba(71,85,105,0.4)",
                          boxShadow: isFocused || isHighlighted ? "0 0 28px rgba(56,189,248,0.18), 0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)" : "0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
                          zIndex: i + (isFocused ? 10 : 0),
                          transform: "perspective(900px) rotateX(1.2deg)",
                          transformStyle: "preserve-3d",
                        }}
                        initial={{ opacity: 0, y: 32, x: i === 0 ? -10 : i === 1 ? 0 : 10 }}
                        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 32, x: inView ? 0 : i === 0 ? -10 : i === 1 ? 0 : 10, scale: isFocused ? 1.02 : 1, transition: { type: "spring", stiffness: 380, damping: 30, mass: 0.8, delay } }}
                        onMouseEnter={() => setFocusedLayer(layer.id)}
                        onMouseLeave={() => setFocusedLayer(null)}
                        onFocus={() => setFocusedLayer(layer.id)}
                        onBlur={() => setFocusedLayer(null)}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-500/35 to-transparent" aria-hidden />
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-700/50 text-slate-400"><Icon className="h-4 w-4" strokeWidth={1.8} /></span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-200">{layer.title}</h3>
                          <p className="mt-0.5 text-xs text-slate-500 leading-snug">{layer.line}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
                {assemblyDone && <SignalPacketPass key={packetKey} onPhaseChange={setPacketPhase} travelMs={PACKET_TRAVEL_MS} governY={GOVERN_CENTER_Y} validateY={VALIDATE_CENTER_Y} verifyY={VERIFY_CENTER_Y} />}
              </>
            )}
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-stretch justify-center relative" style={{ zIndex: 4 }}>
          <div className="absolute left-0 top-1/2 w-px -translate-y-1/2 bg-sky-500/30" style={{ height: 32 }} aria-hidden />
          <div className="rounded-lg border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm px-3 py-2.5 font-mono text-[10px] text-slate-400 shrink-0" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)" }}>
            <div className="text-slate-500 mb-1.5">audit_log</div>
            {AUDIT_LINES.map((line) => {
              const isActive = focusedLayer === line.layerId || (packetPhase === "govern" && line.key === "policy_applied") || (packetPhase === "validate" && line.key === "pii_masked") || (packetPhase === "verify" && (line.key === "output_scored" || line.key === "audit_event_written")) || (packetPhase === "trusted" && line.key === "audit_event_written");
              return (
                <motion.div key={line.key} className="flex justify-between gap-2 py-0.5" animate={{ backgroundColor: isActive ? "rgba(56,189,248,0.12)" : "transparent" }} transition={{ duration: 0.2 }}>
                  <span className="text-slate-500 truncate">{line.key}:</span>
                  <span className={isActive ? "text-sky-400" : "text-slate-400"}>{line.value}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="lg:hidden mt-4">
        <button type="button" className="w-full flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/60 px-3 py-2 text-left text-xs font-medium text-slate-400" onClick={() => setAuditLogOpen((o: boolean) => !o)} aria-expanded={auditLogOpen}>
          Live audit log <span className="text-slate-500">{auditLogOpen ? "−" : "+"}</span>
        </button>
        <motion.div initial={false} animate={{ height: auditLogOpen ? "auto" : 0, opacity: auditLogOpen ? 1 : 0, marginTop: auditLogOpen ? 8 : 0 }} style={{ overflow: "hidden" }}>
          <div className="rounded-lg border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm px-3 py-2.5 font-mono text-[10px] text-slate-400" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)" }}>
            <div className="text-slate-500 mb-1.5">audit_log</div>
            {AUDIT_LINES.map((line) => {
              const isActive = focusedLayer === line.layerId || (packetPhase === "govern" && line.key === "policy_applied") || (packetPhase === "validate" && line.key === "pii_masked") || (packetPhase === "verify" && (line.key === "output_scored" || line.key === "audit_event_written")) || (packetPhase === "trusted" && line.key === "audit_event_written");
              return (
                <motion.div key={line.key} className="flex justify-between gap-2 py-0.5" animate={{ backgroundColor: isActive ? "rgba(56,189,248,0.12)" : "transparent" }} transition={{ duration: 0.2 }}>
                  <span className="text-slate-500 truncate">{line.key}:</span>
                  <span className={isActive ? "text-sky-400" : "text-slate-400"}>{line.value}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SignalPacketPass({
  onPhaseChange,
  travelMs,
  governY,
  validateY,
  verifyY,
}: {
  onPhaseChange: (p: "idle" | "govern" | "validate" | "verify" | "trusted") => void;
  travelMs: number;
  governY: number;
  validateY: number;
  verifyY: number;
}) {
  const [phase, setPhase] = useState<"idle" | "govern" | "validate" | "verify" | "trusted">("idle");
  const [showTrusted, setShowTrusted] = useState(false);

  useEffect(() => {
    const schedule = (ms: number, fn: () => void) => setTimeout(fn, ms);
    const t1 = schedule(80, () => { setPhase("govern"); onPhaseChange("govern"); });
    const t2 = schedule(480, () => { setPhase("validate"); onPhaseChange("validate"); });
    const t3 = schedule(880, () => { setPhase("verify"); onPhaseChange("verify"); });
    const t4 = schedule(1600, () => { setPhase("trusted"); onPhaseChange("trusted"); setShowTrusted(true); });
    const t5 = schedule(1900, () => setShowTrusted(false));
    const t6 = schedule(travelMs, () => { setPhase("idle"); onPhaseChange("idle"); });
    return () => { [t1, t2, t3, t4, t5, t6].forEach(clearTimeout); };
  }, [onPhaseChange, travelMs]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none flex items-center justify-center"
      style={{
        width: 48,
        height: 10,
        left: "0%",
        top: `${governY * 100}%`,
        transform: "translateY(-50%)",
        zIndex: 3,
        background: phase === "trusted" ? "linear-gradient(90deg, rgba(52,211,153,0.4), rgba(52,211,153,0.7))" : "linear-gradient(90deg, rgba(56,189,248,0.25), rgba(56,189,248,0.6))",
        boxShadow: phase === "trusted" ? "0 0 20px rgba(52,211,153,0.4)" : "0 0 18px rgba(56,189,248,0.4)",
      }}
      initial={{ left: "0%", top: `${governY * 100}%` }}
      animate={{
        left: ["0%", "33%", "66%", "100%", "120%"],
        top: [`${governY * 100}%`, `${governY * 100}%`, `${validateY * 100}%`, `${verifyY * 100}%`, `${verifyY * 100}%`],
        transition: { duration: travelMs / 1000, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] },
      }}
    >
      {phase === "govern" && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sky-300 text-[10px] font-bold">✓</motion.span>}
      {phase === "validate" && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sky-300 text-[9px]">◐</motion.span>}
      {phase === "verify" && <ShieldCheck className="h-3 w-3 text-sky-300" strokeWidth={2.5} />}
      {showTrusted && phase === "trusted" && <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-emerald-400 text-[9px] font-semibold">Trusted</motion.span>}
    </motion.div>
  );
}

function ReducedStack({
  onFocus,
  focused,
}: {
  onFocus: (id: string | null) => void;
  focused: string | null;
}) {
  return (
    <div className="flex w-full max-w-md flex-col gap-0 mx-auto">
      {LAYERS.map((layer) => {
        const Icon = layer.icon;
        const isFocused = focused === layer.id;
        return (
          <div
            key={layer.id}
            className="flex items-center gap-4 rounded-md border px-5 py-4 transition-colors"
            style={{
              minHeight: 76,
              background: "rgba(15,23,42,0.9)",
              borderColor: isFocused ? "rgba(56,189,248,0.4)" : "rgba(71,85,105,0.35)",
              marginBottom: -1,
            }}
            onMouseEnter={() => onFocus(layer.id)}
            onMouseLeave={() => onFocus(null)}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-700/50 text-slate-400">
              <Icon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-200">{layer.title}</h3>
              <p className="mt-0.5 text-xs text-slate-500 leading-snug">{layer.line}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
