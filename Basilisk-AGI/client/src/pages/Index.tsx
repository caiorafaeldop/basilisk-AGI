import Header from "@/components/Header";
import MobileLawyerPhoto from "@/components/MobileLawyerPhoto";
import FloatingButtons from "@/components/FloatingButtons";
import { 
  HeroSection,
  WorkersSection,
  AreasAtuacaoSection,
  ProcessSection,
  AboutSection,
  BlogSection,
  TestimonialsSection,
  FAQSection,
  CTASection
} from "@/modules";
import TeamSection from "@/modules/team/pages/TeamSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <MobileLawyerPhoto />
      <main>
        <HeroSection />
        <WorkersSection />
        {/* <AreasAtuacaoSection /> */}
        {/* <ProcessSection /> */}
        <AboutSection />
        <TeamSection />
        <BlogSection />
        {/* <TestimonialsSection /> */}
        {/* <FAQSection /> */}
        <CTASection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
