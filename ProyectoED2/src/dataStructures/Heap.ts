// Estructura de datos: Heap (Montículo)
// Uso en proyecto: top productos más populares por rating

class Heap<T> {
  private items: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.items = [];
    this.comparator = comparator;
  }

  // Insertar elemento y reorganizar el heap
  insert(element: T): void {
    this.items.push(element);
    this.heapifyUp(this.items.length - 1);
  }

  // Extraer el elemento con mayor prioridad
  extractMax(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    }

    const max = this.items[0];
    const end = this.items.pop();

    if (this.items.length > 0 && end !== undefined) {
      this.items[0] = end;
      this.heapifyDown(0);
    }

    return max;
  }

  // Ver el elemento con mayor prioridad sin removerlo
  peek(): T | undefined {
    return this.items[0];
  }

  // Obtener todos los elementos ordenados sin modificar el heap original
  getSorted(): T[] {
    const heapCopy = this.clone();
    const sorted: T[] = [];

    while (!heapCopy.isEmpty()) {
      const next = heapCopy.extractMax();
      if (next !== undefined) {
        sorted.push(next);
      }
    }

    return sorted;
  }

  // Obtener tamaño del heap
  getSize(): number {
    return this.items.length;
  }

  // Verificar si el heap está vacío
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Reorganizar hacia arriba después de insertar
  private heapifyUp(index: number): void {
    let currentIndex = index;

    while (
      this.hasParent(currentIndex) &&
      this.comparator(this.items[currentIndex], this.parent(currentIndex)) > 0
    ) {
      const parentIndex = this.getParentIndex(currentIndex);
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  // Reorganizar hacia abajo después de extraer el máximo
  private heapifyDown(index: number): void {
    let currentIndex = index;
    const length = this.items.length;

    while (this.getLeftChildIndex(currentIndex) < length) {
      let largerChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);

      if (
        rightChildIndex < length &&
        this.comparator(this.items[rightChildIndex], this.items[largerChildIndex]) > 0
      ) {
        largerChildIndex = rightChildIndex;
      }

      if (this.comparator(this.items[largerChildIndex], this.items[currentIndex]) <= 0) {
        break;
      }

      this.swap(currentIndex, largerChildIndex);
      currentIndex = largerChildIndex;
    }
  }

  // Clonar el heap para obtener elementos ordenados sin mutar el original
  private clone(): Heap<T> {
    const copy = new Heap<T>(this.comparator);
    copy.items = [...this.items];
    return copy;
  }

  // Intercambiar dos elementos dentro del array
  private swap(i: number, j: number): void {
    const temp = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = temp;
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return index * 2 + 1;
  }

  private getRightChildIndex(index: number): number {
    return index * 2 + 2;
  }

  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  private parent(index: number): T {
    return this.items[this.getParentIndex(index)];
  }
}

export { Heap };
