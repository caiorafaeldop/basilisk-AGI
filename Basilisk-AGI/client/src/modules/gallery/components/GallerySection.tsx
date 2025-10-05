/**
 * Gallery Section Component
 * Galeria de imagens com lightbox
 */

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { useImageFilters } from '@/hooks/useImageFilters';

interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
}

export const GallerySection = ({ images, title, subtitle }: GallerySectionProps) => {
  const { systemName } = useDesignSystem();
  const { getImageStyle, getImageOverlayStyle } = useImageFilters();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="galeria" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 
                className="text-4xl md:text-5xl font-bold mb-4"
                style={
                  systemName === 'minimalism'
                    ? {
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }
                    : {
                        color: '#FFFFFF',
                        WebkitTextStroke: '4px #000000',
                        paintOrder: 'stroke fill',
                        textShadow: '6px 6px 0px #000000'
                      }
                }
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl" style={{ color: 'var(--site-text-color)', opacity: 0.8 }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => openLightbox(index)}
              style={
                systemName === 'minimalism'
                  ? {
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }
                  : {
                      borderRadius: '16px',
                      border: '2px solid #000000',
                      boxShadow: '3px 3px 0px #000000'
                    }
              }
            >
              <div className="aspect-square relative">
                <img
                  src={image.url}
                  alt={image.title || `Imagem ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  style={getImageStyle()}
                />
                <div style={getImageOverlayStyle()} />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    {image.title && <h3 className="text-xl font-bold mb-2">{image.title}</h3>}
                    {image.description && <p className="text-sm">{image.description}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            {/* Image */}
            <div className="max-w-6xl max-h-[90vh] relative">
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].title || `Imagem ${selectedImage + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />
              {images[selectedImage].title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                  <h3 className="text-xl font-bold">{images[selectedImage].title}</h3>
                  {images[selectedImage].description && (
                    <p className="text-sm mt-1">{images[selectedImage].description}</p>
                  )}
                </div>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
