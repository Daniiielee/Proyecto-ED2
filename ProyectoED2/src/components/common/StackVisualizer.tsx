import React from 'react';
import styles from './StackVisualizer.module.scss';

interface Props {
  items: string[];
  title?: string;
}

/**
 * Componente para visualizar una Pila (Stack)
 * Muestra elementos apilados verticalmente con tope marcado
 */
export const StackVisualizer: React.FC<Props> = ({ items, title }) => {
  if (items.length === 0) {
    return (
      <div className={styles.container}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.empty}>Pila vacía</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.stackWrapper}>
        <div className={styles.stack}>
          {items.map((item, index) => (
            <div key={index} className={`${styles.box} ${index === 0 ? styles.topBox : ''}`}>
              {index === 0 && <span className={styles.topLabel}>TOP ↑</span>}
              <span className={styles.boxContent}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;
