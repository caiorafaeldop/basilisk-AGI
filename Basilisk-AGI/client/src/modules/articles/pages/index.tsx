import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { articlesApi } from "../api";
import { Article } from "../types";
import { BlogSectionSkeleton } from "@/components/ui/article-skeleton";

const BlogSection = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  
  // Verificar estado de admin
  const checkAdminStatus = () => {
    const hasToken = localStorage.getItem('token');
    const hasUser = localStorage.getItem('user');
    setIsAdmin(!!(hasToken && hasUser));
  };
  
  useEffect(() => {
    // Verificar status inicial
    checkAdminStatus();
    
    // Escutar mudanças no localStorage
    const handleStorageChange = () => {
      checkAdminStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Escutar evento customizado para mudanças de login
    const handleAuthChange = () => {
      checkAdminStatus();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    loadHomepageArticles();
  }, []);

  // Auto-scroll para mobile
  useEffect(() => {
    if (articles.length > 1) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const maxIndex = articles.length - 1;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 5000); // Muda a cada 5 segundos

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
        }
      };
    }
  }, [articles.length]);

  // Scroll para o índice específico
  useEffect(() => {
    if (scrollContainerRef.current && articles.length > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 16; // 1rem gap
      const scrollPosition = currentIndex * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, articles]);

  const loadHomepageArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesApi.getAll();
      
      const articles = response.articles || [];
      
      // Filtrar apenas artigos marcados para aparecer na homepage (máximo 3)
      const homepageArticles = articles
        .filter(article => article.active)
        .slice(0, 3);
      
      // Se não houver artigos marcados para homepage, pegar os 3 mais recentes
      if (homepageArticles.length === 0) {
        const recentArticles = articles
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
        setArticles(recentArticles);
      } else {
        setArticles(homepageArticles);
      }
    } catch (error) {
      console.error('Erro ao carregar artigos da homepage:', error);
      // Em caso de erro, usar artigos estáticos como fallback
      setArticles([
        {
          id: "1",
          title: "Reforma Trabalhista 2025: O que mudou na prática",
          subtitle: "Análise técnica das principais alterações na legislação trabalhista e seus impactos práticos para trabalhadores e empresas.",
          content: "",
          category: "Legislação",
          active: true,
          createdAt: "2025-01-15T10:00:00Z",
          updatedAt: "2025-01-15T10:00:00Z"
        },
        {
          id: "2",
          title: "5 Medidas Preventivas para Empresas Evitarem Ações Trabalhistas",
          subtitle: "Estratégias práticas de compliance trabalhista para reduzir riscos jurídicos e fortalecer relações laborais.",
          content: "",
          category: "Consultoria",
          active: true,
          createdAt: "2025-01-10T10:00:00Z",
          updatedAt: "2025-01-10T10:00:00Z"
        },
        {
          id: "3",
          title: "Direitos Básicos do Trabalhador: O que Você Precisa Saber",
          subtitle: "Guia completo sobre direitos fundamentais garantidos pela legislação trabalhista brasileira.",
          content: "",
          category: "Direitos",
          active: true,
          createdAt: "2025-01-05T10:00:00Z",
          updatedAt: "2025-01-05T10:00:00Z"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      "bg-gradient-to-br from-primary/10 to-primary/5",
      "bg-gradient-to-br from-blue-100 to-blue-50",
      "bg-gradient-to-br from-green-100 to-green-50"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="blog" className="py-6 md:py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <div className="md:hidden mb-6">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3 rounded-lg border border-primary/20 shadow-sm">
              <h2 className="text-xl font-playfair font-bold text-primary">
                Conteúdo Jurídico de Qualidade
              </h2>
            </div>
          </div>
          <h2 className="hidden md:block text-2xl md:text-4xl lg:text-5xl font-playfair font-bold text-primary mb-4 md:mb-6">
            Conteúdo Jurídico de Qualidade
          </h2>
          {/* <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mantemos você informado sobre as principais novidades do Direito Trabalhista 
            através de conteúdo técnico e acessível.
          </p> */}
        </div>

        {loading ? (
          <BlogSectionSkeleton />
        ) : (
          <>
            {/* Desktop Layout - 1 Grande + 2 Menores */}
            <div className="hidden md:block mb-12">
              {articles.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Artigo Principal - Grande */}
                  <div className="lg:col-span-2 flex flex-col h-full">
                    <Card 
                      className="card-shadow border-4 border-primary bg-primary/5 overflow-hidden group smooth-transition cursor-pointer flex-grow rounded-lg"
                      onClick={() => navigate(`/artigo/${articles[0].id}`)}
                    >
                      {/* Imagem do artigo principal */}
                      <div className="h-48 overflow-hidden">
                        {articles[0].image ? (
                          <img 
                            src={articles[0].image} 
                            alt={articles[0].title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`h-full ${getGradientClass(0)} flex items-center justify-center`}>
                            <Calendar className="w-16 h-16 text-primary/40" />
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                            {articles[0].category}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(articles[0].createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <h3 className="text-xl font-playfair font-bold text-foreground leading-tight">
                          {articles[0].title}
                        </h3>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-foreground leading-relaxed mb-4 text-base">
                          {articles[0].subtitle || articles[0].content.substring(0, 150) + '...'}
                        </p>
                        <div className="flex items-center justify-between">
                          <Button 
                            variant="ghost" 
                            className="p-0 text-primary hover:text-primary/80 font-medium group pointer-events-none text-base"
                          >
                            Ler artigo completo
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 smooth-transition" />
                          </Button>
                          {isAdmin && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/admin/artigos/editar/${articles[0].id}`);
                              }}
                              className="opacity-0 group-hover:opacity-100 smooth-transition"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Botão Chamativo para Ver Todos - Embaixo do Artigo Principal */}
                    <div className="mt-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 text-center border-2 border-primary/20 flex-shrink-0">
                      <h4 className="text-lg font-playfair font-bold text-primary mb-2">
                        Conteúdo Completo
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Explore nossa biblioteca completa de artigos
                      </p>
                      <Button 
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 font-semibold shadow-lg hover:shadow-xl smooth-transition"
                        onClick={() => navigate('/artigos')}
                      >
                        Ver Todos os Artigos
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  {/* Artigos Secundários - Menores */}
                  <div className="space-y-6 h-full flex flex-col">
                    {articles.slice(1, 3).map((article, index) => (
                      <Card 
                        key={article.id} 
                        className="card-shadow border-4 border-primary bg-primary/5 overflow-hidden group smooth-transition cursor-pointer flex-1 rounded-lg"
                        onClick={() => navigate(`/artigo/${article.id}`)}
                      >
                        {/* Imagem do artigo secundário */}
                        <div className="h-32 overflow-hidden">
                          {article.image ? (
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`h-full ${getGradientClass(index + 1)} flex items-center justify-center`}>
                              <Calendar className="w-8 h-8 text-primary/40" />
                            </div>
                          )}
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                              {article.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <h3 className="text-sm font-playfair font-semibold text-foreground leading-tight">
                            {article.title}
                          </h3>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <p className="text-foreground leading-relaxed mb-3 text-sm">
                            {article.subtitle ? article.subtitle.substring(0, 80) + '...' : article.content.substring(0, 80) + '...'}
                          </p>
                          <div className="flex items-center justify-between">
                            <Button 
                              variant="ghost" 
                              className="p-0 text-primary hover:text-primary/80 font-medium group pointer-events-none text-sm"
                            >
                              Ler mais
                              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 smooth-transition" />
                            </Button>
                            {isAdmin && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/admin/artigos/editar/${article.id}`);
                                }}
                                className="opacity-0 group-hover:opacity-100 smooth-transition"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  </div>
                </div>
              )}
            </div>


            {/* Mobile Carousel - Shows 1 card at a time with auto-scroll */}
            <div className="relative mb-8 md:hidden">
              {/* Scrollable Container - Shows 1 card */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide scroll-smooth px-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {articles.map((article, index) => (
                  <Card 
                    key={article.id} 
                    className="card-shadow border md:border-4 border-primary bg-primary/5 overflow-hidden group smooth-transition cursor-pointer flex-shrink-0 w-[calc(100vw-4rem)] mr-4 last:mr-0 rounded-lg"
                    onClick={() => navigate(`/artigo/${article.id}`)}
                  >
                    {/* Imagem do artigo */}
                    <div className="h-32 overflow-hidden">
                      {article.image ? (
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                        />
                      ) : (
                        <div className={`h-full ${getGradientClass(index)} flex items-center justify-center`}>
                          <Calendar className="w-8 h-8 text-primary/40" />
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-playfair font-semibold text-foreground leading-tight">
                        {article.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="pt-0 p-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="p-0 text-primary hover:text-primary/80 font-medium group pointer-events-none text-xs"
                      >
                        Ler artigo
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 smooth-transition" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Dots Indicator */}
              {articles.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {articles.map((_, index) => (
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
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Botão Ver Todos os Artigos - Mobile */}
            <div className="text-center md:hidden mt-6">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 font-semibold shadow-lg hover:shadow-xl smooth-transition"
                onClick={() => navigate('/artigos')}
              >
                Ver Todos os Artigos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}

        {/* Botão Admin para Mobile */}
        {isAdmin && (
          <div className="text-center md:hidden mt-4">
            <Button 
              size="lg"
              className="px-8 py-4 text-lg"
              onClick={() => navigate('/admin/artigos/novo')}
            >
              Criar novo artigo
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
