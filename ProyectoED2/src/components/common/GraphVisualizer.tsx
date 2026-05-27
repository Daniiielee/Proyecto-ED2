import React from 'react';
import styles from './GraphVisualizer.module.scss';

type Edge = { from: string; to: string; weight: number };

type GraphVisualizerProps = {
  vertices: string[];
  edges: Edge[];
  title?: string;
  bfsResult?: string[];
  dfsResult?: string[];
};

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  vertices,
  edges,
  title,
  bfsResult,
  dfsResult,
}) => {
  if (!vertices || vertices.length === 0) {
    return (
      <div className={styles.container}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.empty}>Grafo vacío</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}

      <div className={styles.section}>
        <strong>Vértices:</strong>
        <div className={styles.verticesList}>
          {vertices.map((v) => (
            <span key={v} className={styles.vertex}>{v}</span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <strong>Aristas:</strong>
        <div className={styles.edgesList}>
          {edges.map((e, i) => (
            <div key={i} className={styles.edge}>
              {e.from} — {e.to} (peso: {e.weight})
            </div>
          ))}
        </div>
      </div>

      {bfsResult && bfsResult.length > 0 && (
        <div className={styles.section}>
          <strong>BFS:</strong>
          <div className={styles.traversal}>
            {bfsResult.map((n) => (
              <span key={n} className={styles.traversalNode}>{n}</span>
            ))}
          </div>
        </div>
      )}

      {dfsResult && dfsResult.length > 0 && (
        <div className={styles.section}>
          <strong>DFS:</strong>
          <div className={styles.traversal}>
            {dfsResult.map((n) => (
              <span key={n} className={styles.traversalNode}>{n}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphVisualizer;
