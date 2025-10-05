import { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { PageContainer } from "./PageContainer";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import { useDesignSystem } from "@/hooks/useDesignSystem";

interface PageShellProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  loading?: boolean;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  showHeader?: boolean; // Controla se mostra o Header principal
}

export const PageShell = ({ 
  title, 
  subtitle, 
  actions, 
  loading, 
  children,
  maxWidth = "xl",
  showHeader = true
}: PageShellProps) => {
  const { systemName } = useDesignSystem();
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--site-bg-color)' }}>
      {showHeader && <Header />}
      
      <div className="pt-32 pb-12">
        <PageContainer maxWidth={maxWidth}>
          <PageHeader 
            title={title} 
            subtitle={subtitle} 
            actions={actions} 
            loading={loading} 
          />
          
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="h-32 w-full border animate-pulse" 
                  style={{ 
                    backgroundColor: 'var(--panel-bg)',
                    borderColor: 'var(--border-color)',
                    boxShadow: 'var(--shadow-style)',
                    borderRadius: systemName === 'minimalism' ? '12px' : '16px'
                  }} 
                />
              ))}
            </div>
          ) : (
            children
          )}
        </PageContainer>
      </div>
    </div>
  );
};
