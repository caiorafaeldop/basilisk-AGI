import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { handleHeroCta } from "@/utils/heroCtaHandler";
import { useDesignSystem } from "@/hooks/useDesignSystem";

interface OverlapLayoutProps {
  slides: any[];
  currentSlide: number;
  prevSlide: () => void;
  nextSlide: () => void;
  config: any;
  currentSlideImage: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

export const OverlapLayout = ({
  slides,
  currentSlide,
  prevSlide,
  nextSlide,
  config,
  currentSlideImage,
  primaryColor,
  secondaryColor,
  textColor
}: OverlapLayoutProps) => {
  const currentSlideData = slides[currentSlide];
  const { systemName } = useDesignSystem();
  
  // Função para clarear cor
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
  };
  
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
  
  // Determinar cores do texto baseadas no sistema e tema
  const getTextColors = () => {
    if (systemName === 'minimalism') {
      const isDark = config?.siteTheme === 'dark';
      return {
        title: isDark ? '#f9fafb' : '#111827',
        subtitle: isDark ? '#d1d5db' : '#4b5563'
      };
    } else {
      return {
        title: '#000000',
        subtitle: '#4b5563'
      };
    }
  };
  
  const textColors = getTextColors();

  return (
    <div 
      className="container mx-auto px-4 md:px-8 max-w-7xl py-8 rounded-2xl"
      style={{ backgroundColor }}
    >
      <div className="relative">
        {/* Imagem de Fundo */}
        {(currentSlideImage || config.heroImage) && (
          <div 
            className="relative w-full h-[600px] rounded-2xl overflow-hidden" 
            style={{ 
              border: '1px solid var(--border-color)', 
              boxShadow: 'var(--shadow-style)' 
            }}
          >
            {slides.map((slide, index) => {
              const slideImage = (slide as any).imageUrl || (slide as any).imageId || config.heroImage;
              if (!slideImage) return null;
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slideImage}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                </div>
              );
            })}
          </div>
        )}

        {/* Card de Texto Sobreposto */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 max-w-2xl">
          <div 
            className={systemName === 'minimalism' ? 'p-8 rounded-lg' : 'p-8 rounded-2xl'}
            style={{ 
              backgroundColor: systemName === 'minimalism' 
                ? (config?.siteTheme === 'dark' ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.4)')
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: systemName === 'minimalism' ? 'blur(24px) saturate(180%)' : 'blur(8px)',
              WebkitBackdropFilter: systemName === 'minimalism' ? 'blur(24px) saturate(180%)' : 'blur(8px)',
              border: systemName === 'minimalism' 
                ? (config?.siteTheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)')
                : '1px solid var(--border-color)',
              boxShadow: systemName === 'minimalism' 
                ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
                : 'var(--shadow-style)'
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
                }`}
              >
                <h1 
                  className="text-5xl font-bold leading-tight mb-4"
                  style={
                    systemName === 'minimalism'
                      ? {
                          background: `linear-gradient(135deg, ${primaryColor} 0%, ${lightenColor(primaryColor, 25)} 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }
                      : { color: textColors.title }
                  }
                >
                  {slide.title}
                </h1>
                
                <p 
                  className="text-xl leading-relaxed mb-6"
                  style={{ color: textColors.subtitle }}
                >
                  {slide.subtitle}
                </p>

                <div className="flex gap-3">
                  <Button 
                    size="lg"
                    style={{
                      background: systemName === 'minimalism' 
                        ? `linear-gradient(135deg, ${secondaryColor} 0%, ${lightenColor(secondaryColor, 25)} 100%)`
                        : secondaryColor,
                      color: '#ffffff',
                      border: systemName === 'minimalism' 
                        ? 'none'
                        : '1px solid var(--border-color)',
                      boxShadow: systemName === 'minimalism'
                        ? '0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08)'
                        : 'var(--shadow-style)',
                      borderRadius: systemName === 'minimalism' ? '6px' : '12px',
                      padding: systemName === 'minimalism' ? '0.875rem 2rem' : undefined,
                      fontSize: systemName === 'minimalism' ? '0.9375rem' : undefined,
                      fontWeight: systemName === 'minimalism' ? '600' : '700'
                    }}
                    className={`transition-all ${
                      systemName === 'minimalism' 
                        ? 'hover:-translate-y-1 hover:shadow-2xl' 
                        : 'hover:translate-x-0.5 hover:translate-y-0.5'
                    }`}
                    onClick={() => handleHeroCta(config)}
                  >
                    {slide.cta}
                  </Button>

                  <button
                    onClick={prevSlide}
                    className={`w-12 h-12 flex items-center justify-center transition-all ${
                      systemName === 'minimalism' 
                        ? 'hover:-translate-y-1 hover:scale-110' 
                        : 'hover:translate-x-0.5 hover:translate-y-0.5'
                    }`}
                    style={{ 
                      backgroundColor: systemName === 'minimalism' 
                        ? (config?.siteTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)')
                        : '#FFFFFF',
                      backdropFilter: systemName === 'minimalism' ? 'blur(16px)' : 'none',
                      WebkitBackdropFilter: systemName === 'minimalism' ? 'blur(16px)' : 'none',
                      border: systemName === 'minimalism'
                        ? (config?.siteTheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)')
                        : '1px solid var(--border-color)',
                      boxShadow: systemName === 'minimalism'
                        ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                        : 'var(--shadow-style)',
                      borderRadius: systemName === 'minimalism' ? '50%' : '12px',
                      color: systemName === 'minimalism' && config?.siteTheme === 'dark' ? '#ffffff' : '#000000'
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={nextSlide}
                    className={`w-12 h-12 flex items-center justify-center transition-all ${
                      systemName === 'minimalism' 
                        ? 'hover:-translate-y-1 hover:scale-110' 
                        : 'hover:translate-x-0.5 hover:translate-y-0.5'
                    }`}
                    style={{ 
                      backgroundColor: systemName === 'minimalism' 
                        ? (config?.siteTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)')
                        : '#FFFFFF',
                      backdropFilter: systemName === 'minimalism' ? 'blur(16px)' : 'none',
                      WebkitBackdropFilter: systemName === 'minimalism' ? 'blur(16px)' : 'none',
                      border: systemName === 'minimalism'
                        ? (config?.siteTheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)')
                        : '1px solid var(--border-color)',
                      boxShadow: systemName === 'minimalism'
                        ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                        : 'var(--shadow-style)',
                      borderRadius: systemName === 'minimalism' ? '50%' : '12px',
                      color: systemName === 'minimalism' && config?.siteTheme === 'dark' ? '#ffffff' : '#000000'
                    }}
                  >
                    <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
