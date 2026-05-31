---
permalink: domain-driven-design
title: "Domain Driven Design (DDD)"
description: "Una visión general de Domain Driven Design — bounded contexts, aggregates, entities, value objects y cómo organizar software complejo alrededor del dominio de negocio."
date: 2026-05-31
tags: ["Ingeniería de Software"]
secondaryTags: ["DDD", "Arquitectura", "Patrones de Diseño"]
lang: es
---

Domain Driven Design (DDD) es un enfoque para construir software que se centra en el **dominio de negocio**. El código debe reflejar cómo funciona el negocio.

## Idea Principal

> "La estructura del código debe coincidir con la estructura del negocio."

Enfoque tradicional: organizar por **tecnología** (controllers, services, repositories).
Enfoque DDD: organizar por **dominio** (pedidos, pagos, inventario).

```
Tradicional:                     DDD:
├── controllers/                 ├── pedidos/
│   ├── OrderController          │   ├── Order.ts (entidad)
│   ├── PaymentController        │   ├── OrderService.ts
│   └── InventoryController      │   └── OrderRepository.ts
├── services/                    ├── pagos/
│   ├── OrderService             │   ├── Payment.ts
│   └── PaymentService           │   ├── PaymentService.ts
└── repositories/                │   └── PaymentRepository.ts
    ├── OrderRepository          └── inventario/
    └── PaymentRepository            ├── Product.ts
                                     └── InventoryService.ts
```

## Diseño Estratégico

### Bounded Context (Contexto Delimitado)

Un **bounded context** es un límite donde un modelo tiene un significado específico. La misma palabra puede significar cosas diferentes en diferentes contextos.

```
┌─────────────────┐    ┌─────────────────┐
│ Contexto Ventas  │    │Contexto Envíos  │
│                  │    │                  │
│  "Cliente" =     │    │  "Cliente" =     │
│  nombre, email,  │    │  nombre, direc., │
│  info de pago    │    │  prefs. entrega  │
│                  │    │                  │
│  "Pedido" =      │    │  "Pedido" =      │
│  artículos,      │    │  peso, ruta      │
│  precio          │    │                  │
└────────┬─────────┘    └────────┬─────────┘
         │   Compartido: order_id │
         └────────────────────────┘
```

**Regla:** Cada bounded context tiene su propio modelo, su propio código y su propia base de datos.

### Lenguaje Ubicuo

El **mismo lenguaje** usado por desarrolladores y gente de negocio dentro de un bounded context.

| En vez de | Usar (si el negocio dice) |
|-----------|--------------------------|
| `user_record` | `Cliente` |
| `item_list` | `Carrito` |
| `process_transaction` | `RealizarPedido` |
| `status_flag` | `EstadoPedido` |

## Diseño Táctico

### Bloques de Construcción

```
┌─────────────────────────────────────────┐
│          Aggregate Root                 │
│  ┌──────────┐  ┌──────────────────────┐ │
│  │ Entidad  │  │   Value Object       │ │
│  │ (Pedido) │  │   (Dinero, Dirección)│ │
│  └──────────┘  └──────────────────────┘ │
│  ┌──────────────────────────────────┐   │
│  │      Eventos de Dominio          │   │
│  │  (PedidoRealizado, PedidoEnviado)│   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Entity (Entidad)

Tiene una **identidad única**. Dos entidades con los mismos datos pero diferentes IDs son diferentes.

```python
class Pedido:
    def __init__(self, pedido_id: str, cliente_id: str):
        self.id = pedido_id           # identidad
        self.cliente_id = cliente_id
        self.items = []
        self.estado = "creado"

    def agregar_item(self, producto_id: str, cantidad: int, precio: float):
        self.items.append(ItemPedido(producto_id, cantidad, precio))

    def realizar(self):
        if not self.items:
            raise ValueError("No se puede realizar un pedido vacío")
        self.estado = "realizado"
```

### Value Object (Objeto de Valor)

Sin identidad. Definido por sus **atributos**. Dos value objects con los mismos datos son iguales.

```python
class Dinero:
    def __init__(self, cantidad: float, moneda: str):
        self.cantidad = cantidad
        self.moneda = moneda

    def sumar(self, otro: "Dinero") -> "Dinero":
        if self.moneda != otro.moneda:
            raise ValueError("No se pueden sumar monedas diferentes")
        return Dinero(self.cantidad + otro.cantidad, self.moneda)

    def __eq__(self, otro):
        return self.cantidad == otro.cantidad and self.moneda == otro.moneda
```

### Aggregate (Agregado)

Un **grupo de entidades y value objects** tratados como una sola unidad. Tiene un **aggregate root** que controla el acceso.

```
Pedido (Aggregate Root)
├── ItemPedido (Entidad)
│   └── Dinero (Value Object)
├── DirecciónEnvío (Value Object)
└── EstadoPedido (Value Object)

Reglas:
- Acceder a ItemPedido SOLO a través de Pedido
- Guardar/cargar el Pedido entero de una vez
- Otros aggregates referencian Pedido solo por ID
```

### Domain Event (Evento de Dominio)

Algo importante que ocurrió en el dominio:

```python
class PedidoRealizado:
    def __init__(self, pedido_id: str, cliente_id: str, total: Dinero):
        self.pedido_id = pedido_id
        self.cliente_id = cliente_id
        self.total = total
        self.ocurrido_en = datetime.now()
```

Los eventos conectan bounded contexts sin acoplamiento fuerte:
```
Contexto Ventas                  Contexto Envíos
PedidoRealizado ──→ bus ──→ CrearEnvío
```

### Repository (Repositorio)

Proporciona acceso a los aggregates. Oculta los detalles de la base de datos.

```python
class PedidoRepository:
    def buscar_por_id(self, pedido_id: str) -> Pedido: ...
    def guardar(self, pedido: Pedido) -> None: ...
    def buscar_por_cliente(self, cliente_id: str) -> list[Pedido]: ...
```

### Domain Service (Servicio de Dominio)

Lógica de negocio que no pertenece a una sola entidad:

```python
class ServicioPrecios:
    def calcular_total(self, pedido: Pedido, descuentos: list) -> Dinero:
        # Lógica que involucra múltiples aggregates
        ...
```

## Mapeo de Contextos

Cómo se relacionan los bounded contexts entre sí:

| Patrón | Descripción |
|--------|------------|
| **Shared Kernel** | Dos contextos comparten un pequeño modelo común |
| **Customer-Supplier** | Un contexto provee, otro consume |
| **Anti-Corruption Layer** | Traducir entre contextos para proteger tu modelo |
| **Open Host Service** | API pública para que otros consuman |
| **Published Language** | Formato estándar para comunicación (JSON, Protobuf) |

```
┌──────────┐  Anti-Corruption  ┌──────────┐
│  Tu      │◄── Layer ────────►│ Sistema  │
│  Contexto│   (traductor)     │ Externo  │
└──────────┘                   └──────────┘
```

## Resumen

| Concepto | Idea Clave |
|----------|------------|
| Bounded Context | Un límite donde los términos tienen significado específico |
| Lenguaje Ubicuo | Vocabulario compartido entre dev y negocio |
| Entidad | Tiene identidad (Pedido, Cliente) |
| Value Object | Sin identidad, definido por atributos (Dinero, Dirección) |
| Aggregate | Grupo tratado como una unidad, una raíz |
| Evento de Dominio | Algo que pasó (PedidoRealizado) |
| Repository | Acceso a datos para aggregates |
| Mapa de Contextos | Cómo se relacionan los bounded contexts |
