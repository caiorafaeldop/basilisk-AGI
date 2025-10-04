import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, User, Users } from "lucide-react";
import { teamApi } from "../api";
import { TeamMember } from "../types";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  // Auto-scroll para mobile
  useEffect(() => {
    if (teamMembers.length > 1) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const maxIndex = teamMembers.length - 1;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 6000); // Muda a cada 6 segundos

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
        }
      };
    }
  }, [teamMembers.length]);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      // Usar o endpoint público para membros ativos
      const response = await teamApi.getActive();
      setTeamMembers(response.team);
      console.log("Team members loaded:", response.team);
    } catch (error) {
      console.error("Error loading team members:", error);
      // Fallback para membros estáticos em caso de erro
      setTeamMembers([
        {
          id: "1",
          name: "Dr. Paulo Maia",
          position: "Advogado Sênior",
          description: "Especialista em Direito do Trabalho com mais de 15 anos de experiência, dedicado à defesa dos direitos trabalhistas com ética e excelência técnica.",
          image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758593450/maia-advocacia/l8xukaskybxoqm02pkiu.jpg",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "2",
          name: "Dra. Maria Silva",
          position: "Advogada Associada",
          description: "Especializada em consultoria preventiva e compliance trabalhista, com foco em orientação empresarial e resolução de conflitos laborais.",
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
    const newIndex = currentIndex > 0 ? currentIndex - 1 : Math.max(0, teamMembers.length - 2);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, teamMembers.length - 2);
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg text-muted-foreground">Carregando equipe...</div>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null; // Não exibir a seção se não houver membros ativos
  }

  return (
    <section className="py-6 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="md:hidden mb-6">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3 rounded-lg border border-primary/20 shadow-sm">
              <h2 className="text-xl font-playfair font-bold text-primary">
                Nossa Equipe Especializada
              </h2>
            </div>
          </div>
          <h2 className="hidden md:block text-2xl md:text-4xl lg:text-5xl font-playfair font-bold text-primary mb-4 md:mb-6">
            Nossa Equipe Especializada
          </h2>
          {/* <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Profissionais qualificados e comprometidos com a excelência no atendimento 
            jurídico trabalhista, sempre pautados pela ética e conhecimento técnico.
          </p> */}
        </div>

        {/* Desktop Carousel - Shows 2 cards */}
        <div className="relative mb-12 hidden md:block">
          {/* Navigation Buttons */}
          {teamMembers.length > 2 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={handleNext}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Scrollable Container - Shows 2 cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teamMembers.map((member) => (
              <Card key={member.id} className="card-shadow border-4 border-primary relative flex-shrink-0 w-full md:w-[calc(50%-1rem)] bg-primary/5 rounded-xl">
                <CardContent className="p-8">
                  {/* Member Image */}
                  <div className="flex justify-center mb-6">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/20 shadow-lg">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-playfair font-bold text-primary mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg text-gold-accent font-medium mb-4">
                      {member.position}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          {teamMembers.length > 2 && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: Math.max(1, teamMembers.length - 1) }).map((_, index) => (
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

        {/* Mobile Carousel - Shows 1 card at a time */}
        <div className="relative mb-8 md:hidden">
          {/* Scrollable Container - Shows 1 card */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teamMembers.map((member) => (
              <Card key={member.id} className="card-shadow border md:border-4 border-primary relative flex-shrink-0 w-[calc(100vw-4rem)] mr-4 last:mr-0 bg-primary/5 rounded-xl">
                <CardContent className="p-4">
                  {/* Member Image */}
                  <div className="flex justify-center mb-3">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 shadow-lg">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-sm font-playfair font-bold text-primary mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gold-accent font-medium mb-2">
                      {member.position}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          {teamMembers.length > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    if (autoScrollRef.current) {
                      clearInterval(autoScrollRef.current);
                    }
                    scrollToIndex(index);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        {/* <div className="text-center">
          <div className="inline-block bg-primary/5 px-6 py-4 rounded-lg max-w-2xl">
            <p className="text-sm text-muted-foreground">
              <strong>Compromisso com a excelência:</strong> Nossa equipe está sempre atualizada 
              com as mudanças na legislação trabalhista para oferecer o melhor atendimento.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TeamSection;
