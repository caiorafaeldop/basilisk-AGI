/**
 * Hook para animações de scroll
 * Detecta quando elementos entram na viewport e aplica animações
 */

import { useEffect, useRef, useState } from 'react';
import { useSiteConfig } from './useSiteConfig';

export type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'bounce';

interface UseScrollAnimationOptions {
  animationType?: AnimationType;
  threshold?: number;
  delay?: number;
  duration?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { config } = useSiteConfig();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const {
    animationType = 'fade',
    threshold = 0.1,
    delay = 0,
    duration = 600
  } = options;

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef || !config?.enableFadeIn) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay, config?.enableFadeIn]);

  const getAnimationStyle = (): React.CSSProperties => {
    const transitionDuration = config?.transitionSpeed || `${duration}ms`;

    const baseStyle: React.CSSProperties = {
      transition: `all ${transitionDuration} ease-out`,
      transitionDelay: config?.animationDelay || '0ms'
    };

    if (!isVisible) {
      switch (animationType) {
        case 'fade':
          return { ...baseStyle, opacity: 0 };
        case 'slide-up':
          return { ...baseStyle, opacity: 0, transform: 'translateY(50px)' };
        case 'slide-down':
          return { ...baseStyle, opacity: 0, transform: 'translateY(-50px)' };
        case 'slide-left':
          return { ...baseStyle, opacity: 0, transform: 'translateX(50px)' };
        case 'slide-right':
          return { ...baseStyle, opacity: 0, transform: 'translateX(-50px)' };
        case 'zoom':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.8)' };
        case 'bounce':
          return { ...baseStyle, opacity: 0, transform: 'translateY(50px) scale(0.9)' };
        default:
          return { ...baseStyle, opacity: 0 };
      }
    }

    return {
      ...baseStyle,
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)'
    };
  };

  return {
    ref,
    isVisible,
    style: getAnimationStyle()
  };
};

// Hook para parallax
export const useParallax = (speed: number = 0.5) => {
  const { config } = useSiteConfig();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!config?.enableParallax) return;

    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, config?.enableParallax]);

  return {
    ref,
    style: {
      transform: `translateY(${offset}px)`
    }
  };
};
