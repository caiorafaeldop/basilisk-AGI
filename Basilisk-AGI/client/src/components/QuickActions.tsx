/**
 * Quick Actions Component
 * Ações rápidas para configurações mais usadas
 */

import { Image, Palette, Type, Mail, Sparkles, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
}

interface QuickActionsProps {
  onLogoClick: () => void;
  onColorsClick: () => void;
  onHeroClick: () => void;
  onContactClick: () => void;
  onDesignClick: () => void;
  onPreviewClick: () => void;
}

export const QuickActions = ({
  onLogoClick,
  onColorsClick,
  onHeroClick,
  onContactClick,
  onDesignClick,
  onPreviewClick,
}: QuickActionsProps) => {
  const actions: QuickAction[] = [
    {
      id: 'logo',
      label: 'Trocar Logo',
      icon: <Image className="w-4 h-4" />,
      description: 'Upload de logotipo',
      onClick: onLogoClick,
    },
    {
      id: 'colors',
      label: 'Mudar Cores',
      icon: <Palette className="w-4 h-4" />,
      description: 'Cores do tema',
      onClick: onColorsClick,
    },
    {
      id: 'hero',
      label: 'Editar Hero',
      icon: <Type className="w-4 h-4" />,
      description: 'Título e subtítulo',
      onClick: onHeroClick,
    },
    {
      id: 'contact',
      label: 'Contato',
      icon: <Mail className="w-4 h-4" />,
      description: 'WhatsApp e email',
      onClick: onContactClick,
    },
    {
      id: 'design',
      label: 'Design',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Sistema visual',
      onClick: onDesignClick,
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: <Eye className="w-4 h-4" />,
      description: 'Ver site',
      onClick: onPreviewClick,
    },
  ];

  return (
    <div 
      className="p-4 rounded-lg border mb-6"
      style={{
        backgroundColor: 'var(--panel-bg)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--site-text-color)' }}>
          ⚡ Ações Rápidas
        </h3>
        <span className="text-xs" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>
          Acesso rápido às configurações mais usadas
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            onClick={action.onClick}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-3 hover:scale-105 transition-transform"
            title={action.description}
          >
            {action.icon}
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
