/**
 * Section Error Boundary
 * Error boundary específico para seções com fallback UI
 */

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  sectionName?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Section Error:', {
      section: this.props.sectionName,
      error,
      errorInfo,
    });

    // Aqui você pode enviar para um serviço de logging (Sentry, LogRocket, etc)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Se tem fallback customizado, usa ele
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback padrão
      return (
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div 
              className="max-w-2xl mx-auto p-8 rounded-lg text-center"
              style={{
                border: '2px solid #ef4444',
                backgroundColor: '#fef2f2',
              }}
            >
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                Erro ao Carregar Seção
              </h3>
              
              {this.props.sectionName && (
                <p className="text-sm text-gray-600 mb-4">
                  Seção: {this.props.sectionName}
                </p>
              )}
              
              <p className="text-gray-700 mb-6">
                Ocorreu um erro ao carregar esta seção. Por favor, tente novamente.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-700 mb-2">
                    Detalhes do Erro (Dev Mode)
                  </summary>
                  <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                    {this.state.error.toString()}
                    {'\n\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC para envolver seções facilmente
export const withSectionErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  sectionName?: string
) => {
  return (props: P) => (
    <SectionErrorBoundary sectionName={sectionName}>
      <Component {...props} />
    </SectionErrorBoundary>
  );
};
