"use client";

import { motion, useInView } from "@/lib/motion";
import Link from "next/link";
import { useRef } from "react";
import {
  AlertTriangle,
  ShieldOff,
  Database,
  MessageSquareWarning,
  FileQuestion,
  GitBranch,
  ShieldCheck
} from "lucide-react";

const risks = [
  {
    id: "governance",
    icon: ShieldOff,
    label: "Governance drift",
    description: "Policies slip when models and data change. Without continuous checks, version drift goes unnoticed until it becomes a compliance finding or audit failure.",
    howWeHelp: "We validate policy versions at the input gate and flag drift so you can refresh before it impacts decisions. Full audit trail of which policy version applied to each request."
  },
  {
    id: "policy",
    icon: AlertTriangle,
    label: "Policy conflict",
    description: "Requests bypass or contradict guardrails. Unchecked inputs can trigger actions that violate internal or regulatory policy, exposing the organization to liability.",
    howWeHelp: "Input and output gates enforce policy before and after processing. Conflicting requests are blocked or routed to human review. Every block is logged with evidence."
  },
  {
    id: "leakage",
    icon: Database,
    label: "Data leakage",
    description: "Sensitive data enters prompts or outputs. PII, PHI, and confidential content can leak into logs, model responses, or downstream systems.",
    howWeHelp: "PII/PHI detection and masking at the input gate; redaction at the output gate. Configurable rules per domain. Evidence packages for compliance."
  },
  {
    id: "fabricated",
    icon: MessageSquareWarning,
    label: "Fabricated outputs",
    description: "Hallucinations and unsupported claims. Low-confidence or ungrounded outputs ship without verification, leading to wrong decisions and lost trust.",
    howWeHelp: "Output verification scores confidence and grounds. Low-confidence responses can be held for review or blocked. Audit trail includes scores and routing decisions."
  },
  {
    id: "audit",
    icon: FileQuestion,
    label: "Missing audit trails",
    description: "No evidence for compliance or review. When regulators or internal audit ask how a decision was made, there's nothing to show.",
    howWeHelp: "Every request and response is tagged, traced, and exportable. Full evidence packages for regulators. Searchable audit log with filters by policy, risk type, and outcome."
  },
  {
    id: "agent",
    icon: GitBranch,
    label: "Agent unpredictability",
    description: "Autonomous steps deviate from intent. Multi-step agents can drift from approved workflows and produce unexpected or non-compliant outcomes.",
    howWeHelp: "We validate agent context at the boundary and log each step. Step-level bounds and routing rules keep agents within approved flows. Full trace for every run."
  }
];

/** Curved connector SVG: from side A (0=left, 1=right) to side B, over the given height. */
function WaveConnector({ fromLeft, toLeft, height, id }: { fromLeft: boolean; toLeft: boolean; height: number; id: string }) {
  const x1 = fromLeft ? 20 : 80;
  const x2 = toLeft ? 80 : 20;
  return (
    <div className="relative w-full flex justify-center" style={{ height: Math.max(24, height) }}>
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168,85,247,0.4)" />
            <stop offset="50%" stopColor="rgba(248,113,113,0.35)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.4)" />
          </linearGradient>
        </defs>
        <path
          d={`M ${x1} 0 C ${x1} 50, ${x2} 50, ${x2} 100`}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** How we help block: stands out with a constant subtle dynamic treatment */
function HowWeHelpBlock({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="relative rounded-xl border-2 border-atlas-primary/30 bg-atlas-primary/10 p-4 overflow-hidden"
      initial={false}
      animate={{
        boxShadow: [
          "0 0 20px rgba(168,85,247,0.12)",
          "0 0 32px rgba(168,85,247,0.2)",
          "0 0 20px rgba(168,85,247,0.12)"
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(110deg, transparent 0%, rgba(168,85,247,0.15) 50%, transparent 100%)"
        }}
        animate={{
          x: ["-100%", "100%"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export default function RisksContent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} data-section="risks" className="min-h-screen pt-20 pb-16" style={{ paddingTop: "clamp(72px, 8vh, 96px)", paddingBottom: "clamp(48px, 6vh, 80px)" }}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 mb-10">
          <div>
            <h1 className="section-title font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight text-slate-100">
              Risks we help you manage
            </h1>
            <p className="mt-2 text-slate-400 text-base sm:text-lg max-w-xl">
              These are the main risks across the AI lifecycle when there's no trust layer. Each section explains the risk and how Atlas Synapse helps.
            </p>
          </div>
          <Link href="/" className="shrink-0 text-base font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors">
            ← Home
          </Link>
        </header>

        {/* Wave flow: alternating left/right cards with curved connectors */}
        <div className="relative">
          {risks.map((r, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={r.id} className="relative">
                {/* Curved connector from previous card to this one */}
                {i > 0 && (
                  <WaveConnector
                    fromLeft={(i - 1) % 2 === 0}
                    toLeft={isLeft}
                    height={32}
                    id={`wave-${i}`}
                  />
                )}
                <RiskCard
                  risk={r}
                  index={i}
                  isLeft={isLeft}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-atlas-secondary hover:text-atlas-primary transition-colors"
          >
            See how we apply this in practice
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function RiskCard({
  risk: r,
  index: i,
  isLeft
}: {
  risk: (typeof risks)[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.25, once: false });
  const Icon = r.icon;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -32 : 32, scale: 0.96 }}
      animate={{
        opacity: inView ? 1 : 0.6,
        x: inView ? 0 : isLeft ? -16 : 16,
        scale: inView ? 1 : 0.98
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`glass-panel rounded-2xl border border-white/10 overflow-hidden w-full max-w-[calc(100%-2rem)] sm:max-w-[85%] ${isLeft ? "mr-auto" : "ml-auto"}`}
    >
      <div className="flex gap-6 p-6 sm:p-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 ring-1 ring-rose-500/30">
          <Icon className="h-6 w-6 text-rose-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-slate-500">{(i + 1).toString().padStart(2, "0")}</span>
            <h2 className="font-display text-xl sm:text-[1.3rem] font-bold text-slate-100">{r.label}</h2>
          </div>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            {r.description}
          </p>
          <div className="mt-5">
            <HowWeHelpBlock>
              <p className="flex items-center gap-2 text-sm font-semibold text-atlas-primary">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                How Atlas Synapse helps
              </p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {r.howWeHelp}
              </p>
            </HowWeHelpBlock>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
