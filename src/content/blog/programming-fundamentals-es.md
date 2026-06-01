---
permalink: programming-fundamentals
title: "Fundamentos de Programación, POO y Patrones de Arquitectura"
description: "Conceptos básicos de programación, programación orientada a objetos, características avanzadas de Python y los patrones de arquitectura más usados."
date: 2026-05-31
tags: ["Software", "Python"]
secondaryTags: ["POO", "Arquitectura", "Patrones de Diseño"]
thumbnail: "/images/blog/programming-fundamentals-thumbnail.svg"
lang: es
---

Una referencia rápida de los conceptos de programación más importantes, desde lo básico hasta patrones de arquitectura.

## Conceptos Básicos de Programación

### Variables y Tipos

```python
name = "Alice"        # string
age = 30              # entero
price = 19.99         # flotante
active = True         # booleano
items = [1, 2, 3]     # lista
config = {"key": "v"} # diccionario
```

### Flujo de Control

```python
# Condicionales
if age >= 18:
    print("adulto")
elif age >= 13:
    print("adolescente")
else:
    print("niño")

# Bucles
for item in items:
    print(item)

while active:
    process()
```

### Funciones

```python
def calcular_total(precio, tasa_impuesto=0.21):
    return precio * (1 + tasa_impuesto)
```

## Programación Orientada a Objetos (POO)

### Los Cuatro Pilares

| Pilar | Qué Hace |
|-------|----------|
| **Encapsulamiento** | Ocultar detalles internos, exponer interfaz limpia |
| **Abstracción** | Simplificar sistemas complejos mostrando solo lo necesario |
| **Herencia** | Crear nuevas clases a partir de existentes |
| **Polimorfismo** | Misma interfaz, diferente comportamiento |

### Ejemplo

```python
from abc import ABC, abstractmethod

# Abstracción
class Forma(ABC):
    @abstractmethod
    def area(self):
        pass

# Herencia
class Circulo(Forma):
    def __init__(self, radio):
        self._radio = radio  # Encapsulamiento

    def area(self):  # Polimorfismo
        return 3.14159 * self._radio ** 2

class Rectangulo(Forma):
    def __init__(self, ancho, alto):
        self._ancho = ancho
        self._alto = alto

    def area(self):  # Polimorfismo
        return self._ancho * self._alto

# Misma interfaz, diferente comportamiento
formas = [Circulo(5), Rectangulo(4, 6)]
for forma in formas:
    print(forma.area())
```

### Principios SOLID

| Principio | Significado |
|-----------|-------------|
| **S** — Responsabilidad Única | Una clase hace una sola cosa |
| **O** — Abierto/Cerrado | Abierto a extensión, cerrado a modificación |
| **L** — Sustitución de Liskov | Las subclases pueden reemplazar clases padre |
| **I** — Segregación de Interfaces | Muchas interfaces pequeñas > una grande |
| **D** — Inversión de Dependencias | Depender de abstracciones, no de clases concretas |

## Características Avanzadas de Python

### Decoradores

Funciones que modifican otras funciones:

```python
def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"Llamando {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Hecho: {result}")
        return result
    return wrapper

@log_call
def sumar(a, b):
    return a + b

sumar(2, 3)  # imprime: Llamando sumar → Hecho: 5
```

### Generadores

Producen valores uno a uno (eficiente en memoria):

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
# Limpieza automática de recursos
with open("file.txt", "r") as f:
    content = f.read()
# El archivo se cierra automáticamente
```

### List Comprehensions

```python
cuadrados = [x**2 for x in range(10)]
pares = [x for x in range(20) if x % 2 == 0]
```

## Patrones de Arquitectura de Software

### Monolítico

Todo el código en una única unidad desplegable.

```
┌──────────────────────┐
│     Monolito         │
│  ┌────┐ ┌────┐ ┌───┐│
│  │ UI │ │API │ │BD ││
│  └────┘ └────┘ └───┘│
└──────────────────────┘
```

**Bueno para:** Equipos pequeños, apps simples, MVPs.

### Microservicios

Dividido en servicios pequeños e independientes.

```
┌──────┐  ┌──────┐  ┌──────┐
│Users │  │Orders│  │Payment│
│ API  │  │ API  │  │  API  │
│ BD   │  │ BD   │  │  BD   │
└──────┘  └──────┘  └──────┘
```

**Bueno para:** Equipos grandes, dominios complejos, escalado independiente.

### Event-Driven

Los servicios se comunican a través de eventos.

```
Productor → Event Bus → Consumidor A
                     → Consumidor B
                     → Consumidor C
```

**Bueno para:** Sistemas desacoplados, procesamiento en tiempo real.

### Capas (N-Tier)

```
┌─────────────────┐
│  Presentación   │  ← UI / API
├─────────────────┤
│    Negocio      │  ← Lógica / Reglas
├─────────────────┤
│  Acceso a Datos │  ← Repositorios
├─────────────────┤
│  Base de Datos  │  ← Almacenamiento
└─────────────────┘
```

### Hexagonal (Puertos y Adaptadores)

```
           ┌──────────────┐
  REST ──→ │              │ ──→ PostgreSQL
           │   Lógica de  │
  CLI  ──→ │   Dominio    │ ──→ S3
           │              │
 Tests ──→ │              │ ──→ Mock BD
           └──────────────┘
```

La lógica principal es independiente de sistemas externos.

### CQRS (Command Query Responsibility Segregation)

```
Escritura ──→ Modelo de Comando ──→ BD de Escritura
Lectura   ──→ Modelo de Consulta ──→ BD de Lectura (optimizada)
```

Separar los modelos de lectura y escritura para diferente optimización.

## Resumen

| Concepto | Cuándo Usar |
|----------|-------------|
| POO | Estructurar código complejo con responsabilidades claras |
| SOLID | Guiar diseño de clases y módulos |
| Decoradores | Aspectos transversales (logging, auth, caching) |
| Generadores | Procesar grandes datasets sin cargar todo en memoria |
| Monolito | Empezar simple, equipo pequeño |
| Microservicios | Dominio complejo, múltiples equipos |
| Event-Driven | Flujos desacoplados, asíncronos |
| Hexagonal | Core testeable, independiente del framework |
