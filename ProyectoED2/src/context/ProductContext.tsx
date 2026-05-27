import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { Product } from '../types';

// Tipo de contexto para productos en toda la aplicación
export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

interface ProductProviderProps {
  children: React.ReactNode;
}

// Provider que mantiene el estado global de productos
export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtra productos por categoría y texto de búsqueda
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === 'Todos' || selectedCategory.trim() === ''
        ? true
        : product.category === selectedCategory;

    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  // Carga los productos desde Firestore
  const refreshProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const productsRef = collection(db, 'products');
      const productsQuery = query(productsRef, orderBy('name'));
      const snapshot = await getDocs(productsQuery);

      const loadedProducts: Product[] = [];
      snapshot.forEach((docSnap) => {
        loadedProducts.push({ id: docSnap.id, ...(docSnap.data() as Omit<Product, 'id'>) });
      });

      setProducts(loadedProducts);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(message);
      console.error('ProductContext refreshProducts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        selectedCategory,
        searchQuery,
        setSelectedCategory,
        setSearchQuery,
        filteredProducts,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook para consumir el contexto de productos desde cualquier componente
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider');
  }
  return context;
};
