import { useState, useEffect } from "react";
import { CheckCircle2, TrendingUp, Users, Award, Target, Zap, Shield, Heart, GraduationCap, Star } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useDesignSystem } from "@/hooks/useDesignSystem";
import {
  SplitCenterLayout,
  FullWidthLayout,
  OverlapLayout,
  ZigzagLayout,
  CardsGridLayout,
  MinimalLayout,
  AsymmetricLayout,
  FloatingLayout
} from '../layouts';
import { HeroSkeleton } from "@/components/ui/hero-skeleton";

const iconMap: Record<string, any> = {
  Award, Shield, Heart, GraduationCap, Users, Star, TrendingUp, Target, Zap, CheckCircle2
};

const HeroSection = () => {
  const { config, isLoading } = useSiteConfig();
  const { systemName } = useDesignSystem();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Slides do carrossel - usa configuração customizável ou padrão
  const defaultSlides = [
    {
      title: config?.heroTitle || "Bem-vindo",
      subtitle: config?.heroSubtitle || "Sua solução completa",
      cta: config?.heroCtaText || "Comece Agora",
      imageUrl: config?.heroImage,
      imageId: undefined
    },
    {
      title: "Resultados Comprovados",
      subtitle: "Mais de 1000 clientes satisfeitos com nossos serviços",
      cta: config?.heroCtaText || "Comece Agora",
      imageUrl: config?.heroImage,
      imageId: undefined
    },
    {
      title: "Atendimento Premium",
      subtitle: "Suporte dedicado 24/7 para você",
      cta: config?.heroCtaText || "Comece Agora",
      imageUrl: config?.heroImage,
      imageId: undefined
    }
  ];

  const slides = config?.heroSlides && config.heroSlides.length > 0 
    ? config.heroSlides 
    : defaultSlides;

  // Autoplay do carrossel
  useEffect(() => {
    if (!config?.heroEnabled) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Troca a cada 6 segundos

    return () => clearInterval(interval);
  }, [currentSlide, config?.heroEnabled]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (isLoading || !config) {
    return <HeroSkeleton />;
  }

  if (!config.heroEnabled) {
    return null;
  }

  const highlights = config.heroHighlights || [];
  const currentSlideData = slides[currentSlide];

  // Cores dinâmicas do sistema
  const primaryColor = config?.primaryColor || '#FFE951';
  const secondaryColor = config?.secondaryColor || '#4ECDC4';

  // Determinar cor de fundo baseada no sistema de design
  const getBackgroundColor = () => {
    if (systemName === 'minimalism') {
      // No minimalismo, usar tema claro/escuro
      const isDark = config?.siteTheme === 'dark';
      return isDark ? '#111827' : '#f9fafb';
    } else {
      // No neobrutalism, usar cor primária
      return primaryColor;
    }
  };

  const backgroundColor = getBackgroundColor();
  const textColor = config?.siteTheme === 'dark' ? '#ffffff' : '#1a1a1a';

  // Pegar imagem do slide atual
  const currentSlideImage = (currentSlideData as any).imageUrl || (currentSlideData as any).imageId;
  
  const heroLayout = config.heroLayout || 'split-center';

  // Props comuns para todos os layouts
  const layoutProps = {
    slides,
    currentSlide,
    prevSlide,
    nextSlide,
    setCurrentSlide,
    highlights,
    iconMap,
    config,
    currentSlideImage,
    primaryColor,
    secondaryColor,
    bgColor: backgroundColor,
    textColor
  };

  // Renderizar layout baseado na escolha
  const renderLayout = () => {
    switch (heroLayout) {
      case 'split-center':
        return <SplitCenterLayout {...layoutProps} />;
      case 'full-width':
        return <FullWidthLayout {...layoutProps} />;
      case 'overlap':
        return <OverlapLayout {...layoutProps} />;
      case 'zigzag':
        return <ZigzagLayout {...layoutProps} />;
      case 'cards-grid':
        return <CardsGridLayout {...layoutProps} />;
      case 'minimal':
        return <MinimalLayout {...layoutProps} />;
      case 'asymmetric':
        return <AsymmetricLayout {...layoutProps} />;
      case 'floating':
        return <FloatingLayout {...layoutProps} />;
      default:
        return <SplitCenterLayout {...layoutProps} />;
    }
  };

  return (
    <section 
      id="inicio" 
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 relative overflow-hidden ${
        systemName === 'minimalism' ? 'pt-20' : ''
      }`}
      style={{
        background: backgroundColor
      }}
    >
      {renderLayout()}
    </section>
  );
};

export default HeroSection;
