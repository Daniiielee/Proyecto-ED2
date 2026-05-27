import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Inicialización de Firebase para TechStore DS
const firebaseConfig = {
  apiKey: 'AIzaSyDjkMYLXVJjvTwWXctwouLislMjz3KQbCo',
  authDomain: 'techstore-ds.firebaseapp.com',
  projectId: 'techstore-ds',
  storageBucket: 'techstore-ds.firebasestorage.app',
  messagingSenderId: '992925027307',
  appId: '1:992925027307:web:2c38057728f7d4c75767ae',
  databaseURL: 'https://techstore-ds-default-rtdb.firebaseio.com',
};

export const app = initializeApp(firebaseConfig);
// Exportamos auth para autenticación de usuarios
export const auth = getAuth(app);
// Exportamos db para Firestore (productos, usuarios)
export const db = getFirestore(app);
// Exportamos realtimeDb para chat en tiempo real
export const realtimeDb = getDatabase(app);
