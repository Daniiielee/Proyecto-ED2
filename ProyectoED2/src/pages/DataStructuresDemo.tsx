import React, { useState, useRef } from 'react';
import { LinkedList } from '../dataStructures/LinkedList';
import { Stack } from '../dataStructures/Stack';
import { Queue } from '../dataStructures/Queue';
import { Trie } from '../dataStructures/Trie';
import LinkedListVisualizer from '../components/common/LinkedListVisualizer';
import StackVisualizer from '../components/common/StackVisualizer';
import QueueVisualizer from '../components/common/QueueVisualizer';
import TrieVisualizer from '../components/common/TrieVisualizer';
import { Heap } from '../dataStructures/Heap';
import HeapVisualizer from '../components/common/HeapVisualizer';
import { Graph } from '../dataStructures/Graph';
import GraphVisualizer from '../components/common/GraphVisualizer';
import styles from './DataStructuresDemo.module.scss';

/**
 * Página de demostración de estructuras de datos
 * Permite interactuar con LinkedList, Stack, Queue y Trie visualmente
 */
export const DataStructuresDemo: React.FC = () => {
  // Estado para LinkedList
  const [linkedListItems, setLinkedListItems] = useState<string[]>([]);
  const [linkedListInput, setLinkedListInput] = useState<string>('');
  const linkedList = new LinkedList<string>();
  linkedListItems.forEach((item) => linkedList.append(item));

  // Estado para Stack
  const [stackItems, setStackItems] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState<string>('');
  const stack = new Stack<string>();
  stackItems.forEach((item) => stack.push(item));

  // Instancia persistente de Queue
  const queueRef = useRef(new Queue<string>());
  const [queueItems, setQueueItems] = useState<string[]>([]);
  const [queueInput, setQueueInput] = useState<string>('');

  // Instancia persistente de Trie
  const trieRef = useRef(new Trie());
  const [trieWords, setTrieWords] = useState<string[]>([]);
  const [trieInput, setTrieInput] = useState<string>('');
  const [searchPrefix, setSearchPrefix] = useState<string>('');

  // Funciones para LinkedList
  const handleAddToEnd = () => {
    if (linkedListInput.trim()) {
      setLinkedListItems([...linkedListItems, linkedListInput]);
      setLinkedListInput('');
    }
  };

  const handleAddToStart = () => {
    if (linkedListInput.trim()) {
      setLinkedListItems([linkedListInput, ...linkedListItems]);
      setLinkedListInput('');
    }
  };

  const handleClearLinkedList = () => {
    setLinkedListItems([]);
    setLinkedListInput('');
  };

  // Funciones para Stack
  const handlePush = () => {
    if (stackInput.trim()) {
      setStackItems([stackInput, ...stackItems]);
      setStackInput('');
    }
  };

  const handlePop = () => {
    if (stackItems.length > 0) {
      setStackItems(stackItems.slice(1));
    }
  };

  const handleClearStack = () => {
    setStackItems([]);
    setStackInput('');
  };

  // Funciones para Queue
  const handleEnqueue = () => {
    if (queueInput.trim()) {
      queueRef.current.enqueue(queueInput.trim());
      setQueueItems(queueRef.current.toArray());
      setQueueInput('');
    }
  };

  const handleDequeue = () => {
    queueRef.current.dequeue();
    setQueueItems(queueRef.current.toArray());
  };

  const handleClearQueue = () => {
    queueRef.current.clear();
    setQueueItems([]);
    setQueueInput('');
  };

  const currentQueueFront = queueRef.current.peek() ?? 'vacío';

  // Funciones para Trie
  const handleInsertTrie = () => {
    const normalizedWord = trieInput.trim().toLowerCase();
    if (normalizedWord) {
      trieRef.current.insert(normalizedWord);
      setTrieWords(trieRef.current.getAllWords());
      setTrieInput('');
    }
  };

  const handleSearchPrefix = (value: string) => {
    setSearchPrefix(value);
  };

  const trieSuggestions = searchPrefix.trim()
    ? trieRef.current.getWordsWithPrefix(searchPrefix.trim().toLowerCase())
    : [];

  // Instancia persistente de Heap (Max-Heap)
  const heapRef = useRef(new Heap<number>((a, b) => a - b));
  const [heapItems, setHeapItems] = useState<number[]>([]);
  const [heapInput, setHeapInput] = useState<string>('');

  // Instancia persistente de Graph (no dirigido)
  const graphRef = useRef(new Graph<string>());
  const [graphVertices, setGraphVertices] = useState<string[]>([]);
  const [graphEdges, setGraphEdges] = useState<{ from: string; to: string; weight: number }[]>([]);
  const [graphVertexInput, setGraphVertexInput] = useState<string>('');
  const [graphFromInput, setGraphFromInput] = useState<string>('');
  const [graphToInput, setGraphToInput] = useState<string>('');
  const [graphWeightInput, setGraphWeightInput] = useState<string>('1');
  const [bfsResult, setBfsResult] = useState<string[]>([]);
  const [dfsResult, setDfsResult] = useState<string[]>([]);
  const [bfsStartInput, setBfsStartInput] = useState<string>('');

  // Obtener el tope actual del stack
  const topElement = stackItems.length > 0 ? stackItems[0] : 'vacío';

  // --- Funciones Heap ---
  const handleHeapInsert = () => {
    const n = Number(heapInput);
    if (!Number.isNaN(n)) {
      heapRef.current.insert(n);
      setHeapItems(heapRef.current.getSorted());
      setHeapInput('');
    }
  };

  const handleHeapExtractMax = () => {
    heapRef.current.extractMax();
    setHeapItems(heapRef.current.getSorted());
  };

  // --- Funciones Graph ---
  const handleAddVertex = () => {
    const v = graphVertexInput.trim();
    if (!v) return;
    graphRef.current.addVertex(v);
    setGraphVertices(graphRef.current.getAllVertices());
    setGraphVertexInput('');
  };

  const handleAddEdge = () => {
    const from = graphFromInput.trim();
    const to = graphToInput.trim();
    const weight = parseInt(graphWeightInput, 10) || 1;
    if (!from || !to) return;
    graphRef.current.addEdge(from, to, weight);
    setGraphEdges((prev) => [...prev, { from, to, weight }]);
    setGraphVertices(graphRef.current.getAllVertices());
    setGraphFromInput('');
    setGraphToInput('');
    setGraphWeightInput('1');
  };

  const handleBFS = () => {
    if (!bfsStartInput.trim()) return;
    const res = graphRef.current.bfs(bfsStartInput.trim());
    setBfsResult(res);
  };

  const handleDFS = () => {
    if (!bfsStartInput.trim()) return;
    const res = graphRef.current.dfs(bfsStartInput.trim());
    setDfsResult(res);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Visualización de Estructuras de Datos</h1>
      <p className={styles.subtitle}>
        Interactúa con LinkedList, Stack, Queue y Trie en un entorno académico.
      </p>

      <div className={styles.demoGrid}>
        {/* Sección: LinkedList */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Lista Enlazada</h2>
          <p className={styles.description}>
            Estructura lineal de nodos enlazados. Agrega y elimina elementos al inicio o final.
          </p>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={linkedListInput}
              onChange={(e) => setLinkedListInput(e.target.value)}
              placeholder="Ingresa un valor"
              className={styles.input}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleAddToEnd();
              }}
            />

            <div className={styles.buttonGroup}>
              <button onClick={handleAddToEnd} className={styles.btn}>
                Agregar al final
              </button>
              <button onClick={handleAddToStart} className={styles.btn}>
                Agregar al inicio
              </button>
              <button onClick={handleClearLinkedList} className={styles.btnDanger}>
                Limpiar
              </button>
            </div>
          </div>

          <div className={styles.info}>
            <span>Tamaño: {linkedListItems.length}</span>
          </div>

          <LinkedListVisualizer items={linkedListItems} title="Representación Visual" />
        </section>

        {/* Sección: Heap (Max-Heap) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Heap (Max-Heap)</h2>
          <p className={styles.description}>
            Ordena elementos por prioridad. El mayor siempre está en la raíz.
          </p>

          <div className={styles.inputGroup}>
            <input
              type="number"
              value={heapInput}
              onChange={(e) => setHeapInput(e.target.value)}
              placeholder="Número a insertar"
              className={styles.input}
              onKeyPress={(e) => { if (e.key === 'Enter') handleHeapInsert(); }}
            />

            <div className={styles.buttonGroup}>
              <button onClick={handleHeapInsert} className={styles.btn}>Insertar</button>
              <button onClick={handleHeapExtractMax} className={styles.btn}>Extraer máximo</button>
            </div>
          </div>

          <div className={styles.info}>
            <span>Máximo actual: {heapRef.current.peek() ?? 'vacío'}</span>
            <span>Tamaño: {heapRef.current.getSize()}</span>
          </div>

          <HeapVisualizer items={heapItems} title="Heap (vista por niveles)" />
        </section>

        {/* Sección: Graph */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Grafo</h2>
          <p className={styles.description}>
            Conecta nodos con aristas y pesos. Soporta BFS y DFS.
          </p>

          <div className={styles.inputGroup}>
            <div style={{ display: 'flex', gap: '8px', width: '100%', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={graphVertexInput}
                onChange={(e) => setGraphVertexInput(e.target.value)}
                placeholder="Nombre del vértice"
                className={styles.input}
              />
              <button onClick={handleAddVertex} className={styles.btn}>Agregar vértice</button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={graphFromInput}
              onChange={(e) => setGraphFromInput(e.target.value)}
              placeholder="Desde"
              className={styles.input}
            />
            <input
              type="text"
              value={graphToInput}
              onChange={(e) => setGraphToInput(e.target.value)}
              placeholder="Hasta"
              className={styles.input}
            />
            <input
              type="number"
              value={graphWeightInput}
              onChange={(e) => setGraphWeightInput(e.target.value)}
              placeholder="Peso"
              className={styles.input}
            />
            <div className={styles.buttonGroup}>
              <button onClick={handleAddEdge} className={styles.btn}>Agregar arista</button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={bfsStartInput}
              onChange={(e) => setBfsStartInput(e.target.value)}
              placeholder="Nodo inicio para BFS/DFS"
              className={styles.input}
            />
            <div className={styles.buttonGroup}>
              <button onClick={handleBFS} className={styles.btn}>BFS</button>
              <button onClick={handleDFS} className={styles.btn}>DFS</button>
            </div>
          </div>

          <div className={styles.info}>
            <span>Vértices: {graphVertices.length}</span>
            <span>Aristas: {graphEdges.length}</span>
          </div>

          <GraphVisualizer
            vertices={graphVertices}
            edges={graphEdges}
            bfsResult={bfsResult}
            dfsResult={dfsResult}
            title="Vista académica del grafo"
          />

          <p className={styles.note}><strong>Nota:</strong> BFS: recorre por niveles. DFS: recorre en profundidad.</p>
        </section>

        {/* Sección: Stack */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Pila (Stack)</h2>
          <p className={styles.description}>
            Estructura LIFO (Last In First Out). Último en entrar, primero en salir.
          </p>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              placeholder="Ingresa un valor"
              className={styles.input}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handlePush();
              }}
            />

            <div className={styles.buttonGroup}>
              <button onClick={handlePush} className={styles.btn}>
                Push (agregar)
              </button>
              <button onClick={handlePop} className={styles.btn}>
                Pop (remover tope)
              </button>
              <button onClick={handleClearStack} className={styles.btnDanger}>
                Limpiar
              </button>
            </div>
          </div>

          <div className={styles.info}>
            <span>Tamaño: {stackItems.length}</span>
            <span>Tope actual: <strong>{topElement}</strong></span>
          </div>

          <StackVisualizer items={stackItems} title="Representación Visual" />
        </section>

        {/* Sección: Queue */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cola (Queue)</h2>
          <p className={styles.description}>
            Estructura FIFO (First In First Out). Agrega al final y remueve del frente.
          </p>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={queueInput}
              onChange={(e) => setQueueInput(e.target.value)}
              placeholder="Ingresa un valor"
              className={styles.input}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleEnqueue();
              }}
            />

            <div className={styles.buttonGroup}>
              <button onClick={handleEnqueue} className={styles.btn}>
                Enqueue
              </button>
              <button onClick={handleDequeue} className={styles.btn}>
                Dequeue (frente)
              </button>
              <button onClick={handleClearQueue} className={styles.btnDanger}>
                Limpiar
              </button>
            </div>
          </div>

          <div className={styles.info}>
            <span>Tamaño: {queueItems.length}</span>
            <span>Frente actual: <strong>{currentQueueFront}</strong></span>
          </div>

          <QueueVisualizer items={queueItems} title="Representación Visual" />
        </section>

        {/* Sección: Trie */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Trie (Búsqueda Predictiva)</h2>
          <p className={styles.description}>
            Árbol de prefijos para sugerencias de búsqueda inteligente.
          </p>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={trieInput}
              onChange={(e) => setTrieInput(e.target.value)}
              placeholder="Palabra a insertar"
              className={styles.input}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleInsertTrie();
              }}
            />
            <button onClick={handleInsertTrie} className={styles.btn}>
              Insertar palabra
            </button>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={searchPrefix}
              onChange={(e) => handleSearchPrefix(e.target.value)}
              placeholder="Buscar prefijo"
              className={styles.input}
            />
          </div>

          <div className={styles.info}>
            <span>Palabras insertadas: {trieWords.length}</span>
          </div>

          <TrieVisualizer
            words={trieWords}
            suggestions={trieSuggestions}
            searchPrefix={searchPrefix}
          />
        </section>
      </div>

      <div className={styles.footer}>
        <p>
          <strong>Nota académica:</strong> Estas estructuras son fundamentales en informática.
          LinkedList es útil para historial de búsquedas; Stack y Queue manejan datos temporales; Trie ayuda en autocompletado.
        </p>
      </div>
    </div>
  );
};

export default DataStructuresDemo;
