// Estructura: Cola (Queue) - FIFO
// Uso en proyecto: cola de mensajes del chat

class NodeQueue<T> {
  data: T;
  next: NodeQueue<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class Queue<T> {
  private front: NodeQueue<T> | null;
  private rear: NodeQueue<T> | null;
  private size: number;

  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  /**
   * Agregar elemento al final de la cola
   */
  enqueue(data: T): void {
    const newNode = new NodeQueue(data);
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      if (this.rear) {
        this.rear.next = newNode;
      }
      this.rear = newNode;
    }
    this.size++;
  }

  /**
   * Remover y retornar elemento del frente
   */
  dequeue(): T | undefined {
    if (this.isEmpty() || !this.front) return undefined;

    const data = this.front.data;
    this.front = this.front.next;
    if (!this.front) {
      this.rear = null;
    }
    this.size--;
    return data;
  }

  /**
   * Ver frente sin remover
   */
  peek(): T | undefined {
    return this.front ? this.front.data : undefined;
  }

  /**
   * Verificar si está vacía
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Obtener tamaño
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Obtener todos los elementos como array
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.front;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  /**
   * Limpiar la cola
   */
  clear(): void {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  /**
   * Imprimir en consola
   */
  print(): void {
    const items: T[] = [];
    let current = this.front;
    while (current) {
      items.push(current.data);
      current = current.next;
    }
    console.log('Queue:', items);
  }
}

export { Queue, NodeQueue };
