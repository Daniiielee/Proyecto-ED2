// Interfaz para productos del marketplace
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  stock: number;
  rating: number;
  searchCount: number;
}

// Interfaz para usuarios del sistema
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
}

// Interfaz para órdenes de compra
export interface Order {
  id: string;
  userId: string;
  products: Product[];
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

// Interfaz para sugerencias de búsqueda
export interface SearchSuggestion {
  word: string;
  frequency: number;
}
