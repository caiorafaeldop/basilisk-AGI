/**
 * Undo/Redo Hook
 * Sistema de desfazer/refazer para configurações
 */

import { useState, useCallback, useRef } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export const useUndoRedo = <T>(initialState: T, maxHistory: number = 50) => {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  const isUndoing = useRef(false);
  const isRedoing = useRef(false);

  /**
   * Define um novo estado
   */
  const setState = useCallback((newState: T | ((prev: T) => T)) => {
    setHistory((currentHistory) => {
      const newPresent = typeof newState === 'function'
        ? (newState as (prev: T) => T)(currentHistory.present)
        : newState;

      // Não adiciona ao histórico se for undo/redo
      if (isUndoing.current || isRedoing.current) {
        isUndoing.current = false;
        isRedoing.current = false;
        return currentHistory;
      }

      // Não adiciona se o estado não mudou
      if (JSON.stringify(newPresent) === JSON.stringify(currentHistory.present)) {
        return currentHistory;
      }

      const newPast = [...currentHistory.past, currentHistory.present];

      // Limita o histórico
      if (newPast.length > maxHistory) {
        newPast.shift();
      }

      return {
        past: newPast,
        present: newPresent,
        future: [], // Limpa o future ao fazer uma nova ação
      };
    });
  }, [maxHistory]);

  /**
   * Desfaz a última ação
   */
  const undo = useCallback(() => {
    setHistory((currentHistory) => {
      if (currentHistory.past.length === 0) {
        return currentHistory;
      }

      const previous = currentHistory.past[currentHistory.past.length - 1];
      const newPast = currentHistory.past.slice(0, currentHistory.past.length - 1);

      isUndoing.current = true;

      return {
        past: newPast,
        present: previous,
        future: [currentHistory.present, ...currentHistory.future],
      };
    });
  }, []);

  /**
   * Refaz a última ação desfeita
   */
  const redo = useCallback(() => {
    setHistory((currentHistory) => {
      if (currentHistory.future.length === 0) {
        return currentHistory;
      }

      const next = currentHistory.future[0];
      const newFuture = currentHistory.future.slice(1);

      isRedoing.current = true;

      return {
        past: [...currentHistory.past, currentHistory.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  /**
   * Reseta o histórico
   */
  const reset = useCallback((newState: T) => {
    setHistory({
      past: [],
      present: newState,
      future: [],
    });
  }, []);

  /**
   * Limpa o histórico mantendo o estado atual
   */
  const clearHistory = useCallback(() => {
    setHistory((currentHistory) => ({
      past: [],
      present: currentHistory.present,
      future: [],
    }));
  }, []);

  return {
    state: history.present,
    setState,
    undo,
    redo,
    reset,
    clearHistory,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    historySize: history.past.length + history.future.length + 1,
  };
};

/**
 * Hook específico para configurações do site
 */
export const useConfigUndoRedo = <T>(initialConfig: T) => {
  const {
    state: config,
    setState: setConfig,
    undo,
    redo,
    reset,
    clearHistory,
    canUndo,
    canRedo,
    historySize,
  } = useUndoRedo(initialConfig, 50);

  /**
   * Atualiza uma propriedade específica
   */
  const updateProperty = useCallback((key: keyof T, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, [setConfig]);

  /**
   * Atualiza múltiplas propriedades
   */
  const updateProperties = useCallback((updates: Partial<T>) => {
    setConfig((prev) => ({
      ...prev,
      ...updates,
    }));
  }, [setConfig]);

  return {
    config,
    setConfig,
    updateProperty,
    updateProperties,
    undo,
    redo,
    reset,
    clearHistory,
    canUndo,
    canRedo,
    historySize,
  };
};

/**
 * Componente de controles de Undo/Redo
 */
export const UndoRedoControls = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  historySize,
}: {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  historySize: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Desfazer (Ctrl+Z)"
        aria-label="Desfazer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      </button>

      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Refazer (Ctrl+Y)"
        aria-label="Refazer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
        </svg>
      </button>

      <span className="text-xs text-gray-500 ml-2">
        {historySize} {historySize === 1 ? 'alteração' : 'alterações'}
      </span>
    </div>
  );
};
