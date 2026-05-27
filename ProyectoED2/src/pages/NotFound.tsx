import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

// Página 404 - No encontrado
export const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Página no encontrada</h2>
      <p className={styles.message}>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className={styles.homeLink}>Volver al inicio</Link>
    </div>
  );
};
