/**
 * Dark Mode Hook
 * Sistema de dark mode automático com detecção de preferência do sistema
 */

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'auto';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'auto';
  });

  const [isDark, setIsDark] = useState(false);

  // Detecta preferência do sistema
  const getSystemPreference = useCallback((): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  // Atualiza o tema
  useEffect(() => {
    const updateTheme = () => {
      let shouldBeDark = false;

      if (theme === 'dark') {
        shouldBeDark = true;
      } else if (theme === 'light') {
        shouldBeDark = false;
      } else {
        // auto
        shouldBeDark = getSystemPreference();
      }

      setIsDark(shouldBeDark);

      // Aplica no document
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.setProperty('--site-bg-color', '#0f172a');
        document.documentElement.style.setProperty('--site-text-color', '#f1f5f9');
        document.documentElement.style.setProperty('--panel-bg', '#1e293b');
        document.documentElement.style.setProperty('--border-color', '#334155');
        document.documentElement.style.setProperty('--muted-bg', '#334155');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.setProperty('--site-bg-color', '#ffffff');
        document.documentElement.style.setProperty('--site-text-color', '#1e293b');
        document.documentElement.style.setProperty('--panel-bg', '#f8fafc');
        document.documentElement.style.setProperty('--border-color', '#e2e8f0');
        document.documentElement.style.setProperty('--muted-bg', '#f1f5f9');
      }
    };

    updateTheme();

    // Salva preferência
    localStorage.setItem('theme', theme);

    // Escuta mudanças na preferência do sistema
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => updateTheme();
      
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme, getSystemPreference]);

  const setLightMode = useCallback(() => setTheme('light'), []);
  const setDarkMode = useCallback(() => setTheme('dark'), []);
  const setAutoMode = useCallback(() => setTheme('auto'), []);
  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'auto';
      return 'light';
    });
  }, []);

  return {
    theme,
    isDark,
    setLightMode,
    setDarkMode,
    setAutoMode,
    toggleTheme,
    setTheme,
  };
};

/**
 * Componente de toggle de dark mode
 */
export const DarkModeToggle = () => {
  const { theme, isDark, toggleTheme } = useDarkMode();

  const getIcon = () => {
    if (theme === 'light') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    }
    if (theme === 'dark') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    );
  };

  const getLabel = () => {
    if (theme === 'light') return 'Modo Claro';
    if (theme === 'dark') return 'Modo Escuro';
    return 'Modo Automático';
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={getLabel()}
      aria-label={getLabel()}
    >
      {getIcon()}
    </button>
  );
};

/**
 * Componente de seletor de tema completo
 */
export const ThemeSelector = () => {
  const { theme, setLightMode, setDarkMode, setAutoMode } = useDarkMode();

  const options = [
    { value: 'light', label: 'Claro', icon: '☀️' },
    { value: 'dark', label: 'Escuro', icon: '🌙' },
    { value: 'auto', label: 'Automático', icon: '💡' },
  ];

  return (
    <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            if (option.value === 'light') setLightMode();
            if (option.value === 'dark') setDarkMode();
            if (option.value === 'auto') setAutoMode();
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
            theme === option.value
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span>{option.icon}</span>
          <span className="text-sm font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
};
