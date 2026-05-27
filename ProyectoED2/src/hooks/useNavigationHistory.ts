import { useRef, useState } from 'react';
import { Stack } from '../dataStructures/Stack';

export const useNavigationHistory = () => {
  const stackRef = useRef<Stack<string>>(new Stack<string>());
  const [history, setHistory] = useState<string[]>([]);

  const pushPage = (page: string) => {
    stackRef.current.push(page);
    setHistory(stackRef.current.toArray());
  };

  const popPage = (): string | undefined => {
    const page = stackRef.current.pop();
    setHistory(stackRef.current.toArray());
    return page;
  };

  const getCurrentPage = (): string | undefined => {
    return stackRef.current.peek();
  };

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
