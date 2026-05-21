import { useRef, useState } from 'react';
import { Stack } from '../dataStructures/Stack';

// Hook para historial de navegación basado en Stack
export const useNavigationHistory = () => {
  const stackRef = useRef<Stack<string>>(new Stack<string>());
  const [history, setHistory] = useState<string[]>([]);

  // Agrega una página al historial
  const pushPage = (page: string) => {
    stackRef.current.push(page);
    setHistory(stackRef.current.toArray());
  };

  // Remueve y retorna la última página visitada
  const popPage = (): string | undefined => {
    const page = stackRef.current.pop();
    setHistory(stackRef.current.toArray());
    return page;
  };

  // Retorna la página actual en el tope de la pila
  const getCurrentPage = (): string | undefined => {
    return stackRef.current.peek();
  };

  // Retorna el historial completo como arreglo
  const getHistory = (): string[] => {
    return stackRef.current.toArray();
  };

  return {
    history,
    pushPage,
    popPage,
    getCurrentPage,
    getHistory,
  };
};
