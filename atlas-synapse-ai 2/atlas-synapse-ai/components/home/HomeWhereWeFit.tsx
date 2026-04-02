"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const DURATION = 5;
const PACKET_COUNT = 3;

const segmentDetails: Record<string, string> = {
  Inputs: "User prompts, context, and data enter here. Our Input Gate validates before anything reaches your models.",
  "Input Gate": "Validated — PII masked, policy checked, injection patterns blocked.",
  "Agentic AI": "Your models and agents run on clean, approved input only.",
  "Output Gate": "Verified — confidence scored, sensitive content redacted, full trace logged.",
  Outputs: "Only safe, verified responses reach your users or downstream systems."
};

export default function HomeWhereWeFit() {
  return (
    <section className="relative px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 text-center mb-2">
          We fit at the gates
        </h2>
        <p className="text-center text-slate-400 text-base mb-14">
          After inputs. Before outputs. Nothing reaches your agents or your users without a check. Details below.
        </p>

        <div className="glass-panel relative overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="absolute inset-0 bg-gradient-to-r from-atlas-primary/5 via-transparent to-atlas-secondary/5" />

          <div className="relative flex flex-wrap items-stretch justify-center gap-4 sm:gap-2 sm:flex-nowrap sm:justify-between">
            <SegmentWithDetail label="Inputs" detail={segmentDetails["Inputs"]} />
            <GateWithStamp label="Input Gate" stamp="Validated" stampOffset={0.12} />
            <SegmentWithDetail label="Agentic AI" detail={segmentDetails["Agentic AI"]} />
            <GateWithStamp label="Output Gate" stamp="Verified" stampOffset={0.62} />
            <SegmentWithDetail label="Outputs" detail={segmentDetails["Outputs"]} />
          </div>

          <div className="absolute inset-0 flex items-center pointer-events-none px-8 sm:px-10">
            <div className="w-full h-0.5 bg-slate-700/80 rounded-full" />
            {Array.from({ length: PACKET_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-[8%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-300 border border-white/30 shadow-[0_0_10px_rgba(148,163,184,0.6)]"
                animate={{ left: ["8%", "92%"] }}
                transition={{
                  repeat: Infinity,
                  duration: DURATION,
                  delay: i * (DURATION / PACKET_COUNT),
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm text-slate-400">
          <p><span className="font-semibold text-slate-300">Input Gate:</span> {segmentDetails["Input Gate"]}</p>
          <p><span className="font-semibold text-slate-300">Output Gate:</span> {segmentDetails["Output Gate"]}</p>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors"
          >
            Visualize the Trust Layer
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SegmentWithDetail({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex-1 min-w-[120px] flex flex-col items-center justify-center min-h-[100px] rounded-xl bg-slate-900/60 ring-1 ring-white/10 mx-0.5 py-4 px-3 z-10">
      <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">{label}</span>
      <p className="mt-2 text-[11px] text-slate-500 text-center leading-tight hidden sm:block max-w-[140px]">{detail}</p>
    </div>
  );
}

function GateWithStamp({ label, stamp, stampOffset }: { label: string; stamp: string; stampOffset: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-w-[100px] py-4 z-20">
      <ShieldCheck className="h-11 w-11 text-atlas-primary drop-shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-atlas-primary mt-1">{label}</span>
      <motion.span
        className="mt-2 rounded bg-atlas-primary/25 px-2.5 py-1 text-[10px] font-bold text-atlas-secondary ring-1 ring-atlas-primary/40"
        animate={{ opacity: [0.4, 1, 1, 0.4] }}
        transition={{
          repeat: Infinity,
          duration: DURATION,
          times: [stampOffset, stampOffset + 0.08, stampOffset + 0.2, stampOffset + 0.28]
        }}
      >
        {stamp}
      </motion.span>
    </div>
  );
}
