import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

// Componente de barra de navegación
// Contiene logo y enlaces de navegación principal
export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo/Título */}
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.title}>TechStore DS</span>
          </Link>
        </div>

        {/* Enlaces de navegación */}
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.link}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/products" className={styles.link}>
              Productos
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.link}>
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
