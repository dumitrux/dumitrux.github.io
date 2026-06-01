---
permalink: big-o-data-structures
title: "Big O Notation, Data Structures, and Concurrency"
description: "A practical guide to Big O notation, common data structures, and concurrency basics for software engineers."
date: 2026-05-31
tags: ["Software", "Computer Science"]
secondaryTags: ["Algorithms", "Data Structures", "Concurrency"]
thumbnail: "/images/blog/big-o-data-structures-thumbnail.svg"
lang: en
---

Understanding time complexity, data structures, and concurrency are fundamental skills for any software engineer.

## Big O Notation

Big O describes how an algorithm's performance scales as input grows.

### Common Complexities

| Big O | Name | Example |
|-------|------|---------|
| O(1) | Constant | Access array by index |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Loop through array |
| O(n log n) | Linearithmic | Merge sort, quick sort |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Recursive Fibonacci |

```
Time
 ↑
 │         O(2ⁿ)  /
 │              /
 │    O(n²)  /
 │         /
 │  O(n log n)
 │    O(n) ──────
 │  O(log n) ───
 │  O(1) ────────
 └──────────────→ Input size (n)
```

### Rules

1. Drop constants: O(2n) → O(n)
2. Drop lower terms: O(n² + n) → O(n²)
3. Focus on worst case

## Data Structures

### Arrays / Lists

```python
arr = [10, 20, 30, 40, 50]
```

| Operation | Time |
|-----------|------|
| Access by index | O(1) |
| Search | O(n) |
| Insert at end | O(1) |
| Insert at start | O(n) |
| Delete | O(n) |

### Linked Lists

Each node points to the next.

```
[10] → [20] → [30] → [40] → None
```

| Operation | Time |
|-----------|------|
| Access by index | O(n) |
| Insert at start | O(1) |
| Insert at end | O(n) or O(1) with tail |
| Delete | O(n) |

### Stacks (LIFO)

```python
stack = []
stack.append(1)   # push
stack.append(2)
stack.pop()       # returns 2
```

**Use cases:** Undo operations, function call stack, parsing.

### Queues (FIFO)

```python
from collections import deque
queue = deque()
queue.append(1)    # enqueue
queue.popleft()    # dequeue
```

**Use cases:** Task scheduling, BFS, message queues.

### Hash Maps / Dictionaries

```python
cache = {"user:1": "Alice", "user:2": "Bob"}
```

| Operation | Average | Worst |
|-----------|---------|-------|
| Get | O(1) | O(n) |
| Set | O(1) | O(n) |
| Delete | O(1) | O(n) |

**How it works:** A hash function maps keys to array indices. Collisions are handled by chaining or open addressing.

### Trees

#### Binary Search Tree (BST)

```
        8
       / \
      3   10
     / \    \
    1   6    14
```

| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

#### Balanced Trees (AVL, Red-Black)

Self-balancing → always O(log n) operations.

### Heaps

A complete binary tree where parent is always smaller (min-heap) or larger (max-heap).

```python
import heapq
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappop(heap)  # returns 1 (smallest)
```

**Use cases:** Priority queues, top-K problems.

### Graphs

Nodes connected by edges.

```python
# Adjacency list
graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A"],
    "D": ["B"],
}
```

**Algorithms:** BFS (shortest path), DFS (explore all), Dijkstra (weighted paths).

## Hashing

### Hash Functions

Map data of any size to a fixed-size value:

```python
hash("hello")  # → integer
```

**Properties:**
- Same input → same output (deterministic)
- Small change in input → very different output
- Fast to compute

**Use cases:** Dictionaries, caches, checksums, password storage.

## Concurrency

### Key Concepts

| Term | Meaning |
|------|---------|
| **Concurrency** | Multiple tasks make progress (not necessarily at the same time) |
| **Parallelism** | Multiple tasks run at the exact same time (multiple CPUs) |
| **Thread** | Lightweight unit of execution within a process |
| **Process** | Independent program with its own memory |
| **Race condition** | Bug from unsynchronized shared data access |
| **Deadlock** | Two threads each waiting for the other |

### Python Concurrency

```python
# Threading — good for I/O-bound tasks
import threading

def fetch_data(url):
    response = requests.get(url)
    return response.json()

threads = [threading.Thread(target=fetch_data, args=(url,))
           for url in urls]
for t in threads: t.start()
for t in threads: t.join()

# Multiprocessing — good for CPU-bound tasks
from multiprocessing import Pool

with Pool(4) as p:
    results = p.map(process_item, items)

# Async — good for many I/O operations
import asyncio

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.json()

results = asyncio.run(asyncio.gather(*[fetch(u) for u in urls]))
```

### When to Use What

| Approach | Best For | Python GIL? |
|----------|----------|-------------|
| Threading | I/O-bound (network, files) | Limited by GIL |
| Multiprocessing | CPU-bound (computation) | Bypasses GIL |
| Async | Many I/O operations | Single thread, no GIL issue |

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Big O | Measure how code scales, not how fast it runs |
| Arrays | Fast access, slow insert/delete |
| Hash Maps | O(1) average lookup — the most used data structure |
| Trees | O(log n) for sorted data |
| Concurrency | Use threads for I/O, processes for CPU, async for many connections |
