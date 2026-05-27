import { useCallback, useRef, useState } from 'react';
import { Graph } from '../dataStructures/Graph';
import type { Product } from '../types';

const useRecommendations = () => {
  const graphRef = useRef(new Graph<string>(false));
  const productsRef = useRef<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [graphBuilt, setGraphBuilt] = useState(false);

  const buildGraph = useCallback((products: Product[]) => {
    graphRef.current.clear();
    productsRef.current = products;

    products.forEach((product) => {
      graphRef.current.addVertex(product.id);
    });

    for (let i = 0; i < products.length; i += 1) {
      for (let j = i + 1; j < products.length; j += 1) {
        const first = products[i];
        const second = products[j];

        if (first.category !== second.category) {
          continue;
        }

        const weight = Math.abs(first.rating - second.rating) < 1 ? 2 : 1;
        graphRef.current.addEdge(first.id, second.id, weight);
      }
    }

    setRecommendations([]);
    setGraphBuilt(true);
  }, []);

  const getRecommendations = useCallback((productId: string, limit: number = 4): string[] => {
    if (!graphRef.current.getAllVertices().includes(productId)) {
      setRecommendations([]);
      return [];
    }

    const neighbors = graphRef.current.getNeighbors(productId);
    const sortedNeighbors = [...neighbors].sort((a, b) => b.weight - a.weight);
    const recommendedIds = sortedNeighbors.slice(0, limit).map((neighbor) => neighbor.node);

    const recommendedProducts = recommendedIds
      .map((id) => productsRef.current.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product));

    setRecommendations(recommendedProducts);
    return recommendedIds;
  }, []);

  return {
    recommendations,
    buildGraph,
    getRecommendations,
    graphBuilt,
  };
};

export default useRecommendations;
