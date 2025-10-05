/**
 * Loading Skeleton Component
 * Skeleton loader para usar com Suspense e lazy loading
 */

import { useDesignSystem } from '@/hooks/useDesignSystem';

interface LoadingSkeletonProps {
  type?: 'card' | 'section' | 'gallery' | 'text' | 'full';
  count?: number;
}

export const LoadingSkeleton = ({ type = 'section', count = 1 }: LoadingSkeletonProps) => {
  const { systemName } = useDesignSystem();

  const baseSkeletonStyle = {
    background: systemName === 'minimalism'
      ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
      : 'linear-gradient(90deg, #e5e5e5 25%, #d0d0d0 50%, #e5e5e5 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  };

  if (type === 'full') {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div 
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: 'var(--primary-color)', borderTopColor: 'transparent' }}
          />
          <p style={{ color: 'var(--site-text-color)' }}>Carregando...</p>
        </div>
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-lg"
            style={{
              border: systemName === 'minimalism' ? '1px solid var(--border-color)' : '2px solid #000000',
            }}
          >
            <div className="space-y-3">
              <div
                className="h-6 w-3/4 rounded"
                style={baseSkeletonStyle}
              />
              <div
                className="h-4 w-full rounded"
                style={baseSkeletonStyle}
              />
              <div
                className="h-4 w-5/6 rounded"
                style={baseSkeletonStyle}
              />
            </div>
          </div>
        ))}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'gallery') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg"
            style={baseSkeletonStyle}
          />
        ))}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded"
            style={{
              ...baseSkeletonStyle,
              width: `${Math.random() * 30 + 70}%`,
            }}
          />
        ))}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }

  // Default: section skeleton
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div
            className="h-12 w-64 mx-auto rounded mb-4"
            style={baseSkeletonStyle}
          />
          <div
            className="h-6 w-96 mx-auto rounded"
            style={baseSkeletonStyle}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-lg"
              style={{
                border: systemName === 'minimalism' ? '1px solid var(--border-color)' : '2px solid #000000',
              }}
            >
              <div className="space-y-3">
                <div
                  className="h-6 w-3/4 rounded"
                  style={baseSkeletonStyle}
                />
                <div
                  className="h-4 w-full rounded"
                  style={baseSkeletonStyle}
                />
                <div
                  className="h-4 w-5/6 rounded"
                  style={baseSkeletonStyle}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

// Componente específico para usar com Suspense
export const SuspenseLoader = ({ type = 'section' }: { type?: LoadingSkeletonProps['type'] }) => {
  return <LoadingSkeleton type={type} />;
};
