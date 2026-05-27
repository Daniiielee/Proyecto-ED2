# TechStore DS

Marketplace académico de productos tecnológicos con visualizadores de estructuras de datos.

---

## Resumen

TechStore DS es una aplicación frontend educativa y demostrativa que combina un pequeño marketplace (catálogo y detalle de productos) con implementaciones y visualizaciones de estructuras de datos clásicas (LinkedList, Stack, Queue, Trie, Heap y Graph). El objetivo del proyecto es integrar conceptos de Estructuras de Datos y Algoritmos en una aplicación React + TypeScript con interacción real vía Firebase.

- Entregable: Proyecto final de la asignatura (Rubrica: entrega técnica + demostración funcional)
- Fecha de entrega: 27/05/2026
- Integrantes: Daniel Vivas, Danie Ruiz
- Repositorio: https://github.com/Daniiielee/Proyecto-ED2.git
- Netfly: techstore-ds.netlify.app

---

## Tecnologías principales

- Frontend: React 19 + TypeScript + Vite
- Estilos: SCSS Modules (sintaxis `@use`) y mixins compartidos
- Autenticación y base de datos: Firebase (Authentication, Firestore, Realtime Database)
- Deploy: Netlify (frontend)
- Control de versiones: Git + GitHub

---

## Estructura del repositorio (resumen relevante)

```
src/
├── components/
│   ├── layout/         # Navbar, Footer (responsive, hamburgesa)
│   └── common/         # Visualizadores y componentes reutilizables
├── pages/              # Vistas públicas y privadas (Products, Chat, DataStructuresDemo...)
├── context/            # AuthContext, NavigationContext
├── hooks/              # useAuth, useProducts, useSearch, useTopProducts, useChat...
├── dataStructures/     # LinkedList, Stack, Queue, Trie, Heap, Graph
├── firebase/           # firebase.ts (configuración de servicios)
├── styles/             # variables, mixins, global.scss
└── types/              # definiciones TypeScript (Product, User, ChatMessage...)
```

---

## Objetivo y alcance

TechStore DS provee:
- Catálogo de productos con búsqueda predictiva (Trie).
- Páginas de detalle con historial de productos visitados (LinkedList).
- Ranking de top productos usando un Max-Heap.
- Historial de navegación (Stack) y visualizaciones académicas en historial de navegacion.
- Chat en tiempo real implementado con una `Queue` y Firebase Realtime Database.
- Autenticación real con Firebase Auth y rutas privadas protegidas.
- Visualizadores interactivos para Heap y Graph (secciones añadidas en detalle de productos).

Limitaciones conocidas:
- Lógica principalmente client-side (sin backend propio fuera de Firebase).
- Historial en memoria (no persistente entre sesiones) salvo los datos guardados en Firestore/RTDB según caso.
- Chat carga todos los mensajes al abrir (no paginado).

---

## Estructuras de datos implementadas (explicación académica)

A continuación se describe cada estructura, dónde se usa y la motivación técnica (complejidades en Big-O):

1. LinkedList (Lista enlazada simple)
   - Uso: historial de productos visitados en detallle del producto (tope 5 elementos)
   - Motivación: permite inserción al frente y eliminación del final en O(1) si mantenemos punteros adecuados; modelo apropiado para mantener un buffer pequeño de 'recientes'.
   - Operaciones relevantes: append O(1) (si se mantiene tail), prepend O(1), remove tail O(1)/O(n) según implementación (en este proyecto se mantiene un tope y se elimina el más antiguo de forma eficiente).

2. Stack (Pila)
   - Uso: historial de navegación del usuario (contexto `NavigationContext`) para funcionalidades tipo undo/atrás.
   - Motivación: LIFO se corresponde con el comportamiento conceptual del botón "Atrás" (última página visitada es la primera en retornar).
   - Complejidad: push/pop O(1), peek O(1).

3. Queue (Cola FIFO)
   - Uso: buffer de mensajes en el chat en tiempo real antes/durante la sincronización con Firebase Realtime Database.
   - Motivación: mantener orden cronológico de mensajes (primero en entrar, primero en salir).
   - Complejidad: enqueue O(1), dequeue O(1).

4. Trie (Árbol de prefijos)
   - Uso: búsqueda predictiva/autocomplete en la página de `Products`.
   - Motivación: para sugerencias por prefijo la Trie ofrece búsquedas en O(m) donde m es la longitud del prefijo, independiente del número total de palabras almacenadas (ventajoso frente a filtros lineales sobre arrays).
   - Complejidad: inserción O(m), búsqueda de prefijo O(m), memoria dependiente del alfabeto y cantidad de prefijos compartidos.

5. Heap (Max-Heap)
   - Uso: ranking de Top Productos (`useTopProducts`) para mantener top-k por rating/preferencia.
   - Motivación: extracción del máximo en O(log n) y mantenimiento eficiente del top-k.
   - Complejidad: insert O(log n), extractMax O(log n), peek O(1).

6. Graph (Grafo no dirigido ponderado)
   - Uso: sistema de recomendaciones en `ProductDetail` (relaciones por categoría/atributos entre productos).
   - Motivación: modelar relaciones entre nodos (productos/categorías) para aplicar recorridos (BFS/DFS) o algoritmos más avanzados en el futuro (Dijkstra, clustering colaborativo).
   - Complejidad: depende del algoritmo usado; BFS/DFS O(V + E).

---

## Arquitectura (descripción de capas)

- Capa de presentación: componentes React (páginas, visualizadores, formularios).
- Estado y lógica cliente: hooks y contexts (ej. `useProducts`, `useAuth`, `NavigationContext`).
- Persistencia y realtime: Firebase (Firestore para CRUD persistente; Realtime Database para chat de baja latencia).
- Despliegue: Netlify sirve los assets generados por Vite.

Arquitectura simplificada (ASCII):

```
Browser (React + TS)
  ├─ Components / Pages
  ├─ Hooks + Contexts (Auth, Navigation, Products)
  └─ DataStructures (LinkedList, Stack, Queue, Trie, Heap, Graph)
        ↕
Firebase (Auth, Firestore, Realtime DB)
        ↕
Netlify (hosting frontend)
```

---

## Cómo ejecutar localmente

1. Clona el repositorio:

```bash
git clone https://github.com/Daniiielee/Proyecto-ED2.git
cd Proyecto-ED2
```

2. Instala dependencias:

```bash
npm install
```

3. Añade variables de entorno (crea un archivo `.env` o `.env.local` en la raíz con las variables descritas abajo). Nunca committees credenciales reales.

4. Ejecuta la app en modo desarrollo:

```bash
npm run dev
```

5. Abre `http://localhost:5173` (o la URL que muestre Vite) y navega a `DataStructuresDemo` para probar visualizadores.

---

## Variables de entorno (ejemplo)

Crea un archivo `.env` con las siguientes claves (placeholders) — los prefijos `VITE_` son necesarios para que Vite exponga las variables al cliente:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=your_realtime_db_url
```

> Nota: No subir este archivo al repositorio. Usar `.gitignore` para evitar commits accidentales.

---

## Retos técnicos y cómo se resolvieron

- Migración de Sass `@import` → `@use`: actualización de módulos y creación de aliases de variables para compatibilidad. Resultado: eliminación de errores en tiempo de compilación.
- Conflictos visuales (contraste y superposición): ajuste global de variables en `src/styles/_variables.scss` y uso de mixins (`card`, `btn-primary`) para consistencia.
- Firebase: permisos temporales en Realtime DB durante desarrollo; limpieza de colecciones duplicadas manualmente en consola.
- Visualización de estructuras: se añadieron visualizadores para Heap y Graph en `src/components/common` y se integraron en `DataStructuresDemo` usando `useRef` para instancias persistentes.

---

## Convenciones de ramas y commits

- Rama principal: `main` — integrar sólo código revisado y probado.
- Ramas de desarrollo: `<nombre>` por cada integrante.

---