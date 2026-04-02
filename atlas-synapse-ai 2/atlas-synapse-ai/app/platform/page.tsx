import Navbar from "../../components/Navbar";
import PlatformContent from "../../components/platform/PlatformContent";

export const metadata = {
  title: "Platform | Atlas Synapse AI",
  description: "Policy & Governance, Input Controls, Output Verification, Audit Trails — the full capability set."
};

export default function PlatformPage() {
  return (
    <>
      <Navbar />
      <PlatformContent />
    </>
  );
}
