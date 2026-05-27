// Estructura de datos: Lista Enlazada
// Uso en proyecto: historial de productos visitados recientemente

/**
 * Nodo genérico para la lista enlazada
 */
class NodeLL<T> {
  data: T;
  next: NodeLL<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Lista Enlazada (LinkedList)
 * Estructura lineal de nodos enlazados
 * Utilidad: Mantener historial de navegación y búsquedas
 */
class LinkedList<T> {
  private head: NodeLL<T> | null;
  private tail: NodeLL<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Agregar elemento al final de la lista
   */
  append(data: T): void {
    const newNode = new NodeLL(data);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    this.size++;
  }

  /**
   * Agregar elemento al inicio de la lista
   */
  prepend(data: T): void {
    const newNode = new NodeLL(data);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  /**
   * Eliminar elemento por valor
   */
  remove(data: T): boolean {
    if (this.isEmpty()) return false;

    // Si el nodo a eliminar es la cabeza
    if (this.head && this.head.data === data) {
      this.head = this.head.next;
      if (this.size === 1) {
        this.tail = null;
      }
      this.size--;
      return true;
    }

    // Buscar en el resto de la lista
    let current = this.head;
    while (current && current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        if (!current.next) {
          this.tail = current;
        }
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  /**
   * Obtener elemento en posición específica
   */
  getAt(index: number): T | null {
    if (index < 0 || index >= this.size) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (current) {
        current = current.next;
      }
    }
    return current ? current.data : null;
  }

  /**
   * Obtener todos los elementos como array
   */
  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }

  /**
   * Obtener tamaño de la lista
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Verificar si la lista está vacía
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Limpiar la lista completa
   */
  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Imprimir lista en consola (para debugging)
   */
  print(): void {
    const items: T[] = [];
    let current = this.head;
    while (current) {
      items.push(current.data);
      current = current.next;
    }
    console.log('LinkedList:', items);
  }
}

export { LinkedList, NodeLL };
