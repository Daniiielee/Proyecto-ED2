import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useProductHistory } from '../hooks/useProductHistory';
import type { Product } from '../types';
import styles from './ProductDetail.module.scss';

// Página de detalle de un producto con historial reciente
export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { recentProducts, addToHistory } = useProductHistory();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) {
      setCurrentProduct(null);
      return;
    }

    const product = products.find((item) => item.id === id) || null;
    setCurrentProduct(product);
  }, [id, products]);

  useEffect(() => {
    if (currentProduct) {
      addToHistory(currentProduct);
    }
  }, [currentProduct?.id]);

  const handleBack = () => {
    navigate('/products');
  };

  if (loading) {
    return <p className={styles.loading}>Cargando producto...</p>;
  }

  if (!currentProduct) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Producto no encontrado</h1>
        <p className={styles.note}>El producto solicitado no existe o fue eliminado.</p>
        <button className={styles.backBtn} onClick={handleBack}>
          Volver a productos
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.detailContainer}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.productImage}
            src={currentProduct.imageUrl}
            alt={currentProduct.name}
          />
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.title}>{currentProduct.name}</h1>
          <p className={styles.category}>{currentProduct.category}</p>
          <p className={styles.description}>{currentProduct.description}</p>

          <div className={styles.metaGrid}>
            <span className={styles.price}>$ {currentProduct.price.toLocaleString()}</span>
            <span className={styles.rating}>⭐ {currentProduct.rating}</span>
            <span className={styles.stock}>Stock disponible: {currentProduct.stock}</span>
          </div>

          <button className={styles.backBtn} onClick={handleBack}>
            Volver a productos
          </button>
        </div>
      </section>

      <section className={styles.historySection}>
        <div className={styles.historyHeader}>
          <h2 className={styles.historyTitle}>Vistos recientemente</h2>
          <span className={styles.historyBadge}>(LinkedList)</span>
        </div>

        {recentProducts.length === 0 ? (
          <p className={styles.emptyHistory}>No hay productos recientes</p>
        ) : (
          <div className={styles.historyGrid}>
            {recentProducts.map((product) => (
              <article key={product.id} className={styles.historyCard}>
                <h3>{product.name}</h3>
                <p>$ {product.price.toLocaleString()}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

