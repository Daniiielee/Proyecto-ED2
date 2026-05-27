import React, { useState, useEffect } from 'react';
import styles from './Products.module.scss';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/common/ProductCard';
import { ProductForm } from '../components/common/ProductForm';
import type { Product } from '../types';
import { useSearch } from '../hooks/useSearch';

// Página de listado de productos desde Firestore
export const Products: React.FC = () => {
  const { products, loading, error, addProduct } = useProducts();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoadingTestData, setIsLoadingTestData] = useState<boolean>(false);
  // Hook de búsqueda que usa Trie internamente
  const { suggestions, searchTerm, initializeTrie, handleSearch, clearSearch } = useSearch();

  // Estado local para resultados filtrados por búsqueda
  const [filteredBySearch, setFilteredBySearch] = useState<Product[]>([]);

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

  // Carga los datos de prueba agregando solo los productos que no existen
  const handleLoadTestData = async () => {
    setIsLoadingTestData(true);
    try {
      let addedCount = 0;
      for (const product of testProducts) {
        const exists = products.some((p) => p.name === product.name);
        if (exists) continue;
        await addProduct(product);
        addedCount += 1;
      }

      if (addedCount === 0) {
        alert('Los datos de prueba ya están cargados');
      } else {
        alert(`Se agregaron ${addedCount} productos nuevos`);
      }
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

  // Inicializar el Trie cuando cambian los productos
  useEffect(() => {
    if (products && products.length > 0) {
      initializeTrie(products.map((p) => p.name));
    }
  }, [products, initializeTrie]);

  // Actualizar listado filtrado cuando cambia el término de búsqueda o los productos
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setFilteredBySearch(products);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredBySearch(
        products.filter((p) => p.name.toLowerCase().includes(term))
      );
    }
  }, [searchTerm, products]);

  // Determinar qué productos mostrar según el término de búsqueda
  const displayedProducts = searchTerm && searchTerm.trim() !== '' ? filteredBySearch : products;

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

      {/* Sección de búsqueda (Trie) */}
      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <input
            className={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchTerm && searchTerm.trim() !== '' && (
            <button className={styles.clearBtn} onClick={clearSearch} aria-label="Limpiar búsqueda">X</button>
          )}

          {suggestions.length > 0 && searchTerm && searchTerm.trim() !== '' && (
            <ul className={styles.suggestions}>
              {suggestions.map((s) => (
                <li key={s} className={styles.suggestionItem} onClick={() => handleSearch(s)}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mostrar estado de carga */}
      {loading && <p className={styles.loading}>Cargando productos...</p>}

      {/* Mostrar errores */}
      {error && <p className={styles.error}>Error: {error}</p>}

      {/* Mostrar mensaje si no hay productos (considerando búsqueda) */}
      {!loading && !error && displayedProducts.length === 0 && (
        <p className={styles.empty}>
          No hay productos que coincidan con la búsqueda.
        </p>
      )}

      {/* Grid de productos */}
      {!loading && !error && displayedProducts.length > 0 && (
        <div className={styles.grid}>
          {displayedProducts.map((product) => (
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
