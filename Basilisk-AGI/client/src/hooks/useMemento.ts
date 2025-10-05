import { useState, useCallback, useRef } from 'react';

interface MementoState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useMemento<T>(initialState: T) {
  const [state, setState] = useState<MementoState<T>>({
    past: [],
    present: initialState,
    future: []
  });

  const ignoreNextUpdate = useRef(false);

  // Atualizar estado e adicionar ao histórico
  const updateState = useCallback((newState: T | ((prev: T) => T)) => {
    setState(current => {
      const nextState = typeof newState === 'function' 
        ? (newState as (prev: T) => T)(current.present)
        : newState;

      // Não duplicar se for idêntico
      if (JSON.stringify(nextState) === JSON.stringify(current.present)) {
        return current;
      }

      return {
        past: [...current.past, current.present].slice(-50), // Manter últimas 50
        present: nextState,
        future: [] // Limpar future ao fazer nova ação
      };
    });
  }, []);

  // Desfazer
  const undo = useCallback(() => {
    setState(current => {
      if (current.past.length === 0) return current;

      const previous = current.past[current.past.length - 1];
      const newPast = current.past.slice(0, -1);

      return {
        past: newPast,
        present: previous,
        future: [current.present, ...current.future]
      };
    });
  }, []);

  // Refazer
  const redo = useCallback(() => {
    setState(current => {
      if (current.future.length === 0) return current;

      const next = current.future[0];
      const newFuture = current.future.slice(1);

      return {
        past: [...current.past, current.present],
        present: next,
        future: newFuture
      };
    });
  }, []);

  // Resetar histórico
  const reset = useCallback((newState: T) => {
    setState({
      past: [],
      present: newState,
      future: []
    });
  }, []);

  return {
    state: state.present,
    setState: updateState,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    historySize: state.past.length
  };
}
