class NodeLL<T> {
  data: T;
  next: NodeLL<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList<T> {
  private head: NodeLL<T> | null;
  private tail: NodeLL<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

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

  remove(data: T): boolean {
    if (this.isEmpty()) return false;

    if (this.head && this.head.data === data) {
      this.head = this.head.next;
      if (this.size === 1) {
        this.tail = null;
      }
      this.size--;
      return true;
    }

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

  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

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
