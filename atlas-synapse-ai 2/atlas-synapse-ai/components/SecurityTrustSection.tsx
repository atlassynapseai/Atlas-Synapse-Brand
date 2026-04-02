const badges = ["Encryption", "Audit Trails", "Access Controls", "Data Minimization"];

const SecurityTrustSection: React.FC = () => {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="border-y border-white/5 bg-atlas-elevated/80 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-atlas-secondary">
            Security & trust
          </p>
          <h2
            id="security-heading"
            className="font-display text-2xl tracking-tight text-slate-100 sm:text-3xl"
          >
            Built for privacy‑first, least‑privilege AI operations.
          </h2>
          <p className="text-sm text-slate-300">
            Atlas Synapse AI is designed to slot into existing compliance workflows.
            We operate on the minimum data necessary, keep controls close to where
            decisions are made, and create exhaustive trails for the teams who are
            accountable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-5 text-sm">
            <h3 className="mb-2 font-semibold text-slate-100">
              SOC 2‑aligned practices
            </h3>
            <p className="text-slate-300">
              Controls and processes designed to align with SOC 2 expectations and
              modern enterprise security reviews.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-5 text-sm">
            <h3 className="mb-2 font-semibold text-slate-100">
              Boundary‑respecting by design
            </h3>
            <p className="text-slate-300">
              We sit at your edges: monitoring inputs and outputs without taking
              custody of your entire data estate.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-5 text-sm">
            <h3 className="mb-2 font-semibold text-slate-100">
              Clear lines of accountability
            </h3>
            <p className="text-slate-300">
              Every intervention, override, and decision is captured so that risk,
              compliance, and engineering can speak the same language.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-[11px] text-slate-200">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-slate-900/80 px-3 py-1 ring-1 ring-white/10"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityTrustSection;

