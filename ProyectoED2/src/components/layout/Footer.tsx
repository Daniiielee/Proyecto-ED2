import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

// Componente de pie de página con diseño en dos columnas
export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.brand}>TechStore DS</div>
          <p className={styles.description}>Marketplace académico de productos tecnológicos.</p>
          <p className={styles.meta}>Proyecto Académico - Estructura de Datos II · Universidad UAO</p>
        </div>

        <div className={styles.right}>
          <h4 className={styles.linksTitle}>Enlaces</h4>
          <ul className={styles.linksList}>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/products">Productos</Link>
            </li>
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
          </ul>
          <p className={styles.copy}>&copy; 2026 TechStore DS</p>
        </div>
      </div>
    </footer>
  );
};
