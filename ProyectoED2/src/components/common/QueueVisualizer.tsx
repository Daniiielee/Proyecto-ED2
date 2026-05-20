import React from 'react';
import styles from './QueueVisualizer.module.scss';

interface Props {
  items: string[];
  title?: string;
}

/**
 * Componente para visualizar una cola FIFO
 */
export const QueueVisualizer: React.FC<Props> = ({ items, title }) => {
  if (items.length === 0) {
    return (
      <div className={styles.container}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.empty}>Cola vacía</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.queueWrapper}>
        <span className={styles.label}>FRENTE</span>
        <div className={styles.queueList}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <div className={styles.node}>{item}</div>
              {index < items.length - 1 && <span className={styles.arrow}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <span className={styles.label}>FINAL</span>
      </div>
    </div>
  );
};

export default QueueVisualizer;
