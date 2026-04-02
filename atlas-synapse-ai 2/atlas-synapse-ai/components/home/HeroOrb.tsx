"use client";

import { motion, useReducedMotion } from "@/lib/motion";

export default function HeroOrb() {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center w-full max-w-xl aspect-square">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-atlas-primary/30 to-atlas-secondary/20 blur-3xl"
        animate={reduced ? {} : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Sphere shell */}
      <motion.div
        className="relative w-[min(280px,75vw)] h-[min(280px,75vw)] rounded-full border border-atlas-primary/40 bg-atlas-bg/60"
        style={{ boxShadow: "inset 0 0 60px rgba(168,85,247,0.15), 0 0 60px rgba(168,85,247,0.2)" }}
        initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Orbiting ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-atlas-secondary/25"
          style={{ borderStyle: "dashed" }}
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        {/* Second ring - visual only */}
        <div className="absolute inset-[12%] rounded-full border border-atlas-primary/20 border-dashed" />
        {/* Center core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-atlas-primary to-atlas-secondary opacity-90 shadow-atlas-glow" />
        {/* Gate 1: Input (top) */}
        <motion.div
          className="absolute left-1/2 top-[10%] -translate-x-1/2 flex flex-col items-center"
          animate={reduced ? {} : { y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-9 h-9 rounded-full border-2 border-atlas-primary bg-atlas-bg/90 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.5)]">
            <span className="text-[9px] font-bold text-atlas-primary">IN</span>
          </div>
          <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-widest text-atlas-primary/90">Validated</span>
        </motion.div>
        {/* Gate 2: Output (bottom) */}
        <motion.div
          className="absolute left-1/2 bottom-[10%] -translate-x-1/2 flex flex-col items-center"
          animate={reduced ? {} : { y: [0, 3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="w-9 h-9 rounded-full border-2 border-atlas-secondary bg-atlas-bg/90 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.5)]">
            <span className="text-[9px] font-bold text-atlas-secondary">OUT</span>
          </div>
          <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-widest text-atlas-secondary/90">Verified</span>
        </motion.div>
        {/* Orbiting particles */}
        {!reduced && (
          <>
            <motion.div
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-2 h-2 rounded-full bg-atlas-secondary shadow-[0_0_8px_rgba(56,189,248,0.9)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ marginLeft: "70px" }} />
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-atlas-primary shadow-[0_0_6px_rgba(168,85,247,0.8)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ marginLeft: "55px" }} />
            </motion.div>
          </>
        )}
        {/* Pulse rings on gates */}
        <motion.div
          className="absolute left-1/2 top-[10%] -translate-x-1/2 w-12 h-12 rounded-full border-2 border-atlas-primary/40 pointer-events-none"
          animate={reduced ? {} : { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-12 h-12 rounded-full border-2 border-atlas-secondary/40 pointer-events-none"
          animate={reduced ? {} : { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
        />
      </motion.div>
    </div>
  );
}
