import dynamic from "next/dynamic";

const AboutPageClient = dynamic(
  () => import("../../components/about/AboutPageClient"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-atlas-primary/40" />
      </div>
    ),
  }
);

export const metadata = {
  title: "About Us | Atlas Synapse",
  description: "Atlas Synapse — we hold the integrity layer. We inspect the signal at the boundary. Governance, regulation, auditability, and reliability for AI systems.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
