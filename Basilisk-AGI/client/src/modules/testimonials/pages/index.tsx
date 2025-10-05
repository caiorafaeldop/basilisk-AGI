import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import { testimonialsApi } from "../api";
import { Testimonial } from "../types";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const TestimonialsSection = () => {
  const { config } = useSiteConfig();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialsApi.getAll();
      // Filtrar apenas os depoimentos ativos
      const activeTestimonials = data.filter(testimonial => testimonial.active);
      setTestimonials(activeTestimonials);
    } catch (error) {
      console.error("Error loading testimonials:", error);
      // Fallback para depoimentos estáticos em caso de erro
      setTestimonials([
        {
          id: "1",
          content: "Profissionalismo e conhecimento técnico foram fundamentais para entender meu caso. A orientação recebida esclareceu todas as dúvidas sobre meus direitos trabalhistas.",
          author: "Cliente trabalhador",
          position: "Trabalhador",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "2",
          content: "Transparência e ética em todas as etapas do processo. Sempre bem informado sobre os andamentos e orientado sobre as melhores decisões a tomar.",
          author: "Cliente trabalhador",
          position: "Trabalhador",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "3",
          content: "Atendimento humanizado e explicações claras sobre todos os procedimentos. Senti-me seguro durante todo o processo jurídico.",
          author: "Cliente trabalhador",
          position: "Trabalhador",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 32; // 2rem gap
      const scrollPosition = index * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : Math.max(0, testimonials.length - 3);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, testimonials.length - 3);
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg text-muted-foreground">Carregando depoimentos...</div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Não exibir a seção se não houver depoimentos ativos
  }

  return (
    <section className="py-16 md:py-32" style={{ backgroundColor: config?.primaryColor || '#4ECDC4' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#000000' }}>
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed font-bold" style={{ color: '#000000' }}>
            A confiança de nossos clientes é construída através da qualidade técnica 
            e transparência em nossos serviços jurídicos.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-12">
          {/* Navigation Buttons */}
          {testimonials.length > 3 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-all"
                style={{ boxShadow: '4px 4px 0px #000000' }}
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-all"
                style={{ boxShadow: '4px 4px 0px #000000' }}
                onClick={handleNext}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className="border-6 border-black relative flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] bg-white hover:translate-x-2 hover:translate-y-2 hover:shadow-[8px_8px_0px_#000000] transition-all" style={{ boxShadow: '10px 10px 0px #000000' }}>
                <CardContent className="p-8 pt-6">
                  {/* Quote icon */}
                  <div className="flex justify-start mb-4">
                    <div className="w-8 h-8 bg-yellow-300 border-4 border-black flex items-center justify-center">
                      <Quote className="w-4 h-4" style={{ color: '#000000' }} />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#FFE951' }} />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="leading-relaxed mb-6 font-bold" style={{ color: '#000000' }}>
                    "{testimonial.content}"
                  </p>

                  {/* Client info with image */}
                  <div className="border-t-4 border-black pt-4">
                    <div className="flex items-center space-x-3 mb-2">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-12 h-12 object-cover border-4 border-black"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-pink-300 flex items-center justify-center border-4 border-black">
                          <User className="w-6 h-6" style={{ color: '#000000' }} />
                        </div>
                      )}
                      <div>
                        <p className="font-bold" style={{ color: '#000000' }}>
                          {testimonial.author}
                        </p>
                        <p className="text-sm font-bold" style={{ color: '#FF6B6B' }}>
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          {testimonials.length > 3 && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: Math.max(1, testimonials.length - 2) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Ethics disclaimer */}
        <div className="text-center">
          <div className="inline-block bg-white px-6 py-4 border-4 border-black max-w-2xl" style={{ boxShadow: '8px 8px 0px #000000' }}>
            <p className="text-sm font-bold" style={{ color: '#000000' }}>
              <strong>Nota importante:</strong> Todos os depoimentos respeitam o sigilo profissional 
              e as normas éticas da OAB.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
