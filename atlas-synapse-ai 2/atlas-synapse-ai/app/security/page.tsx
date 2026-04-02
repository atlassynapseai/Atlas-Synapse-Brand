import Navbar from "../../components/Navbar";
import SecurityContent from "../../components/security/SecurityContent";

export const metadata = {
  title: "Security & Trust | Atlas Synapse AI",
  description: "Privacy-first, least-privilege AI operations. SOC 2‑aligned practices, boundary‑respecting design."
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <SecurityContent />
    </>
  );
}
