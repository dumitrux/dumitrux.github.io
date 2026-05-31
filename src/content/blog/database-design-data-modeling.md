---
permalink: database-design-data-modeling
title: "Database Design and Data Modeling"
description: "Normalized vs denormalized schemas, relational modeling, and when to use each approach."
date: 2026-05-31
tags: ["Data", "Software"]
secondaryTags: ["Database", "Data Modeling", "SQL", "Normalization"]
lang: en
---

Good database design is the foundation of any reliable system. Understanding normalization and denormalization helps you make the right trade-offs.

## Normalized vs Denormalized

| Aspect | Normalized | Denormalized |
|--------|-----------|-------------|
| **Data duplication** | No redundancy | Intentional redundancy |
| **Write performance** | Fast writes | Slower writes |
| **Read performance** | Needs JOINs (slower) | Fast reads (no JOINs) |
| **Consistency** | Easy to maintain | Risk of inconsistency |
| **Use case** | OLTP (transactional) | OLAP (analytical) |

## Normalization

Normalization organizes data to reduce redundancy. Each level is called a "Normal Form."

### 1NF — First Normal Form

- Each cell has one value (atomic)
- Each row is unique

```
Bad:                          Good:
| name  | phones           |  | name  | phone        |
|-------|------------------|  |-------|--------------|
| Alice | 555-1234, 555-5678|  | Alice | 555-1234     |
                              | Alice | 555-5678     |
```

### 2NF — Second Normal Form

- Meets 1NF
- No partial dependencies (every non-key column depends on the **whole** primary key)

### 3NF — Third Normal Form

- Meets 2NF
- No transitive dependencies (non-key columns don't depend on other non-key columns)

```
Bad:                                    Good:
| order_id | customer | city      |    orders:  | order_id | customer_id |
|----------|----------|-----------|    customers:| customer_id | name | city |
```

### Normalized Example

```sql
-- Separate tables, linked by foreign keys
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    order_date DATE,
    total DECIMAL(10,2)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    price DECIMAL(10,2)
);
```

## Denormalization

Intentionally add redundancy for read performance. Common in data warehouses and analytics.

### Denormalized Example

```sql
-- Single wide table for analytics
CREATE TABLE sales_fact (
    order_id INTEGER,
    order_date DATE,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_city VARCHAR(100),
    product_name VARCHAR(100),
    product_category VARCHAR(50),
    quantity INTEGER,
    price DECIMAL(10,2),
    total DECIMAL(10,2)
);
-- No JOINs needed for queries!
```

## Star Schema

The most common denormalized pattern for data warehouses.

```
        ┌──────────┐
        │ dim_date  │
        └────┬─────┘
             │
┌──────────┐ │ ┌──────────────┐
│dim_product├─┼─┤  fact_sales   │
└──────────┘ │ └──────┬───────┘
             │        │
        ┌────┴─────┐  │
        │dim_customer│─┘
        └──────────┘
```

- **Fact table** — measures and metrics (sales amount, quantity)
- **Dimension tables** — descriptive attributes (product name, date, customer)

```sql
-- Fact table
CREATE TABLE fact_sales (
    date_key INTEGER REFERENCES dim_date(key),
    product_key INTEGER REFERENCES dim_product(key),
    customer_key INTEGER REFERENCES dim_customer(key),
    quantity INTEGER,
    revenue DECIMAL(10,2)
);

-- Dimension table
CREATE TABLE dim_product (
    key SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    brand VARCHAR(50)
);
```

## Snowflake Schema

Like star schema, but dimensions are further normalized.

```
dim_category → dim_product → fact_sales ← dim_customer → dim_city → dim_country
```

## Key Concepts

### Primary Key
Uniquely identifies each row.

### Foreign Key
Links to another table's primary key.

### Indexes
Speed up queries on specific columns.

```sql
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
```

### Types of Relationships

| Type | Example |
|------|---------|
| One-to-One | User → Profile |
| One-to-Many | Customer → Orders |
| Many-to-Many | Students ↔ Courses (via junction table) |

## When to Normalize vs Denormalize

| Scenario | Approach |
|----------|----------|
| Transactional app (OLTP) | Normalize |
| Analytics / reporting (OLAP) | Denormalize |
| Real-time dashboards | Denormalize |
| Data entry forms | Normalize |
| Data warehouse | Star/Snowflake schema |
| Small datasets | Either works |

## Summary

| Concept | Key Idea |
|---------|----------|
| Normalization | Reduce redundancy, enforce consistency |
| Denormalization | Add redundancy for faster reads |
| Star Schema | Fact + dimension tables for analytics |
| 3NF | Standard for transactional databases |
| Indexes | Speed up read queries |
