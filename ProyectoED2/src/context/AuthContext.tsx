import React from 'react';

interface AuthContextType {
  // Se definirá cuando se implemente la autenticación
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Componente proveedor de contexto de autenticación
// Por ahora solo pasa los children, la lógica se agregará posteriormente
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};
