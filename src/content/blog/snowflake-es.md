---
permalink: snowflake
title: "Snowflake: Plataforma de Datos en la Nube"
description: "Una visión general de Snowflake — su arquitectura, Snowpipe, Snowpark y características clave para ingeniería de datos moderna."
date: 2026-05-31
tags: ["Data", "Infraestructura"]
secondaryTags: ["Snowflake", "Cloud", "Data Warehouse"]
lang: es
---

Snowflake es una **plataforma de datos** nativa en la nube que separa almacenamiento de computación. Funciona en AWS, Azure o GCP.

## Arquitectura

Snowflake tiene una arquitectura única de tres capas:

```
┌──────────────────────────────────────┐
│        Capa de Servicios Cloud       │
│  (autenticación, metadata, optimi-   │
│   zación de consultas, acceso)       │
├──────────────────────────────────────┤
│        Capa de Computación           │
│  ┌──────────┐ ┌──────────┐          │
│  │Warehouse │ │Warehouse │  ...     │
│  │  (XS)    │ │  (XL)    │          │
│  └──────────┘ └──────────┘          │
│  (independientes, auto-escalan)      │
├──────────────────────────────────────┤
│        Capa de Almacenamiento        │
│  (comprimido, columnar, inmutable)   │
│  (S3 / Azure Blob / GCS)            │
└──────────────────────────────────────┘
```

### Por Qué Importa

| Capa | Beneficio |
|------|-----------|
| **Almacenamiento separado** | Pagar por almacenamiento independientemente |
| **Computación separada** | Escalar arriba/abajo por carga de trabajo |
| **Servicios cloud** | Cero gestión de infraestructura |

**Ventaja clave:** Múltiples equipos pueden usar diferentes warehouses sobre los mismos datos sin competir por recursos.

## Conceptos Clave

| Concepto | Qué Es |
|----------|--------|
| **Database** | Contenedor para esquemas y tablas |
| **Schema** | Contenedor para tablas, vistas, funciones |
| **Virtual Warehouse** | Cluster de computación (tallas: XS a 6XL) |
| **Stage** | Ubicación para cargar archivos (interno o externo) |
| **Table** | Almacenamiento de datos estructurados (columnar) |

## Snowpipe

**Snowpipe** carga datos automáticamente en cuanto llegan los archivos. Sin necesidad de programar.

```
Archivos llegan    →  Snowpipe detecta  →  Datos cargados
(S3/Azure/GCS)        (notificación)       (en tablas)
```

### Cómo Funciona

```sql
-- 1. Crear un stage apuntando a tu almacenamiento cloud
CREATE STAGE mi_stage
  URL = 's3://mi-bucket/datos/'
  CREDENTIALS = (AWS_KEY_ID = '...' AWS_SECRET_KEY = '...');

-- 2. Crear el Snowpipe
CREATE PIPE mi_pipe AUTO_INGEST = TRUE AS
  COPY INTO mi_tabla
  FROM @mi_stage
  FILE_FORMAT = (TYPE = 'PARQUET');
```

| Característica | Descripción |
|---------------|------------|
| **Auto-ingest** | Activado por eventos del almacenamiento cloud |
| **Serverless** | No necesita warehouse, Snowflake gestiona la computación |
| **Casi tiempo real** | Datos disponibles en minutos |
| **Coste** | Pago por archivo cargado (no por tiempo de warehouse) |

## Snowpark

**Snowpark** te permite escribir pipelines de datos en Python, Java o Scala que se ejecutan **dentro de Snowflake** — tu código se ejecuta en la computación de Snowflake.

```
Tradicional:
  Datos → Descargar a local → Procesar (Python) → Subir de vuelta

Snowpark:
  Datos se quedan en Snowflake → Procesar (Python en Snowflake) → Resultados en Snowflake
```

### Ejemplo Snowpark (Python)

```python
from snowflake.snowpark import Session
from snowflake.snowpark.functions import col, sum as sum_

# Conectar
session = Session.builder.configs(connection_params).create()

# Leer y transformar (se ejecuta dentro de Snowflake)
df = session.table("ventas")
resultado = (df
    .filter(col("año") == 2025)
    .group_by("region")
    .agg(sum_("ingresos").alias("total_ingresos"))
    .sort("total_ingresos", ascending=False)
)

# Guardar resultados
resultado.write.save_as_table("resumen_ventas")
```

### Casos de Uso de Snowpark

| Caso de Uso | Cómo |
|------------|------|
| **ETL/ELT** | Transformar datos sin moverlos |
| **Entrenamiento ML** | Entrenar modelos dentro de Snowflake |
| **UDFs** | Escribir funciones Python que corren en Snowflake |
| **Procedimientos almacenados** | Lógica compleja en Python |

## Otras Características Clave

### Time Travel (Viaje en el Tiempo)

Consultar datos tal como estaban en el pasado:

```sql
-- ¿Cómo se veía esta tabla hace 1 hora?
SELECT * FROM mi_tabla AT (OFFSET => -3600);

-- ¿Cómo se veía antes de una consulta específica?
SELECT * FROM mi_tabla BEFORE (STATEMENT => 'query-id-aqui');
```

### Zero-Copy Cloning (Clonación Sin Copia)

Crear una copia de una tabla/base de datos al instante sin duplicar datos:

```sql
CREATE TABLE mi_tabla_clon CLONE mi_tabla;
CREATE DATABASE dev_db CLONE prod_db;
```

### Data Sharing (Compartir Datos)

Compartir datos con otras cuentas de Snowflake sin copiar:

```sql
CREATE SHARE mi_share;
GRANT USAGE ON DATABASE mi_db TO SHARE mi_share;
-- El consumidor obtiene acceso en vivo, sin movimiento de datos
```

### Streams y Tasks

| Característica | Propósito |
|---------------|-----------|
| **Streams** | Rastrear cambios (CDC) en tablas |
| **Tasks** | Programar y automatizar SQL/procedimientos |

```sql
-- Stream: rastrear inserciones/actualizaciones/borrados
CREATE STREAM mi_stream ON TABLE mi_tabla;

-- Task: ejecutar cada hora
CREATE TASK mi_task
  WAREHOUSE = mi_wh
  SCHEDULE = '60 MINUTE'
AS
  INSERT INTO destino SELECT * FROM mi_stream;
```

## Snowflake vs Otros

| Característica | Snowflake | BigQuery | Redshift |
|---------------|-----------|----------|----------|
| **Arquitectura** | Almac./computación separados | Serverless | Basado en cluster |
| **Escalado** | Por warehouse | Auto | Manual/auto |
| **Multi-cloud** | AWS, Azure, GCP | Solo GCP | Solo AWS |
| **Compartir datos** | Nativo | Analytics Hub | Via S3 |
| **Precio** | Créditos (computación) + almac. | Por consulta + almac. | Por nodo + almac. |

## Resumen

| Concepto | Idea Clave |
|----------|------------|
| Arquitectura | 3 capas: almacenamiento, computación, servicios cloud |
| Virtual Warehouse | Clusters de computación independientes, escalar bajo demanda |
| Snowpipe | Auto-ingestar archivos cuando llegan |
| Snowpark | Ejecutar Python/Java/Scala dentro de Snowflake |
| Time Travel | Consultar datos históricos |
| Zero-Copy Clone | Copia instantánea sin duplicar almacenamiento |
| Data Sharing | Compartir datos en vivo entre cuentas |
