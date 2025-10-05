import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useDesignSystem } from "@/hooks/useDesignSystem";

interface ZigzagLayoutProps {
  slides: any[];
  currentSlide: number;
  highlights: any[];
  iconMap: any;
  config: any;
  currentSlideImage: string;
  secondaryColor: string;
  bgColor: string;
  textColor: string;
}

export const ZigzagLayout = ({
  slides,
  currentSlide,
  highlights,
  iconMap,
  config,
  currentSlideImage,
  secondaryColor,
  bgColor,
  textColor
}: ZigzagLayoutProps) => {
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
    <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-16">
      {/* Slide Principal em Zigzag */}
      {slides.map((slide, index) => {
        const slideImage = (slide as any).imageUrl || (slide as any).imageId || config.heroImage;
        const isEven = index % 2 === 0;
        
        return (
          <div
            key={index}
            className={`transition-all duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
            }`}
          >
            <div className={`grid lg:grid-cols-2 gap-6 lg:gap-8 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
              {/* Texto */}
              <div className={`space-y-6 ${!isEven ? 'lg:order-2' : ''}`}>
                <h1 
                  className="text-5xl lg:text-6xl font-bold leading-tight"
                  style={{ 
                    color: systemName === 'minimalism' ? textColors.title : '#FFFFFF',
                    WebkitTextStroke: systemName === 'minimalism' ? 'none' : '3px #000000',
                    paintOrder: systemName === 'minimalism' ? 'normal' : 'stroke fill',
                    textShadow: systemName === 'minimalism' ? 'none' : '5px 5px 0px #000000'
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

                <Button 
                  size="lg"
                  style={{
                    backgroundColor: secondaryColor,
                    color: systemName === 'minimalism' ? '#ffffff' : '#000000',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-style)',
                    borderRadius: systemName === 'minimalism' ? '8px' : '12px'
                  }}
                  className={`px-8 py-4 text-lg font-bold transition-all ${
                    systemName === 'minimalism' 
                      ? 'hover:-translate-y-0.5' 
                      : 'hover:translate-x-1 hover:translate-y-1'
                  }`}
                  onClick={() => {
                    if (config.whatsapp) {
                      window.open(`https://wa.me/${config.whatsapp}`, '_blank');
                    }
                  }}
                >
                  {slide.cta}
                </Button>
              </div>

              {/* Imagem */}
              {slideImage && (
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <div 
                    className={`bg-white p-3 border transition-transform ${
                      systemName === 'minimalism'
                        ? 'rounded-xl hover:scale-105'
                        : 'rounded-2xl hover:rotate-2'
                    }`}
                    style={{ 
                      borderColor: 'var(--border-color)',
                      boxShadow: 'var(--shadow-style)'
                    }}
                  >
                    <img
                      src={slideImage}
                      alt={slide.title}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Highlights em linha */}
      {highlights.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {highlights.slice(0, 4).map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon] || CheckCircle2;
            return (
              <div 
                key={index}
                className="flex items-center gap-3 px-6 py-3 border-3 border-black rounded-full"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '4px 4px 0px #000000'
                }}
              >
                <IconComponent className="w-6 h-6" style={{ color: secondaryColor }} />
                <span className="font-bold text-sm" style={{ color: '#000000' }}>
                  {highlight.text}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
