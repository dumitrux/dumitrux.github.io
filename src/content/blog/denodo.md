---
permalink: denodo
title: "Denodo: Data Virtualization Platform"
description: "An overview of Denodo — the data virtualization platform that provides a unified view of data without moving it."
date: 2026-05-31
tags: ["Data", "Infrastructure"]
secondaryTags: ["Denodo", "Data Virtualization", "Data Integration"]
lang: en
---

Denodo is a **data virtualization** platform. It lets you query data from multiple sources as if it were in one place — without copying or moving the data.

## What Is Data Virtualization?

Traditional approach: **copy data** to a central location (ETL).
Virtualization approach: **query data in place** through a virtual layer.

```
Traditional (ETL):
Source A ──→ Copy ──→ Data Warehouse ←── Users
Source B ──→ Copy ──→      │
Source C ──→ Copy ──→      │

Virtualization (Denodo):
Source A ←──┐
Source B ←──┼── Denodo (virtual layer) ←── Users
Source C ←──┘
```

**Key idea:** Data stays where it is. Denodo creates a virtual view on top.

## How Denodo Works

```
┌──────────────────────────────────┐
│          Consumers               │
│   (BI tools, Apps, APIs, SQL)    │
├──────────────────────────────────┤
│         Denodo Platform          │
│  ┌───────────────────────────┐   │
│  │  Virtual Data Layer       │   │
│  │  (views, transformations) │   │
│  └───────────────────────────┘   │
│  ┌───────────────────────────┐   │
│  │  Query Optimization       │   │
│  │  (pushdown, caching)      │   │
│  └───────────────────────────┘   │
│  ┌───────────────────────────┐   │
│  │  Connectors               │   │
│  │  (JDBC, REST, files, etc) │   │
│  └───────────────────────────┘   │
├──────────────────────────────────┤
│  Databases │ APIs │ Files │ Cloud│
└──────────────────────────────────┘
```

### Core Steps

1. **Connect** — Connect to data sources (databases, APIs, files, cloud)
2. **Model** — Create virtual views combining data from multiple sources
3. **Transform** — Apply joins, filters, aggregations in the virtual layer
4. **Serve** — Expose unified data via SQL, REST, OData, GraphQL

## Key Features

| Feature | Description |
|---------|------------|
| **Data catalog** | Discover and browse available datasets |
| **Query optimization** | Pushes filters/joins to source systems |
| **Caching** | Cache frequently accessed data for speed |
| **Security** | Row/column-level access control |
| **Data governance** | Lineage, audit, and compliance |
| **Real-time** | Query live data, no batch delays |

## Denodo Views Hierarchy

```
Physical Layer    →   Base Views     (raw data from sources)
     ↓
Logical Layer     →   Derived Views  (joins, transforms)
     ↓
Business Layer    →   Final Views    (clean, business-friendly)
```

### Example: Virtual View

```sql
-- This query joins data from PostgreSQL + Salesforce + S3
-- Data never leaves the original systems
SELECT
    c.customer_name,      -- from PostgreSQL
    s.deal_stage,         -- from Salesforce
    o.total_orders         -- from S3 (Parquet)
FROM customer c
JOIN salesforce_deals s ON c.id = s.customer_id
JOIN s3_orders o ON c.id = o.customer_id
WHERE c.region = 'EMEA';
```

## Virtualization vs ETL

| Aspect | ETL (Copy) | Virtualization (Denodo) |
|--------|-----------|------------------------|
| **Data movement** | Copies data | No data movement |
| **Freshness** | Delayed (batch) | Real-time |
| **Storage cost** | Duplicated data | No extra storage |
| **Setup time** | Long (build pipelines) | Fast (create views) |
| **Complex transforms** | Better for heavy transforms | Better for simple/medium |
| **Performance** | Fast (pre-computed) | Depends on sources |

**In practice:** Denodo works alongside ETL, not as a replacement. Use ETL for heavy transformations, Denodo for real-time access and federation.

## Common Use Cases

| Use Case | Description |
|----------|------------|
| **Data federation** | Query multiple databases as one |
| **Logical data warehouse** | Virtual warehouse without copying data |
| **API layer** | Expose data as REST/GraphQL APIs |
| **Self-service BI** | Let analysts access data directly |
| **Data migration** | Abstract sources during migration |
| **Data mesh** | Virtual data products per domain |

## Denodo + Data Mesh

Denodo fits naturally with Data Mesh architecture:

```
Domain A (views) ──┐
Domain B (views) ──┼── Denodo ──→ Federated governance
Domain C (views) ──┘              Self-serve access
```

Each domain publishes virtual data products through Denodo. Consumers access them without knowing the underlying sources.

## Summary

| Concept | Key Idea |
|---------|----------|
| Data virtualization | Query data in place, no copying |
| Denodo | Platform that creates a virtual data layer |
| Views | Virtual tables combining multiple sources |
| Query pushdown | Optimization — send filters to source |
| Best for | Real-time access, federation, self-service |
| Not best for | Heavy transformations, large-scale ETL |
