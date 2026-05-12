// Estructura de datos: Lista Enlazada
// Usada para: Gestión de historial de búsquedas y órdenes
// Esta es una estructura vacía que será implementada posteriormente

/**
 * Nodo genérico para la lista enlazada
 * Contiene datos y referencia al siguiente nodo
 */
class Node<T> {
  // data: T;
  // next: Node<T> | null;
}

/**
 * Lista Enlazada (LinkedList)
 * Estructura lineal de nodos enlazados
 * Utilidad: Mantener historial de navegación y búsquedas
 */
class LinkedList<T> {
  // head: Node<T> | null;
  // tail: Node<T> | null;
  // size: number;

  // Métodos a implementar:
  // - append(data: T): Añadir elemento al final
  // - prepend(data: T): Añadir elemento al inicio
  // - insert(data: T, index: number): Insertar en posición
  // - remove(index: number): Eliminar en posición
  // - getAt(index: number): Obtener elemento en posición
  // - clear(): Limpiar la lista
  // - print(): Imprimir lista
}

export { LinkedList, Node };
