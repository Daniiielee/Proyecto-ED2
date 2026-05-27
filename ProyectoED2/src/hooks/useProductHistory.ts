import { useRef, useState } from 'react';
import { LinkedList } from '../dataStructures/LinkedList';
import type { Product } from '../types';

// Hook para historial de productos recientes usando LinkedList
export const useProductHistory = () => {
  const listRef = useRef<LinkedList<Product>>(new LinkedList<Product>());
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  // Agrega un producto al inicio del historial y mantiene máximo 5
  const addToHistory = (product: Product) => {
    const list = listRef.current;
    list.prepend(product);

    if (list.getSize() > 5) {
      // Eliminar el último producto cuando superamos el límite
      const products = list.toArray();
      products.pop();
      list.clear();
      products.forEach((item) => list.append(item));
    }

    const updatedProducts = list.toArray();
    setRecentProducts(updatedProducts);
  };

  // Obtiene el historial actual como arreglo
  const getHistory = (): Product[] => {
    return listRef.current.toArray();
  };

  // Limpia todo el historial de productos
  const clearHistory = () => {
    listRef.current.clear();
    setRecentProducts([]);
  };

  return {
    recentProducts,
    addToHistory,
    getHistory,
    clearHistory,
  };
};
