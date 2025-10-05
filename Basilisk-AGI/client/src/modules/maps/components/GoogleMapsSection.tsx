/**
 * Google Maps Section Component
 * Mapa do Google Maps customizável e responsivo
 */

import { MapPin, Navigation, Phone, Mail } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { useSiteConfig } from '@/hooks/useSiteConfig';

interface GoogleMapsSectionProps {
  title?: string;
  subtitle?: string;
  showContactInfo?: boolean;
  mapHeight?: string;
}

export const GoogleMapsSection = ({
  title = 'Nossa Localização',
  subtitle = 'Visite-nos ou entre em contato',
  showContactInfo = true,
  mapHeight = '450px'
}: GoogleMapsSectionProps) => {
  const { systemName } = useDesignSystem();
  const { config } = useSiteConfig();

  // Gerar URL do Google Maps embed
  const getMapEmbedUrl = () => {
    if (config?.mapEmbedUrl) {
      return config.mapEmbedUrl;
    }

    // Gerar URL baseado no endereço
    const address = [
      config?.address,
      config?.city,
      config?.state,
      config?.zipCode
    ].filter(Boolean).join(', ');

    if (address) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    return null;
  };

  const mapUrl = getMapEmbedUrl();

  if (!mapUrl && !showContactInfo) {
    return null;
  }

  return (
    <section id="localizacao" className="py-16 md:py-24">
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            {mapUrl ? (
              <div 
                className="overflow-hidden"
                style={
                  systemName === 'minimalism'
                    ? {
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                        height: mapHeight
                      }
                    : {
                        borderRadius: '20px',
                        border: '3px solid #000000',
                        boxShadow: '6px 6px 0px #000000',
                        height: mapHeight
                      }
                }
              >
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              </div>
            ) : (
              <div 
                className="flex items-center justify-center"
                style={
                  systemName === 'minimalism'
                    ? {
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--muted-bg)',
                        height: mapHeight
                      }
                    : {
                        borderRadius: '20px',
                        border: '3px solid #000000',
                        backgroundColor: 'var(--muted-bg)',
                        height: mapHeight
                      }
                }
              >
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--primary-color)' }} />
                  <p style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>
                    Configure o endereço nas configurações do site
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          {showContactInfo && (
            <div className="space-y-6">
              {/* Address Card */}
              {config?.address && (
                <div 
                  className="p-6"
                  style={
                    systemName === 'minimalism'
                      ? {
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--panel-bg)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }
                      : {
                          borderRadius: '16px',
                          border: '2px solid #000000',
                          backgroundColor: 'var(--panel-bg)',
                          boxShadow: '3px 3px 0px #000000'
                        }
                  }
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
                    <div>
                      <h3 className="font-semibold mb-2" style={{ color: 'var(--site-text-color)' }}>
                        Endereço
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--site-text-color)', opacity: 0.8 }}>
                        {config.address}
                        {config.addressComplement && <><br />{config.addressComplement}</>}
                        {config.city && <><br />{config.city}</>}
                        {config.state && ` - ${config.state}`}
                        {config.zipCode && <><br />CEP: {config.zipCode}</>}
                      </p>
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      [config.address, config.city, config.state].filter(Boolean).join(', ')
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 mt-4 rounded-lg transition-all hover:scale-105"
                    style={
                      systemName === 'minimalism'
                        ? {
                            backgroundColor: 'var(--primary-color)',
                            color: '#ffffff',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }
                        : {
                            backgroundColor: 'var(--primary-color)',
                            color: '#000000',
                            border: '2px solid #000000',
                            fontSize: '0.875rem',
                            fontWeight: '700'
                          }
                    }
                  >
                    <Navigation className="w-4 h-4" />
                    Como Chegar
                  </a>
                </div>
              )}

              {/* Phone Card */}
              {config?.phone && (
                <div 
                  className="p-6"
                  style={
                    systemName === 'minimalism'
                      ? {
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--panel-bg)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }
                      : {
                          borderRadius: '16px',
                          border: '2px solid #000000',
                          backgroundColor: 'var(--panel-bg)',
                          boxShadow: '3px 3px 0px #000000'
                        }
                  }
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--site-text-color)' }}>
                        Telefone
                      </h3>
                      <a 
                        href={`tel:${config.phone}`}
                        className="text-sm hover:underline"
                        style={{ color: 'var(--site-text-color)', opacity: 0.8 }}
                      >
                        {config.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Card */}
              {config?.email && (
                <div 
                  className="p-6"
                  style={
                    systemName === 'minimalism'
                      ? {
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--panel-bg)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }
                      : {
                          borderRadius: '16px',
                          border: '2px solid #000000',
                          backgroundColor: 'var(--panel-bg)',
                          boxShadow: '3px 3px 0px #000000'
                        }
                  }
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--site-text-color)' }}>
                        Email
                      </h3>
                      <a 
                        href={`mailto:${config.email}`}
                        className="text-sm hover:underline"
                        style={{ color: 'var(--site-text-color)', opacity: 0.8 }}
                      >
                        {config.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Business Hours */}
              {config?.businessHours && (
                <div 
                  className="p-6"
                  style={
                    systemName === 'minimalism'
                      ? {
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--panel-bg)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }
                      : {
                          borderRadius: '16px',
                          border: '2px solid #000000',
                          backgroundColor: 'var(--panel-bg)',
                          boxShadow: '3px 3px 0px #000000'
                        }
                  }
                >
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--site-text-color)' }}>
                    Horário de Funcionamento
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.8 }}>
                    {config.businessHours}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
