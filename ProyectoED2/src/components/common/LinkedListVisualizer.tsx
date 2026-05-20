import React from 'react';
import styles from './LinkedListVisualizer.module.scss';

interface Props {
  items: string[];
  title?: string;
}

/**
 * Componente para visualizar una Lista Enlazada
 * Muestra nodos conectados con flechas
 */
export const LinkedListVisualizer: React.FC<Props> = ({ items, title }) => {
  if (items.length === 0) {
    return (
      <div className={styles.container}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.empty}>Lista vacía</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.listWrapper}>
        <div className={styles.nodeList}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <div className={styles.node}>
                <span className={styles.nodeContent}>{item}</span>
              </div>
              {index < items.length - 1 && (
                <div className={styles.arrow}>→</div>
              )}
            </React.Fragment>
          ))}
          <div className={styles.nullNode}>null</div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
