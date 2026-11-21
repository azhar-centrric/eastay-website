import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HostelSection } from "@/components/hostel-section";
import { EnquirySection } from "@/components/enquiry-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <HostelSection />
        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}
