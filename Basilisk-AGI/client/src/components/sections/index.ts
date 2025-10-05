/**
 * Sections Index
 * Exportação centralizada de todas as seções disponíveis
 * Com lazy loading para melhor performance
 */

import { lazy, ComponentType } from 'react';

// Seções principais com lazy loading
export const GallerySection = lazy(() => import('@/modules/gallery/components/GallerySection').then(m => ({ default: m.GallerySection })));
export const VideoSection = lazy(() => import('@/modules/video/components/VideoSection').then(m => ({ default: m.VideoSection })));
export const CounterSection = lazy(() => import('@/modules/counter/components/CounterSection').then(m => ({ default: m.CounterSection })));
export const PartnersSection = lazy(() => import('@/modules/partners/components/PartnersSection').then(m => ({ default: m.PartnersSection })));
export const TimelineSection = lazy(() => import('@/modules/timeline/components/TimelineSection').then(m => ({ default: m.TimelineSection })));
export const PricingSection = lazy(() => import('@/modules/pricing/components/PricingSection').then(m => ({ default: m.PricingSection })));
export const FAQSection = lazy(() => import('@/modules/faq/components/FAQSection').then(m => ({ default: m.FAQSection })));
export const CTASection = lazy(() => import('@/modules/cta/components/CTASection').then(m => ({ default: m.CTASection })));
export const ContactForm = lazy(() => import('@/modules/contact/components/ContactForm').then(m => ({ default: m.ContactForm })));
export const GoogleMapsSection = lazy(() => import('@/modules/maps/components/GoogleMapsSection').then(m => ({ default: m.GoogleMapsSection })));

// Metadata das seções para facilitar uso
export interface SectionMetadata {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'engagement' | 'conversion' | 'social-proof';
  icon: string;
  component: ComponentType<any>;
  enabled: boolean;
}

export const AVAILABLE_SECTIONS: SectionMetadata[] = [
  {
    id: 'gallery',
    name: 'Galeria',
    description: 'Exiba suas imagens em um grid elegante',
    category: 'content',
    icon: '🖼️',
    component: GallerySection,
    enabled: true,
  },
  {
    id: 'video',
    name: 'Vídeo',
    description: 'Incorpore vídeos do YouTube ou Vimeo',
    category: 'content',
    icon: '🎥',
    component: VideoSection,
    enabled: true,
  },
  {
    id: 'counter',
    name: 'Contador',
    description: 'Mostre números e estatísticas animadas',
    category: 'social-proof',
    icon: '📊',
    component: CounterSection,
    enabled: true,
  },
  {
    id: 'partners',
    name: 'Parceiros',
    description: 'Carrossel de logos de parceiros',
    category: 'social-proof',
    icon: '🤝',
    component: PartnersSection,
    enabled: true,
  },
  {
    id: 'timeline',
    name: 'Linha do Tempo',
    description: 'Mostre sua história cronologicamente',
    category: 'content',
    icon: '📅',
    component: TimelineSection,
    enabled: true,
  },
  {
    id: 'pricing',
    name: 'Preços',
    description: 'Tabela de preços e planos',
    category: 'conversion',
    icon: '💰',
    component: PricingSection,
    enabled: true,
  },
  {
    id: 'faq',
    name: 'FAQ',
    description: 'Perguntas frequentes em accordion',
    category: 'engagement',
    icon: '❓',
    component: FAQSection,
    enabled: true,
  },
  {
    id: 'cta',
    name: 'Call to Action',
    description: 'Chamada para ação destacada',
    category: 'conversion',
    icon: '📢',
    component: CTASection,
    enabled: true,
  },
  {
    id: 'contact',
    name: 'Formulário de Contato',
    description: 'Formulário para captura de leads',
    category: 'conversion',
    icon: '📧',
    component: ContactForm,
    enabled: true,
  },
  {
    id: 'maps',
    name: 'Google Maps',
    description: 'Mapa com sua localização',
    category: 'content',
    icon: '🗺️',
    component: GoogleMapsSection,
    enabled: true,
  },
];

// Componentes de layout
export { FooterAdvanced } from '@/components/FooterAdvanced';
export { SEOManager } from '@/components/SEOManager';

// Hooks
export { useButtonEffects } from '@/hooks/useButtonEffects';
export { useImageFilters } from '@/hooks/useImageFilters';
export { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';

// Utils
export * from '@/utils/googleFonts';
export * from '@/utils/colorSystem';

// Design Patterns
export * from '@/patterns/DesignSystemStrategy';
export * from '@/patterns/ConfigBuilder';
export * from '@/patterns/ComponentFactory';
export * from '@/patterns/ConfigAdapter';
export * from '@/patterns/ConfigObserver';
