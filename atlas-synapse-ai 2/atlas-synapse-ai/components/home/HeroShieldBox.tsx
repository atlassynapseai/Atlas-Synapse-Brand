"use client";

import { motion, useReducedMotion } from "@/lib/motion";

export default function HeroShieldBox() {
  const reduced = useReducedMotion();

  return (
    <div className="relative w-full max-w-[min(420px,92vw)] aspect-square flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-[30%] opacity-50"
        style={{
          background: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(168,85,247,0.22), transparent 60%)",
          filter: "blur(28px)",
        }}
      />

      {/* Transparent shield box — glass rectangle with rounded corners wrapping the core */}
      <motion.div
        className="relative w-[80%] h-[78%] rounded-3xl border-2 flex items-center justify-center"
        style={{
          borderColor: "rgba(168,85,247,0.45)",
          background: "linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,27,75,0.35) 100%)",
          boxShadow: "inset 0 0 60px rgba(168,85,247,0.06), 0 0 50px rgba(168,85,247,0.12)",
          backdropFilter: "blur(12px)",
        }}
        initial={reduced ? {} : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Scan line (screening at boundary) */}
        {!reduced && (
          <motion.div
            className="absolute left-2 right-2 h-px rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.55), transparent)",
              boxShadow: "0 0 14px rgba(168,85,247,0.4)",
            }}
            initial={{ top: "30%" }}
            animate={{ top: ["30%", "70%", "30%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Agent Core — glowing center */}
        <motion.div
          className="relative w-[36%] aspect-square rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(168,85,247,0.85), rgba(88,28,135,0.6))",
            boxShadow: "0 0 45px rgba(168,85,247,0.45), inset 0 0 22px rgba(168,85,247,0.25)",
          }}
          animate={reduced ? {} : { opacity: [0.92, 1, 0.92], scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/95">Core</span>
        </motion.div>

        {/* Input Gate — top */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[-10%] flex flex-col items-center">
          <div
            className="w-11 h-11 rounded-full border-2 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest"
            style={{
              borderColor: "rgba(168,85,247,0.7)",
              background: "rgba(5,8,22,0.9)",
              color: "rgba(168,85,247,0.95)",
              boxShadow: "0 0 20px rgba(168,85,247,0.4)",
            }}
          >
            In
          </div>
          <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-atlas-primary/90">Input Gate</span>
        </div>

        {/* Output Gate — bottom */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-10%] flex flex-col items-center">
          <div
            className="w-11 h-11 rounded-full border-2 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest"
            style={{
              borderColor: "rgba(56,189,248,0.7)",
              background: "rgba(5,8,22,0.9)",
              color: "rgba(56,189,248,0.95)",
              boxShadow: "0 0 20px rgba(56,189,248,0.4)",
            }}
          >
            Out
          </div>
          <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-atlas-secondary/90">Output Gate</span>
        </div>

        {/* Packet entering (screened) */}
        {!reduced && (
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full left-[12%] top-1/2 -translate-y-1/2"
            style={{ background: "rgba(168,85,247,0.9)", boxShadow: "0 0 10px rgba(168,85,247,0.7)" }}
            animate={{ left: ["12%", "38%"], opacity: [0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
          />
        )}
        {/* Packet corrected (stable) */}
        {!reduced && (
          <motion.div
            className="absolute w-3 h-3 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: "rgba(52,211,153,0.85)", boxShadow: "0 0 12px rgba(52,211,153,0.5)" }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {/* Packet blocked (dissolving) */}
        {!reduced && (
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full right-[14%] top-1/2 -translate-y-1/2"
            style={{ background: "rgba(248,113,113,0.9)", boxShadow: "0 0 10px rgba(248,113,113,0.6)" }}
            animate={{ opacity: [1, 0.15], scale: [1, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </div>
  );
}
