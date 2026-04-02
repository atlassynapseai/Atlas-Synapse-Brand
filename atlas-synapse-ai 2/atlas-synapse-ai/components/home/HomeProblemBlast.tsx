"use client";

import { motion, useReducedMotion } from "@/lib/motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Gavel, TrendingDown, ShieldAlert, LockKeyhole } from "lucide-react";

/**
 * Consequence Map — CSS Grid + SVG (Option A)
 *
 * LAYOUT SPEC:
 * - Grid areas: "top" | "left" | "center" | "right" | "bottom"
 *   Layout:   .     top     .
 *             left  center  right
 *             .     bottom  .
 * - grid-template-columns: 1fr minmax(80px, auto) 1fr
 * - grid-template-rows: 1fr minmax(60px, auto) 1fr
 * - gap: clamp(24px, 4vw, 48px)
 *
 * CARD SIZING: max-w 360px, min-h 120px, same padding (p-4). Line-clamp 3 on body text.
 *
 * SVG: viewBox 0 0 100 100, preserveAspectRatio xMidYMid meet, absolute inset-0.
 * Center (50,50) = grid center. Spokes from (50,50) to (50,0), (100,50), (50,100), (0,50).
 *
 * BREAKPOINTS: Layout is fluid; container max-width 1200px, height clamp(520px, 62vh, 720px).
 * Section padding clamp(16px, 4vw, 32px). Tested at 390 / 768 / 1024 / 1280 / 1440.
 */

/** Consequence map data: top, right, bottom, left (grid areas) */
const SPOKES = [
  { id: "regulatory", label: "Regulatory", icon: Gavel, area: "top" as const,
    line: "Audit findings and enforcement when decisions aren't traceable.", badge: "Regulator inquiry",
    lineSecured: "Decisions traceable and audit-ready. Enforcement risk reduced.", badgeSecured: "Compliant" },
  { id: "financial", label: "Financial", icon: TrendingDown, area: "right" as const,
    line: "Remediation costs and lost revenue scale with unchecked AI.", badge: "Chargebacks ↑",
    lineSecured: "Controlled outputs and evidence reduce chargebacks and remediation.", badgeSecured: "Contained" },
  { id: "trust", label: "Trust", icon: ShieldAlert, area: "bottom" as const,
    line: "Public trust erodes when AI outputs are wrong or unverified.", badge: "Customer trust ↓",
    lineSecured: "Verified outputs and transparency protect customer trust.", badgeSecured: "Trust maintained" },
  { id: "breach", label: "Data", icon: LockKeyhole, area: "left" as const,
    line: "Sensitive data in prompts or outputs reaches the wrong systems.", badge: "PII exposure",
    lineSecured: "Data boundaries and access controls keep PII contained.", badgeSecured: "PII protected" },
];

/** SVG viewBox 0 0 100 100 so center = (50,50). Spoke end points. */
const SPOKE_ENDS: Record<string, { x2: number; y2: number }> = {
  top: { x2: 50, y2: 0 },
  right: { x2: 100, y2: 50 },
  bottom: { x2: 50, y2: 100 },
  left: { x2: 0, y2: 50 },
};

export default function HomeProblemBlast() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [gatesActive, setGatesActive] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);
  const reduced = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduced) return;
    intervalRef.current = setInterval(() => setPulsePhase((p) => p + 1), 5200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [reduced]);

  const threat = !gatesActive;

  return (
    <section
      id="problem"
      data-section="problem"
      className="relative overflow-hidden"
      style={{ paddingTop: "clamp(48px, 6vh, 90px)", paddingBottom: "clamp(48px, 6vh, 90px)", paddingLeft: "clamp(16px, 4vw, 32px)", paddingRight: "clamp(16px, 4vw, 32px)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-[0.4fr_1fr] gap-6 lg:gap-8 items-center">
          {/* Left: copy + toggle */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold tracking-tight text-slate-100"
              style={{ fontSize: "clamp(2rem, 4.5vw + 0.75rem, 3rem)" }}
            >
              When trust fails, damage compounds.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-4 text-slate-400 text-lg sm:text-xl"
            >
              Unchecked AI decisions don't fail once — they cascade.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8">
              <Link href="/risks" className="inline-flex items-center gap-2 text-lg font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors">
                Explore Risks <span aria-hidden>→</span>
              </Link>
            </motion.div>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className={`text-xs font-medium uppercase tracking-wider ${!gatesActive ? "text-rose-400/90" : "text-slate-500"}`}>No trust layer</span>
              <button
                type="button"
                role="switch"
                aria-checked={gatesActive}
                onClick={() => setGatesActive((g) => !g)}
                className={`relative w-11 h-6 rounded-full border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-atlas-primary ${gatesActive ? "border-emerald-500/50 bg-emerald-500/20" : "border-slate-500 bg-slate-800/60"}`}
              >
                <motion.div
                  className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${gatesActive ? "bg-emerald-400" : "bg-slate-400"}`}
                  animate={{ left: gatesActive ? "22px" : "4px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              </button>
              <span className={`text-xs font-medium uppercase tracking-wider ${gatesActive ? "text-emerald-400/90" : "text-slate-500"}`}>Atlas gates active</span>
            </div>
          </div>

          {/* Right: Consequence Map — CSS Grid + SVG */}
          <motion.div
            className="relative w-full mx-auto"
            style={{
              maxWidth: "min(100%, 1200px)",
              height: "clamp(520px, 62vh, 720px)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* SVG spokes behind grid — aligned to container; center (50,50) = grid center */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="spoke-threat" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(248,113,113,0.35)" />
                  <stop offset="100%" stopColor="rgba(248,113,113,0.7)" />
                </linearGradient>
                <linearGradient id="spoke-safe" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(52,211,153,0.25)" />
                  <stop offset="100%" stopColor="rgba(52,211,153,0.5)" />
                </linearGradient>
                <linearGradient id="spoke-dim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(248,113,113,0.08)" />
                  <stop offset="100%" stopColor="rgba(248,113,113,0.2)" />
                </linearGradient>
                <linearGradient id="spoke-safe-dim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(52,211,153,0.06)" />
                  <stop offset="100%" stopColor="rgba(52,211,153,0.15)" />
                </linearGradient>
              </defs>

              {/* Cross: 4 lines from center (50,50) to edges */}
              {SPOKES.map((s) => {
                const end = SPOKE_ENDS[s.area];
                const isDim = hovered !== null && hovered !== s.id;
                const stroke = gatesActive
                  ? (isDim ? "url(#spoke-safe-dim)" : "url(#spoke-safe)")
                  : (isDim ? "url(#spoke-dim)" : "url(#spoke-threat)");
                return (
                  <line
                    key={s.id}
                    x1={50}
                    y1={50}
                    x2={end.x2}
                    y2={end.y2}
                    stroke={stroke}
                    strokeWidth={gatesActive ? (isDim ? 0.8 : 1.2) : (isDim ? 1 : 1.5)}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* Propagation pulse — threat only; travels from hub along each spoke */}
              {!reduced && threat && (
                <PropagationPulse key={pulsePhase} />
              )}

              {/* Hub glow when gates active */}
              {gatesActive && (
                <motion.circle
                  cx={50}
                  cy={50}
                  r={8}
                  fill="none"
                  stroke="rgba(52,211,153,0.4)"
                  strokeWidth={1.5}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </svg>

            {/* Grid: single layout system — named areas, no absolute positioning for cards */}
            <div
              className="absolute inset-0 grid gap-[clamp(24px,4vw,48px)]"
              style={{
                gridTemplateColumns: "1fr minmax(80px, auto) 1fr",
                gridTemplateRows: "1fr minmax(60px, auto) 1fr",
                gridTemplateAreas: `
                  ".     top     ."
                  "left  center  right"
                  ".     bottom  ."
                `,
              }}
            >
              {/* Center hub — grid area "center" */}
              <div className="flex items-center justify-center min-w-0 min-h-0" style={{ gridArea: "center" }}>
                <motion.div
                  className="flex flex-col items-center justify-center rounded-lg border-2 px-3 py-2 bg-slate-900/95 text-center min-h-[56px] min-w-[72px]"
                  style={{
                    borderColor: gatesActive ? "rgba(52,211,153,0.6)" : "rgba(248,113,113,0.6)",
                    boxShadow: gatesActive ? "0 0 20px rgba(52,211,153,0.15)" : "0 0 20px rgba(248,113,113,0.15)",
                  }}
                  animate={
                    reduced ? {} : threat
                      ? { opacity: [0.9, 1, 0.9], scale: [1, 1.02, 1] }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 2, repeat: threat ? Infinity : 0, ease: "easeInOut" }}
                >
                  <span className={`block text-xs font-bold uppercase tracking-wider leading-tight truncate max-w-full ${gatesActive ? "text-emerald-300/95" : "text-rose-300/95"}`}>
                    {gatesActive ? "Safeguarded AI" : "Uncontrolled AI Decision"}
                  </span>
                  <span className={`block mt-0.5 text-[9px] leading-tight truncate max-w-full ${gatesActive ? "text-emerald-400/80" : "text-rose-400/70"}`}>
                    {gatesActive ? "Gates active. Risks contained." : "One decision. Many consequences."}
                  </span>
                </motion.div>
              </div>

              {/* Cards in grid areas — fixed sizing, icon in header */}
              {SPOKES.map((s) => {
                const Icon = s.icon;
                const isHovered = hovered === s.id;
                const safe = gatesActive;
                const lineText = safe ? s.lineSecured : s.line;
                const badgeText = safe ? s.badgeSecured : s.badge;
                return (
                  <motion.div
                    key={s.id}
                    className="flex flex-col rounded-xl border-2 p-4 bg-slate-900/95 shadow-lg cursor-default min-h-[120px] max-w-[360px] w-full justify-self-center self-center"
                    style={{
                      gridArea: s.area,
                      borderColor: safe ? "rgba(52,211,153,0.4)" : (isHovered ? "rgba(248,113,113,0.6)" : "rgba(248,113,113,0.35)"),
                      opacity: hovered !== null && !isHovered ? 0.7 : 1,
                    }}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`flex items-center justify-center w-8 h-8 shrink-0 rounded-md border ${safe ? "border-emerald-500/40 text-emerald-400/95" : "border-rose-500/40 text-rose-400/95"}`}>
                        <Icon className="w-4 h-4" strokeWidth={1.8} />
                      </span>
                      <span className={`text-xs font-bold uppercase tracking-wider ${safe ? "text-emerald-200/95" : "text-rose-200/95"}`}>
                        {s.label}
                      </span>
                    </div>
                    <p className={`text-xs text-slate-400 leading-snug line-clamp-3 flex-1 min-h-0`}>
                      {lineText}
                    </p>
                    <span className={`inline-block mt-2 w-fit px-2 py-0.5 rounded text-[10px] font-medium border shrink-0 ${safe ? "bg-emerald-950/50 text-emerald-300/90 border-emerald-500/40" : "bg-rose-950/60 text-rose-300/90 border-rose-500/30"}`}>
                      {badgeText}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Pulse lines from hub (50,50) to each spoke end — SVG only, no layout shift */
function PropagationPulse() {
  return (
    <>
      {SPOKES.map((s, i) => {
        const end = SPOKE_ENDS[s.area];
        return (
          <motion.line
            key={s.id}
            x1={50}
            y1={50}
            x2={50}
            y2={50}
            stroke="rgba(248,113,113,0.6)"
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ x2: 50, y2: 50 }}
            animate={{ x2: end.x2, y2: end.y2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          />
        );
      })}
    </>
  );
}
