"use client";

import { useState, useEffect } from "react";
import { motion } from "@/lib/motion";
import Image from "next/image";
import { Fingerprint, Key, Users, ArrowRight, Sparkles } from "lucide-react";

type Step = "LOGIN" | "DECRYPTING" | "DASHBOARD";

export default function PortalExperience() {
  const [step, setStep] = useState<Step>("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) setStep("DECRYPTING");
  };

  const handleDemoFill = () => {
    setEmail("atlas@synapse.network");
    setPassword("••••••••");
  };

  useEffect(() => {
    if (step !== "DECRYPTING") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStep("DASHBOARD");
          return 100;
        }
        return p + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [step]);

  if (step === "LOGIN") {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 pt-24 pb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-atlas-primary/10 rounded-full blur-[100px]" />
        <div className="glass-panel relative z-10 w-full max-w-md rounded-3xl border border-white/10 p-8 shadow-atlas-soft">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black/50 flex items-center justify-center border border-atlas-primary/30">
              <Fingerprint className="w-8 h-8 text-atlas-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Sign In</h2>
            <p className="text-slate-400 text-sm mt-1">Universal Access Portal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[10px] font-bold text-atlas-primary uppercase tracking-widest">
                Your ID
              </label>
              <div className="relative mt-1">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-atlas-primary"
                  placeholder="ID_SEQUENCE"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-atlas-primary uppercase tracking-widest">
                Password
              </label>
              <div className="relative mt-1">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-atlas-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-atlas-primary hover:bg-atlas-secondary text-slate-950 font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Initiate Session
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-xs text-slate-500 hover:text-atlas-primary transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Use sample credentials
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "DECRYPTING") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 pt-24 font-mono bg-atlas-bg">
        <div className="w-full max-w-lg space-y-6">
          <div className="flex justify-between items-end text-atlas-primary text-sm">
            <span className="font-bold uppercase tracking-widest animate-pulse">
              Loading Your Dashboard…
            </span>
            <span className="text-xl font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-atlas-primary shadow-[0_0_15px_rgba(168,85,247,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="space-y-1 text-[10px] text-slate-500">
            <p className="opacity-50">{">> Connecting to secure server…"}</p>
            <p className="opacity-60">{">> Loading Industry Models…"}</p>
            <p className="opacity-80">{">> Verifying security keys…"}</p>
            <p className="opacity-90 text-atlas-primary">{">> ACCESS GRANTED."}</p>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD mockup
  return (
    <div className="min-h-screen pt-24 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-slate-900 ring-1 ring-white/10">
            <Image src="/logo.png" alt="Atlas" fill sizes="40px" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-white">Business Command</h1>
            <p className="text-xs text-atlas-primary">System Online</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold text-slate-100 mb-4">
            Dashboard preview
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Your operations hub, automation lab, and security vault live here. This is a preview — full portal access comes with your deployment.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Operations", "Automation", "Security"].map((name) => (
              <div
                key={name}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-5 text-center"
              >
                <p className="font-semibold text-slate-200">{name}</p>
                <p className="mt-1 text-xs text-slate-500">Module</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
