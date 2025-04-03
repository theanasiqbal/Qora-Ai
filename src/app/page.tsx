import Footer from "@/components/Footer";
import Benefits from "../components/KeyBenefits";
import Userjourney from "../components/Userjourney";

import SocialMedia from "../components/SocialMedia";
import RotatingIntegrations from "../components/ApplicationCircle";
import Faq from "../components/Faq";
import Hero from "@/components/Hero";
import AssistantList from "@/components/AssistantList";
import ToneList from "@/components/ToneList";
import PricingPage from "@/components/PricingPage";
import { AnimatedBeamDemo } from "@/components/AnimatedBeam";

export default function Home() {
  return (
    <div className="relative flex flex-col bg-[#151221] ">
      <Hero />
      <AssistantList />
      <RotatingIntegrations />
      <SocialMedia />
      {/* <ToneList /> */}
      <Userjourney />
      <Benefits />

      <PricingPage />
      <AnimatedBeamDemo />
      <Faq />
      <Footer />
    </div>

  );
}
