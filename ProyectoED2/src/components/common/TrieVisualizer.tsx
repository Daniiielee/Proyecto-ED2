import React from 'react';
import styles from './TrieVisualizer.module.scss';

interface Props {
  words: string[];
  suggestions: string[];
  searchPrefix: string;
}

/**
 * Componente para visualizar un Trie y sus sugerencias
 */
export const TrieVisualizer: React.FC<Props> = ({ words, suggestions, searchPrefix }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Trie de palabras</h3>

      {words.length === 0 ? (
        <div className={styles.empty}>Trie vacío</div>
      ) : (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Palabras insertadas:</h4>
          <ul className={styles.wordList}>
            {words.map((word, index) => (
              <li key={index} className={styles.wordItem}>
                {word}
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchPrefix.trim() !== '' && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Sugerencias para '{searchPrefix}':</h4>
          {suggestions.length === 0 ? (
            <div className={styles.empty}>Sin sugerencias</div>
          ) : (
            <ul className={styles.wordList}>
              {suggestions.map((suggestion, index) => (
                <li key={index} className={styles.suggestionItem}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TrieVisualizer;
