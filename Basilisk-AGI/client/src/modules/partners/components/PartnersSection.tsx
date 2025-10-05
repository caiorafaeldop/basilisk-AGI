/**
 * Partners Section Component
 * Seção de parceiros/logos com carrossel automático
 */

import { useEffect, useState } from 'react';
import { useDesignSystem } from '@/hooks/useDesignSystem';

interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

interface PartnersSectionProps {
  partners: Partner[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  speed?: number; // velocidade em ms
}

export const PartnersSection = ({ 
  partners, 
  title, 
  subtitle, 
  autoplay = true,
  speed = 3000 
}: PartnersSectionProps) => {
  const { systemName } = useDesignSystem();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll do carrossel
  useEffect(() => {
    if (!autoplay || partners.length <= 4) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    }, speed);

    return () => clearInterval(interval);
  }, [autoplay, speed, partners.length]);

  // Duplicar logos para efeito infinito
  const displayPartners = [...partners, ...partners, ...partners];

  return (
    <section id="parceiros" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 
                className="text-4xl md:text-5xl font-bold mb-4"
                style={
                  systemName === 'minimalism'
                    ? {
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
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
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'var(--site-text-color)', opacity: 0.8 }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Carrossel Infinito */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex gap-8 md:gap-12 transition-transform duration-1000 ease-linear"
              style={{
                transform: `translateX(-${(currentIndex * 100) / partners.length}%)`
              }}
            >
              {displayPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-32 md:w-40 lg:w-48"
                >
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 transition-all duration-300 hover:scale-110"
                    style={
                      systemName === 'minimalism'
                        ? {
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--panel-bg)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                          }
                        : {
                            borderRadius: '16px',
                            border: '2px solid #000000',
                            backgroundColor: 'var(--panel-bg)',
                            boxShadow: '2px 2px 0px #000000'
                          }
                    }
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      style={{ maxHeight: '80px' }}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Gradientes nas bordas */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, var(--site-bg-color), transparent)'
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, var(--site-bg-color), transparent)'
            }}
          />
        </div>

        {/* Grid Estático (fallback para poucos parceiros) */}
        {partners.length <= 4 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 transition-all duration-300 hover:scale-110"
                style={
                  systemName === 'minimalism'
                    ? {
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--panel-bg)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }
                    : {
                        borderRadius: '16px',
                        border: '2px solid #000000',
                        backgroundColor: 'var(--panel-bg)',
                        boxShadow: '2px 2px 0px #000000'
                      }
                }
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  style={{ maxHeight: '80px' }}
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
