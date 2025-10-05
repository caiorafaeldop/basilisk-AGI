/**
 * Quick Search Component
 * Busca rápida de configurações com Ctrl+K
 */

import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  section: string;
  keywords: string[];
}

interface QuickSearchProps {
  items: SearchItem[];
  onSelect: (item: SearchItem) => void;
}

export const QuickSearch = ({ items, onSelect }: QuickSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Atalho Ctrl+K
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrl: true,
      description: 'Busca rápida',
      action: () => {
        setIsOpen(true);
        setSearchTerm('');
        setSelectedIndex(0);
      },
    },
  ]);

  // Filtrar itens
  const filteredItems = items.filter(item => {
    const search = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.section.toLowerCase().includes(search) ||
      item.keywords.some(k => k.toLowerCase().includes(search))
    );
  });

  // Navegação por teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredItems.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredItems[selectedIndex]);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    onSelect(item);
    setIsOpen(false);
    setSearchTerm('');
    setSelectedIndex(0);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        style={{
          borderColor: 'var(--border-color)',
          backgroundColor: 'var(--muted-bg)',
        }}
      >
        <Search className="w-4 h-4" />
        <span className="text-sm text-gray-500">Buscar...</span>
        <kbd className="ml-auto px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">
          Ctrl+K
        </kbd>
      </button>

      {/* Search Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="sr-only">Busca Rápida</DialogTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Buscar configurações..."
                className="pl-10 pr-10 h-12 text-lg border-0 focus:ring-0"
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </DialogHeader>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum resultado encontrado</p>
                <p className="text-sm mt-1">Tente buscar por outro termo</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {item.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.section}
                        </p>
                      </div>
                      {index === selectedIndex && (
                        <kbd className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">
                          Enter
                        </kbd>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↓</kbd>
                Navegar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Enter</kbd>
                Selecionar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Esc</kbd>
                Fechar
              </span>
            </div>
            <span>{filteredItems.length} resultados</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

/**
 * Hook para criar itens de busca a partir das configurações
 */
export const useSearchItems = (): SearchItem[] => {
  return [
    // Identidade Visual
    {
      id: 'site-name',
      title: 'Nome do Site',
      description: 'Alterar o nome do seu site',
      category: 'Básico',
      section: 'Identidade Visual',
      keywords: ['nome', 'título', 'site'],
    },
    {
      id: 'logo',
      title: 'Logo',
      description: 'Upload do logotipo',
      category: 'Básico',
      section: 'Identidade Visual',
      keywords: ['logo', 'logotipo', 'imagem', 'marca'],
    },
    // Cores
    {
      id: 'primary-color',
      title: 'Cor Primária',
      description: 'Cor principal do site',
      category: 'Design',
      section: 'Cores',
      keywords: ['cor', 'primária', 'principal', 'tema'],
    },
    {
      id: 'secondary-color',
      title: 'Cor Secundária',
      description: 'Cor secundária do site',
      category: 'Design',
      section: 'Cores',
      keywords: ['cor', 'secundária', 'tema'],
    },
    // Tipografia
    {
      id: 'font-family',
      title: 'Fonte',
      description: 'Família de fonte do site',
      category: 'Design',
      section: 'Tipografia',
      keywords: ['fonte', 'tipografia', 'letra', 'texto'],
    },
    // Hero
    {
      id: 'hero-title',
      title: 'Título do Hero',
      description: 'Título principal da página inicial',
      category: 'Conteúdo',
      section: 'Hero',
      keywords: ['hero', 'título', 'principal', 'home'],
    },
    {
      id: 'hero-subtitle',
      title: 'Subtítulo do Hero',
      description: 'Subtítulo da página inicial',
      category: 'Conteúdo',
      section: 'Hero',
      keywords: ['hero', 'subtítulo', 'descrição'],
    },
    // Contato
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      description: 'Número do WhatsApp',
      category: 'Contato',
      section: 'Informações de Contato',
      keywords: ['whatsapp', 'telefone', 'contato', 'número'],
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Email de contato',
      category: 'Contato',
      section: 'Informações de Contato',
      keywords: ['email', 'contato', 'e-mail'],
    },
    // SEO
    {
      id: 'meta-title',
      title: 'Meta Title',
      description: 'Título para SEO',
      category: 'SEO',
      section: 'Meta Tags',
      keywords: ['seo', 'meta', 'título', 'google'],
    },
    {
      id: 'meta-description',
      title: 'Meta Description',
      description: 'Descrição para SEO',
      category: 'SEO',
      section: 'Meta Tags',
      keywords: ['seo', 'meta', 'descrição', 'google'],
    },
    // Design System
    {
      id: 'design-system',
      title: 'Sistema de Design',
      description: 'Escolher estilo visual',
      category: 'Design',
      section: 'Sistema de Design',
      keywords: ['design', 'sistema', 'estilo', 'tema', 'visual'],
    },
  ];
};
