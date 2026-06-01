---
permalink: big-o-data-structures
title: "Notación Big O, Estructuras de Datos y Concurrencia"
description: "Una guía práctica de notación Big O, estructuras de datos comunes y conceptos básicos de concurrencia para ingenieros de software."
date: 2026-05-31
tags: ["Software", "Computer Science"]
secondaryTags: ["Algoritmos", "Estructuras de Datos", "Concurrencia"]
thumbnail: "/images/blog/big-o-data-structures-thumbnail.svg"
lang: es
---

Entender la complejidad temporal, las estructuras de datos y la concurrencia son habilidades fundamentales para cualquier ingeniero de software.

## Notación Big O

Big O describe cómo escala el rendimiento de un algoritmo cuando crece la entrada.

### Complejidades Comunes

| Big O | Nombre | Ejemplo |
|-------|--------|---------|
| O(1) | Constante | Acceder a array por índice |
| O(log n) | Logarítmica | Búsqueda binaria |
| O(n) | Lineal | Recorrer un array |
| O(n log n) | Linearítmica | Merge sort, quick sort |
| O(n²) | Cuadrática | Bucles anidados |
| O(2ⁿ) | Exponencial | Fibonacci recursivo |

```
Tiempo
 ↑
 │         O(2ⁿ)  /
 │              /
 │    O(n²)  /
 │         /
 │  O(n log n)
 │    O(n) ──────
 │  O(log n) ───
 │  O(1) ────────
 └──────────────→ Tamaño de entrada (n)
```

### Reglas

1. Eliminar constantes: O(2n) → O(n)
2. Eliminar términos menores: O(n² + n) → O(n²)
3. Enfocarse en el peor caso

## Estructuras de Datos

### Arrays / Listas

```python
arr = [10, 20, 30, 40, 50]
```

| Operación | Tiempo |
|-----------|--------|
| Acceso por índice | O(1) |
| Búsqueda | O(n) |
| Insertar al final | O(1) |
| Insertar al inicio | O(n) |
| Eliminar | O(n) |

### Listas Enlazadas

Cada nodo apunta al siguiente.

```
[10] → [20] → [30] → [40] → None
```

| Operación | Tiempo |
|-----------|--------|
| Acceso por índice | O(n) |
| Insertar al inicio | O(1) |
| Insertar al final | O(n) o O(1) con tail |
| Eliminar | O(n) |

### Pilas (LIFO)

```python
pila = []
pila.append(1)   # push
pila.append(2)
pila.pop()       # retorna 2
```

**Casos de uso:** Operaciones deshacer, call stack, parsing.

### Colas (FIFO)

```python
from collections import deque
cola = deque()
cola.append(1)     # enqueue
cola.popleft()     # dequeue
```

**Casos de uso:** Programación de tareas, BFS, colas de mensajes.

### Hash Maps / Diccionarios

```python
cache = {"user:1": "Alice", "user:2": "Bob"}
```

| Operación | Promedio | Peor caso |
|-----------|----------|-----------|
| Get | O(1) | O(n) |
| Set | O(1) | O(n) |
| Delete | O(1) | O(n) |

**Cómo funciona:** Una función hash mapea claves a índices de array. Las colisiones se manejan con chaining o open addressing.

### Árboles

#### Árbol Binario de Búsqueda (BST)

```
        8
       / \
      3   10
     / \    \
    1   6    14
```

| Operación | Promedio | Peor caso |
|-----------|----------|-----------|
| Búsqueda | O(log n) | O(n) |
| Insertar | O(log n) | O(n) |
| Eliminar | O(log n) | O(n) |

#### Árboles Balanceados (AVL, Red-Black)

Auto-balanceados → siempre O(log n) en operaciones.

### Heaps

Un árbol binario completo donde el padre siempre es menor (min-heap) o mayor (max-heap).

```python
import heapq
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappop(heap)  # retorna 1 (el menor)
```

**Casos de uso:** Colas de prioridad, problemas top-K.

### Grafos

Nodos conectados por aristas.

```python
# Lista de adyacencia
grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A"],
    "D": ["B"],
}
```

**Algoritmos:** BFS (camino más corto), DFS (explorar todo), Dijkstra (caminos con peso).

## Hashing

### Funciones Hash

Mapean datos de cualquier tamaño a un valor de tamaño fijo:

```python
hash("hello")  # → entero
```

**Propiedades:**
- Misma entrada → misma salida (determinista)
- Pequeño cambio en entrada → salida muy diferente
- Rápido de calcular

**Casos de uso:** Diccionarios, cachés, checksums, almacenamiento de contraseñas.

## Concurrencia

### Conceptos Clave

| Término | Significado |
|---------|-------------|
| **Concurrencia** | Múltiples tareas progresan (no necesariamente al mismo tiempo) |
| **Paralelismo** | Múltiples tareas se ejecutan exactamente al mismo tiempo (múltiples CPUs) |
| **Thread** | Unidad ligera de ejecución dentro de un proceso |
| **Proceso** | Programa independiente con su propia memoria |
| **Race condition** | Bug por acceso no sincronizado a datos compartidos |
| **Deadlock** | Dos threads esperando cada uno al otro |

### Concurrencia en Python

```python
# Threading — bueno para tareas I/O-bound
import threading

def fetch_data(url):
    response = requests.get(url)
    return response.json()

threads = [threading.Thread(target=fetch_data, args=(url,))
           for url in urls]
for t in threads: t.start()
for t in threads: t.join()

# Multiprocessing — bueno para tareas CPU-bound
from multiprocessing import Pool

with Pool(4) as p:
    results = p.map(process_item, items)

# Async — bueno para muchas operaciones I/O
import asyncio

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.json()

results = asyncio.run(asyncio.gather(*[fetch(u) for u in urls]))
```

### Cuándo Usar Qué

| Enfoque | Mejor Para | ¿GIL de Python? |
|---------|------------|-----------------|
| Threading | I/O-bound (red, archivos) | Limitado por GIL |
| Multiprocessing | CPU-bound (computación) | Evita el GIL |
| Async | Muchas operaciones I/O | Un solo thread, sin problema con GIL |

## Resumen

| Tema | Punto Clave |
|------|-------------|
| Big O | Mide cómo escala el código, no cuán rápido es |
| Arrays | Acceso rápido, inserción/eliminación lenta |
| Hash Maps | O(1) promedio de búsqueda — la estructura más usada |
| Árboles | O(log n) para datos ordenados |
| Concurrencia | Usa threads para I/O, procesos para CPU, async para muchas conexiones |
