/**
 * Video Section Component
 * Seção de vídeo com suporte para YouTube e Vimeo
 */

import { Play } from 'lucide-react';
import { useState } from 'react';
import { useDesignSystem } from '@/hooks/useDesignSystem';

interface VideoSectionProps {
  videoUrl: string;
  title?: string;
  subtitle?: string;
  thumbnail?: string;
  autoplay?: boolean;
}

export const VideoSection = ({ videoUrl, title, subtitle, thumbnail, autoplay = false }: VideoSectionProps) => {
  const { systemName } = useDesignSystem();
  const [isPlaying, setIsPlaying] = useState(autoplay);

  // Extrair ID do vídeo do YouTube ou Vimeo
  const getVideoEmbedUrl = (url: string): string => {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=${autoplay ? 1 : 0}`;
    }

    // Vimeo
    const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=${autoplay ? 1 : 0}`;
    }

    return url;
  };

  const embedUrl = getVideoEmbedUrl(videoUrl);

  return (
    <section id="video" className="py-16 md:py-24">
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
              <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'var(--site-text-color)', opacity: 0.8 }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Video Container */}
        <div className="max-w-5xl mx-auto">
          <div 
            className="relative aspect-video overflow-hidden"
            style={
              systemName === 'minimalism'
                ? {
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                  }
                : {
                    borderRadius: '20px',
                    border: '3px solid #000000',
                    boxShadow: '6px 6px 0px #000000'
                  }
            }
          >
            {!isPlaying && thumbnail ? (
              // Thumbnail com botão de play
              <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
                <img
                  src={thumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div 
                    className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={
                      systemName === 'minimalism'
                        ? {
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                          }
                        : {
                            border: '3px solid #000000',
                            boxShadow: '4px 4px 0px #000000'
                          }
                    }
                  >
                    <Play className="w-10 h-10 text-black ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            ) : (
              // Iframe do vídeo
              <iframe
                src={embedUrl}
                title="Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
