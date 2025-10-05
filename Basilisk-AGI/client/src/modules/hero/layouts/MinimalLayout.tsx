import { Button } from "@/components/ui/button";
import { handleHeroCta } from "@/utils/heroCtaHandler";
import { useDesignSystem } from "@/hooks/useDesignSystem";

interface MinimalLayoutProps {
  slides: any[];
  currentSlide: number;
  config: any;
  primaryColor: string;
  secondaryColor: string;
}

export const MinimalLayout = ({
  slides,
  currentSlide,
  config,
  primaryColor,
  secondaryColor
}: MinimalLayoutProps) => {
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
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <div className="space-y-12">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'
            }`}
          >
            <h1 
              className="text-6xl lg:text-8xl font-bold leading-tight mb-8"
              style={
                systemName === 'minimalism'
                  ? {
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${lightenColor(primaryColor, 25)} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
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
              className="text-2xl lg:text-3xl leading-relaxed mb-12 max-w-3xl mx-auto"
              style={
                systemName === 'minimalism'
                  ? {
                      color: config?.siteTheme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                      fontWeight: '500'
                    }
                  : { 
                      color: '#FFFFFF',
                      WebkitTextStroke: '2px #000000',
                      paintOrder: 'stroke fill',
                      textShadow: '3px 3px 0px #000000',
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
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08)',
                      padding: '0.875rem 2rem',
                      fontSize: '0.9375rem',
                      fontWeight: '600'
                    }
                  : {
                      backgroundColor: secondaryColor,
                      color: '#000000',
                      border: '4px solid #000000',
                      borderRadius: '9999px',
                      boxShadow: '4px 4px 0px #000000'
                    }
              }
              className={`px-16 py-8 text-2xl transition-all ${
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

        {/* Dots */}
        <div className="flex gap-3 justify-center pt-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide ? 'w-12' : 'w-3'
              }`}
              style={
                systemName === 'minimalism'
                  ? {
                      backgroundColor: index === currentSlide ? primaryColor : 'rgba(0, 0, 0, 0.2)',
                      border: 'none'
                    }
                  : {
                      backgroundColor: index === currentSlide ? '#ffffff' : '#9ca3af',
                      border: '2px solid #000000',
                      boxShadow: '2px 2px 0px #000000'
                    }
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
