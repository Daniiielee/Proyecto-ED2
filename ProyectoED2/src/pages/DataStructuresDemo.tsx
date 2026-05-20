import React, { useState } from 'react';
import { LinkedList } from '../dataStructures/LinkedList';
import { Stack } from '../dataStructures/Stack';
import LinkedListVisualizer from '../components/common/LinkedListVisualizer';
import StackVisualizer from '../components/common/StackVisualizer';
import styles from './DataStructuresDemo.module.scss';

/**
 * Página de demostración de estructuras de datos
 * Permite interactuar con LinkedList y Stack visualmente
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

  // Obtener el tope actual del stack
  const topElement = stackItems.length > 0 ? stackItems[0] : 'vacío';

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Visualización de Estructuras de Datos</h1>
      <p className={styles.subtitle}>
        Interactúa con Lista Enlazada (LinkedList) y Pila (Stack)
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
      </div>

      <div className={styles.footer}>
        <p>
          <strong>Nota académica:</strong> Estas estructuras son fundamentales en informática.
          LinkedList es útil para historial de búsquedas; Stack para historial de navegación.
        </p>
      </div>
    </div>
  );
};

export default DataStructuresDemo;
