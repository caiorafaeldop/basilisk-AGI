/**
 * STRATEGY PATTERN - Design System
 * Permite trocar algoritmos de estilização em runtime
 */

export interface DesignSystemStrategy {
  name: string;
  applyButtonStyle(config: any): React.CSSProperties;
  applyCardStyle(config: any): React.CSSProperties;
  applyTextStyle(type: 'title' | 'subtitle' | 'body', config: any): React.CSSProperties;
  applyHeaderStyle(config: any): React.CSSProperties;
  applySpacing(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string;
}

export class MinimalismStrategy implements DesignSystemStrategy {
  name = 'minimalism';

  applyButtonStyle(config: any): React.CSSProperties {
    return {
      background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${this.lightenColor(config.primaryColor, 25)} 100%)`,
      color: '#ffffff',
      border: 'none',
      borderRadius: config.buttonRadius || '6px',
      boxShadow: config.buttonShadow || '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: config.buttonPadding || '0.875rem 2rem',
      fontSize: config.buttonFontSize || '0.9375rem',
      fontWeight: config.buttonFontWeight || '600',
      fontFamily: config.fontFamily || 'inherit'
    };
  }

  applyCardStyle(config: any): React.CSSProperties {
    return {
      backgroundColor: config.cardBg || 'var(--panel-bg)',
      border: `1px solid ${config.cardBorderColor || 'var(--border-color)'}`,
      borderRadius: config.cardRadius || '8px',
      boxShadow: config.cardShadow || '0 2px 8px rgba(0, 0, 0, 0.04)',
      padding: config.cardPadding || '2rem'
    };
  }

  applyTextStyle(type: 'title' | 'subtitle' | 'body', config: any): React.CSSProperties {
    const baseStyle: React.CSSProperties = {
      fontFamily: config.fontFamily || 'inherit'
    };

    switch (type) {
      case 'title':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${this.lightenColor(config.primaryColor, 25)} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: config.titleFontSize || '3rem',
          fontWeight: config.titleFontWeight || '700',
          lineHeight: config.titleLineHeight || '1.2',
          letterSpacing: config.titleLetterSpacing || '-0.02em'
        };
      case 'subtitle':
        return {
          ...baseStyle,
          color: config.siteTheme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
          fontSize: config.subtitleFontSize || '1.25rem',
          fontWeight: config.subtitleFontWeight || '500',
          lineHeight: config.subtitleLineHeight || '1.6'
        };
      case 'body':
        return {
          ...baseStyle,
          color: config.siteTheme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
          fontSize: config.bodyFontSize || '1rem',
          fontWeight: config.bodyFontWeight || '400',
          lineHeight: config.bodyLineHeight || '1.7'
        };
    }
  }

  applyHeaderStyle(config: any): React.CSSProperties {
    return {
      background: config.headerBg || `linear-gradient(135deg, ${config.primaryColor}15 0%, ${config.secondaryColor}15 100%)`,
      backdropFilter: `blur(${config.headerBlur || 20}px)`,
      borderBottom: `1px solid ${config.headerBorderColor || 'rgba(0,0,0,0.06)'}`,
      boxShadow: config.headerShadow || '0 2px 8px rgba(0, 0, 0, 0.04)',
      padding: config.headerPadding || '1rem 2rem',
      opacity: config.headerOpacity || 1,
      height: config.headerHeight || 'auto'
    };
  }

  applySpacing(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
    const spacingMap = {
      xs: '0.5rem',
      sm: '1rem',
      md: '2rem',
      lg: '3rem',
      xl: '4rem'
    };
    return spacingMap[size];
  }

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
  }
}

export class NeobrutalismStrategy implements DesignSystemStrategy {
  name = 'neobrutalism';

  applyButtonStyle(config: any): React.CSSProperties {
    return {
      backgroundColor: config.secondaryColor || '#FF6B6B',
      color: config.buttonTextColor || '#000000',
      border: `${config.buttonBorderWidth || 4}px solid #000000`,
      borderRadius: config.buttonRadius || '12px',
      boxShadow: config.buttonShadow || '4px 4px 0px #000000',
      padding: config.buttonPadding || '0.875rem 2rem',
      fontSize: config.buttonFontSize || '1rem',
      fontWeight: config.buttonFontWeight || '700',
      fontFamily: config.fontFamily || 'inherit'
    };
  }

  applyCardStyle(config: any): React.CSSProperties {
    return {
      backgroundColor: config.cardBg || '#FFFFFF',
      border: `${config.cardBorderWidth || 2}px solid #000000`,
      borderRadius: config.cardRadius || '16px',
      boxShadow: config.cardShadow || '3px 3px 0px #000000',
      padding: config.cardPadding || '2rem'
    };
  }

  applyTextStyle(type: 'title' | 'subtitle' | 'body', config: any): React.CSSProperties {
    const baseStyle: React.CSSProperties = {
      fontFamily: config.fontFamily || 'inherit'
    };

    switch (type) {
      case 'title':
        return {
          ...baseStyle,
          color: '#FFFFFF',
          WebkitTextStroke: `${config.titleStrokeWidth || 4}px #000000`,
          paintOrder: 'stroke fill',
          textShadow: config.titleShadow || '6px 6px 0px #000000',
          fontSize: config.titleFontSize || '4rem',
          fontWeight: config.titleFontWeight || '900',
          lineHeight: config.titleLineHeight || '1.1',
          letterSpacing: config.titleLetterSpacing || '-0.03em'
        };
      case 'subtitle':
        return {
          ...baseStyle,
          color: '#FFFFFF',
          WebkitTextStroke: `${config.subtitleStrokeWidth || 2}px #000000`,
          paintOrder: 'stroke fill',
          textShadow: config.subtitleShadow || '3px 3px 0px #000000',
          fontSize: config.subtitleFontSize || '1.5rem',
          fontWeight: config.subtitleFontWeight || '700',
          lineHeight: config.subtitleLineHeight || '1.4'
        };
      case 'body':
        return {
          ...baseStyle,
          color: config.siteTheme === 'dark' ? '#FFFFFF' : '#000000',
          fontSize: config.bodyFontSize || '1rem',
          fontWeight: config.bodyFontWeight || '500',
          lineHeight: config.bodyLineHeight || '1.6'
        };
    }
  }

  applyHeaderStyle(config: any): React.CSSProperties {
    return {
      backgroundColor: config.headerBg || '#FFE951',
      border: 'none',
      borderBottom: `${config.headerBorderWidth || 8}px solid #000000`,
      boxShadow: config.headerShadow || '0px 8px 0px #000000',
      padding: config.headerPadding || '1rem 2rem',
      opacity: config.headerOpacity || 1,
      height: config.headerHeight || 'auto'
    };
  }

  applySpacing(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
    const spacingMap = {
      xs: '0.5rem',
      sm: '1rem',
      md: '2rem',
      lg: '3rem',
      xl: '4rem'
    };
    return spacingMap[size];
  }
}

// Context para usar a estratégia
export class DesignSystemContext {
  private strategy: DesignSystemStrategy;

  constructor(strategy: DesignSystemStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: DesignSystemStrategy) {
    this.strategy = strategy;
  }

  applyButtonStyle(config: any) {
    return this.strategy.applyButtonStyle(config);
  }

  applyCardStyle(config: any) {
    return this.strategy.applyCardStyle(config);
  }

  applyTextStyle(type: 'title' | 'subtitle' | 'body', config: any) {
    return this.strategy.applyTextStyle(type, config);
  }

  applyHeaderStyle(config: any) {
    return this.strategy.applyHeaderStyle(config);
  }

  applySpacing(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    return this.strategy.applySpacing(size);
  }
}
