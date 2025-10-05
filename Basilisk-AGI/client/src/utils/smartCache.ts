/**
 * Smart Cache System
 * Sistema de cache inteligente com TTL e invalidação
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class SmartCache {
  private cache: Map<string, CacheEntry<any>>;
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  /**
   * Define um valor no cache com TTL
   */
  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // Se cache está cheio, remove o mais antigo
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.getOldestKey();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Recupera um valor do cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Verifica se expirou
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Verifica se uma chave existe e está válida
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Remove uma chave específica
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Invalida cache por padrão
   */
  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    const keysToDelete: string[] = [];

    this.cache.forEach((_, key) => {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Retorna estatísticas do cache
   */
  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    entries: Array<{ key: string; age: number }>;
  } {
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: Date.now() - entry.timestamp,
    }));

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0, // TODO: Implementar tracking de hits
      entries,
    };
  }

  /**
   * Retorna a chave mais antiga
   */
  private getOldestKey(): string | null {
    let oldestKey: string | null = null;
    let oldestTimestamp = Infinity;

    this.cache.forEach((entry, key) => {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    });

    return oldestKey;
  }

  /**
   * Limpa entradas expiradas
   */
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }
}

// Instância global
export const smartCache = new SmartCache(100);

// Auto cleanup a cada 5 minutos (apenas se não estiver em testes)
if (typeof window !== 'undefined' && !import.meta.env.TEST) {
  const cleanupInterval = setInterval(() => {
    smartCache.cleanup();
  }, 5 * 60 * 1000);
  
  // Cleanup quando a aplicação descarregar
  if (typeof window.addEventListener === 'function') {
    window.addEventListener('beforeunload', () => {
      clearInterval(cleanupInterval);
    });
  }
}

/**
 * Hook para usar cache com React Query
 */
export const useCachedQuery = <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 5 * 60 * 1000
): { data: T | null; isLoading: boolean; error: Error | null } => {
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      // Verifica cache primeiro
      const cached = smartCache.get<T>(key);
      if (cached) {
        setData(cached);
        return;
      }

      // Se não tem cache, busca
      setIsLoading(true);
      try {
        const result = await fetcher();
        smartCache.set(key, result, ttl);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key, ttl]);

  return { data, isLoading, error };
};

/**
 * Decorator para cachear funções
 */
export function cached(ttl: number = 5 * 60 * 1000) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${propertyKey}-${JSON.stringify(args)}`;
      
      const cached = smartCache.get(cacheKey);
      if (cached) {
        return cached;
      }

      const result = await originalMethod.apply(this, args);
      smartCache.set(cacheKey, result, ttl);
      
      return result;
    };

    return descriptor;
  };
}

// Adicionar React import
import React from 'react';
