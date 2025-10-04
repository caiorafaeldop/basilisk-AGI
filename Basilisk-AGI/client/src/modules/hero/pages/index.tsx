import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Heart, Award } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [highlightsVisible, setHighlightsVisible] = useState(false);

  useEffect(() => {
    // Animação escalonada
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    const highlightsTimer = setTimeout(() => setHighlightsVisible(true), 800);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(highlightsTimer);
    };
  }, []);

  const highlights = [
    {
      icon: <Award className="w-6 h-6" />,
      text: "Especialista em Direito Trabalhista há mais de 30 anos"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Total conformidade com as normas éticas da OAB"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      text: "Horário de Atendimento de Segunda a Sexta: 9h às 18h"
    }
  ];

  return (
    <section id="inicio" className="pt-4 md:pt-32 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className={`text-4xl lg:text-6xl font-playfair font-bold text-primary leading-tight transition-all duration-1000 ease-out ${
                titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                Soluções Trabalhistas com
                <span className="text-brown-dark"> Excelência</span>
                <span className="text-gold-accent"> e Ética</span>
              </h1>
              
              <p className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 ease-out ${
                titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '0.3s' }}>
                Defendendo seus direitos trabalhistas com expertise 
                e compromisso total com seus interesses
              </p>
            </div>

            <div className="flex justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                onClick={() => window.open('https://wa.me/558391090902?text=Olá, gostaria de uma consulta sobre meus direitos trabalhistas.', '_blank')}
              >
                Fale com um Especialista
              </Button>
            </div>

            {/* Highlights */}
            <div className="grid gap-4 mt-1">
              {highlights.map((highlight, index) => (
                <Card 
                  key={index} 
                  className={`p-4 card-shadow border-4 border-primary bg-primary/5 rounded-lg transition-all duration-700 ease-out ${
                    highlightsVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 text-primary">
                        {highlight.icon}
                      </div>
                    </div>
                    <p className="text-lg  text-primary">
                      {highlight.text}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Image - Hidden on mobile */}
          <div className="relative hidden md:block">
            <div className="relative overflow-hidden rounded-2xl elegant-shadow">
              <img
                src="https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758590979/maia-advocacia/lvql1q9gchj5owiubyg4.jpg"
                alt="Escritório de advocacia profissional"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
