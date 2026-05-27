import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigationHistory } from '../hooks/useNavigationHistory';

// Tipo para el contexto de navegación
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

// Proveedor de navegación que comparte el historial y las operaciones del Stack
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const { history, pushPage, popPage, getCurrentPage } = useNavigationHistory();

  return (
    <NavigationContext.Provider value={{ history, pushPage, popPage, getCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Hook para consumir el contexto de navegación
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation debe usarse dentro de NavigationProvider');
  }
  return context;
};
