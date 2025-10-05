/**
 * Counter Section Component
 * Seção de contadores animados com números que sobem
 */

import { useEffect, useRef, useState } from 'react';
import { useDesignSystem } from '@/hooks/useDesignSystem';

interface Counter {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: string;
}

interface CounterSectionProps {
  counters: Counter[];
  title?: string;
  subtitle?: string;
  duration?: number; // Duração da animação em ms
}

export const CounterSection = ({ counters, title, subtitle, duration = 2000 }: CounterSectionProps) => {
  const { systemName } = useDesignSystem();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para iniciar animação quando visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contador" className="py-16 md:py-24" ref={sectionRef}>
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

        {/* Counters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter) => (
            <CounterItem
              key={counter.id}
              counter={counter}
              isVisible={isVisible}
              duration={duration}
              systemName={systemName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente individual do contador
const CounterItem = ({ 
  counter, 
  isVisible, 
  duration, 
  systemName 
}: { 
  counter: Counter; 
  isVisible: boolean; 
  duration: number;
  systemName: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const increment = counter.value / (duration / 16); // 60 FPS
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= counter.value) {
        setCount(counter.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, counter.value, duration]);

  return (
    <div 
      className="text-center p-8 transition-all duration-300 hover:scale-105"
      style={
        systemName === 'minimalism'
          ? {
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: 'var(--panel-bg)'
            }
          : {
              borderRadius: '20px',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              backgroundColor: 'var(--panel-bg)'
            }
      }
    >
      {/* Icon */}
      {counter.icon && (
        <div className="text-5xl mb-4">{counter.icon}</div>
      )}

      {/* Number */}
      <div 
        className="text-5xl md:text-6xl font-bold mb-2"
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
        {counter.prefix}{count.toLocaleString()}{counter.suffix}
      </div>

      {/* Label */}
      <div 
        className="text-lg font-medium"
        style={{ color: 'var(--site-text-color)', opacity: 0.8 }}
      >
        {counter.label}
      </div>
    </div>
  );
};
