import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';

// Página de detalle de un producto (placeholder que muestra el id)
export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalle del producto #{id}</h1>
      <p className={styles.note}>Próximamente: detalle completo del producto</p>
    </div>
  );
};
