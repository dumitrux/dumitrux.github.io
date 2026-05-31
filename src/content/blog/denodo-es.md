---
permalink: denodo
title: "Denodo: Plataforma de Virtualización de Datos"
description: "Una visión general de Denodo — la plataforma de virtualización de datos que proporciona una vista unificada de datos sin moverlos."
date: 2026-05-31
tags: ["Data", "Infraestructura"]
secondaryTags: ["Denodo", "Virtualización de Datos", "Integración de Datos"]
lang: es
---

Denodo es una plataforma de **virtualización de datos**. Te permite consultar datos de múltiples fuentes como si estuvieran en un solo lugar — sin copiar ni mover los datos.

## ¿Qué Es la Virtualización de Datos?

Enfoque tradicional: **copiar datos** a una ubicación central (ETL).
Enfoque virtualización: **consultar datos en su lugar** a través de una capa virtual.

```
Tradicional (ETL):
Fuente A ──→ Copiar ──→ Data Warehouse ←── Usuarios
Fuente B ──→ Copiar ──→      │
Fuente C ──→ Copiar ──→      │

Virtualización (Denodo):
Fuente A ←──┐
Fuente B ←──┼── Denodo (capa virtual) ←── Usuarios
Fuente C ←──┘
```

**Idea clave:** Los datos se quedan donde están. Denodo crea una vista virtual encima.

## Cómo Funciona Denodo

```
┌──────────────────────────────────┐
│          Consumidores            │
│  (herramientas BI, Apps, APIs)   │
├──────────────────────────────────┤
│         Plataforma Denodo        │
│  ┌───────────────────────────┐   │
│  │  Capa de Datos Virtual    │   │
│  │  (vistas, transformaciones│   │
│  └───────────────────────────┘   │
│  ┌───────────────────────────┐   │
│  │  Optimización de Consultas│   │
│  │  (pushdown, caché)        │   │
│  └───────────────────────────┘   │
│  ┌───────────────────────────┐   │
│  │  Conectores               │   │
│  │  (JDBC, REST, archivos)   │   │
│  └───────────────────────────┘   │
├──────────────────────────────────┤
│  Bases de Datos │ APIs │ Archivos│
└──────────────────────────────────┘
```

### Pasos Principales

1. **Conectar** — Conectar a fuentes de datos (bases de datos, APIs, archivos, cloud)
2. **Modelar** — Crear vistas virtuales combinando datos de múltiples fuentes
3. **Transformar** — Aplicar joins, filtros, agregaciones en la capa virtual
4. **Servir** — Exponer datos unificados vía SQL, REST, OData, GraphQL

## Características Principales

| Característica | Descripción |
|---------------|------------|
| **Catálogo de datos** | Descubrir y explorar datasets disponibles |
| **Optimización de consultas** | Envía filtros/joins a los sistemas fuente |
| **Caché** | Cachear datos de acceso frecuente para velocidad |
| **Seguridad** | Control de acceso a nivel fila/columna |
| **Gobernanza de datos** | Linaje, auditoría y cumplimiento |
| **Tiempo real** | Consultar datos en vivo, sin retrasos de batch |

## Jerarquía de Vistas en Denodo

```
Capa Física      →   Vistas Base      (datos crudos de las fuentes)
     ↓
Capa Lógica      →   Vistas Derivadas (joins, transformaciones)
     ↓
Capa de Negocio  →   Vistas Finales   (limpias, amigables para negocio)
```

### Ejemplo: Vista Virtual

```sql
-- Esta consulta une datos de PostgreSQL + Salesforce + S3
-- Los datos nunca salen de los sistemas originales
SELECT
    c.nombre_cliente,     -- de PostgreSQL
    s.etapa_deal,         -- de Salesforce
    o.total_pedidos       -- de S3 (Parquet)
FROM cliente c
JOIN salesforce_deals s ON c.id = s.customer_id
JOIN s3_pedidos o ON c.id = o.customer_id
WHERE c.region = 'EMEA';
```

## Virtualización vs ETL

| Aspecto | ETL (Copiar) | Virtualización (Denodo) |
|---------|-------------|------------------------|
| **Movimiento de datos** | Copia datos | Sin movimiento de datos |
| **Frescura** | Retrasada (batch) | Tiempo real |
| **Coste almacenamiento** | Datos duplicados | Sin almacenamiento extra |
| **Tiempo de setup** | Largo (construir pipelines) | Rápido (crear vistas) |
| **Transformaciones complejas** | Mejor para transformaciones pesadas | Mejor para simples/medianas |
| **Rendimiento** | Rápido (pre-computado) | Depende de las fuentes |

**En la práctica:** Denodo trabaja junto con ETL, no como reemplazo. Usa ETL para transformaciones pesadas, Denodo para acceso en tiempo real y federación.

## Casos de Uso Comunes

| Caso de Uso | Descripción |
|------------|------------|
| **Federación de datos** | Consultar múltiples bases de datos como una |
| **Data warehouse lógico** | Warehouse virtual sin copiar datos |
| **Capa de APIs** | Exponer datos como APIs REST/GraphQL |
| **BI autoservicio** | Permitir a analistas acceder datos directamente |
| **Migración de datos** | Abstraer fuentes durante migración |
| **Data mesh** | Productos de datos virtuales por dominio |

## Denodo + Data Mesh

Denodo encaja de forma natural con la arquitectura Data Mesh:

```
Dominio A (vistas) ──┐
Dominio B (vistas) ──┼── Denodo ──→ Gobernanza federada
Dominio C (vistas) ──┘              Acceso autoservicio
```

Cada dominio publica productos de datos virtuales a través de Denodo. Los consumidores acceden sin conocer las fuentes subyacentes.

## Resumen

| Concepto | Idea Clave |
|----------|------------|
| Virtualización de datos | Consultar datos en su lugar, sin copiar |
| Denodo | Plataforma que crea una capa de datos virtual |
| Vistas | Tablas virtuales combinando múltiples fuentes |
| Query pushdown | Optimización — enviar filtros a la fuente |
| Mejor para | Acceso en tiempo real, federación, autoservicio |
| No mejor para | Transformaciones pesadas, ETL a gran escala |
