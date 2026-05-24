import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavigationHistory.module.scss';
import { useNavigation } from '../context/NavigationContext';

// Página para mostrar el historial de navegación usando Stack
export const NavigationHistory: React.FC = () => {
  const { history, popPage, getCurrentPage } = useNavigation();
  const navigate = useNavigate();

  const handleBack = () => {
    popPage();
    const previousPage = getCurrentPage();

    if (previousPage) {
      switch (previousPage) {
        case 'Inicio':
          navigate('/');
          break;
        case 'Productos':
          navigate('/products');
          break;
        case 'Top Productos':
          navigate('/top-products');
          break;
        case 'Historial':
          navigate('/history');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>📋 Historial de Navegación</h1>
          <p className={styles.subtitle}>Páginas visitadas en esta sesión</p>
        </div>
        <span className={styles.badge}>Estructura: Stack (LIFO)</span>
      </header>

      {history.length === 0 ? (
        <p className={styles.empty}>No hay páginas en el historial</p>
      ) : (
        <ul className={styles.list}>
          {history.map((page, index) => (
            <li key={`${page}-${index}`} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.position}>#{index + 1}</span>
                <span className={styles.pageName}>{page}</span>
                {index === 0 && <span className={styles.currentBadge}>ACTUAL</span>}
              </div>
              <p className={styles.pageIcon}>📄</p>
            </li>
          ))}
        </ul>
      )}

      <button className={styles.backBtn} onClick={handleBack} disabled={history.length === 0}>
        ← Volver atrás
      </button>

      <p className={styles.note}>
        Stack usa LIFO: último en entrar, primero en salir.
      </p>
    </div>
  );
};
