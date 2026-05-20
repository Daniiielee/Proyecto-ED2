import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  message?: string;
  isLoading?: boolean;
}

// Componente de indicador de carga
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Cargando...', isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      {message && <p className={styles.loadingText}>{message}</p>}
    </div>
  );
};
