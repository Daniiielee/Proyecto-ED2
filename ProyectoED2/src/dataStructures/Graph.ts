// Estructura: Grafo no dirigido con pesos
// Uso en proyecto: recomendaciones de productos por categoría

class GraphVertex<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

class GraphEdge<T> {
  from: T;
  to: T;
  weight: number;

  constructor(from: T, to: T, weight: number = 1) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

class Graph<T> {
  private adjacencyList: Map<T, { node: T; weight: number }[]>;
  private isDirected: boolean;

  constructor(isDirected: boolean = false) {
    this.adjacencyList = new Map();
    this.isDirected = isDirected;
  }

  addVertex(value: T): void {
    if (!this.adjacencyList.has(value)) {
      this.adjacencyList.set(value, []);
    }
  }

  addEdge(from: T, to: T, weight: number = 1): void {
    if (from === to) return;

    this.addVertex(from);
    this.addVertex(to);

    const addNeighbor = (source: T, target: T, edgeWeight: number) => {
      const neighbors = this.adjacencyList.get(source);
      if (!neighbors) return;

      const existing = neighbors.find((neighbor) => neighbor.node === target);
      if (existing) {
        existing.weight = Math.max(existing.weight, edgeWeight);
      } else {
        neighbors.push({ node: target, weight: edgeWeight });
      }
    };

    addNeighbor(from, to, weight);
    if (!this.isDirected) {
      addNeighbor(to, from, weight);
    }
  }

  removeVertex(value: T): void {
    if (!this.adjacencyList.has(value)) return;

    this.adjacencyList.delete(value);
    this.adjacencyList.forEach((neighbors) => {
      const index = neighbors.findIndex((neighbor) => neighbor.node === value);
      if (index !== -1) {
        neighbors.splice(index, 1);
      }
    });
  }

  removeEdge(from: T, to: T): void {
    const removeNeighbor = (source: T, target: T) => {
      const neighbors = this.adjacencyList.get(source);
      if (!neighbors) return;
      this.adjacencyList.set(
        source,
        neighbors.filter((neighbor) => neighbor.node !== target)
      );
    };

    removeNeighbor(from, to);
    if (!this.isDirected) {
      removeNeighbor(to, from);
    }
  }

  getNeighbors(value: T): { node: T; weight: number }[] {
    return this.adjacencyList.get(value)?.slice() ?? [];
  }

  hasEdge(from: T, to: T): boolean {
    const neighbors = this.adjacencyList.get(from);
    return Boolean(neighbors?.some((neighbor) => neighbor.node === to));
  }

  bfs(startValue: T): T[] {
    const result: T[] = [];
    const visited = new Set<T>();
    const queue: T[] = [];

    if (!this.adjacencyList.has(startValue)) {
      return result;
    }

    visited.add(startValue);
    queue.push(startValue);

    while (queue.length > 0) {
      const current = queue.shift() as T;
      result.push(current);

      for (const neighbor of this.getNeighbors(current)) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          queue.push(neighbor.node);
        }
      }
    }

    return result;
  }

  dfs(startValue: T): T[] {
    const result: T[] = [];
    const visited = new Set<T>();

    const traverse = (value: T) => {
      if (visited.has(value)) return;
      visited.add(value);
      result.push(value);

      for (const neighbor of this.getNeighbors(value)) {
        traverse(neighbor.node);
      }
    };

    if (this.adjacencyList.has(startValue)) {
      traverse(startValue);
    }

    return result;
  }

  getAllVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  getSize(): number {
    return this.adjacencyList.size;
  }

  isEmpty(): boolean {
    return this.adjacencyList.size === 0;
  }

  clear(): void {
    this.adjacencyList.clear();
  }
}

export { Graph, GraphVertex, GraphEdge };
