import React from 'react';
import styles from './Products.module.scss';

// Página de listado de productos (placeholder mejorado)
export const Products: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Productos</h1>
      <h2 className={styles.subtitle}>Explora nuestro catálogo tecnológico</h2>
      <p className={styles.note}>
        Próximamente: listado de productos con búsqueda inteligente usando <strong>Trie</strong>.
      </p>
    </div>
  );
};
