import Navbar from "../../components/Navbar";
import PortalExperience from "../../components/portal/PortalExperience";

export const metadata = {
  title: "Portal | Atlas Synapse AI",
  description: "Client portal — sign in and access your command center."
};

export default function PortalPage() {
  return (
    <>
      <Navbar />
      <PortalExperience />
    </>
  );
}
