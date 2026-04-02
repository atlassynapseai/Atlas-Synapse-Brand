import Navbar from "../../components/Navbar";
import RisksContent from "../../components/risks/RisksContent";

export const metadata = {
  title: "Risks | Atlas Synapse",
  description: "Explore AI lifecycle risks: governance drift, policy conflict, data leakage, fabricated outputs, missing audit trails, agent unpredictability. See how Atlas Synapse intervenes."
};

export default function RisksPage() {
  return (
    <>
      <Navbar />
      <RisksContent />
    </>
  );
}
