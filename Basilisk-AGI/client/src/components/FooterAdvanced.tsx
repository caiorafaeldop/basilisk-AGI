/**
 * Advanced Footer Component
 * Footer completo e totalmente customizável
 */

import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react";
import { useState } from "react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useDesignSystem } from "@/hooks/useDesignSystem";

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const FooterAdvanced = () => {
  const { config } = useSiteConfig();
  const { systemName } = useDesignSystem();
  const [email, setEmail] = useState('');

  const quickLinks = config?.footerQuickLinks || [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Blog", href: "#blog" },
    { name: "Contato", href: "#contato" },
  ];

  const services = config?.footerServices || [];

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de newsletter
    console.log('Newsletter:', email);
    setEmail('');
  };

  const footerBg = config?.footerBg || 'var(--panel-bg)';
  const footerTextColor = config?.footerTextColor || 'var(--site-text-color)';

  return (
    <footer 
      className="border-t"
      style={{
        backgroundColor: footerBg,
        borderColor: 'var(--border-color)',
        color: footerTextColor
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {config?.logo ? (
                <img 
                  src={config.logo} 
                  alt={config.siteName} 
                  className="h-12 w-auto mb-4"
                />
              ) : (
                <h3 className="text-2xl font-bold mb-2" style={{ color: footerTextColor }}>
                  {config?.siteName || 'Meu Site'}
                </h3>
              )}
              <p className="text-sm leading-relaxed" style={{ color: footerTextColor, opacity: 0.8 }}>
                {config?.footerDescription || config?.heroSubtitle || 'Transformando ideias em realidade digital.'}
              </p>
            </div>

            {/* Social Media */}
            {config?.footerShowSocial !== false && (
              <div className="flex gap-3">
                {config?.instagram && (
                  <a
                    href={config.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={
                      systemName === 'minimalism'
                        ? {
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--muted-bg)'
                          }
                        : {
                            border: '2px solid #000000',
                            boxShadow: '2px 2px 0px #000000'
                          }
                    }
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {config?.facebook && (
                  <a
                    href={config.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={
                      systemName === 'minimalism'
                        ? {
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--muted-bg)'
                          }
                        : {
                            border: '2px solid #000000',
                            boxShadow: '2px 2px 0px #000000'
                          }
                    }
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {config?.linkedin && (
                  <a
                    href={config.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={
                      systemName === 'minimalism'
                        ? {
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--muted-bg)'
                          }
                        : {
                            border: '2px solid #000000',
                            boxShadow: '2px 2px 0px #000000'
                          }
                    }
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {config?.twitter && (
                  <a
                    href={config.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={
                      systemName === 'minimalism'
                        ? {
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--muted-bg)'
                          }
                        : {
                            border: '2px solid #000000',
                            boxShadow: '2px 2px 0px #000000'
                          }
                    }
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {config?.youtube && (
                  <a
                    href={config.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={
                      systemName === 'minimalism'
                        ? {
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--muted-bg)'
                          }
                        : {
                            border: '2px solid #000000',
                            boxShadow: '2px 2px 0px #000000'
                          }
                    }
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
                {config?.tiktok && (
                  <a
                    href={config.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={
                      systemName === 'minimalism'
                        ? {
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--muted-bg)'
                          }
                        : {
                            border: '2px solid #000000',
                            boxShadow: '2px 2px 0px #000000'
                          }
                    }
                  >
                    <TikTokIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: footerTextColor }}>
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm hover:underline transition-all"
                    style={{ color: footerTextColor, opacity: 0.8 }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          {services.length > 0 && (
            <div>
              <h4 className="text-lg font-bold mb-4" style={{ color: footerTextColor }}>
                Serviços
              </h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="text-sm" style={{ color: footerTextColor, opacity: 0.8 }}>
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: footerTextColor }}>
              Contato
            </h4>
            <ul className="space-y-3 mb-6">
              {config?.email && (
                <li className="flex items-center gap-2 text-sm" style={{ color: footerTextColor, opacity: 0.8 }}>
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${config.email}`} className="hover:underline">
                    {config.email}
                  </a>
                </li>
              )}
              {config?.phone && (
                <li className="flex items-center gap-2 text-sm" style={{ color: footerTextColor, opacity: 0.8 }}>
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${config.phone}`} className="hover:underline">
                    {config.phone}
                  </a>
                </li>
              )}
              {config?.address && (
                <li className="flex items-start gap-2 text-sm" style={{ color: footerTextColor, opacity: 0.8 }}>
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {config.address}
                    {config.city && `, ${config.city}`}
                    {config.state && ` - ${config.state}`}
                  </span>
                </li>
              )}
            </ul>

            {/* Newsletter */}
            {config?.footerShowNewsletter && (
              <div>
                <h5 className="text-sm font-semibold mb-2" style={{ color: footerTextColor }}>
                  {config.footerNewsletterTitle || 'Newsletter'}
                </h5>
                <p className="text-xs mb-3" style={{ color: footerTextColor, opacity: 0.7 }}>
                  {config.footerNewsletterSubtitle || 'Receba novidades por email'}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu email"
                    className="flex-1 px-3 py-2 text-sm rounded-lg"
                    style={{
                      backgroundColor: 'var(--muted-bg)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--site-text-color)'
                    }}
                    required
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: '#ffffff'
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-12 pt-8 border-t"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: footerTextColor, opacity: 0.7 }}>
              {config?.footerCopyright || `© ${new Date().getFullYear()} ${config?.siteName || 'Meu Site'}. Todos os direitos reservados.`}
            </p>
            {config?.footerLegalText && (
              <p className="text-xs" style={{ color: footerTextColor, opacity: 0.6 }}>
                {config.footerLegalText}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
