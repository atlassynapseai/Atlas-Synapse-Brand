import Navbar from "../../components/Navbar";
import SolutionsTrustSimulator from "../../components/solutions/SolutionsTrustSimulator";

export const metadata = {
  title: "Solutions | Atlas Synapse AI",
  description: "Visual trust simulator — see how Atlas Synapse AI intercepts risk at the input and output gates."
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <SolutionsTrustSimulator />
    </>
  );
}
