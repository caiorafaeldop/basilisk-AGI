/**
 * Rate Limiter
 * Previne spam e abuso no frontend
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private blocked: Map<string, number> = new Map();

  /**
   * Verifica se uma ação está bloqueada
   */
  isBlocked(key: string): boolean {
    const blockedUntil = this.blocked.get(key);
    if (!blockedUntil) return false;

    if (Date.now() < blockedUntil) {
      return true;
    }

    // Desbloqueou
    this.blocked.delete(key);
    return false;
  }

  /**
   * Verifica se pode executar ação
   */
  canAttempt(key: string, config: RateLimitConfig): boolean {
    // Verifica se está bloqueado
    if (this.isBlocked(key)) {
      return false;
    }

    const now = Date.now();
    const attempts = this.attempts.get(key) || [];

    // Remove tentativas antigas
    const recentAttempts = attempts.filter(
      timestamp => now - timestamp < config.windowMs
    );

    // Verifica limite
    if (recentAttempts.length >= config.maxAttempts) {
      // Bloquear
      if (config.blockDurationMs) {
        this.blocked.set(key, now + config.blockDurationMs);
      }
      return false;
    }

    return true;
  }

  /**
   * Registra uma tentativa
   */
  recordAttempt(key: string): void {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    attempts.push(now);
    this.attempts.set(key, attempts);
  }

  /**
   * Reseta tentativas
   */
  reset(key: string): void {
    this.attempts.delete(key);
    this.blocked.delete(key);
  }

  /**
   * Retorna tempo restante de bloqueio
   */
  getBlockedTimeRemaining(key: string): number {
    const blockedUntil = this.blocked.get(key);
    if (!blockedUntil) return 0;

    const remaining = blockedUntil - Date.now();
    return remaining > 0 ? remaining : 0;
  }
}

// Instância global
export const rateLimiter = new RateLimiter();

// Configurações pré-definidas
export const RATE_LIMIT_CONFIGS = {
  login: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutos
    blockDurationMs: 30 * 60 * 1000, // 30 minutos
  },
  register: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hora
    blockDurationMs: 2 * 60 * 60 * 1000, // 2 horas
  },
  passwordReset: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hora
    blockDurationMs: 60 * 60 * 1000, // 1 hora
  },
  apiCall: {
    maxAttempts: 100,
    windowMs: 60 * 1000, // 1 minuto
  },
};

/**
 * Hook para usar rate limiting
 */
export const useRateLimit = (
  key: string,
  config: RateLimitConfig
) => {
  const canAttempt = () => rateLimiter.canAttempt(key, config);
  const recordAttempt = () => rateLimiter.recordAttempt(key);
  const reset = () => rateLimiter.reset(key);
  const isBlocked = () => rateLimiter.isBlocked(key);
  const getBlockedTime = () => rateLimiter.getBlockedTimeRemaining(key);

  return {
    canAttempt,
    recordAttempt,
    reset,
    isBlocked,
    getBlockedTime,
  };
};
