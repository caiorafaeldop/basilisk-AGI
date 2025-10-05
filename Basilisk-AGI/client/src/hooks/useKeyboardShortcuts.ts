/**
 * Keyboard Shortcuts Hook
 * Sistema de atalhos de teclado
 */

import { useEffect, useCallback, useRef } from 'react';

export interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  description?: string;
  action: () => void;
}

export const useKeyboardShortcuts = (shortcuts: Shortcut[], enabled: boolean = true) => {
  const shortcutsRef = useRef(shortcuts);

  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Ignora se está em input/textarea
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return;
    }

    shortcutsRef.current.forEach((shortcut) => {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;
      const metaMatch = shortcut.meta ? event.metaKey : !event.metaKey;

      if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
        event.preventDefault();
        shortcut.action();
      }
    });
  }, [enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

/**
 * Hook para atalhos globais do admin
 */
export const useAdminShortcuts = () => {
  const shortcuts: Shortcut[] = [
    {
      key: 's',
      ctrl: true,
      description: 'Salvar configurações',
      action: () => {
        const saveButton = document.querySelector('[data-action="save"]') as HTMLButtonElement;
        saveButton?.click();
      },
    },
    {
      key: 'p',
      ctrl: true,
      shift: true,
      description: 'Toggle preview',
      action: () => {
        const previewButton = document.querySelector('[data-action="preview"]') as HTMLButtonElement;
        previewButton?.click();
      },
    },
      key: 'z',
      ctrl: true,
      description: 'Desfazer',
      action: () => {
        // Implementar undo
        if (import.meta.env.DEV) console.log('Undo');
      },
    },
    {
      key: 'y',
      ctrl: true,
      description: 'Refazer',
      action: () => {
        // Implementar redo
        if (import.meta.env.DEV) console.log('Redo');
      },
    },
    {
      key: '/',
      ctrl: true,
      description: 'Buscar',
      action: () => {
        // Focar no campo de busca
      },
    },
    {
      key: '?',
      shift: true,
      description: 'Mostrar atalhos',
      action: () => {
        // Mostrar modal de atalhos
        if (import.meta.env.DEV) console.log('Show shortcuts');
      },
    },
  ];

  useKeyboardShortcuts(shortcuts);

/**
 * Componente de ajuda de atalhos
 */
export const ShortcutsHelp = ({ shortcuts }: { shortcuts: Shortcut[] }) => {
  const formatShortcut = (shortcut: Shortcut): string => {
    const parts: string[] = [];
    
    if (shortcut.ctrl) parts.push('Ctrl');
    if (shortcut.shift) parts.push('Shift');
    if (shortcut.alt) parts.push('Alt');
    if (shortcut.meta) parts.push('Cmd');
    parts.push(shortcut.key.toUpperCase());

    return parts.join(' + ');
  };

  return (
    <div className="p-6 max-w-2xl">
      <h3 className="text-2xl font-bold mb-4">Atalhos de Teclado</h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b">
            <span className="text-sm">{shortcut.description}</span>
            <kbd className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm font-mono">
              {formatShortcut(shortcut)}
            </kbd>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Pressione <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">/</kbd> para ver esta ajuda
      </p>
    </div>
  );
};
