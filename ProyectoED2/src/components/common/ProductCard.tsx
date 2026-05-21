import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.media} onClick={goToDetail}>
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.meta}>
          <span className={styles.price}>$ {product.price.toLocaleString()}</span>
          <span className={styles.rating}>⭐ {product.rating ?? 0}</span>
        </div>
        <button className={styles.detailBtn} onClick={goToDetail}>
          Ver detalle
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
