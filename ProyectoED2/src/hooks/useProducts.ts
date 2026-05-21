import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { Product } from '../types';

// Hook personalizado para operaciones CRUD con Firestore
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carga todos los productos de Firestore ordenados por nombre
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('name'));
      const querySnapshot = await getDocs(q);

      const loadedProducts: Product[] = [];
      querySnapshot.forEach((document) => {
        loadedProducts.push({
          id: document.id,
          ...document.data(),
        } as Product);
      });

      setProducts(loadedProducts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Agrega un nuevo producto a Firestore
  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      setLoading(true);
      setError(null);

      const productsRef = collection(db, 'products');
      const docRef = await addDoc(productsRef, product);

      // Agregar el nuevo producto a la lista local
      setProducts([...products, { id: docRef.id, ...product }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al agregar producto';
      setError(errorMessage);
      console.error('Error adding product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualiza un producto existente en Firestore
  const updateProduct = async (id: string, data: Partial<Product>) => {
    try {
      setLoading(true);
      setError(null);

      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, data);

      // Actualizar en la lista local
      setProducts(
        products.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar producto';
      setError(errorMessage);
      console.error('Error updating product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Elimina un producto de Firestore
  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const productRef = doc(db, 'products', id);
      await deleteDoc(productRef);

      // Eliminar de la lista local
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar producto';
      setError(errorMessage);
      console.error('Error deleting product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Al montar el componente, cargar productos
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
