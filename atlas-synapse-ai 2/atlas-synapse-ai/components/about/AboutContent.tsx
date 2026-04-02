"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import { Building2, HeartPulse, BarChart3, Scale, ArrowRight, CheckCircle2, Shield, Gauge, Lock, FileCheck } from "lucide-react";
import { useState, useRef, useCallback } from "react";

const pillars = [
  { title: "Govern", subtitle: "Policy at the boundary", desc: "Guardrails that stay in sync with your models and data." },
  { title: "Validate", subtitle: "Inputs before they run", desc: "PII masking, policy checks, injection detection at the gate." },
  { title: "Verify", subtitle: "Outputs before they ship", desc: "Confidence scoring, redaction, and evidence for every response." },
  { title: "Audit", subtitle: "Every decision traced", desc: "Full audit trail and exportable evidence for regulators." }
];

const industries = [
  { icon: Building2, name: "FinTech", line: "Fair Lending, NYDFS, audit trails", color: "#eab308", colorHover: "#facc15" },
  { icon: HeartPulse, name: "Healthcare", line: "HIPAA, PHI, access control", color: "#10b981", colorHover: "#34d399" },
  { icon: BarChart3, name: "Insurance", line: "Fair Practice, actuarial validation", color: "#0ea5e9", colorHover: "#38bdf8" },
  { icon: Scale, name: "Legal", line: "Privilege, version control, consistency", color: "#8b5cf6", colorHover: "#a78bfa" }
];

const offerBullets = [
  "Aegis Prime Auditor — multi-engine security scanning and compliance for $0",
  "Atlas Shield (Q2 2026) — real-time model monitoring and explainability",
  "Input and output gates that validate and verify every request and response",
  "Evidence-grade logs and exportable audit packages for regulators"
];

const offerItems = [
  {
    title: "Aegis Prime",
    tagline: "Security & compliance at $0",
    desc: "Multi-engine scanning, SBOM, 6 frameworks.",
    Icon: Shield,
  },
  {
    title: "Atlas Shield",
    tagline: "Q2 2026",
    desc: "Real-time monitoring and explainability.",
    Icon: Gauge,
  },
  {
    title: "Gates",
    tagline: "Validate & verify",
    desc: "Every input and output at the boundary.",
    Icon: Lock,
  },
  {
    title: "Evidence",
    tagline: "Audit-ready",
    desc: "Logs and exportable packages for regulators.",
    Icon: FileCheck,
  },
];

function HoverGlowCard({
  children,
  glowColor = "rgba(168, 85, 247, 0.4)",
  className = "",
}: {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    },
    []
  );

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Background circles — softer glow on hover */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-48 h-48 rounded-full transition-all duration-500 ease-out"
          style={{
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: hovered ? 0.28 : 0.08,
            boxShadow: hovered ? `0 0 40px 8px ${glowColor}` : "none",
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full transition-all duration-500 ease-out"
          style={{
            left: `${pos.x * 100}%`,
            top: `${pos.y * 100}%`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: hovered ? 0.2 : 0,
            boxShadow: hovered ? `0 0 28px 6px ${glowColor}` : "none",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full transition-all duration-500 ease-out"
          style={{
            left: "20%",
            top: "60%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: hovered ? 0.12 : 0.03,
            boxShadow: hovered ? `0 0 50px 10px ${glowColor}` : "none",
          }}
        />
        <div
          className="absolute w-40 h-40 rounded-full transition-all duration-500 ease-out"
          style={{
            left: "80%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: hovered ? 0.15 : 0.04,
            boxShadow: hovered ? `0 0 35px 8px ${glowColor}` : "none",
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col h-full min-h-0">{children}</div>
    </div>
  );
}

function IndustryCard({ industry: ind, index }: { industry: typeof industries[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const color = ind.color;
  const colorHover = ind.colorHover;
  const colorRgb = hexToRgb(color);
  const displayColor = hovered ? colorHover : color;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
            className="group relative rounded-2xl border-2 backdrop-blur-sm p-10 sm:p-12 text-center glass-panel transition-all duration-300"
      style={{
        borderColor: `${displayColor}40`,
        backgroundColor: `rgba(${colorRgb}, 0.06)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex h-24 w-24 mx-auto items-center justify-center rounded-2xl transition-all duration-300"
        style={{
          backgroundColor: `rgba(${colorRgb}, 0.18)`,
          boxShadow: hovered ? `0 0 24px ${displayColor}35` : "none",
          border: `2px solid ${displayColor}50`,
        }}
      >
        <ind.icon className="h-12 w-12 transition-colors duration-300" style={{ color: displayColor }} />
      </div>
      <h3
        className="mt-8 font-display text-2xl sm:text-3xl font-bold transition-colors duration-300"
        style={{ color: hovered ? displayColor : "rgb(248, 250, 252)" }}
      >
        {ind.name}
      </h3>
      <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
        {ind.line}
      </p>
    </motion.article>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "168, 85, 247";
}

function AtlasVisual() {
  return (
    <div className="relative w-full aspect-[0.85/1] max-w-[240px] mx-auto flex items-center justify-center">
      <motion.svg
        viewBox="0 0 180 220"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          <filter id="neon-atlas" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="shield-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <motion.g
          fill="none"
          stroke="#a855f7"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neon-atlas)"
          animate={{ opacity: [0.92, 1, 0.92] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Heraldic shield above head — curved top, pointed bottom */}
          <motion.path
            d="M 90 4 Q 130 4 135 28 L 135 62 Q 90 92 45 62 L 45 28 Q 50 4 90 4 Z"
            fill="url(#shield-fill)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />
          {/* Head — elongated horizontal oval (per sketch) */}
          <motion.ellipse
            cx="90"
            cy="82"
            rx="18"
            ry="12"
            strokeWidth="2.6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.12 }}
          />
          {/* Arms — curved lines from torso up to shield */}
          <motion.path
            d="M 45 66 Q 28 44 38 28 M 135 66 Q 152 44 142 28"
            strokeWidth="2.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          {/* Torso — trapezoidal, wider at top */}
          <motion.path
            d="M 58 96 L 122 96 L 114 162 L 66 162 Z"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.28 }}
          />
          {/* Legs — two vertical lines */}
          <motion.path
            d="M 72 162 L 72 210 M 108 162 L 108 210"
            strokeWidth="2.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          />
          <motion.path
            d="M 66 210 L 114 210"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: 0.65 }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}

function SynapseVisual() {
  return (
    <div className="relative w-full aspect-[1.5/1] max-w-[280px] mx-auto flex items-center justify-center">
      <motion.svg
        viewBox="0 0 240 120"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <defs>
          <filter id="neon-synapse" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nerve-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.g
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neon-synapse)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left neuron body (cell body) */}
          <motion.ellipse
            cx="42"
            cy="60"
            rx="18"
            ry="22"
            strokeWidth="2.2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          />
          {/* Dendrites — branching nerve endings left side */}
          <motion.path
            d="M 24 52 Q 8 48 6 36 Q 4 22 14 14 M 24 56 L 4 58 M 28 68 Q 10 78 8 92 M 32 62 L 18 80"
            strokeWidth="1.4"
            opacity="0.9"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          />
          {/* Axon from left cell to synapse */}
          <motion.path
            d="M 60 60 L 100 60"
            strokeWidth="2"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
          />
          {/* Synaptic cleft — gap */}
          <motion.line
            x1="100"
            y1="60"
            x2="140"
            y2="60"
            strokeWidth="1.5"
            opacity="0.7"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
          />
          {/* Right neuron body */}
          <motion.ellipse
            cx="198"
            cy="60"
            rx="18"
            ry="22"
            strokeWidth="2.2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          {/* Dendrites — nerve endings right side */}
          <motion.path
            d="M 216 52 Q 232 48 234 36 Q 236 22 226 14 M 216 56 L 236 58 M 212 68 Q 230 78 232 92 M 208 62 L 222 80"
            strokeWidth="1.4"
            opacity="0.9"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          />
          {/* Axon from right cell toward center */}
          <motion.path
            d="M 180 60 L 140 60"
            strokeWidth="2"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
          {/* Terminal bulbs (nerve endings at synapse) */}
          <motion.circle cx="100" cy="60" r="4" fill="#38bdf8" opacity="0.9" filter="url(#nerve-glow)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.45 }} />
          <motion.circle cx="140" cy="60" r="4" fill="#38bdf8" opacity="0.9" filter="url(#nerve-glow)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} />
        </motion.g>
        {/* Signal pulse through synapse */}
        <motion.circle
          cx="100"
          cy="60"
          r="3"
          fill="#7dd3fc"
          filter="url(#nerve-glow)"
          animate={{ cx: [100, 140], opacity: [0.9, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}

export default function AboutContent() {
  return (
    <div data-section="about" className="min-h-screen pt-24 pb-24">
      {/* Hero — no full-bleed pane; let background web show through */}
      <section className="relative px-4 pt-10 pb-16 sm:px-6 lg:px-8 overflow-hidden" style={{ paddingTop: "clamp(48px, 6vh, 80px)", paddingBottom: "clamp(48px, 6vh, 80px)" }}>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base font-semibold uppercase tracking-[0.2em] text-atlas-secondary"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="section-title mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100"
          >
            The infrastructure that holds
            <br />
            <span className="bg-gradient-to-r from-atlas-primary to-atlas-secondary bg-clip-text text-transparent">
              AI integrity at scale
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 max-w-2xl mx-auto text-slate-400 text-base sm:text-lg lg:text-xl leading-relaxed"
          >
            We build the trust layer for agentic AI in regulated industries—so you can validate every input, verify every output, and prove every decision.
          </motion.p>
        </div>
      </section>

      {/* Atlas + Synapse — aligned on same level */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-16 md:grid-cols-2 md:gap-12 items-stretch">
            {/* Atlas */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              className="flex flex-col min-h-0"
            >
              <HoverGlowCard glowColor="rgba(168, 85, 247, 0.35)" className="w-full h-full min-h-[380px] sm:min-h-[420px] p-8 sm:p-10 flex flex-col items-center text-center">
                <div className="w-full flex justify-center mb-6 flex-shrink-0">
                  <AtlasVisual />
                </div>
                <div className="flex flex-wrap items-baseline justify-center gap-2 sm:gap-3">
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 tracking-tight">
                    Atlas
                  </h2>
                  <span className="text-slate-500 font-medium hidden sm:inline">·</span>
                  <p className="text-lg sm:text-xl font-medium text-atlas-primary/90">
                    We hold the layer.
                  </p>
                </div>
                <p className="mt-5 text-slate-400 text-base sm:text-lg max-w-md mx-auto text-left sm:text-center flex-1 leading-relaxed">
                  We chose the name after the Titan who held the sky—so your organization doesn’t have to. We’re the infrastructure that carries the integrity layer for your AI at the boundary, not buried in code.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-semibold uppercase tracking-wider text-slate-500 flex-shrink-0">
                  <span>Governance</span>
                  <span className="text-slate-600">·</span>
                  <span>Guardrails</span>
                  <span className="text-slate-600">·</span>
                  <span>Evidence</span>
                </div>
              </HoverGlowCard>
            </motion.article>

            {/* Synapse */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 }}
              className="flex flex-col min-h-0"
            >
              <HoverGlowCard glowColor="rgba(56, 189, 248, 0.35)" className="w-full h-full min-h-[380px] sm:min-h-[420px] p-8 sm:p-10 flex flex-col items-center text-center">
                <div className="w-full flex justify-center mb-6 flex-shrink-0">
                  <SynapseVisual />
                </div>
                <div className="flex flex-wrap items-baseline justify-center gap-2 sm:gap-3">
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 tracking-tight">
                    Synapse
                  </h2>
                  <span className="text-slate-500 font-medium hidden sm:inline">·</span>
                  <p className="text-lg sm:text-xl font-medium text-atlas-secondary/90">
                    We inspect the signal.
                  </p>
                </div>
                <p className="mt-5 text-slate-400 text-base sm:text-lg max-w-md mx-auto text-left sm:text-center flex-1 leading-relaxed">
                  We chose the name after the nerve junction where signals are checked before they pass. We’re that checkpoint for your AI: inputs validated, outputs verified, every step traced.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-semibold uppercase tracking-wider text-slate-500 flex-shrink-0">
                  <span>Validate</span>
                  <span className="text-slate-600">·</span>
                  <span>Verify</span>
                  <span className="text-slate-600">·</span>
                  <span>Trace</span>
                </div>
              </HoverGlowCard>
            </motion.article>
          </div>
        </div>
      </section>

      {/* What we offer — visual flow, larger and readable */}
      <section className="mt-20 sm:mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-slate-100 text-center mb-5"
          >
            What we offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-slate-400 text-base sm:text-lg mb-14 max-w-2xl mx-auto"
          >
            Our name isn’t metaphor—it’s how we show up in your stack.
          </motion.p>
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-atlas-primary/40 to-transparent hidden lg:block -translate-y-1/2" style={{ top: "calc(50% + 36px)" }} />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {offerItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="rounded-2xl border border-white/10 bg-atlas-soft/50 hover:bg-atlas-soft/70 hover:border-atlas-primary/25 p-8 sm:p-10 transition-all duration-300 w-full flex flex-col items-center glass-panel group">
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-xl bg-atlas-primary/15 ring-1 ring-atlas-primary/30 text-atlas-primary group-hover:ring-atlas-primary/50 transition-all">
                      <item.Icon className="h-9 w-9 sm:h-10 sm:w-10" />
                    </div>
                    <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-semibold uppercase tracking-wider text-atlas-primary/90">
                      {item.tagline}
                    </p>
                    <p className="mt-4 text-slate-400 text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {i < offerItems.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 w-6 justify-center z-10 -translate-y-1/2" style={{ top: "calc(50% + 36px)" }}>
                      <ArrowRight className="h-5 w-5 text-atlas-primary/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Four pillars — actual pillars + smooth orange rope */}
      <section className="mt-20 sm:mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-slate-100 text-center mb-4"
          >
            Four pillars. One trust layer.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-slate-400 text-base sm:text-lg mb-16"
          >
            How we deliver governance, validation, verification, and auditability.
          </motion.p>
          <div className="relative">
            {/* Connecting rope between pillars — slow, smooth, orange */}
            <svg
              className="absolute left-0 right-0 w-full h-8 pointer-events-none hidden lg:block"
              style={{ top: "84px" }}
              viewBox="0 0 400 32"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="pillar-rope-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ea580c" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 45 16 Q 100 8 150 16 Q 200 24 250 16 Q 300 8 355 16"
                fill="none"
                stroke="url(#pillar-rope-gradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex flex-col items-center"
              >
                <HoverGlowCard
                  glowColor="rgba(168, 85, 247, 0.4)"
                  className="w-full flex flex-col items-center pt-6 pb-6 px-4"
                >
                  <div className="relative w-full max-w-[100px] mx-auto flex justify-center" style={{ height: "200px" }}>
                  <svg
                    viewBox="0 0 80 200"
                    className="w-full h-full text-atlas-primary"
                    preserveAspectRatio="xMidYMax meet"
                  >
                    <defs>
                      <linearGradient id={`pillar-fill-${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.35" />
                      </linearGradient>
                      <filter id={`pillar-glow-${i}`}>
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Base — draws up first */}
                    <motion.rect
                      x="20"
                      y="168"
                      width="40"
                      height="28"
                      rx="2"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2"
                      filter={`url(#pillar-glow-${i})`}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.12 }}
                      style={{ transformOrigin: "40px 196px" }}
                    />
                    {/* Shaft — draws up from base */}
                    <motion.rect
                      x="26"
                      y="28"
                      width="28"
                      height="140"
                      fill={`url(#pillar-fill-${i})`}
                      stroke="#a855f7"
                      strokeWidth="2"
                      filter={`url(#pillar-glow-${i})`}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.12 + 0.15, ease: "easeOut" }}
                      style={{ transformOrigin: "40px 168px" }}
                    />
                    {/* Capital — draws down last */}
                    <motion.rect
                      x="18"
                      y="4"
                      width="44"
                      height="26"
                      rx="2"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2"
                      filter={`url(#pillar-glow-${i})`}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.12 + 0.55 }}
                      style={{ transformOrigin: "40px 4px" }}
                    />
                  </svg>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.65 }}
                  className="mt-5 text-center"
                >
                  <p className="font-display text-xl font-bold text-atlas-primary">{p.title}</p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-slate-400">{p.subtitle}</p>
                  <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed max-w-[180px] mx-auto">{p.desc}</p>
                </motion.div>
                </HoverGlowCard>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Built for regulated industries — big statement */}
      <section className="mt-20 sm:mt-24 relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-atlas-primary/5 via-transparent to-atlas-secondary/5 py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ paddingTop: "clamp(64px, 8vh, 120px)", paddingBottom: "clamp(64px, 8vh, 120px)" }}>
        <div className="mx-auto max-w-[1200px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-base font-semibold uppercase tracking-[0.25em] text-atlas-primary mb-6"
          >
            Where compliance isn’t optional
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-100 text-center mb-6 leading-[1.1]"
          >
            Built for regulated industries
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-20"
          >
            Fiduciary-grade infrastructure for sectors where security is non-negotiable.
          </motion.p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <IndustryCard key={ind.name} industry={ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise value + CTAs */}
      <section className="mt-20 sm:mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-atlas-primary/20 bg-gradient-to-br from-atlas-primary/5 to-atlas-secondary/5 p-10 sm:p-12 text-center glass-panel"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-100">
              Enterprise value
            </h2>
            <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed">
              We help businesses navigate governance, regulation, auditability, and reliability risks across their AI systems. Where competitors offer developer tools, we deliver fiduciary-grade systems that turn AI compliance into a competitive advantage.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-atlas-primary to-atlas-secondary px-8 py-4 text-base font-semibold text-slate-950 shadow-atlas-soft hover:opacity-95 transition-opacity"
              >
                See how it works
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-atlas-soft/80 px-8 py-4 text-base font-semibold text-slate-100 hover:border-atlas-primary/40 transition-colors"
              >
                Get in touch
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
