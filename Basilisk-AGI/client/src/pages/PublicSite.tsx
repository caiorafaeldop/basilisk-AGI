import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePublicPage } from "@/contexts/PublicPageContext";
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
import { Skeleton } from "@/components/ui/skeleton";
import { SiteConfig } from "@/modules/site-config/api";
import { API_CONFIG } from "@/config/api";

/**
 * Página pública acessível via slug
 * Exemplo: /connecta_CI_-_UFPB
 */
const PublicSite = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setIsPublicPage } = usePublicPage();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Marcar como página pública ao montar
  useEffect(() => {
    setIsPublicPage(true);
    return () => setIsPublicPage(false); // Limpar ao desmontar
  }, [setIsPublicPage]);

  useEffect(() => {
    const fetchSiteBySlug = async () => {
      if (!slug) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/site-config/by-slug/${slug}`, {
          headers: {
            'x-api-key': API_CONFIG.API_KEY,
          },
        });

        if (!response.ok) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setConfig(data);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Erro ao buscar site por slug:', error);
        }
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiteBySlug();
  }, [slug]);

  // Site não encontrado
  if (notFound) {
    return <Navigate to="/" replace />;
  }

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

  if (!config) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      <Header />
      
      {/* Hero Section */}
      <section id="inicio">
        <HeroSection />
      </section>
      
      {/* About Section */}
      {config.aboutEnabled && (
        <section id="sobre">
          <AboutSection />
        </section>
      )}

      {/* Team Section */}
      {config.teamEnabled && (
        <section id="equipe">
          <TeamSection />
        </section>
      )}

      {/* Mobile Photo Section */}
      <MobileLawyerPhoto />

      {/* Blog Section */}
      {config.blogEnabled && (
        <section id="blog">
          <BlogSection />
        </section>
      )}

      {/* Testimonials Section */}
      {config.testimonialsEnabled && (
        <section id="depoimentos">
          <TestimonialsSection />
        </section>
      )}

      {/* FAQ Section */}
      {config.faqEnabled && (
        <section id="faq">
          <FAQSection />
        </section>
      )}

      {/* CTA Section */}
      {config.ctaEnabled && (
        <section id="contato">
          <CTASection />
        </section>
      )}

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default PublicSite;
