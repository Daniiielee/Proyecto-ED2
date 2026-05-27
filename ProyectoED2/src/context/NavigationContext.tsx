import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigationHistory } from '../hooks/useNavigationHistory';

interface NavigationContextType {
  history: string[];
  pushPage: (page: string) => void;
  popPage: () => string | undefined;
  getCurrentPage: () => string | undefined;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const { history, pushPage, popPage, getCurrentPage } = useNavigationHistory();

  return (
    <NavigationContext.Provider value={{ history, pushPage, popPage, getCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation debe usarse dentro de NavigationProvider');
  }
  return context;
};
