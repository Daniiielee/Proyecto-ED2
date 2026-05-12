// Estructura de datos: Grafo (Graph)
// Usada para: Relaciones entre productos, rutas de recomendación
// Esta es una estructura vacía que será implementada posteriormente

/**
 * Vértice del Grafo
 */
class GraphVertex<T> {
  // value: T;
  // edges: GraphEdge<T>[];
}

/**
 * Arista del Grafo
 */
class GraphEdge<T> {
  // from: GraphVertex<T>;
  // to: GraphVertex<T>;
  // weight?: number;
}

/**
 * Grafo
 * Estructura que representa relaciones entre elementos
 * Utilidad: Recomendaciones basadas en relaciones, análisis de similitud
 */
class Graph<T> {
  // vertices: Map<string, GraphVertex<T>>;
  // isDirected: boolean;

  // Métodos a implementar:
  // - addVertex(vertex: GraphVertex<T>): Agregar vértice
  // - addEdge(from: GraphVertex<T>, to: GraphVertex<T>, weight?: number): Agregar arista
  // - removeVertex(value: T): Remover vértice
  // - removeEdge(from: T, to: T): Remover arista
  // - getNeighbors(value: T): T[]: Obtener vecinos
  // - dfs(startValue: T): T[]: Búsqueda en profundidad
  // - bfs(startValue: T): T[]: Búsqueda en amplitud
}

export { Graph, GraphVertex, GraphEdge };
