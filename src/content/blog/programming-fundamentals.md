---
permalink: programming-fundamentals
title: "Programming Fundamentals, OOP, and Architecture Patterns"
description: "Core programming concepts, object-oriented programming, advanced Python features, and the most used software architecture patterns."
date: 2026-05-31
tags: ["Software", "Python"]
secondaryTags: ["OOP", "Architecture", "Design Patterns"]
thumbnail: "/images/blog/programming-fundamentals-thumbnail.svg"
lang: en
---

A quick reference of the most important programming concepts, from basics to architecture patterns.

## Core Programming Concepts

### Variables and Types

```python
name = "Alice"        # string
age = 30              # integer
price = 19.99         # float
active = True         # boolean
items = [1, 2, 3]     # list
config = {"key": "v"} # dictionary
```

### Control Flow

```python
# Conditionals
if age >= 18:
    print("adult")
elif age >= 13:
    print("teenager")
else:
    print("child")

# Loops
for item in items:
    print(item)

while active:
    process()
```

### Functions

```python
def calculate_total(price, tax_rate=0.21):
    return price * (1 + tax_rate)
```

## Object-Oriented Programming (OOP)

### The Four Pillars

| Pillar | What It Does |
|--------|-------------|
| **Encapsulation** | Hide internal details, expose a clean interface |
| **Abstraction** | Simplify complex systems by showing only what matters |
| **Inheritance** | Create new classes from existing ones |
| **Polymorphism** | Same interface, different behavior |

### Example

```python
from abc import ABC, abstractmethod

# Abstraction
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

# Inheritance
class Circle(Shape):
    def __init__(self, radius):
        self._radius = radius  # Encapsulation

    def area(self):  # Polymorphism
        return 3.14159 * self._radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self._width = width
        self._height = height

    def area(self):  # Polymorphism
        return self._width * self._height

# Same interface, different behavior
shapes = [Circle(5), Rectangle(4, 6)]
for shape in shapes:
    print(shape.area())
```

### SOLID Principles

| Principle | Meaning |
|-----------|---------|
| **S** — Single Responsibility | A class does one thing |
| **O** — Open/Closed | Open for extension, closed for modification |
| **L** — Liskov Substitution | Subclasses can replace parent classes |
| **I** — Interface Segregation | Many small interfaces > one big interface |
| **D** — Dependency Inversion | Depend on abstractions, not concrete classes |

## Advanced Python Features

### Decorators

Functions that modify other functions:

```python
def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Done: {result}")
        return result
    return wrapper

@log_call
def add(a, b):
    return a + b

add(2, 3)  # prints: Calling add → Done: 5
```

### Generators

Produce values one at a time (memory efficient):

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num)  # 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

### Context Managers

```python
# Automatic resource cleanup
with open("file.txt", "r") as f:
    content = f.read()
# File is automatically closed
```

### List Comprehensions

```python
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
```

## Software Architecture Patterns

### Monolithic

All code in one deployable unit.

```
┌──────────────────────┐
│     Monolith         │
│  ┌────┐ ┌────┐ ┌───┐│
│  │ UI │ │API │ │DB ││
│  └────┘ └────┘ └───┘│
└──────────────────────┘
```

**Good for:** Small teams, simple apps, MVPs.

### Microservices

Split into small, independent services.

```
┌──────┐  ┌──────┐  ┌──────┐
│Users │  │Orders│  │Payment│
│ API  │  │ API  │  │  API  │
│ DB   │  │ DB   │  │  DB   │
└──────┘  └──────┘  └──────┘
```

**Good for:** Large teams, complex domains, independent scaling.

### Event-Driven

Services communicate through events.

```
Producer → Event Bus → Consumer A
                    → Consumer B
                    → Consumer C
```

**Good for:** Decoupled systems, real-time processing.

### Layered (N-Tier)

```
┌─────────────────┐
│  Presentation   │  ← UI / API
├─────────────────┤
│    Business     │  ← Logic / Rules
├─────────────────┤
│  Data Access    │  ← Repositories
├─────────────────┤
│    Database     │  ← Storage
└─────────────────┘
```

### Hexagonal (Ports & Adapters)

```
           ┌──────────────┐
  REST ──→ │              │ ──→ PostgreSQL
           │   Domain     │
  CLI  ──→ │   Logic      │ ──→ S3
           │              │
 Tests ──→ │              │ ──→ Mock DB
           └──────────────┘
```

Core logic is independent of external systems.

### CQRS (Command Query Responsibility Segregation)

```
Write ──→ Command Model ──→ Write DB
Read  ──→ Query Model   ──→ Read DB (optimized)
```

Separate the read and write models for different optimization.

## Summary

| Concept | When to Use |
|---------|-------------|
| OOP | Structure complex code with clear responsibilities |
| SOLID | Guide class and module design |
| Decorators | Cross-cutting concerns (logging, auth, caching) |
| Generators | Process large datasets without loading all in memory |
| Monolith | Start simple, small team |
| Microservices | Complex domain, multiple teams |
| Event-Driven | Decoupled, async workflows |
| Hexagonal | Testable, framework-independent core |
