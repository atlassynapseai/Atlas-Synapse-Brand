"use client";

import { motion, useReducedMotion } from "@/lib/motion";

export default function HomeMissionVision() {
  const reduced = useReducedMotion();

  return (
    <section data-section="mission" className="relative px-4 sm:px-6 lg:px-8" style={{ paddingTop: "clamp(48px, 6vh, 90px)", paddingBottom: "clamp(48px, 6vh, 90px)" }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Mission — Atlas motif: celestial arc / navigation (compass/astrolabe) */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
                Mission
              </h2>
              <p className="mt-4 text-slate-200 font-medium leading-relaxed text-lg sm:text-xl">
                Hold integrity at scale—sovereign, deterministic, and auditable AI infrastructure for regulated industries.
              </p>
              <p className="mt-2 text-slate-400 text-base sm:text-lg leading-relaxed">
                Where compliance isn't optional, we make it provable.
              </p>
            </div>
            {/* Atlas motif: compass/astrolabe arcs — larger */}
            <div className="absolute right-4 bottom-4 w-36 h-36 opacity-40 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="arc-grad-m" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(168,85,247,0.5)" />
                    <stop offset="100%" stopColor="rgba(56,189,248,0.3)" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#arc-grad-m)"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                  initial={reduced ? {} : { rotate: 0 }}
                  animate={reduced ? {} : { rotate: 360 }}
                  transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "50px 50px" }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="32"
                  fill="none"
                  stroke="rgba(168,85,247,0.25)"
                  strokeWidth="0.8"
                  initial={reduced ? {} : { rotate: 0 }}
                  animate={reduced ? {} : { rotate: -360 }}
                  transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "50px 50px" }}
                />
                <path
                  d="M 50 8 L 50 50 L 92 50"
                  fill="none"
                  stroke="rgba(168,85,247,0.4)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="50" r="4" fill="rgba(168,85,247,0.5)" />
              </svg>
            </div>
          </motion.article>

          {/* Vision — Synapse motif: signal jumping gap (two nodes + pulse) */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
                Vision
              </h2>
              <p className="mt-4 text-slate-200 font-medium leading-relaxed text-lg sm:text-xl">
                Precision inspection at every boundary—signal-level scrutiny so every decision is traceable.
              </p>
              <p className="mt-2 text-slate-400 text-base sm:text-lg leading-relaxed">
                Cyber auditability and executive trust, built in.
              </p>
            </div>
            {/* Synapse motif — larger */}
            <div className="absolute right-4 bottom-4 w-36 h-36 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                <circle cx="28" cy="50" r="10" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
                <circle cx="72" cy="50" r="10" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
                <line x1="38" y1="50" x2="62" y2="50" stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
              </svg>
              {!reduced && (
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-atlas-secondary"
                  style={{ left: "50%", top: "50%", marginLeft: "-22px", marginTop: "-4px", boxShadow: "0 0 12px rgba(56,189,248,0.8)" }}
                  animate={{ x: [0, 44, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
