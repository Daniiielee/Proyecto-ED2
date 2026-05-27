class NodeStack<T> {
  data: T;
  next: NodeStack<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class Stack<T> {
  private top: NodeStack<T> | null;
  private size: number;

  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(data: T): void {
    const newNode = new NodeStack(data);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;

    const data = this.top!.data;
    this.top = this.top!.next;
    this.size--;
    return data;
  }

  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.top!.data;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }

  toArray(): T[] {
    const arr: T[] = [];
    let current = this.top;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }

  clear(): void {
    this.top = null;
    this.size = 0;
  }

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
