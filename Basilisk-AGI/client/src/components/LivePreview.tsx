/**
 * Live Preview Component
 * Preview em tempo real das alterações de configuração
 */

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Maximize2, Minimize2, Smartphone, Monitor, Tablet } from 'lucide-react';
import { SiteConfig } from '@/modules/site-config/api';

interface LivePreviewProps {
  config: Partial<SiteConfig>;
  previewUrl?: string;
}

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const LivePreview = ({ config, previewUrl = '/' }: LivePreviewProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  // Atualizar iframe quando config mudar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIframeKey(prev => prev + 1);
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timer);
  }, [config]);

  const getDeviceDimensions = () => {
    switch (device) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      case 'desktop':
        return { width: '100%', height: '100%' };
    }
  };

  const dimensions = getDeviceDimensions();

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
        style={{
          backgroundColor: 'var(--primary-color)',
          color: '#ffffff',
        }}
        aria-label="Mostrar preview"
      >
        <Eye className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed ${isFullscreen ? 'inset-0' : 'bottom-4 right-4 w-96 h-96'} bg-white rounded-lg shadow-2xl z-50 flex flex-col`}
      style={{
        border: '2px solid var(--border-color)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" style={{ color: 'var(--primary-color)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--site-text-color)' }}>
            Preview ao Vivo
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Device Selector */}
          <div className="flex gap-1">
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded transition-colors ${device === 'mobile' ? 'bg-blue-100' : ''}`}
              title="Mobile"
              aria-label="Preview mobile"
            >
              <Smartphone className="w-4 h-4" style={{ color: device === 'mobile' ? 'var(--primary-color)' : 'var(--site-text-color)' }} />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded transition-colors ${device === 'tablet' ? 'bg-blue-100' : ''}`}
              title="Tablet"
              aria-label="Preview tablet"
            >
              <Tablet className="w-4 h-4" style={{ color: device === 'tablet' ? 'var(--primary-color)' : 'var(--site-text-color)' }} />
            </button>
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded transition-colors ${device === 'desktop' ? 'bg-blue-100' : ''}`}
              title="Desktop"
              aria-label="Preview desktop"
            >
              <Monitor className="w-4 h-4" style={{ color: device === 'desktop' ? 'var(--primary-color)' : 'var(--site-text-color)' }} />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors"
            aria-label={isFullscreen ? 'Sair do fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" style={{ color: 'var(--site-text-color)' }} />
            ) : (
              <Maximize2 className="w-4 h-4" style={{ color: 'var(--site-text-color)' }} />
            )}
          </button>

          {/* Hide Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors"
            aria-label="Esconder preview"
          >
            <EyeOff className="w-4 h-4" style={{ color: 'var(--site-text-color)' }} />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden bg-gray-100 flex items-center justify-center p-4">
        <div
          className="bg-white shadow-lg overflow-hidden"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: device === 'mobile' ? '20px' : '8px',
            transition: 'all 0.3s ease',
          }}
        >
          <iframe
            key={iframeKey}
            src={previewUrl}
            className="w-full h-full border-0"
            title="Live Preview"
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-2 border-t text-xs text-center" style={{ borderColor: 'var(--border-color)', color: 'var(--site-text-color)', opacity: 0.7 }}>
        {device === 'mobile' && '375 x 667'}
        {device === 'tablet' && '768 x 1024'}
        {device === 'desktop' && 'Responsivo'}
      </div>
    </div>
  );
};

// Hook para facilitar uso do preview
export const useLivePreview = () => {
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(() => {
    const saved = localStorage.getItem('live-preview-enabled');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('live-preview-enabled', JSON.stringify(isPreviewEnabled));
  }, [isPreviewEnabled]);

  return {
    isPreviewEnabled,
    enablePreview: () => setIsPreviewEnabled(true),
    disablePreview: () => setIsPreviewEnabled(false),
    togglePreview: () => setIsPreviewEnabled(prev => !prev),
  };
};
