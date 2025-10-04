import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { GraduationCap, Award, Users, Shield } from "lucide-react";

const AboutSection = () => {
  const [imageVisible, setImageVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageVisible(true);
          }
        });
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const qualifications = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      text: "Mestre em Direito das Relações Sociais pela PUC/SP"
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: "Professor de Direito"
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: "Ex-Presidente da OAB - PB"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Ex-Conselheiro Federal da OAB"
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: "Presidente da Comissão Nacional de Direitos Sociais da OAB"
    }
  ];

  return (
    <section id="sobre" className="py-6 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder - Desktop only */}
          <div className="relative hidden lg:block">
            <Card className="overflow-hidden border-0 elegant-shadow">
              <div className="aspect-square">
                <img
                  src="https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758593450/maia-advocacia/l8xukaskybxoqm02pkiu.jpg"
                  alt="Dr. Paulo Maia - Advogado Trabalhista"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Mobile Image - Above title com animação */}
            <div 
              ref={imageRef}
              className={`block lg:hidden mb-6 transform transition-all duration-1000 ease-out ${
                imageVisible 
                  ? 'translate-x-0 opacity-100 scale-100' 
                  : '-translate-x-8 opacity-0 scale-95'
              }`}
            >
              <Card className="overflow-hidden border-0 elegant-shadow">
                <div className="aspect-square">
                  <img
                    src="https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758590979/maia-advocacia/lvql1q9gchj5owiubyg4.jpg"
                    alt="Dr. Paulo Maia - Advogado Trabalhista"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>
            {/* Mobile Layout - Bullet Points */}
            <div className="block lg:hidden">
              <div className="text-center mb-6">
                <div className="w-full bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 rounded-lg border border-primary/20 card-shadow mb-4">
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-2">
                    DR. PAULO MAIA
                  </h2>
                  <p className="text-lg text-gold-accent font-medium">
                    Advogado
                  </p>
                </div>
              </div>

              {/* Descrição Mobile - Estilizada
              <div className="space-y-4 mb-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border-l-4 border-primary shadow-sm">
                  <p className="text-sm text-foreground leading-relaxed font-medium">
                    Mestre em Direito das Relações Sociais pela PUC/SP, com vasta experiência 
                    em Direito do Trabalho e atuação destacada na advocacia e ensino jurídico.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border-l-4 border-primary shadow-sm">
                  <p className="text-sm text-foreground leading-relaxed font-medium">
                    Ex-Presidente da OAB-PB e atual Conselheiro Federal da OAB, 
                    com sólida formação acadêmica e compromisso com a excelência profissional.
                  </p>
                </div>
              </div> */}

              {/* Qualificações Mobile - Cards Estilizados */}
              <div className="space-y-3">
                {qualifications.map((qual, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg border border-primary/10 card-shadow">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-xs">{qual.icon}</span>
                    </div>
                    <p className="text-sm text-foreground font-medium leading-relaxed">
                      {qual.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout - Original */}
            <div className="hidden lg:block">
              <div className="border border-gray-300 p-6 rounded-lg card-shadow bg-white">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-primary mb-6">
                    Dr. Paulo Maia
                  </h2>
                  <p className="text-xl text-gold-accent font-medium mb-6">
                    Advogado
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Mestre em Direito das Relações Sociais pela PUC/SP, com vasta experiência 
                    em Direito do Trabalho e atuação destacada na advocacia e ensino jurídico.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ex-Presidente da OAB-PB e atual Conselheiro Federal da OAB, 
                    com sólida formação acadêmica e compromisso com a excelência profissional.
                  </p>
                </div>

                {/* Qualifications Desktop */}
                <div className="grid grid-cols-1 gap-3 mt-8">
                  {qualifications.map((qual, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg card-shadow">
                      <span className="text-primary">{qual.icon}</span>
                      <span className="text-primary font-medium text-sm">{qual.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
