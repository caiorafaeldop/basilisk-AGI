/**
 * Config Progress Component
 * Indicador de progresso de configuração
 */

import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ConfigItem {
  id: string;
  label: string;
  completed: boolean;
  required: boolean;
}

interface ConfigProgressProps {
  config: any;
}

export const ConfigProgress = ({ config }: ConfigProgressProps) => {
  const items: ConfigItem[] = [
    {
      id: 'identity',
      label: 'Identidade configurada',
      completed: !!(config?.siteName && config?.logo),
      required: true,
    },
    {
      id: 'colors',
      label: 'Cores definidas',
      completed: !!(config?.primaryColor && config?.secondaryColor),
      required: true,
    },
    {
      id: 'hero',
      label: 'Hero preenchido',
      completed: !!(config?.heroTitle && config?.heroSubtitle),
      required: true,
    },
    {
      id: 'contact',
      label: 'Contato adicionado',
      completed: !!(config?.whatsapp || config?.email),
      required: true,
    },
    {
      id: 'seo',
      label: 'SEO configurado',
      completed: !!(config?.metaTitle && config?.metaDescription),
      required: false,
    },
    {
      id: 'analytics',
      label: 'Analytics configurado',
      completed: !!(config?.googleAnalyticsId || config?.facebookPixelId),
      required: false,
    },
  ];

  const requiredItems = items.filter(item => item.required);
  const completedRequired = requiredItems.filter(item => item.completed).length;
  const totalRequired = requiredItems.length;
  const progressPercentage = (completedRequired / totalRequired) * 100;

  const allItems = items;
  const completedAll = allItems.filter(item => item.completed).length;
  const totalAll = allItems.length;
  const overallPercentage = (completedAll / totalAll) * 100;

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
          📊 Seu Progresso
        </h3>
        <span 
          className="text-2xl font-bold"
          style={{ 
            color: progressPercentage === 100 ? '#10b981' : 'var(--primary-color)',
          }}
        >
          {Math.round(overallPercentage)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Progress value={overallPercentage} className="h-2" />
        <p className="text-xs mt-2" style={{ color: 'var(--site-text-color)', opacity: 0.7 }}>
          {completedAll} de {totalAll} itens completos
        </p>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 rounded transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {item.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            ) : item.required ? (
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
            )}
            <span 
              className={`text-sm ${item.completed ? 'line-through opacity-60' : ''}`}
              style={{ color: 'var(--site-text-color)' }}
            >
              {item.label}
            </span>
            {item.required && !item.completed && (
              <span className="ml-auto text-xs px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded">
                Obrigatório
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Status Message */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        {progressPercentage === 100 ? (
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Configuração básica completa! 🎉
          </p>
        ) : (
          <p className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.7 }}>
            Complete os itens obrigatórios para publicar seu site
          </p>
        )}
      </div>
    </div>
  );
};
