import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { handleHeroCta } from "@/utils/heroCtaHandler";
import { useDesignSystem } from "@/hooks/useDesignSystem";

interface SplitCenterLayoutProps {
  slides: any[];
  currentSlide: number;
  prevSlide: () => void;
  nextSlide: () => void;
  setCurrentSlide: (index: number) => void;
  highlights: any[];
  iconMap: any;
  config: any;
  currentSlideImage: string;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  textColor: string;
}

export const SplitCenterLayout = ({
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
  bgColor,
  textColor
}: SplitCenterLayoutProps) => {
  const currentSlideData = slides[currentSlide];
  const { systemName } = useDesignSystem();

  // Cores do texto baseadas no sistema e tema
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
    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Content com Carrossel */}
        <div className="space-y-8">
          {/* Carrossel de Títulos */}
          <div className="space-y-6 relative overflow-hidden min-h-[300px]">
            <div className="relative">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : index < currentSlide
                      ? 'opacity-0 -translate-x-full absolute top-0 left-0'
                      : 'opacity-0 translate-x-full absolute top-0 left-0'
                  }`}
                >
                  <h1 
                    className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
                    style={{ 
                      color: systemName === 'minimalism' ? textColors.title : '#FFFFFF',
                      WebkitTextStroke: systemName === 'minimalism' ? 'none' : '3px #000000',
                      paintOrder: systemName === 'minimalism' ? 'normal' : 'stroke fill',
                      textShadow: systemName === 'minimalism' ? 'none' : '4px 4px 0px #000000'
                    }}
                  >
                    {slide.title}
                  </h1>
                  
                  <p 
                    className="text-xl leading-relaxed font-bold"
                    style={{ 
                      color: systemName === 'minimalism' ? textColors.subtitle : '#FFFFFF',
                      WebkitTextStroke: systemName === 'minimalism' ? 'none' : '2px #000000',
                      paintOrder: systemName === 'minimalism' ? 'normal' : 'stroke fill',
                      textShadow: systemName === 'minimalism' ? 'none' : '3px 3px 0px #000000'
                    }}
                  >
                    {slide.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex gap-4 items-center">
            <Button 
              style={{
                backgroundColor: secondaryColor || '#FF6B6B',
                color: systemName === 'minimalism' ? '#ffffff' : textColor,
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-style)',
                borderRadius: systemName === 'minimalism' ? '8px' : '12px'
              }}
              className={`px-8 py-4 text-lg font-bold transition-all ${
                systemName === 'minimalism' 
                  ? 'hover:-translate-y-0.5' 
                  : 'hover:translate-x-0.5 hover:translate-y-0.5'
              }`}
              onClick={() => handleHeroCta(config)}
            >
              {currentSlideData.cta}
            </Button>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className={`p-2 transition-all ${
                  systemName === 'minimalism' 
                    ? 'hover:-translate-y-0.5' 
                    : 'hover:translate-x-0.5 hover:translate-y-0.5'
                }`}
                style={{ 
                  backgroundColor: systemName === 'minimalism' 
                    ? (config?.siteTheme === 'dark' ? 'rgba(75, 85, 99, 0.8)' : 'rgba(255, 255, 255, 0.8)')
                    : bgColor,
                  color: textColors.title,
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-style)',
                  borderRadius: systemName === 'minimalism' ? '8px' : '12px'
                }}
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className={`p-2 transition-all ${
                  systemName === 'minimalism' 
                    ? 'hover:-translate-y-0.5' 
                    : 'hover:translate-x-0.5 hover:translate-y-0.5'
                }`}
                style={{ 
                  backgroundColor: systemName === 'minimalism' 
                    ? (config?.siteTheme === 'dark' ? 'rgba(75, 85, 99, 0.8)' : 'rgba(255, 255, 255, 0.8)')
                    : bgColor,
                  color: textColors.title,
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-style)',
                  borderRadius: systemName === 'minimalism' ? '8px' : '12px'
                }}
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2 justify-center lg:justify-start">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all border-2 border-black ${
                  index === currentSlide ? 'w-8' : 'w-2'
                }`}
                style={{
                  backgroundColor: index === currentSlide ? primaryColor : '#9ca3af'
                }}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Social Proof / Stats */}
          {highlights.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-8">
              {highlights.slice(0, 3).map((highlight, index) => {
                const IconComponent = iconMap[highlight.icon] || CheckCircle2;
                return (
                  <div 
                    key={index}
                    className={`text-center p-4 transition-all ${
                      systemName === 'minimalism' 
                        ? 'hover:-translate-y-0.5' 
                        : 'hover:translate-x-0.5 hover:translate-y-0.5'
                    }`}
                    style={{
                      backgroundColor: index % 2 === 0 ? secondaryColor : bgColor,
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-style)',
                      borderRadius: systemName === 'minimalism' ? '8px' : '12px'
                    }}
                  >
                    <IconComponent 
                      className="w-8 h-8 mx-auto mb-2" 
                      style={{ color: textColor }}
                    />
                    <p 
                      className="text-sm font-bold"
                      style={{ color: textColor }}
                    >
                      {highlight.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Image Carousel - Desktop only */}
        {(currentSlideImage || config.heroImage) && (
          <div className="relative hidden lg:block w-full">
            {/* Container da moldura neobrutalism */}
            <div 
              className="relative bg-white p-3" 
              style={{ 
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-style)',
                borderRadius: systemName === 'minimalism' ? '12px' : '16px'
              }}
            >
              {/* Container da imagem */}
              <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '4/3' }}>
                {/* Carrossel de Imagens */}
                {slides.map((slide, index) => {
                  const slideImage = (slide as any).imageUrl || (slide as any).imageId || config.heroImage;
                  if (!slideImage) return null;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95'
                      }`}
                    >
                      <img
                        src={slideImage}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
