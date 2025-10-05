import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface FloatingLayoutProps {
  slides: any[];
  currentSlide: number;
  highlights: any[];
  iconMap: any;
  config: any;
  currentSlideImage: string;
  primaryColor: string;
  secondaryColor: string;
}

export const FloatingLayout = ({
  slides,
  currentSlide,
  highlights,
  iconMap,
  config,
  currentSlideImage,
  primaryColor,
  secondaryColor
}: FloatingLayoutProps) => {
  const currentSlideData = slides[currentSlide];

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl relative">
      {/* Elementos Flutuantes Decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 right-20 w-32 h-32 border-4 border-black rounded-full animate-float"
          style={{ 
            backgroundColor: secondaryColor,
            boxShadow: '6px 6px 0px #000000',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute bottom-40 left-10 w-24 h-24 border-4 border-black animate-float"
          style={{ 
            backgroundColor: '#FFE951',
            boxShadow: '4px 4px 0px #000000',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute top-1/3 left-1/4 w-16 h-16 border-4 border-black rounded-full animate-float"
          style={{ 
            backgroundColor: '#95E1D3',
            boxShadow: '3px 3px 0px #000000',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Content Principal */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Texto */}
        <div className="space-y-8">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            >
              <h1 
                className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
                style={{ 
                  color: '#FFFFFF',
                  WebkitTextStroke: '3px #000000',
                  paintOrder: 'stroke fill',
                  textShadow: '5px 5px 0px #000000'
                }}
              >
                {slide.title}
              </h1>
              
              <p 
                className="text-xl leading-relaxed font-bold mb-8"
                style={{ 
                  color: '#FFFFFF',
                  WebkitTextStroke: '2px #000000',
                  paintOrder: 'stroke fill',
                  textShadow: '3px 3px 0px #000000'
                }}
              >
                {slide.subtitle}
              </p>

              <Button 
                size="lg"
                style={{
                  backgroundColor: secondaryColor,
                  color: '#000000',
                  border: '4px solid #000000',
                  boxShadow: '4px 4px 0px #000000'
                }}
                className="px-10 py-5 text-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-all animate-pulse-scale"
                onClick={() => {
                  if (config.whatsapp) {
                    window.open(`https://wa.me/${config.whatsapp}`, '_blank');
                  }
                }}
              >
                {slide.cta}
              </Button>
            </div>
          ))}

          {/* Highlights Flutuantes */}
          {highlights.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.slice(0, 4).map((highlight, index) => {
                const IconComponent = iconMap[highlight.icon] || CheckCircle2;
                return (
                  <div 
                    key={index}
                    className="p-4 border-3 border-black rounded-xl animate-float"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '4px 4px 0px #000000',
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <IconComponent className="w-6 h-6 mb-2" style={{ color: primaryColor }} />
                    <p className="font-bold text-xs" style={{ color: '#000000' }}>
                      {highlight.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Imagem Flutuante */}
        {(currentSlideImage || config.heroImage) && (
          <div className="relative">
            <div 
              className="border-4 border-black bg-white p-3 rounded-2xl animate-float"
              style={{ 
                boxShadow: '6px 6px 0px #000000',
                animationDelay: '0.5s'
              }}
            >
              <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '4/3' }}>
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
