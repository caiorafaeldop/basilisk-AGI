const MobileLawyerPhoto = () => {
  return (
    <section className="block md:hidden pt-20 pb-2">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl card-shadow">
          <img
            src="https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758766133/maia-advocacia/ksfa4eovnxglbgo9km12.jpg"
            alt="Especialista em Direito Trabalhista"
            className="w-full h-48 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default MobileLawyerPhoto;
