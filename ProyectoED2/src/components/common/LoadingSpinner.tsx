import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  isLoading?: boolean;
}

// Componente de indicador de carga
// Se muestra mientras se cargan datos
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading = true }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Cargando...</p>
    </div>
  );
};
