import { useSiteConfig } from "@/hooks/useSiteConfig";

const MobileLawyerPhoto = () => {
  const { config } = useSiteConfig();

  // Se não houver heroImage, não renderiza nada
  if (!config?.heroImage) {
    return null;
  }

  return (
    <section className="block md:hidden pt-20 pb-2">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl card-shadow">
          <img
            src={config.heroImage}
            alt={config.heroTitle || config.siteName || 'Hero'}
            className="w-full h-48 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default MobileLawyerPhoto;
