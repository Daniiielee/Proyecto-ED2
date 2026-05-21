import React, { useState } from 'react';
import styles from './Products.module.scss';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/common/ProductCard';
import { ProductForm } from '../components/common/ProductForm';
import type { Product } from '../types';

// Página de listado de productos desde Firestore
export const Products: React.FC = () => {
  const { products, loading, error, addProduct } = useProducts();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoadingTestData, setIsLoadingTestData] = useState<boolean>(false);

  // Datos de prueba académicos para demostración
  const testProducts: Omit<Product, 'id'>[] = [
    {
      name: 'Laptop HP Pavilion',
      price: 2500000,
      category: 'Laptops',
      description: 'Laptop ideal para estudiantes y profesionales. Procesador Intel i7, 16GB RAM, SSD 512GB.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Laptop+HP',
      stock: 10,
      rating: 4.5,
      searchCount: 0,
    },
    {
      name: 'iPhone 14',
      price: 3800000,
      category: 'Smartphones',
      description: 'Smartphone Apple última generación. Pantalla OLED, cámara dual, batería de larga duración.',
      imageUrl: 'https://via.placeholder.com/300x200?text=iPhone+14',
      stock: 5,
      rating: 4.8,
      searchCount: 0,
    },
    {
      name: 'Audífonos Sony WH-1000XM5',
      price: 1200000,
      category: 'Audio',
      description: 'Audífonos con cancelación activa de ruido. Sonido premium, 30 horas de batería.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Audifonos+Sony',
      stock: 15,
      rating: 4.7,
      searchCount: 0,
    },
    {
      name: 'Mouse Logitech MX Master 3',
      price: 450000,
      category: 'Accesorios',
      description: 'Mouse ergonómico profesional. Precisión perfecta, múltiples botones programables.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Mouse+Logitech',
      stock: 20,
      rating: 4.6,
      searchCount: 0,
    },
  ];

  // Carga los datos de prueba agregando cada producto
  const handleLoadTestData = async () => {
    setIsLoadingTestData(true);
    try {
      for (const product of testProducts) {
        await addProduct(product);
      }
      alert('Datos de prueba cargados exitosamente');
    } catch (err) {
      alert('Error al cargar los datos de prueba');
      console.error(err);
    } finally {
      setIsLoadingTestData(false);
    }
  };

  // Maneja el envío del formulario
  const handleFormSubmit = async (product: Omit<Product, 'id'>) => {
    try {
      await addProduct(product);
      alert('Producto agregado exitosamente');
    } catch (err) {
      alert('Error al agregar el producto');
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <div className={styles.header}>
        <h1 className={styles.title}>Productos TechStore DS</h1>
        <div className={styles.actions}>
          {/* Botón agregar producto */}
          <button
            className={styles.addBtn}
            onClick={() => setShowForm(true)}
            disabled={loading}
          >
            + Agregar producto
          </button>

          {/* Botón cargar datos de prueba (temporal) */}
          <button
            className={styles.testDataBtn}
            onClick={handleLoadTestData}
            disabled={loading || isLoadingTestData}
          >
            {isLoadingTestData ? 'Cargando...' : '📊 Datos de prueba'}
          </button>
        </div>
      </div>

      {/* Mostrar estado de carga */}
      {loading && <p className={styles.loading}>Cargando productos...</p>}

      {/* Mostrar errores */}
      {error && <p className={styles.error}>Error: {error}</p>}

      {/* Mostrar mensaje si no hay productos */}
      {!loading && !error && products.length === 0 && (
        <p className={styles.empty}>
          No hay productos aún. ¡Sé el primero en agregar uno!
        </p>
      )}

      {/* Grid de productos */}
      {!loading && !error && products.length > 0 && (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Modal del formulario */}
      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};
