import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);


const Footer = () => {
  const { config } = useSiteConfig();
  
  const quickLinks = config?.footerQuickLinks || [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Blog", href: "#blog" },
    { name: "Contato", href: "#contato" },
  ];

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1); // Remove o #
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80; // Altura do header fixo
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const services = config?.footerServices || [];

  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50 text-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white">
                {config?.siteName || 'Meu Site'}
              </h3>
            </div>
            {config?.footerDescription && (
              <p className="text-slate-300 leading-relaxed mb-6">
                {config.footerDescription}
              </p>
            )}
            
            {/* Social media */}
            <div className="flex flex-wrap gap-4">
              {config?.linkedin && (
                <a 
                  href={config.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white smooth-transition"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {config?.instagram && (
                <a 
                  href={config.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white smooth-transition"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {config?.tiktok && (
                <a 
                  href={config.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white smooth-transition"
                  title="TikTok"
                >
                  <TikTokIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleNavClick(link.href)}
                    className="text-slate-300 hover:text-white smooth-transition text-left"
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
              <h4 className="text-lg font-semibold mb-6 text-white">
                Serviços
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="text-slate-300">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Contato
            </h4>
            <div className="space-y-4">
              {config?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-slate-300" />
                  <span className="text-slate-300">
                    {config.phone}
                  </span>
                </div>
              )}
              {config?.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-slate-300" />
                  <span className="text-slate-300">
                    {config.email}
                  </span>
                </div>
              )}
              {config?.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-slate-300" />
                  <div className="flex flex-col">
                    <span className="text-slate-300">
                      {config.address}
                    </span>
                    {config.addressComplement && (
                      <span className="text-slate-300 text-sm">
                        {config.addressComplement}
                      </span>
                    )}
                    {(config.city || config.state || config.zipCode) && (
                      <span className="text-slate-300 text-sm">
                        {config.city}{config.city && config.state && ', '}{config.state} {config.zipCode}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {config?.businessHours && (
              <div className="mt-6 p-4 bg-primary-foreground/10 rounded-lg">
                <p className="text-sm text-primary-foreground/80">
                  <strong>Horário de Atendimento:</strong><br />
                  {config.businessHours}
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-slate-300 text-sm">
              © {new Date().getFullYear()} {config?.siteName || 'Meu Site'}. {config?.footerCopyright || 'Todos os direitos reservados.'}
            </p>
          </div>

          {config?.footerLegalText && (
            <div className="text-center md:text-right">
              <p className="text-primary-foreground/60 text-xs max-w-md">
                {config.footerLegalText}
              </p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;