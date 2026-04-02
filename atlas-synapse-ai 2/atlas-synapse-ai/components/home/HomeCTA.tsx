"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";

export default function HomeCTA() {
  return (
    <section id="contact" data-section="cta" className="relative px-4 sm:px-6 lg:px-8" style={{ paddingTop: "clamp(56px, 7vh, 100px)", paddingBottom: "clamp(56px, 7vh, 100px)" }}>
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold tracking-tight text-slate-100"
          style={{ fontSize: "clamp(2.25rem, 5vw + 0.5rem, 3.25rem)" }}
        >
          Bring audit-grade trust to your AI stack.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="mt-5 text-slate-400 text-lg sm:text-xl"
        >
          Request a demo. See the gates in action.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="sheen-button inline-flex items-center justify-center rounded-full bg-gradient-to-r from-atlas-primary to-atlas-secondary px-12 py-4 text-lg font-semibold tracking-wide text-slate-950 shadow-atlas-soft"
          >
            Request Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
