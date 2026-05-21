import { useRef, useState } from 'react';
import Trie from '../dataStructures/Trie';

// Hook para gestionar búsqueda inteligente con Trie
export const useSearch = () => {
  const trieRef = useRef<Trie | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Inicializar el Trie con una lista de palabras
  const initializeTrie = (words: string[]) => {
    const trie = new Trie();
    words.forEach((word) => trie.insert(word.toLowerCase()));
    trieRef.current = trie;
  };

  // Maneja la búsqueda y actualiza las sugerencias
  const handleSearch = (term: string) => {
    const normalizedTerm = term.trim().toLowerCase();
    setSearchTerm(term);

    if (!trieRef.current || normalizedTerm === '') {
      setSuggestions([]);
      return;
    }

    const suggestionsFromTrie = trieRef.current.getWordsWithPrefix(normalizedTerm);
    setSuggestions(suggestionsFromTrie);
  };

  // Limpia la búsqueda y las sugerencias
  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  return {
    suggestions,
    searchTerm,
    initializeTrie,
    handleSearch,
    clearSearch,
  };
};
