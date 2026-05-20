// Estructura: Trie (Árbol de Prefijos)
// Uso en proyecto: búsqueda predictiva de productos

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  frequency: number;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.frequency = 0;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Insertar palabra en el Trie
   */
  insert(word: string): void {
    if (!word) return;
    let current = this.root;
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isEndOfWord = true;
    current.frequency += 1;
  }

  /**
   * Buscar palabra exacta, retorna true/false
   */
  search(word: string): boolean {
    const node = this.findNode(word);
    return !!node && node.isEndOfWord;
  }

  /**
   * Verificar si existe alguna palabra con ese prefijo
   */
  startsWith(prefix: string): boolean {
    return !!this.findNode(prefix);
  }

  /**
   * Obtener sugerencias de palabras con ese prefijo
   * Retornar máximo 5 sugerencias
   */
  getWordsWithPrefix(prefix: string): string[] {
    const node = this.findNode(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collectWords(node, prefix.toLowerCase(), results);
    return results.slice(0, 5);
  }

  /**
   * Eliminar palabra del Trie
   */
  delete(word: string): boolean {
    if (!word || !this.search(word)) return false;
    return this.deleteRec(this.root, word.toLowerCase(), 0);
  }

  /**
   * Verificar si el Trie está vacío
   */
  isEmpty(): boolean {
    return this.root.children.size === 0;
  }

  /**
   * Obtener todas las palabras insertadas
   */
  getAllWords(): string[] {
    const results: string[] = [];
    this.collectWords(this.root, '', results);
    return results;
  }

  private findNode(prefix: string): TrieNode | null {
    let current = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }
    return current;
  }

  private collectWords(node: TrieNode, prefix: string, results: string[]): void {
    if (node.isEndOfWord) {
      results.push(prefix);
    }

    for (const [char, child] of node.children.entries()) {
      this.collectWords(child, prefix + char, results);
    }
  }

  private deleteRec(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = word[index];
    const childNode = node.children.get(char);
    if (!childNode) return false;

    const shouldDeleteCurrentNode = this.deleteRec(childNode, word, index + 1);
    if (shouldDeleteCurrentNode) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }
    return false;
  }
}

export { Trie, TrieNode };
