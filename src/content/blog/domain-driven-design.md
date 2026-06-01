---
permalink: domain-driven-design
title: "Domain Driven Design (DDD)"
description: "An overview of Domain Driven Design — bounded contexts, aggregates, entities, value objects, and how to organize complex software around the business domain."
date: 2026-05-31
tags: ["Software Engineering"]
secondaryTags: ["DDD", "Architecture", "Design Patterns"]
thumbnail: "/images/blog/domain-driven-design-thumbnail.svg"
lang: en
---

Domain Driven Design (DDD) is an approach to building software that focuses on the **business domain**. The code should reflect how the business works.

## Core Idea

> "The structure of the code should match the structure of the business."

Traditional approach: organize by **technology** (controllers, services, repositories).
DDD approach: organize by **domain** (orders, payments, inventory).

```
Traditional:                     DDD:
├── controllers/                 ├── orders/
│   ├── OrderController          │   ├── Order.ts (entity)
│   ├── PaymentController        │   ├── OrderService.ts
│   └── InventoryController      │   └── OrderRepository.ts
├── services/                    ├── payments/
│   ├── OrderService             │   ├── Payment.ts
│   └── PaymentService           │   ├── PaymentService.ts
└── repositories/                │   └── PaymentRepository.ts
    ├── OrderRepository          └── inventory/
    └── PaymentRepository            ├── Product.ts
                                     └── InventoryService.ts
```

## Strategic Design

### Bounded Context

A **bounded context** is a boundary where a model has a specific meaning. The same word can mean different things in different contexts.

```
┌─────────────────┐    ┌─────────────────┐
│  Sales Context   │    │  Shipping Context│
│                  │    │                  │
│  "Customer" =    │    │  "Customer" =    │
│  name, email,    │    │  name, address,  │
│  payment info    │    │  delivery prefs  │
│                  │    │                  │
│  "Order" =       │    │  "Order" =       │
│  items, price    │    │  weight, route   │
└────────┬─────────┘    └────────┬─────────┘
         │    Shared: order_id   │
         └───────────────────────┘
```

**Rule:** Each bounded context has its own model, its own code, and its own database.

### Ubiquitous Language

The **same language** used by developers and business people within a bounded context.

| Instead of | Use (if the business says) |
|-----------|---------------------------|
| `user_record` | `Customer` |
| `item_list` | `Cart` |
| `process_transaction` | `PlaceOrder` |
| `status_flag` | `OrderStatus` |

## Tactical Design

### Building Blocks

```
┌─────────────────────────────────────────┐
│            Aggregate Root               │
│  ┌──────────┐  ┌──────────────────────┐ │
│  │  Entity   │  │    Value Object      │ │
│  │  (Order)  │  │    (Money, Address)  │ │
│  └──────────┘  └──────────────────────┘ │
│  ┌──────────────────────────────────┐   │
│  │       Domain Events              │   │
│  │  (OrderPlaced, OrderShipped)     │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Entity

Has a **unique identity**. Two entities with the same data but different IDs are different.

```python
class Order:
    def __init__(self, order_id: str, customer_id: str):
        self.id = order_id            # identity
        self.customer_id = customer_id
        self.items = []
        self.status = "created"

    def add_item(self, product_id: str, quantity: int, price: float):
        self.items.append(OrderItem(product_id, quantity, price))

    def place(self):
        if not self.items:
            raise ValueError("Cannot place empty order")
        self.status = "placed"
```

### Value Object

No identity. Defined by its **attributes**. Two value objects with the same data are equal.

```python
class Money:
    def __init__(self, amount: float, currency: str):
        self.amount = amount
        self.currency = currency

    def add(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("Cannot add different currencies")
        return Money(self.amount + other.amount, self.currency)

    def __eq__(self, other):
        return self.amount == other.amount and self.currency == other.currency
```

### Aggregate

A **cluster of entities and value objects** treated as a single unit. Has one **aggregate root** that controls access.

```
Order (Aggregate Root)
├── OrderItem (Entity)
│   └── Money (Value Object)
├── ShippingAddress (Value Object)
└── OrderStatus (Value Object)

Rules:
- Access OrderItems ONLY through Order
- Save/load the entire Order at once
- Other aggregates reference Order by ID only
```

### Domain Event

Something important that happened in the domain:

```python
class OrderPlaced:
    def __init__(self, order_id: str, customer_id: str, total: Money):
        self.order_id = order_id
        self.customer_id = customer_id
        self.total = total
        self.occurred_at = datetime.now()
```

Events connect bounded contexts without tight coupling:
```
Sales Context                    Shipping Context
OrderPlaced ──→ event bus ──→ CreateShipment
```

### Repository

Provides access to aggregates. Hides the database details.

```python
class OrderRepository:
    def find_by_id(self, order_id: str) -> Order: ...
    def save(self, order: Order) -> None: ...
    def find_by_customer(self, customer_id: str) -> list[Order]: ...
```

### Domain Service

Business logic that doesn't belong to a single entity:

```python
class PricingService:
    def calculate_total(self, order: Order, discounts: list) -> Money:
        # Logic involving multiple aggregates
        ...
```

## Context Mapping

How bounded contexts relate to each other:

| Pattern | Description |
|---------|------------|
| **Shared Kernel** | Two contexts share a small common model |
| **Customer-Supplier** | One context provides, another consumes |
| **Anti-Corruption Layer** | Translate between contexts to protect your model |
| **Open Host Service** | Public API for others to consume |
| **Published Language** | Standard format for communication (JSON, Protobuf) |

```
┌──────────┐  Anti-Corruption  ┌──────────┐
│  Your    │◄── Layer ────────►│ External │
│  Context │   (translator)    │  System  │
└──────────┘                   └──────────┘
```

## Summary

| Concept | Key Idea |
|---------|----------|
| Bounded Context | A boundary where terms have specific meaning |
| Ubiquitous Language | Shared vocabulary between dev and business |
| Entity | Has identity (Order, Customer) |
| Value Object | No identity, defined by attributes (Money, Address) |
| Aggregate | Cluster treated as one unit, one root |
| Domain Event | Something that happened (OrderPlaced) |
| Repository | Data access for aggregates |
| Context Map | How bounded contexts relate |
