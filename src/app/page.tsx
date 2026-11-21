import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HostelSection } from "@/components/hostel-section";
import { FinalSection } from "@/components/final-section";
import { MobileBar } from "@/components/mobile-bar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <HostelSection />
        <FinalSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
