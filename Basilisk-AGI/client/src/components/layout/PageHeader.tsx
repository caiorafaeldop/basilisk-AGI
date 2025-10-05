import { Skeleton } from "@/components/ui/skeleton";
import { useDesignSystem } from "@/hooks/useDesignSystem";
import { useSiteConfig } from "@/hooks/useSiteConfig";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  loading?: boolean;
}

export const PageHeader = ({ title, subtitle, actions, loading }: PageHeaderProps) => {
  const { systemName } = useDesignSystem();
  const { config } = useSiteConfig();
  
  // Função para clarear cor
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
  };
  
  const primaryColor = config?.primaryColor || '#3B82F6';
  if (loading) {
    return (
      <div className="mb-8 flex items-start justify-between">
        <div className="space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 flex items-start justify-between gap-4 flex-wrap lg:flex-nowrap">
      <div className="space-y-2">
        {title && (
          <h1 
            className="text-3xl font-bold px-4 py-2 inline-block"
            style={
              systemName === 'minimalism'
                ? {
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${lightenColor(primaryColor, 25)} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    border: 'none'
                  }
                : {
                    backgroundColor: '#FFE951',
                    color: '#000000',
                    border: '1px solid var(--border-color)',
                    boxShadow: '3px 3px 0px #000000',
                    borderRadius: '12px'
                  }
            }
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p 
            className="text-lg font-semibold mt-4" 
            style={{ color: 'var(--site-text-color)', opacity: 0.8 }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex gap-2 flex-wrap items-start">
          {actions}
        </div>
      )}
    </div>
  );
};
