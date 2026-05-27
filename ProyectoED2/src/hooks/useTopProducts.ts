import { useEffect, useState } from 'react';
import { Heap } from '../dataStructures/Heap';
import type { Product } from '../types';
import { useProducts } from './useProducts';

export const useTopProducts = () => {
  const { products, loading } = useProducts();
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!products || products.length === 0) {
      setTopProducts([]);
      return;
    }

    const heap = new Heap<Product>((a, b) => a.rating - b.rating);
    products.forEach((product) => heap.insert(product));

    const sortedProducts = heap.getSorted();
    setTopProducts(sortedProducts.slice(0, 5));
  }, [products]);

  return { topProducts, loading };
};
