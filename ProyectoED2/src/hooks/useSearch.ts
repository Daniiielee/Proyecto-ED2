import { useRef, useState } from 'react';
import { Trie } from '../dataStructures/Trie';

export const useSearch = () => {
  const trieRef = useRef<Trie | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const initializeTrie = (words: string[]) => {
    const trie = new Trie();
    words.forEach((word) => trie.insert(word.toLowerCase()));
    trieRef.current = trie;
  };

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
