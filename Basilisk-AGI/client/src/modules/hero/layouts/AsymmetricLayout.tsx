import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface AsymmetricLayoutProps {
  slides: any[];
  currentSlide: number;
  highlights: any[];
  iconMap: any;
  config: any;
  currentSlideImage: string;
  primaryColor: string;
  secondaryColor: string;
}

export const AsymmetricLayout = ({
  slides,
  currentSlide,
  highlights,
  iconMap,
  config,
  currentSlideImage,
  primaryColor,
  secondaryColor
}: AsymmetricLayoutProps) => {
  const currentSlideData = slides[currentSlide];

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Coluna 1: Texto (60%) */}
        <div className="lg:col-span-2 space-y-8">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            >
              <h1 
                className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
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
                className="text-2xl leading-relaxed font-bold mb-8"
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
                className="px-10 py-6 text-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-all"
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

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-12">
              {highlights.slice(0, 4).map((highlight, index) => {
                const IconComponent = iconMap[highlight.icon] || CheckCircle2;
                return (
                  <div 
                    key={index}
                    className="p-4 border-3 border-black rounded-lg"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '4px 4px 0px #000000'
                    }}
                  >
                    <IconComponent className="w-8 h-8 mb-2" style={{ color: primaryColor }} />
                    <p className="font-bold text-sm" style={{ color: '#000000' }}>
                      {highlight.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Coluna 2: Imagem (40%) */}
        {(currentSlideImage || config.heroImage) && (
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="border-4 border-black bg-white p-2 rounded-xl" style={{ boxShadow: '6px 6px 0px #000000' }}>
                <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '3/4' }}>
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
          </div>
        )}
      </div>
    </div>
  );
};
