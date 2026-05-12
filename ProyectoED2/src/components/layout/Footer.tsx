import React from 'react';
import styles from './Footer.module.scss';

// Componente de pie de página
export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2026 TechStore DS - Marketplace de Productos Tecnológicos</p>
        <p>Proyecto Académico de Estructuras de Datos II</p>
      </div>
    </footer>
  );
};
