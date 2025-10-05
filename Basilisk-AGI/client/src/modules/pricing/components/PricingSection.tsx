/**
 * Pricing Section Component
 * Tabela de preços/planos com destaque
 */

import { Check, X, Star } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { useButtonEffects } from '@/hooks/useButtonEffects';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  title?: string;
  subtitle?: string;
  currency?: string;
}

export const PricingSection = ({ 
  plans, 
  title, 
  subtitle,
  currency = 'R$'
}: PricingSectionProps) => {
  const { systemName } = useDesignSystem();
  const { getButtonStyle, getButtonHoverClass } = useButtonEffects();

  return (
    <section id="pricing" className="py-16 md:py-24">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative transition-all duration-300 ${
                plan.highlighted ? 'md:-translate-y-4 md:scale-105' : 'hover:scale-105'
              }`}
            >
              {/* Badge de Destaque */}
              {plan.highlighted && (
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full flex items-center gap-1"
                  style={
                    systemName === 'minimalism'
                      ? {
                          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                          color: '#ffffff',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }
                      : {
                          backgroundColor: 'var(--primary-color)',
                          color: '#000000',
                          border: '2px solid #000000',
                          boxShadow: '2px 2px 0px #000000'
                        }
                  }
                >
                  <Star className="w-4 h-4" fill="currentColor" />
                  <span className="text-sm font-bold">Mais Popular</span>
                </div>
              )}

              {/* Card */}
              <div 
                className="p-8 h-full flex flex-col"
                style={
                  systemName === 'minimalism'
                    ? {
                        borderRadius: '16px',
                        border: plan.highlighted ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                        backgroundColor: 'var(--panel-bg)',
                        boxShadow: plan.highlighted 
                          ? '0 8px 24px rgba(0, 0, 0, 0.12)' 
                          : '0 4px 12px rgba(0, 0, 0, 0.08)'
                      }
                    : {
                        borderRadius: '20px',
                        border: plan.highlighted ? '4px solid var(--primary-color)' : '3px solid #000000',
                        backgroundColor: 'var(--panel-bg)',
                        boxShadow: plan.highlighted 
                          ? '6px 6px 0px var(--primary-color)' 
                          : '4px 4px 0px #000000'
                      }
                }
              >
                {/* Nome do Plano */}
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--site-text-color)' }}>
                  {plan.name}
                </h3>

                {/* Descrição */}
                <p className="text-sm mb-6" style={{ color: 'var(--site-text-color)', opacity: 0.7 }}>
                  {plan.description}
                </p>

                {/* Preço */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="text-5xl font-bold"
                      style={
                        systemName === 'minimalism'
                          ? {
                              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }
                          : {
                              color: 'var(--primary-color)'
                            }
                      }
                    >
                      {currency}{plan.price}
                    </span>
                    <span className="text-lg" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>
                      /{plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check 
                          className="w-5 h-5 flex-shrink-0 mt-0.5" 
                          style={{ color: 'var(--primary-color)' }} 
                        />
                      ) : (
                        <X 
                          className="w-5 h-5 flex-shrink-0 mt-0.5" 
                          style={{ color: 'var(--site-text-color)', opacity: 0.3 }} 
                        />
                      )}
                      <span 
                        className="text-sm"
                        style={{ 
                          color: 'var(--site-text-color)', 
                          opacity: feature.included ? 1 : 0.5,
                          textDecoration: feature.included ? 'none' : 'line-through'
                        }}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    if (plan.ctaLink) {
                      window.open(plan.ctaLink, '_blank');
                    }
                  }}
                  className={`w-full py-3 px-6 font-semibold transition-all ${getButtonHoverClass()}`}
                  style={
                    systemName === 'minimalism'
                      ? {
                          background: plan.highlighted 
                            ? `linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)`
                            : 'transparent',
                          color: plan.highlighted ? '#ffffff' : 'var(--primary-color)',
                          border: plan.highlighted ? 'none' : '1px solid var(--primary-color)',
                          borderRadius: '8px',
                          boxShadow: plan.highlighted ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'
                        }
                      : {
                          backgroundColor: plan.highlighted ? 'var(--primary-color)' : 'transparent',
                          color: plan.highlighted ? '#000000' : 'var(--primary-color)',
                          border: '3px solid var(--primary-color)',
                          borderRadius: '12px',
                          boxShadow: plan.highlighted ? '3px 3px 0px #000000' : 'none'
                        }
                  }
                >
                  {plan.ctaText || 'Escolher Plano'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
