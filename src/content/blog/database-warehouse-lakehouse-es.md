---
permalink: database-warehouse-lakehouse
title: "Base de Datos vs Data Warehouse vs Data Lakehouse"
description: "Una comparación clara de bases de datos, data warehouses, data lakes y data lakehouses — cuándo usar cada uno."
date: 2026-05-31
tags: ["Data", "Infrastructure"]
secondaryTags: ["Data Warehouse", "Data Lake", "Data Lakehouse"]
thumbnail: "/images/blog/database-warehouse-lakehouse-thumbnail.svg"
lang: es
---

Entender las diferencias entre bases de datos, data warehouses, data lakes y data lakehouses es fundamental para la arquitectura de datos.

## Comparación Rápida

| Característica | Base de Datos | Data Warehouse | Data Lake | Data Lakehouse |
|---------------|--------------|---------------|-----------|---------------|
| **Propósito** | Ejecutar apps | Analítica de negocio | Almacenar datos crudos | Analítica + datos crudos |
| **Tipo de datos** | Estructurados | Estructurados | Cualquiera (crudo) | Cualquiera (gobernado) |
| **Esquema** | Schema-on-write | Schema-on-write | Schema-on-read | Schema-on-read/write |
| **Usuarios** | Desarrolladores | Analistas, BI | Data engineers, científicos | Todos |
| **Consultas** | OLTP (rápidas, pequeñas) | OLAP (complejas, grandes) | Varía | OLAP + ML |
| **Coste** | Medio | Alto | Bajo | Medio |

## Base de Datos (OLTP)

Para ejecutar aplicaciones. Optimizada para **transacciones** — lecturas y escrituras rápidas de registros individuales.

```
App ──→ INSERT INTO pedidos VALUES (...)
App ──→ SELECT * FROM pedidos WHERE id = 123
App ──→ UPDATE pedidos SET estado = 'enviado' WHERE id = 123
```

**Ejemplos:** PostgreSQL, MySQL, MongoDB, DynamoDB

**Características:**
- Almacenamiento orientado a filas
- Transacciones ACID
- Baja latencia (milisegundos)
- Estado actual de los datos

## Data Warehouse (OLAP)

Para analítica de negocio. Optimizado para **consultas complejas** sobre grandes datasets.

```
Analista ──→ SELECT region, SUM(ingresos), AVG(valor_pedido)
             FROM fact_ventas
             JOIN dim_fecha ON ...
             WHERE año = 2025
             GROUP BY region
```

**Ejemplos:** Snowflake, BigQuery, Redshift, Azure Synapse

**Características:**
- Almacenamiento orientado a columnas (agregaciones rápidas)
- Datos estructurados con esquema obligatorio
- Datos históricos (meses/años)
- ETL/ELT para cargar datos
- Caro para grandes volúmenes

## Data Lake

Un repositorio centralizado para **todos los datos crudos** — estructurados, semi-estructurados y no estructurados.

```
Data Lake (S3, ADLS, GCS)
├── raw/
│   ├── logs/          ← archivos JSON
│   ├── imagenes/      ← PNG, JPEG
│   ├── csv_exports/   ← archivos CSV
│   └── eventos/       ← archivos Parquet
├── procesado/
│   └── datos_limpios/
└── curado/
    └── listo_para_analitica/
```

**Ejemplos:** AWS S3, Azure Data Lake Storage, Google Cloud Storage

**Características:**
- Almacenar todo de forma barata
- Schema-on-read (defines esquema cuando consultas)
- Bueno para data science y ML
- Riesgo de convertirse en "data swamp" sin gobernanza

## Data Lakehouse

Combina lo mejor de data lakes y data warehouses.

```
┌─────────────────────────────────────┐
│         Data Lakehouse              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Capa Metadatos / Gobernanza│   │ ← ACID, Esquema, Calidad
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  Formatos de Archivo Abiertos│  │ ← Parquet, Delta, Iceberg
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  Almacenamiento Objeto Barato│  │ ← S3, ADLS, GCS
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Ejemplos:** Databricks (Delta Lake), Apache Iceberg, Apache Hudi

**Características clave:**
- Transacciones ACID sobre data lake
- Esquema obligatorio y evolución de esquema
- Time travel (consultar versiones históricas)
- Funciona tanto para BI como para ML
- Usa formatos de archivo abiertos (Parquet, Delta, Iceberg)
- Más barato que un data warehouse

## Evolución de la Arquitectura

```
2000s: Base de Datos → ETL → Data Warehouse → Reportes BI

2010s: Base de Datos → Data Lake → Data Warehouse → Reportes BI
                          └──→ ML / Data Science

2020s: Base de Datos → Data Lakehouse → Reportes BI
                           └──→ ML / Data Science
                           └──→ Analítica en Tiempo Real
```

## Cuándo Usar Qué

| Escenario | Solución |
|-----------|----------|
| Backend de app web/móvil | Base de Datos (PostgreSQL, MySQL) |
| Dashboards de negocio y KPIs | Data Warehouse (Snowflake, BigQuery) |
| Almacenar todos los datos crudos | Data Lake (S3, ADLS) |
| BI + ML sobre los mismos datos | Data Lakehouse (Databricks, Iceberg) |
| Analítica en tiempo real | Streaming + Lakehouse |

## Resumen

| Arquitectura | Mejor Para | Compromiso |
|-------------|------------|------------|
| Base de Datos | Transacciones, aplicaciones | No para analítica |
| Data Warehouse | BI, reporting | Caro, solo estructurados |
| Data Lake | Almacenamiento barato, ML | Puede volverse desordenado |
| Data Lakehouse | Lo mejor de ambos mundos | Más nuevo, ecosistema madurando |
