import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UseCasesSection from "@/components/UseCasesSection";
import StorytellingSection from "@/components/StorytellingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <UseCasesSection />
      <StorytellingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
