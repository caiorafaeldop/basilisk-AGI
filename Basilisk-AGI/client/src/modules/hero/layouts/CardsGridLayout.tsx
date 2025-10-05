import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface CardsGridLayoutProps {
  slides: any[];
  currentSlide: number;
  highlights: any[];
  iconMap: any;
  config: any;
  currentSlideImage: string;
  primaryColor: string;
  secondaryColor: string;
}

export const CardsGridLayout = ({
  slides,
  currentSlide,
  highlights,
  iconMap,
  config,
  currentSlideImage,
  primaryColor,
  secondaryColor
}: CardsGridLayoutProps) => {
  const currentSlideData = slides[currentSlide];

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      {/* Título Principal */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`text-center mb-12 transition-all duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
          }`}
        >
          <h1 
            className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ 
              color: '#FFFFFF',
              WebkitTextStroke: '4px #000000',
              paintOrder: 'stroke fill',
              textShadow: '6px 6px 0px #000000'
            }}
          >
            {slide.title}
          </h1>
          
          <p 
            className="text-2xl leading-relaxed font-bold mb-8 max-w-3xl mx-auto"
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
            className="px-10 py-5 text-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-all"
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

      {/* Grid de Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {highlights.slice(0, 4).map((highlight, index) => {
          const IconComponent = iconMap[highlight.icon] || CheckCircle2;
          const colors = ['#FFE951', '#4ECDC4', '#F38181', '#95E1D3'];
          
          return (
            <div 
              key={index}
              className="p-6 border-4 border-black rounded-2xl text-center transform hover:-translate-y-2 transition-all"
              style={{
                backgroundColor: colors[index % colors.length],
                boxShadow: '6px 6px 0px #000000'
              }}
            >
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full border-3 border-black flex items-center justify-center"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <IconComponent className="w-8 h-8" style={{ color: '#000000' }} />
              </div>
              <p className="font-bold text-lg" style={{ color: '#000000' }}>
                {highlight.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Imagem em destaque embaixo */}
      {(currentSlideImage || config.heroImage) && (
        <div className="mt-12">
          <div 
            className="border-4 border-black bg-white p-3 rounded-2xl max-w-4xl mx-auto"
            style={{ boxShadow: '6px 6px 0px #000000' }}
          >
            <img
              src={currentSlideImage || config.heroImage}
              alt="Hero"
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
