// Estructura de datos: Pila (Stack) - LIFO
// Uso en proyecto: historial de navegación del usuario

/**
 * Nodo para la pila
 */
class NodeStack<T> {
  data: T;
  next: NodeStack<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Pila (Stack) - LIFO (Last In, First Out)
 * Último en entrar, primero en salir
 * Utilidad: Historial de navegación, deshacer acciones
 */
class Stack<T> {
  private top: NodeStack<T> | null;
  private size: number;

  constructor() {
    this.top = null;
    this.size = 0;
  }

  /**
   * Agregar elemento al tope de la pila
   */
  push(data: T): void {
    const newNode = new NodeStack(data);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  /**
   * Remover y retornar elemento del tope
   */
  pop(): T | undefined {
    if (this.isEmpty()) return undefined;

    const data = this.top!.data;
    this.top = this.top!.next;
    this.size--;
    return data;
  }

  /**
   * Ver elemento del tope sin remover
   */
  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.top!.data;
  }

  /**
   * Verificar si la pila está vacía
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Obtener tamaño de la pila
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Obtener todos los elementos como array (tope primero)
   */
  toArray(): T[] {
    const arr: T[] = [];
    let current = this.top;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }

  /**
   * Limpiar la pila
   */
  clear(): void {
    this.top = null;
    this.size = 0;
  }

  /**
   * Imprimir pila en consola
   */
  print(): void {
    const items: T[] = [];
    let current = this.top;
    while (current) {
      items.push(current.data);
      current = current.next;
    }
    console.log('Stack (top to bottom):', items);
  }
}

export { Stack, NodeStack };
