/**
 * Contact Form Component
 * Formulário de contato customizável com validação
 */

import { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { useButtonEffects } from '@/hooks/useButtonEffects';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  fields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea';
    required?: boolean;
    placeholder?: string;
  }>;
  onSubmit?: (data: any) => Promise<void>;
  submitText?: string;
}

export const ContactForm = ({
  title,
  subtitle,
  fields = [
    { name: 'name', label: 'Nome', type: 'text', required: true, placeholder: 'Seu nome completo' },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'seu@email.com' },
    { name: 'phone', label: 'Telefone', type: 'tel', required: false, placeholder: '(00) 00000-0000' },
    { name: 'message', label: 'Mensagem', type: 'textarea', required: true, placeholder: 'Como podemos ajudar?' }
  ],
  onSubmit,
  submitText = 'Enviar Mensagem'
}: ContactFormProps) => {
  const { systemName } = useDesignSystem();
  const { getButtonHoverClass } = useButtonEffects();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erro ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} é obrigatório`;
      }

      // Validação de email
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Email inválido';
        }
      }

      // Validação de telefone
      if (field.type === 'tel' && formData[field.name]) {
        const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
        if (!phoneRegex.test(formData[field.name].replace(/\D/g, ''))) {
          newErrors[field.name] = 'Telefone inválido';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulação de envio
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Form data:', formData);
      }

      setIsSuccess(true);
      setFormData({});

      // Reset success message após 5s
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
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

          {/* Form */}
          <div 
            className="p-8 md:p-12"
            style={
              systemName === 'minimalism'
                ? {
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--panel-bg)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                  }
                : {
                    borderRadius: '20px',
                    border: '3px solid #000000',
                    backgroundColor: 'var(--panel-bg)',
                    boxShadow: '6px 6px 0px #000000'
                  }
            }
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle 
                  className="w-16 h-16 mx-auto mb-4" 
                  style={{ color: 'var(--primary-color)' }} 
                />
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--site-text-color)' }}>
                  Mensagem Enviada!
                </h3>
                <p style={{ color: 'var(--site-text-color)', opacity: 0.7 }}>
                  Obrigado pelo contato. Responderemos em breve!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map(field => (
                  <div key={field.name}>
                    <label 
                      htmlFor={field.name}
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--site-text-color)' }}
                    >
                      {field.label}
                      {field.required && <span style={{ color: 'var(--primary-color)' }}> *</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: 'var(--muted-bg)',
                          border: `1px solid ${errors[field.name] ? '#ef4444' : 'var(--border-color)'}`,
                          color: 'var(--site-text-color)',
                          borderRadius: systemName === 'minimalism' ? '8px' : '12px'
                        }}
                      />
                    ) : (
                      <input
                        id={field.name}
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: 'var(--muted-bg)',
                          border: `1px solid ${errors[field.name] ? '#ef4444' : 'var(--border-color)'}`,
                          color: 'var(--site-text-color)',
                          borderRadius: systemName === 'minimalism' ? '8px' : '12px'
                        }}
                      />
                    )}

                    {errors[field.name] && (
                      <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all ${getButtonHoverClass()}`}
                  style={
                    systemName === 'minimalism'
                      ? {
                          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                          color: '#ffffff',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                          opacity: isSubmitting ? 0.7 : 1
                        }
                      : {
                          backgroundColor: 'var(--primary-color)',
                          color: '#000000',
                          border: '3px solid #000000',
                          borderRadius: '12px',
                          boxShadow: '4px 4px 0px #000000',
                          opacity: isSubmitting ? 0.7 : 1
                        }
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {submitText}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
