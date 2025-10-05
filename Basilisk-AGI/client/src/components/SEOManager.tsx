/**
 * SEO Manager Component
 * Gerencia meta tags, OG, Analytics usando Observer Pattern
 */

import { useEffect } from 'react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { Helmet } from 'react-helmet-async';

export const SEOManager = () => {
  const { config } = useSiteConfig();

  // Atualizar meta tags quando config mudar
  useEffect(() => {
    if (!config) return;

    try {
      // Atualizar favicon
      if (config.favicon) {
        let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (!favicon) {
          favicon = document.createElement('link');
          favicon.rel = 'icon';
          document.head.appendChild(favicon);
        }
        favicon.href = config.favicon;
      }
    } catch (error) {
      console.error('Erro ao atualizar favicon:', error);
    }

    // Google Analytics
    if (config.googleAnalyticsId && typeof window !== 'undefined') {
      try {
        const existingScript = document.querySelector(`script[src*="googletagmanager"]`);
        if (!existingScript) {
          const script = document.createElement('script');
          script.async = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`;
          
          script.onerror = () => {
            console.error('Falha ao carregar Google Analytics');
          };
          
          document.head.appendChild(script);

          const inlineScript = document.createElement('script');
          inlineScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.googleAnalyticsId}');
          `;
          document.head.appendChild(inlineScript);
        }
      } catch (error) {
        console.error('Erro ao configurar Google Analytics:', error);
      }
    }

    // Facebook Pixel
    if (config.facebookPixelId && typeof window !== 'undefined') {
      try {
        const existingPixel = document.querySelector(`script[src*="facebook"]`);
        if (!existingPixel) {
          const script = document.createElement('script');
          script.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${config.facebookPixelId}');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error('Erro ao configurar Facebook Pixel:', error);
      }
    }
  }, [config]);

  if (!config) return null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{config.metaTitle || config.siteName || 'Landing Page'}</title>
      <meta name="description" content={config.metaDescription || config.heroSubtitle || ''} />
      <meta name="keywords" content={config.metaKeywords || ''} />

      {/* Open Graph */}
      <meta property="og:title" content={config.ogTitle || config.siteName || ''} />
      <meta property="og:description" content={config.ogDescription || config.metaDescription || ''} />
      <meta property="og:image" content={config.ogImage || config.heroImage || ''} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={config.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={config.ogTitle || config.siteName || ''} />
      <meta name="twitter:description" content={config.ogDescription || config.metaDescription || ''} />
      <meta name="twitter:image" content={config.ogImage || config.heroImage || ''} />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content={config.primaryColor || '#3b82f6'} />
    </Helmet>
  );
};
