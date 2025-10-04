import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);


const Footer = () => {
  const quickLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Para Trabalhadores", href: "#trabalhadores" },  
    { name: "Sobre", href: "#sobre" },
    { name: "Blog", href: "#blog" },
    { name: "Contato", href: "#contato" },
    { name: "Localização", href: "#localizacao" }
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

  const services = [
    "Ações Trabalhistas",
    "Consultoria Preventiva",
    "Auditoria Trabalhista",
    "Contratos de Trabalho",
    "Mediação de Conflitos",
    "Treinamento Corporativo"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-playfair font-bold mb-2">
                Paulo Maia Advocacia
              </h3>
              <p className="text-primary-foreground/80">
                Especialista em Direito Trabalhista
              </p>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6">
              Soluções trabalhistas com excelência e ética, defendendo direitos 
              de trabalhadores há mais de 30 anos.
            </p>
            
            {/* Social media - Estilo igual ao header */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://www.linkedin.com/in/paulo-maia-advogado" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground hover:text-white smooth-transition"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/paulomaiaadvocacia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground hover:text-white smooth-transition"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@paulomaiaadv?_t=ZM-8zwTXi6FvTc&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground hover:text-white smooth-transition"
                title="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleNavClick(link.href)}
                    className="text-primary-foreground/70 hover:text-primary-foreground smooth-transition text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">
              Serviços
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-primary-foreground/70">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-foreground/70" />
                <span className="text-primary-foreground/70">
                  (83) 9109-0902
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-foreground/70" />
                <span className="text-primary-foreground/70">
                  contato@paulomaia.adv.br
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-foreground/70" />
                <div className="flex flex-col">
                  <span className="text-primary-foreground/70">
                    Green Tower - Av. Sen. Rui Carneiro 293
                  </span>
                  <span className="text-primary-foreground/70 text-sm">
                    Sala 1301 - João Pessoa, PB, 58032-010
                  </span>
                  <button
                    onClick={() => window.open('https://maps.google.com/?q=Green+Tower+Av.+Sen.+Rui+Carneiro+293+sala+1301+João+Pessoa+PB+58032-010', '_blank')}
                    className="text-primary-foreground/90 hover:text-primary-foreground text-xs underline mt-1 text-left"
                  >
                    Ver no Google Maps
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-foreground/10 rounded-lg">
              <p className="text-sm text-primary-foreground/80">
                <strong>Horário de Atendimento:</strong><br />
                Segunda a Sexta: 9h às 18h
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-primary-foreground/70 text-sm">
              © 2025 Paulo Maia Advocacia. Todos os direitos reservados.
            </p>
            <p className="text-primary-foreground/60 text-xs mt-1">
              OAB/SP nº 123.456 - Registro profissional ativo
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-primary-foreground/60 text-xs max-w-md">
              Este site tem caráter exclusivamente informativo. A advocacia é regulamentada 
              pelo Estatuto da Advocacia e pela OAB.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;