import { MessageCircle, Instagram } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const FloatingButtons = () => {
  const { config } = useSiteConfig();

  const handleWhatsAppClick = () => {
    if (config?.whatsapp) {
      window.open(`https://wa.me/${config.whatsapp}?text=Olá!`, '_blank');
    }
  };

  const handleInstagramClick = () => {
    if (config?.instagram) {
      window.open(config.instagram, '_blank');
    }
  };

  // Se não houver WhatsApp nem Instagram, não renderizar nada
  if (!config?.whatsapp && !config?.instagram) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      {config?.whatsapp && (
        <button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Instagram Button */}
      {config?.instagram && (
        <button
          onClick={handleInstagramClick}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Seguir no Instagram"
        >
          <Instagram className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;
