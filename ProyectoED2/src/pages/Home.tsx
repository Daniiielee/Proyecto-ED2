import React from 'react';
import styles from './Home.module.scss';

// Página de inicio del marketplace
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
          {/* Card 1: Búsqueda Inteligente */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>🔍</div>
            <h3 className={styles.cardTitle}>Búsqueda Inteligente</h3>
            <p className={styles.cardDescription}>
              Encuentra productos tecnológicos usando estructuras de datos optimizadas
            </p>
          </div>

          {/* Card 2: Historial */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>📋</div>
            <h3 className={styles.cardTitle}>Historial</h3>
            <p className={styles.cardDescription}>
              Accede a tu historial de búsquedas y productos visitados
            </p>
          </div>

          {/* Card 3: Recomendaciones */}
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
