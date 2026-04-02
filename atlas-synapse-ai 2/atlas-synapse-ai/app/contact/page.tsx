import Navbar from "../../components/Navbar";
import ContactContent from "../../components/contact/ContactContent";

export const metadata = {
  title: "Contact | Atlas Synapse",
  description: "Get in touch with Atlas Synapse. Request a demo or send a message."
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactContent />
    </>
  );
}
