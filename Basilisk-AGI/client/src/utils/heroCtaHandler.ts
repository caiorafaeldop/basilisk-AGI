interface HeroConfig {
  heroCtaAction?: 'whatsapp' | 'instagram' | 'external' | 'section';
  heroCtaText?: string;
  heroCtaLink?: string;
  whatsapp?: string;
  instagram?: string;
  heroTitle?: string;
}

export const handleHeroCta = (config: HeroConfig, ctaLink?: string) => {
  const action = config.heroCtaAction || 'whatsapp'; // Default para manter compatibilidade
  
  switch (action) {
    case 'whatsapp':
      if (config.whatsapp) {
        const message = encodeURIComponent(config.heroCtaText || 'Olá! Vim pelo site.');
        window.open(`https://wa.me/${config.whatsapp}?text=${message}`, '_blank');
      }
      break;
      
    case 'instagram':
      if (config.instagram) {
        window.open(`https://instagram.com/${config.instagram}`, '_blank');
      }
      break;
      
    case 'external':
      if (ctaLink || config.heroCtaLink) {
        window.open(ctaLink || config.heroCtaLink, '_blank');
      }
      break;
      
    case 'section':
      const sectionId = ctaLink || config.heroCtaLink || 'sobre';
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      break;
      
    default:
      // Fallback para comportamento antigo (WhatsApp)
      if (config.whatsapp) {
        const message = encodeURIComponent(config.heroCtaText || 'Olá! Vim pelo site.');
        window.open(`https://wa.me/${config.whatsapp}?text=${message}`, '_blank');
      }
  }
};
