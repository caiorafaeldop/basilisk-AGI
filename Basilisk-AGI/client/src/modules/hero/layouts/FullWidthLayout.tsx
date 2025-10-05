import { Button } from "@/components/ui/button";
import { handleHeroCta } from "@/utils/heroCtaHandler";
import { useDesignSystem } from "@/hooks/useDesignSystem";

interface FullWidthLayoutProps {
  slides: any[];
  currentSlide: number;
  config: any;
  currentSlideImage: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

export const FullWidthLayout = ({
  slides,
  currentSlide,
  config,
  currentSlideImage,
  primaryColor,
  secondaryColor,
  textColor
}: FullWidthLayoutProps) => {
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

  return (
    <div className="relative w-full h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
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
              <div 
                className="absolute inset-0" 
                style={{
                  background: systemName === 'minimalism'
                    ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)'
                    : 'rgba(0, 0, 0, 0.4)'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            >
              <h1 
                className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
                style={
                  systemName === 'minimalism'
                    ? {
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${lightenColor(primaryColor, 25)} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
                      }
                    : { 
                        color: '#FFFFFF',
                        WebkitTextStroke: '4px #000000',
                        paintOrder: 'stroke fill',
                        textShadow: '6px 6px 0px #000000'
                      }
                }
              >
                {slide.title}
              </h1>
              
              <p 
                className="text-2xl leading-relaxed mb-8"
                style={
                  systemName === 'minimalism'
                    ? {
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontWeight: '500',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                      }
                    : { 
                        color: '#FFFFFF',
                        WebkitTextStroke: '2px #000000',
                        paintOrder: 'stroke fill',
                        textShadow: '4px 4px 0px #000000',
                        fontWeight: 'bold'
                      }
                }
              >
                {slide.subtitle}
              </p>

              <Button 
                size="lg"
                style={
                  systemName === 'minimalism'
                    ? {
                        background: `linear-gradient(135deg, ${secondaryColor} 0%, ${lightenColor(secondaryColor, 25)} 100%)`,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.2)',
                        padding: '0.875rem 2rem',
                        fontSize: '0.9375rem',
                        fontWeight: '600'
                      }
                    : {
                        backgroundColor: secondaryColor || '#FF6B6B',
                        color: '#000000',
                        border: '4px solid #000000',
                        boxShadow: '4px 4px 0px #000000'
                      }
                }
                className={`px-12 py-6 text-xl transition-all ${
                  systemName === 'minimalism'
                    ? 'hover:-translate-y-1 hover:shadow-2xl'
                    : 'font-bold hover:translate-x-1 hover:translate-y-1'
                }`}
                onClick={() => handleHeroCta(config)}
              >
                {slide.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
