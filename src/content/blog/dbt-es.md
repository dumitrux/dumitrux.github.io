---
permalink: dbt
title: "dbt: Data Build Tool"
description: "Una visión general de dbt — la herramienta que lleva las mejores prácticas de ingeniería de software a las transformaciones de datos en tu warehouse."
date: 2026-05-31
tags: ["Data", "Infrastructure"]
secondaryTags: ["dbt", "SQL", "Ingeniería de Datos", "ELT"]
thumbnail: "/images/blog/dbt-thumbnail.svg"
lang: es
---

dbt (data build tool) transforma datos **dentro de tu warehouse** usando SQL. Trae prácticas de ingeniería de software (control de versiones, testing, documentación) a la analítica.

## ¿Qué Es dbt?

dbt se encarga de la **T** en ELT:

```
Extraer → Cargar → Transformar (dbt)
                        │
                Modelos SQL en tu warehouse
                (Snowflake, BigQuery, Redshift, Databricks)
```

**Idea clave:** Escribe sentencias SELECT. dbt se encarga del resto (DDL, dependencias, testing).

## Cómo Funciona

```
┌─────────────────────────────────────────┐
│  Proyecto dbt (tu repositorio)          │
│  ├── models/          (archivos SQL)    │
│  ├── tests/           (tests de datos)  │
│  ├── macros/          (SQL reutilizable)│
│  ├── seeds/           (archivos CSV)    │
│  ├── snapshots/       (SCD Tipo 2)      │
│  └── dbt_project.yml  (configuración)   │
├─────────────────────────────────────────┤
│  dbt CLI / dbt Cloud                    │
│  dbt run → compila SQL → ejecuta        │
├─────────────────────────────────────────┤
│  Data Warehouse                         │
│  (crea tablas/vistas desde tu SQL)      │
└─────────────────────────────────────────┘
```

## Modelos

Un modelo es una **sentencia SQL SELECT** guardada como archivo `.sql`. dbt la convierte en una tabla o vista en tu warehouse.

```sql
-- models/staging/stg_pedidos.sql
SELECT
    id AS pedido_id,
    user_id AS cliente_id,
    fecha_pedido,
    estado,
    importe
FROM {{ source('raw', 'pedidos') }}
WHERE estado != 'eliminado'
```

### Tipos de Materialización

| Tipo | Qué Crea | Cuándo Usar |
|------|----------|-------------|
| **view** | Vista SQL | Transformaciones ligeras, pocos datos |
| **table** | Tabla física | Consultas pesadas, muchos datos |
| **incremental** | Añadir/fusionar nuevas filas | Tablas grandes, cargas diarias |
| **ephemeral** | CTE (no crea objeto) | Lógica intermedia |

```sql
-- models/marts/fct_pedidos.sql
{{ config(materialized='incremental') }}

SELECT
    pedido_id,
    cliente_id,
    fecha_pedido,
    importe
FROM {{ ref('stg_pedidos') }}

{% if is_incremental() %}
WHERE fecha_pedido > (SELECT MAX(fecha_pedido) FROM {{ this }})
{% endif %}
```

## Estructura del Proyecto

```
proyecto_dbt/
├── models/
│   ├── staging/          ← limpiar datos crudos (1:1 con fuentes)
│   │   ├── stg_pedidos.sql
│   │   └── stg_clientes.sql
│   ├── intermediate/     ← lógica de negocio
│   │   └── int_items_pedido.sql
│   └── marts/            ← tablas finales para BI
│       ├── fct_pedidos.sql
│       └── dim_clientes.sql
├── tests/
├── macros/
├── seeds/
└── dbt_project.yml
```

### DAG (Grafo de Dependencias)

dbt construye un DAG a partir de las llamadas `{{ ref() }}`:

```
source('raw', 'pedidos')
        │
  stg_pedidos ──→ int_items_pedido ──→ fct_pedidos
                                           │
  stg_clientes ──→ dim_clientes ──────────┘
```

`dbt run` ejecuta los modelos en el orden correcto.

## Características Clave

### Sources (Fuentes)

Definir de dónde vienen los datos crudos:

```yaml
# models/staging/sources.yml
sources:
  - name: raw
    tables:
      - name: pedidos
        loaded_at_field: _loaded_at
        freshness:
          warn_after: {count: 12, period: hour}
          error_after: {count: 24, period: hour}
```

### Tests

Tests de calidad de datos integrados y personalizados:

```yaml
# models/staging/schema.yml
models:
  - name: stg_pedidos
    columns:
      - name: pedido_id
        tests:
          - unique
          - not_null
      - name: estado
        tests:
          - accepted_values:
              values: ['realizado', 'enviado', 'completado', 'devuelto']
      - name: cliente_id
        tests:
          - relationships:
              to: ref('stg_clientes')
              field: cliente_id
```

### Macros

Snippets SQL reutilizables (Jinja):

```sql
-- macros/centimos_a_euros.sql
{% macro centimos_a_euros(nombre_columna) %}
    ({{ nombre_columna }} / 100)::decimal(10,2)
{% endmacro %}

-- Uso en un modelo:
SELECT
    pedido_id,
    {{ centimos_a_euros('importe_centimos') }} AS importe_euros
FROM {{ ref('stg_pedidos') }}
```

### Seeds

Cargar archivos CSV pequeños en tu warehouse:

```
seeds/codigos_pais.csv → dbt seed → tabla codigos_pais
```

### Snapshots

Rastrear cambios a lo largo del tiempo (SCD Tipo 2):

```sql
-- snapshots/snap_clientes.sql
{% snapshot snap_clientes %}
{{ config(
    target_schema='snapshots',
    strategy='timestamp',
    unique_key='cliente_id',
    updated_at='updated_at'
) }}
SELECT * FROM {{ source('raw', 'clientes') }}
{% endsnapshot %}
```

## Comandos dbt

| Comando | Qué Hace |
|---------|----------|
| `dbt run` | Construir todos los modelos |
| `dbt test` | Ejecutar todos los tests |
| `dbt build` | Run + test (en orden) |
| `dbt run --select nombre_modelo` | Construir un modelo |
| `dbt run --select nombre_modelo+` | Construir modelo + dependientes |
| `dbt docs generate` | Generar documentación |
| `dbt source freshness` | Verificar frescura de fuentes |
| `dbt seed` | Cargar archivos CSV seed |
| `dbt snapshot` | Ejecutar snapshots |

## dbt Core vs dbt Cloud

| Característica | dbt Core (Gratis) | dbt Cloud (Pago) |
|---------------|-------------------|------------------|
| **CLI** | Sí | Sí |
| **IDE Web** | No | Sí |
| **Programación** | Externa (Airflow, cron) | Integrada |
| **CI/CD** | Configurar tú mismo | Integrado |
| **Documentación** | Generar localmente | Alojada |
| **Logging** | Local | Centralizado |

## Resumen

| Concepto | Idea Clave |
|----------|------------|
| dbt | Transformaciones SQL dentro de tu warehouse |
| Modelo | Una sentencia SELECT que se convierte en tabla/vista |
| ref() | Enlaza modelos, construye grafo de dependencias |
| Tests | Verificaciones de calidad de datos (unique, not null, etc.) |
| Materializaciones | view, table, incremental, ephemeral |
| Macros | SQL reutilizable con Jinja |
| Snapshots | Rastreo SCD Tipo 2 |
| Mejor práctica | staging → intermediate → marts |
