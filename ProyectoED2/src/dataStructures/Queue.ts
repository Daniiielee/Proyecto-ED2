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

  peek(): T | undefined {
    return this.front ? this.front.data : undefined;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.front;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  clear(): void {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

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
