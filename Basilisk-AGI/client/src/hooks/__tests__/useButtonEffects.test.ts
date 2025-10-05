/**
 * Tests for useButtonEffects hook
 */

import { renderHook } from '@testing-library/react';
import { useButtonEffects } from '../useButtonEffects';
import { useSiteConfig } from '../useSiteConfig';

// Mock useSiteConfig
jest.mock('../useSiteConfig');

describe('useButtonEffects', () => {
  const mockConfig = {
    buttonRadius: '8px',
    buttonShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    buttonShadowColor: '#000000',
    buttonHoverEffect: 'lift',
    buttonHoverColor: '#3b82f6',
    buttonSize: 'md',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
  };

  beforeEach(() => {
    (useSiteConfig as jest.Mock).mockReturnValue({ config: mockConfig });
  });

  describe('getButtonStyle', () => {
    it('should return primary button style', () => {
      const { result } = renderHook(() => useButtonEffects());
      const style = result.current.getButtonStyle('primary');

      expect(style.backgroundColor).toBe('#3b82f6');
      expect(style.borderRadius).toBe('8px');
    });

    it('should return secondary button style', () => {
      const { result } = renderHook(() => useButtonEffects());
      const style = result.current.getButtonStyle('secondary');

      expect(style.backgroundColor).toBe('transparent');
      expect(style.border).toContain('#3b82f6');
    });

    it('should use default values when config is missing', () => {
      (useSiteConfig as jest.Mock).mockReturnValue({ config: null });
      const { result } = renderHook(() => useButtonEffects());
      const style = result.current.getButtonStyle('primary');

      expect(style).toBeDefined();
      expect(style.borderRadius).toBe('6px'); // default
    });
  });

  describe('getButtonHoverClass', () => {
    it('should return lift hover class', () => {
      const { result } = renderHook(() => useButtonEffects());
      const className = result.current.getButtonHoverClass();

      expect(className).toContain('hover:-translate-y-1');
    });

    it('should return scale hover class when configured', () => {
      (useSiteConfig as jest.Mock).mockReturnValue({
        config: { ...mockConfig, buttonHoverEffect: 'scale' }
      });
      const { result } = renderHook(() => useButtonEffects());
      const className = result.current.getButtonHoverClass();

      expect(className).toContain('hover:scale-105');
    });

    it('should return empty string for none effect', () => {
      (useSiteConfig as jest.Mock).mockReturnValue({
        config: { ...mockConfig, buttonHoverEffect: 'none' }
      });
      const { result } = renderHook(() => useButtonEffects());
      const className = result.current.getButtonHoverClass();

      expect(className).toBe('');
    });
  });

  describe('getButtonSize', () => {
    it('should return medium size by default', () => {
      const { result } = renderHook(() => useButtonEffects());
      const className = result.current.getButtonSize();

      expect(className).toContain('px-6 py-3');
    });

    it('should return small size when configured', () => {
      (useSiteConfig as jest.Mock).mockReturnValue({
        config: { ...mockConfig, buttonSize: 'sm' }
      });
      const { result } = renderHook(() => useButtonEffects());
      const className = result.current.getButtonSize();

      expect(className).toContain('px-4 py-2');
    });

    it('should return large size when configured', () => {
      (useSiteConfig as jest.Mock).mockReturnValue({
        config: { ...mockConfig, buttonSize: 'lg' }
      });
      const { result } = renderHook(() => useButtonEffects());
      const className = result.current.getButtonSize();

      expect(className).toContain('px-8 py-4');
    });
  });
});
