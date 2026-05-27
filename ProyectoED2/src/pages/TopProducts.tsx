import React from 'react';
import styles from './TopProducts.module.scss';
import { useTopProducts } from '../hooks/useTopProducts';

// Página que muestra los productos mejor valorados usando Heap
export const TopProducts: React.FC = () => {
  const { topProducts, loading } = useTopProducts();
  const priceFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>🏆 Top Productos</h1>
          <p className={styles.subtitle}>Los productos mejor valorados</p>
        </div>
        <span className={styles.badge}>Estructura: Heap (Max-Heap)</span>
      </header>

      {loading ? (
        <p className={styles.loading}>Cargando top productos...</p>
      ) : topProducts.length === 0 ? (
        <p className={styles.empty}>No hay productos disponibles</p>
      ) : (
        <ul className={styles.list}>
          {topProducts.map((product, index) => (
            <li key={product.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.rank}>#{index + 1}</span>
                <span className={styles.productName}>{product.name}</span>
              </div>
              <p className={styles.category}>{product.category}</p>

              <div className={styles.details}>
                <span className={styles.rating}>⭐ {product.rating.toFixed(1)}</span>
                <span className={styles.price}>{priceFormatter.format(product.price)}</span>
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(product.rating / 5) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
