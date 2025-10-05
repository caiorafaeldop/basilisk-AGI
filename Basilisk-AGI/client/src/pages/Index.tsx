import Header from "@/components/Header";
import MobileLawyerPhoto from "@/components/MobileLawyerPhoto";
import FloatingButtons from "@/components/FloatingButtons";
import { 
  HeroSection,
  AboutSection,
  BlogSection,
  TestimonialsSection,
  FAQSection,
  CTASection
} from "@/modules";
import TeamSection from "@/modules/team/pages/TeamSection";
import Footer from "@/components/Footer";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { FirstSetupWizard } from "@/modules/site-config/components/FirstSetupWizard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const { config, isLoading, isFirstSetup } = useSiteConfig();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(false);

  // Definir cor de fundo baseada no tema
  const bgColor = config?.siteTheme === 'dark' ? '#1e293b' : '#f7f7f8';

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
        <Header />
        <main className="container mx-auto px-4 py-16">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-48 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  // Show wizard for first time setup
  if (isFirstSetup && !showWizard && config?.siteName === 'Meu Site') {
    return <FirstSetupWizard onComplete={() => setShowWizard(true)} />;
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      <Header />
      <MobileLawyerPhoto />
      <main>
        {config?.heroEnabled && <HeroSection />}
        {config?.aboutEnabled && <AboutSection />}
        {config?.teamEnabled && <TeamSection />}
        {config?.blogEnabled && <BlogSection />}
        {config?.testimonialsEnabled && <TestimonialsSection />}
        {config?.faqEnabled && <FAQSection />}
        {config?.ctaEnabled && <CTASection />}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
