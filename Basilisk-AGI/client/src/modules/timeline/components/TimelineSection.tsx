/**
 * Timeline Section Component
 * Linha do tempo visual com eventos
 */

import { useDesignSystem } from '@/hooks/useDesignSystem';
import { Calendar, Check } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: string;
  completed?: boolean;
}

interface TimelineSectionProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  layout?: 'vertical' | 'horizontal';
}

export const TimelineSection = ({ 
  events, 
  title, 
  subtitle,
  layout = 'vertical'
}: TimelineSectionProps) => {
  const { systemName } = useDesignSystem();

  return (
    <section id="timeline" className="py-16 md:py-24">
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

        {/* Timeline Vertical */}
        {layout === 'vertical' && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Linha vertical */}
              <div 
                className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: 'var(--border-color)' }}
              />

              {/* Eventos */}
              <div className="space-y-12">
                {events.map((event, index) => (
                  <div 
                    key={event.id}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Conteúdo */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div 
                        className="p-6 transition-all duration-300 hover:scale-105"
                        style={
                          systemName === 'minimalism'
                            ? {
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--panel-bg)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                              }
                            : {
                                borderRadius: '16px',
                                border: '2px solid #000000',
                                backgroundColor: 'var(--panel-bg)',
                                boxShadow: '3px 3px 0px #000000'
                              }
                        }
                      >
                        {/* Data */}
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4" style={{ color: 'var(--primary-color)' }} />
                          <span className="text-sm font-medium" style={{ color: 'var(--primary-color)' }}>
                            {event.date}
                          </span>
                        </div>

                        {/* Título */}
                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--site-text-color)' }}>
                          {event.title}
                        </h3>

                        {/* Descrição */}
                        <p className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.7 }}>
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Ícone central */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={
                          systemName === 'minimalism'
                            ? {
                                backgroundColor: event.completed ? 'var(--primary-color)' : 'var(--panel-bg)',
                                border: `2px solid ${event.completed ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                              }
                            : {
                                backgroundColor: event.completed ? 'var(--primary-color)' : 'var(--panel-bg)',
                                border: '3px solid #000000',
                                boxShadow: '2px 2px 0px #000000'
                              }
                        }
                      >
                        {event.completed ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : event.icon ? (
                          <span className="text-2xl">{event.icon}</span>
                        ) : (
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--border-color)' }} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timeline Horizontal */}
        {layout === 'horizontal' && (
          <div className="overflow-x-auto pb-8">
            <div className="flex gap-8 min-w-max px-4">
              {events.map((event, index) => (
                <div key={event.id} className="flex flex-col items-center" style={{ minWidth: '250px' }}>
                  {/* Ícone */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={
                      systemName === 'minimalism'
                        ? {
                            backgroundColor: event.completed ? 'var(--primary-color)' : 'var(--panel-bg)',
                            border: `2px solid ${event.completed ? 'var(--primary-color)' : 'var(--border-color)'}`,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }
                        : {
                            backgroundColor: event.completed ? 'var(--primary-color)' : 'var(--panel-bg)',
                            border: '3px solid #000000',
                            boxShadow: '3px 3px 0px #000000'
                          }
                    }
                  >
                    {event.completed ? (
                      <Check className="w-8 h-8 text-white" />
                    ) : event.icon ? (
                      <span className="text-3xl">{event.icon}</span>
                    ) : (
                      <span className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Card */}
                  <div 
                    className="p-6 w-full"
                    style={
                      systemName === 'minimalism'
                        ? {
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--panel-bg)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                          }
                        : {
                            borderRadius: '16px',
                            border: '2px solid #000000',
                            backgroundColor: 'var(--panel-bg)',
                            boxShadow: '3px 3px 0px #000000'
                          }
                    }
                  >
                    <div className="text-sm font-medium mb-2" style={{ color: 'var(--primary-color)' }}>
                      {event.date}
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--site-text-color)' }}>
                      {event.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.7 }}>
                      {event.description}
                    </p>
                  </div>

                  {/* Linha conectora */}
                  {index < events.length - 1 && (
                    <div 
                      className="absolute top-8 left-full w-8 h-0.5"
                      style={{ backgroundColor: 'var(--border-color)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
