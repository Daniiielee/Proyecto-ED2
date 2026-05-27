import React from 'react';
import styles from './HeapVisualizer.module.scss';

type HeapVisualizerProps = {
  items: number[];
  title?: string;
};

const HeapVisualizer: React.FC<HeapVisualizerProps> = ({ items, title }) => {
  if (!items || items.length === 0) {
    return (
      <div className={styles.container}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.empty}>Heap vacío</div>
      </div>
    );
  }

  // Construir niveles como árbol binario
  const levels: number[][] = [];
  let index = 0;
  let level = 0;
  while (index < items.length) {
    const count = Math.pow(2, level);
    levels.push(items.slice(index, index + count));
    index += count;
    level += 1;
  }

  return (
    <div className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}

      <div className={styles.levels}>
        {levels.map((nodes, lvl) => (
          <div key={lvl} className={styles.level}>
            {nodes.map((value, idx) => {
              const globalIndex = Math.pow(2, lvl) - 1 + idx; // index calculation for level
              const isRoot = globalIndex === 0;
              return (
                <div
                  key={`${lvl}-${idx}`}
                  className={isRoot ? styles.nodeRoot : styles.node}
                >
                  {isRoot && <span className={styles.badge}>MAX</span>}
                  {value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeapVisualizer;
