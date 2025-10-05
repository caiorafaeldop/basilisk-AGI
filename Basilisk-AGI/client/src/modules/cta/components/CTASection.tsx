/**
 * CTA Section Component
 * Seção de Call to Action com múltiplos estilos
 */

import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { useButtonEffects } from '@/hooks/useButtonEffects';
import { handleHeroCta } from '@/utils/heroCtaHandler';
import { useSiteConfig } from '@/hooks/useSiteConfig';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  layout?: 'centered' | 'split' | 'banner';
  showIcons?: boolean;
  backgroundImage?: string;
}

export const CTASection = ({
  title = 'Pronto para Começar?',
  subtitle = 'Entre em contato conosco e transforme suas ideias em realidade',
  primaryButtonText = 'Fale Conosco',
  secondaryButtonText = 'Saiba Mais',
  layout = 'centered',
  showIcons = true,
  backgroundImage
}: CTASectionProps) => {
  const { systemName } = useDesignSystem();
  const { getButtonHoverClass } = useButtonEffects();
  const { config } = useSiteConfig();

  // Layout Centralizado
  if (layout === 'centered') {
    return (
      <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Image */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              filter: 'brightness(0.3)'
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: systemName === 'minimalism'
              ? `linear-gradient(135deg, var(--primary-color)15 0%, var(--secondary-color)15 100%)`
              : 'rgba(0, 0, 0, 0.5)'
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 
              className="text-4xl md:text-6xl font-bold mb-6"
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
                      textShadow: '8px 8px 0px #000000'
                    }
              }
            >
              {title}
            </h2>

            <p 
              className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
              style={{ color: 'var(--site-text-color)', opacity: 0.9 }}
            >
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary Button */}
              <button
                onClick={() => handleHeroCta(config)}
                className={`px-8 py-4 font-semibold flex items-center justify-center gap-2 transition-all ${getButtonHoverClass()}`}
                style={
                  systemName === 'minimalism'
                    ? {
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                        color: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                      }
                    : {
                        backgroundColor: 'var(--primary-color)',
                        color: '#000000',
                        border: '4px solid #000000',
                        borderRadius: '12px',
                        boxShadow: '6px 6px 0px #000000'
                      }
                }
              >
                {showIcons && <MessageCircle className="w-5 h-5" />}
                {primaryButtonText}
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Secondary Button */}
              <button
                onClick={() => {
                  const aboutSection = document.getElementById('sobre');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`px-8 py-4 font-semibold flex items-center justify-center gap-2 transition-all ${getButtonHoverClass()}`}
                style={
                  systemName === 'minimalism'
                    ? {
                        backgroundColor: 'transparent',
                        color: 'var(--primary-color)',
                        border: '2px solid var(--primary-color)',
                        borderRadius: '8px'
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: 'var(--primary-color)',
                        border: '4px solid var(--primary-color)',
                        borderRadius: '12px',
                        boxShadow: '4px 4px 0px var(--primary-color)'
                      }
                }
              >
                {secondaryButtonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout Split
  if (layout === 'split') {
    return (
      <section id="cta" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div 
            className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12"
            style={
              systemName === 'minimalism'
                ? {
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--panel-bg)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)'
                  }
                : {
                    borderRadius: '24px',
                    border: '4px solid #000000',
                    backgroundColor: 'var(--panel-bg)',
                    boxShadow: '8px 8px 0px #000000'
                  }
            }
          >
            {/* Text */}
            <div>
              <h2 
                className="text-3xl md:text-5xl font-bold mb-4"
                style={
                  systemName === 'minimalism'
                    ? {
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }
                    : {
                        color: 'var(--site-text-color)'
                      }
                }
              >
                {title}
              </h2>
              <p className="text-lg mb-6" style={{ color: 'var(--site-text-color)', opacity: 0.8 }}>
                {subtitle}
              </p>

              {/* Contact Info */}
              {showIcons && (
                <div className="space-y-3">
                  {config?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
                      <span style={{ color: 'var(--site-text-color)' }}>{config.phone}</span>
                    </div>
                  )}
                  {config?.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
                      <span style={{ color: 'var(--site-text-color)' }}>{config.email}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleHeroCta(config)}
                className={`w-full px-8 py-4 font-semibold flex items-center justify-center gap-2 transition-all ${getButtonHoverClass()}`}
                style={
                  systemName === 'minimalism'
                    ? {
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                        color: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }
                    : {
                        backgroundColor: 'var(--primary-color)',
                        color: '#000000',
                        border: '3px solid #000000',
                        borderRadius: '12px',
                        boxShadow: '4px 4px 0px #000000'
                      }
                }
              >
                <MessageCircle className="w-5 h-5" />
                {primaryButtonText}
              </button>

              <button
                onClick={() => {
                  const aboutSection = document.getElementById('sobre');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`w-full px-8 py-4 font-semibold transition-all ${getButtonHoverClass()}`}
                style={
                  systemName === 'minimalism'
                    ? {
                        backgroundColor: 'transparent',
                        color: 'var(--primary-color)',
                        border: '2px solid var(--primary-color)',
                        borderRadius: '8px'
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: 'var(--primary-color)',
                        border: '3px solid var(--primary-color)',
                        borderRadius: '12px'
                      }
                }
              >
                {secondaryButtonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout Banner
  return (
    <section 
      id="cta" 
      className="py-12 md:py-16"
      style={{
        backgroundColor: systemName === 'minimalism' 
          ? 'var(--primary-color)' 
          : 'var(--primary-color)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white">
              {title}
            </h3>
            <p className="text-lg text-white/90">
              {subtitle}
            </p>
          </div>

          <button
            onClick={() => handleHeroCta(config)}
            className={`px-8 py-4 font-semibold flex items-center gap-2 transition-all ${getButtonHoverClass()}`}
            style={
              systemName === 'minimalism'
                ? {
                    backgroundColor: '#ffffff',
                    color: 'var(--primary-color)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }
                : {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: '3px solid #000000',
                    borderRadius: '12px',
                    boxShadow: '4px 4px 0px #000000'
                  }
            }
          >
            {primaryButtonText}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
