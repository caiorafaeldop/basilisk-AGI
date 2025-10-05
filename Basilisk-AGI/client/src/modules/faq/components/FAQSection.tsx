/**
 * FAQ Section Component
 * Seção de perguntas frequentes com accordion
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export const FAQSection = ({ faqs, title, subtitle }: FAQSectionProps) => {
  const { systemName } = useDesignSystem();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
                <p className="text-lg md:text-xl" style={{ color: 'var(--site-text-color)', opacity: 0.8 }}>
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="overflow-hidden transition-all duration-300"
                style={
                  systemName === 'minimalism'
                    ? {
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--panel-bg)',
                        boxShadow: openId === faq.id ? '0 8px 16px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }
                    : {
                        borderRadius: '16px',
                        border: '2px solid #000000',
                        backgroundColor: 'var(--panel-bg)',
                        boxShadow: openId === faq.id ? '4px 4px 0px #000000' : '2px 2px 0px #000000'
                      }
                }
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-all hover:opacity-80"
                  aria-expanded={openId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-question-${faq.id}`}
                  aria-label={`Expandir pergunta: ${faq.question}`}
                >
                  <span className="text-lg font-semibold" style={{ color: 'var(--site-text-color)' }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                    style={{ color: 'var(--primary-color)' }}
                    aria-hidden="true"
                  />
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openId === faq.id ? '500px' : '0'
                  }}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p 
                      className="leading-relaxed"
                      style={{ color: 'var(--site-text-color)', opacity: 0.8 }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
