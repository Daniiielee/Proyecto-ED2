import { useRef, useState } from 'react';
import { LinkedList } from '../dataStructures/LinkedList';
import type { Product } from '../types';

export const useProductHistory = () => {
  const listRef = useRef<LinkedList<Product>>(new LinkedList<Product>());
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  const addToHistory = (product: Product) => {
    const list = listRef.current;
    list.prepend(product);

    if (list.getSize() > 5) {
      const products = list.toArray();
      products.pop();
      list.clear();
      products.forEach((item) => list.append(item));
    }

    const updatedProducts = list.toArray();
    setRecentProducts(updatedProducts);
  };

  const getHistory = (): Product[] => {
    return listRef.current.toArray();
  };

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
