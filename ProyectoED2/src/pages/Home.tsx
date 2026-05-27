import React from 'react';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>TechStore DS</h1>
        <p className={styles.subtitle}>
          Marketplace de productos tecnológicos con estructuras de datos académicas
        </p>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Características principales</h2>
        
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🔍</div>
            <h3 className={styles.cardTitle}>Búsqueda Inteligente</h3>
            <p className={styles.cardDescription}>
              Encuentra productos tecnológicos usando estructuras de datos optimizadas
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📋</div>
            <h3 className={styles.cardTitle}>Historial</h3>
            <p className={styles.cardDescription}>
              Accede a tu historial de búsquedas y productos visitados
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>⭐</div>
            <h3 className={styles.cardTitle}>Recomendaciones</h3>
            <p className={styles.cardDescription}>
              Recibe recomendaciones personalizadas basadas en tus preferencias
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
