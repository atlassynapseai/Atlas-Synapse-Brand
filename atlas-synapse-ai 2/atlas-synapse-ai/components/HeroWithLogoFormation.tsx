"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "@/lib/motion";
import Image from "next/image";
import { useRef } from "react";
import { ShieldCheck, Workflow, Database, Bot } from "lucide-react";

const HeroWithLogoFormation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0.4, 1], [0.2, 1]);

  return (
    <section
      id="product"
      ref={containerRef}
      className="relative flex min-h-[92vh] items-center justify-center px-4 pt-32 pb-20 sm:px-6 lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-9">
          <div className="inline-flex items-center gap-2 rounded-full bg-atlas-soft/80 px-4 py-1.5 text-[11px] sm:text-xs text-slate-300 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-atlas-secondary shadow-atlas-glow" />
            Agentic AI • Governance • Auditability
          </div>

          <div>
            <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block text-slate-200">
                Atlas Synapse AI is
              </span>
              <span className="mt-2 inline-block bg-gradient-to-r from-atlas-primary via-atlas-secondary to-slate-100 bg-clip-text text-transparent">
                The Trust Layer for AI systems
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              We insert a verifiable control layer around your agentic AI stack —
              continuously checking inputs and outputs for policy alignment,
              privacy, and reliability before they ever touch production.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="sheen-button inline-flex items-center justify-center rounded-full bg-gradient-to-r from-atlas-primary to-atlas-secondary px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-slate-950 shadow-atlas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-secondary">
              Request Demo
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("fit");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-atlas-soft/80 px-5 py-2.5 text-xs font-semibold tracking-[0.16em] text-slate-100 hover:border-atlas-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-primary"
            >
              See How It Fits
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Policy enforcement
            </span>
            <span>• Audit trails</span>
            <span>• Output verification</span>
            <span>• Privacy guardrails</span>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="glass-panel relative h-[22rem] w-full overflow-hidden rounded-3xl shadow-atlas-soft">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-atlas-primary/25 via-transparent to-atlas-secondary/20" />
            <div className="absolute inset-4 rounded-2xl border border-white/8" />

            {/* Center logo + scroll-driven ring */}
            <div className="relative flex h-full flex-col justify-between px-6 py-5">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    style={{ opacity: prefersReducedMotion ? 1 : logoOpacity }}
                    className="relative h-16 w-16 rounded-2xl bg-black/60 ring-1 ring-atlas-primary/60 shadow-atlas-glow"
                  >
                    <Image
                      src="/logo.png"
                      alt="Atlas Synapse AI logo"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </motion.div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p className="font-display text-slate-100">
                      Atlas Synapse AI
                    </p>
                    <p className="text-slate-300">
                      Trust control plane around your AI systems.
                    </p>
                  </div>
                </div>
                {!prefersReducedMotion && (
                  <svg
                    className="hidden h-20 w-40 text-atlas-secondary sm:block"
                    viewBox="0 0 200 80"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M10 40 H70 Q100 10 130 40 T190 40"
                      fill="none"
                      stroke="url(#heroStroke)"
                      strokeWidth="2"
                      style={{ pathLength }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="heroStroke"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                        <stop
                          offset="50%"
                          stopColor="#a855f7"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor="#e5e7eb"
                          stopOpacity={0.5}
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>

              {/* Simple pipeline: Inputs → Atlas → AI systems */}
              <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] sm:text-xs text-slate-200">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-2 py-1 ring-1 ring-white/10">
                    <Database className="h-3.5 w-3.5 text-atlas-secondary" />
                    <span>Inputs</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    <li>• Prompts & tickets</li>
                    <li>• Logs & events</li>
                    <li>• Docs & knowledge</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-atlas-primary/20 px-2 py-1 ring-1 ring-atlas-primary/50">
                    <ShieldCheck className="h-3.5 w-3.5 text-atlas-primary" />
                    <span>Atlas Trust Layer</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-100">
                    <li>• Validate & enforce policy</li>
                    <li>• Detect & mask sensitive data</li>
                    <li>• Score & verify outputs</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-2 py-1 ring-1 ring-white/10">
                    <Bot className="h-3.5 w-3.5 text-atlas-secondary" />
                    <span>AI systems</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    <li>• Agents & copilots</li>
                    <li>• Internal tools</li>
                    <li>• Customer‑facing apps</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[10px] text-slate-300 sm:text-[11px]">
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/70 px-3 py-2 ring-1 ring-white/10">
                  <Workflow className="h-4 w-4 text-atlas-secondary" />
                  <span>Drop‑in layer around existing stack.</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/70 px-3 py-2 ring-1 ring-white/10">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Every risky input/output checked before use.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-atlas-bg" />
    </section>
  );
};

export default HeroWithLogoFormation;

