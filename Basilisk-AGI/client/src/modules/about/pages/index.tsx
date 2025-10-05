import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { GraduationCap, Award, Users, Shield, Star, Briefcase } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { AboutSkeleton } from "@/components/ui/about-skeleton";

const iconMap: Record<string, any> = {
  GraduationCap, Award, Users, Shield, Star, Briefcase
};

const AboutSection = () => {
  const { config, isLoading } = useSiteConfig();
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

  if (isLoading || !config) {
    return <AboutSkeleton />;
  }

  if (!config.aboutEnabled) {
    return null;
  }

  const qualifications = config.qualifications || [];

  return (
    <section id="sobre" className="py-12 md:py-32" style={{ backgroundColor: config?.secondaryColor || '#F38181' }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder - Desktop only */}
          {config.aboutImage && (
            <div className="relative hidden lg:block">
              <div className="overflow-hidden border-8 border-black bg-white p-2" style={{ boxShadow: '16px 16px 0px #000000' }}>
                <div className="aspect-square">
                  <img
                    src={config.aboutImage}
                    alt={config.aboutTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="space-y-8">
            {/* Mobile Image - Above title com animação */}
            {(config.aboutImageMobile || config.aboutImage) && (
              <div 
                ref={imageRef}
                className={`block lg:hidden mb-6 transform transition-all duration-1000 ease-out ${
                  imageVisible 
                    ? 'translate-x-0 opacity-100 scale-100' 
                    : '-translate-x-8 opacity-0 scale-95'
                }`}
              >
                <div className="overflow-hidden border-6 border-black bg-white p-2" style={{ boxShadow: '10px 10px 0px #000000' }}>
                  <div className="aspect-square">
                    <img
                      src={config.aboutImageMobile || config.aboutImage}
                      alt={config.aboutTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Mobile Layout - Bullet Points */}
            <div className="block lg:hidden">
              <div className="text-center mb-6">
                <div className="w-full bg-white px-6 py-4 border-4 border-black mb-4" style={{ boxShadow: '8px 8px 0px #000000' }}>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
                    {config.aboutTitle}
                  </h2>
                  {config.aboutSubtitle && (
                    <p className="text-lg font-bold" style={{ color: '#FFE951' }}>
                      {config.aboutSubtitle}
                    </p>
                  )}
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
                {qualifications.map((qual, index) => {
                  const IconComponent = iconMap[qual.icon] || Award;
                  const colors = ['#4ECDC4', '#FFE951', '#95E1D3'];
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white border-4 border-black" style={{ boxShadow: '6px 6px 0px #000000' }}>
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5 border-4 border-black" style={{ backgroundColor: colors[index % colors.length] }}>
                        <IconComponent className="w-4 h-4" style={{ color: '#000000' }} />
                      </div>
                      <p className="text-sm font-bold leading-relaxed" style={{ color: '#000000' }}>
                        {qual.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Layout - Original */}
            <div className="hidden lg:block">
              <div className="border-8 border-black p-6 bg-white" style={{ boxShadow: '12px 12px 0px #000000' }}>
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#000000' }}>
                    {config.aboutTitle}
                  </h2>
                  {config.aboutSubtitle && (
                    <p className="text-xl font-bold mb-6" style={{ color: '#FFE951' }}>
                      {config.aboutSubtitle}
                    </p>
                  )}
                </div>

                {config.aboutContent && (
                  <div className="space-y-6 mb-8">
                    <p className="text-lg leading-relaxed whitespace-pre-line font-medium" style={{ color: '#000000' }}>
                      {config.aboutContent}
                    </p>
                  </div>
                )}

                {/* Qualifications Desktop */}
                {qualifications.length > 0 && (
                  <div className="grid grid-cols-1 gap-3 mt-8">
                    {qualifications.map((qual, index) => {
                      const IconComponent = iconMap[qual.icon] || Award;
                      const colors = ['#4ECDC4', '#FFE951', '#95E1D3'];
                      return (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-white border-4 border-black" style={{ boxShadow: '6px 6px 0px #000000', backgroundColor: colors[index % colors.length] }}>
                          <IconComponent className="w-5 h-5" style={{ color: '#000000' }} />
                          <span className="font-bold text-sm" style={{ color: '#000000' }}>{qual.text}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
