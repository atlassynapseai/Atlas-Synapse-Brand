"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section id="hero" data-section="hero" className="relative flex min-h-[80vh] items-center px-4 pt-16 pb-16 sm:px-6 lg:px-8" style={{ paddingTop: "clamp(64px, 10vh, 140px)", paddingBottom: "clamp(64px, 8vh, 120px)" }}>
      <div className="mx-auto w-full max-w-[1400px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="font-display text-lg sm:text-xl lg:text-2xl font-semibold uppercase tracking-[0.2em] text-atlas-secondary"
        >
          Trust Engine for AI Systems
        </motion.p>

        <h1 className="mt-4 font-display font-bold leading-[1.05] tracking-tight text-slate-100" style={{ fontSize: "clamp(3.5rem, 10vw + 2rem, 6.5rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="block bg-gradient-to-r from-slate-100 via-atlas-primary to-atlas-secondary bg-clip-text text-transparent"
          >
            Atlas Synapse
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-6 max-w-2xl mx-auto text-slate-300 text-xl sm:text-2xl lg:text-[1.5rem] leading-relaxed"
        >
          We guard the boundaries of agentic AI—validating inputs and verifying outputs before they become impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href="/contact"
            className="sheen-button inline-flex items-center justify-center rounded-full bg-gradient-to-r from-atlas-primary to-atlas-secondary px-10 py-4 text-lg font-semibold tracking-wide text-slate-950 shadow-atlas-soft"
          >
            Request Demo
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-4 text-lg font-semibold text-slate-100 hover:border-atlas-primary/50 hover:bg-white/10 transition-colors"
          >
            See how it works
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
