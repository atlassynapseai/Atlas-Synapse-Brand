"use client";

const FinalCTA: React.FC = () => {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="px-4 pb-24 pt-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-atlas-soft">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-atlas-secondary">
                Ready to see it in your stack?
              </p>
              <h2
                id="cta-heading"
                className="mt-3 font-display text-2xl tracking-tight text-slate-100 sm:text-3xl"
              >
                Put a verifiable trust layer around your AI systems.
              </h2>
            </div>
          </div>

          <form
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="flex-1 text-xs text-slate-300">
              Work email
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="mt-1.5 w-full rounded-full border border-white/12 bg-black/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-atlas-secondary focus:ring-1 focus:ring-atlas-secondary"
              />
            </label>
            <div className="flex flex-col gap-3 sm:w-auto">
              <button
                type="submit"
                className="sheen-button w-full rounded-full bg-gradient-to-r from-atlas-primary to-atlas-secondary px-6 py-2.5 text-xs font-semibold tracking-[0.18em] text-slate-950 shadow-atlas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-secondary"
              >
                Request Demo
              </button>
              <button
                type="button"
                className="w-full rounded-full border border-white/15 bg-atlas-soft px-6 py-2.5 text-xs font-semibold tracking-[0.18em] text-slate-100 hover:border-atlas-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-primary"
              >
                Talk to us about your agent stack
              </button>
            </div>
          </form>

          <p className="mt-4 text-[11px] text-slate-500">
            We&apos;ll follow up with a short discovery session to map Atlas
            Synapse AI to your governance, security, and product requirements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

