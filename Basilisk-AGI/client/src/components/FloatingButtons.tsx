import { MessageCircle, Instagram } from "lucide-react";

const FloatingButtons = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/558391090902?text=Olá!', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/paulomaiaadvocacia/', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Instagram Button */}
      <button
        onClick={handleInstagramClick}
        className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Seguir no Instagram"
      >
        <Instagram className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingButtons;
