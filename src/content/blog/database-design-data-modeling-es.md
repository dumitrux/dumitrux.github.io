---
permalink: database-design-data-modeling
title: "Diseño de Base de Datos y Modelado de Datos"
description: "Esquemas normalizados vs desnormalizados, modelado relacional y cuándo usar cada enfoque."
date: 2026-05-31
tags: ["Data", "Software"]
secondaryTags: ["Base de Datos", "Modelado de Datos", "SQL", "Normalización"]
lang: es
---

Un buen diseño de base de datos es la base de cualquier sistema fiable. Entender la normalización y desnormalización te ayuda a tomar las decisiones correctas.

## Normalizado vs Desnormalizado

| Aspecto | Normalizado | Desnormalizado |
|---------|-----------|---------------|
| **Duplicación de datos** | Sin redundancia | Redundancia intencional |
| **Rendimiento escritura** | Escrituras rápidas | Escrituras más lentas |
| **Rendimiento lectura** | Necesita JOINs (más lento) | Lecturas rápidas (sin JOINs) |
| **Consistencia** | Fácil de mantener | Riesgo de inconsistencia |
| **Caso de uso** | OLTP (transaccional) | OLAP (analítico) |

## Normalización

La normalización organiza los datos para reducir la redundancia. Cada nivel se llama "Forma Normal."

### 1NF — Primera Forma Normal

- Cada celda tiene un solo valor (atómico)
- Cada fila es única

```
Mal:                          Bien:
| nombre | teléfonos        |  | nombre | teléfono     |
|--------|------------------|  |--------|--------------|
| Alice  | 555-1234, 555-5678|  | Alice  | 555-1234     |
                               | Alice  | 555-5678     |
```

### 2NF — Segunda Forma Normal

- Cumple 1NF
- Sin dependencias parciales (cada columna no clave depende de **toda** la clave primaria)

### 3NF — Tercera Forma Normal

- Cumple 2NF
- Sin dependencias transitivas (columnas no clave no dependen de otras columnas no clave)

```
Mal:                                      Bien:
| order_id | cliente  | ciudad     |    pedidos:  | order_id | cliente_id |
|----------|----------|------------|    clientes: | cliente_id | nombre | ciudad |
```

### Ejemplo Normalizado

```sql
-- Tablas separadas, vinculadas por claves foráneas
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    fecha_pedido DATE,
    total DECIMAL(10,2)
);

CREATE TABLE items_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id),
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER,
    precio DECIMAL(10,2)
);
```

## Desnormalización

Añadir redundancia intencionalmente para mejorar el rendimiento de lectura. Común en data warehouses y analítica.

### Ejemplo Desnormalizado

```sql
-- Una sola tabla ancha para analítica
CREATE TABLE ventas_fact (
    pedido_id INTEGER,
    fecha_pedido DATE,
    nombre_cliente VARCHAR(100),
    email_cliente VARCHAR(100),
    ciudad_cliente VARCHAR(100),
    nombre_producto VARCHAR(100),
    categoria_producto VARCHAR(50),
    cantidad INTEGER,
    precio DECIMAL(10,2),
    total DECIMAL(10,2)
);
-- ¡No se necesitan JOINs para consultas!
```

## Esquema Estrella (Star Schema)

El patrón desnormalizado más común para data warehouses.

```
        ┌──────────┐
        │ dim_fecha │
        └────┬─────┘
             │
┌──────────┐ │ ┌──────────────┐
│dim_producto├─┼─┤ fact_ventas   │
└──────────┘ │ └──────┬───────┘
             │        │
        ┌────┴──────┐ │
        │dim_cliente │─┘
        └───────────┘
```

- **Tabla de hechos** — medidas y métricas (importe de venta, cantidad)
- **Tablas de dimensión** — atributos descriptivos (nombre producto, fecha, cliente)

```sql
-- Tabla de hechos
CREATE TABLE fact_ventas (
    fecha_key INTEGER REFERENCES dim_fecha(key),
    producto_key INTEGER REFERENCES dim_producto(key),
    cliente_key INTEGER REFERENCES dim_cliente(key),
    cantidad INTEGER,
    ingresos DECIMAL(10,2)
);

-- Tabla de dimensión
CREATE TABLE dim_producto (
    key SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    categoria VARCHAR(50),
    marca VARCHAR(50)
);
```

## Esquema Copo de Nieve (Snowflake Schema)

Como el esquema estrella, pero las dimensiones están más normalizadas.

```
dim_categoria → dim_producto → fact_ventas ← dim_cliente → dim_ciudad → dim_pais
```

## Conceptos Clave

### Clave Primaria
Identifica de forma única cada fila.

### Clave Foránea
Enlaza con la clave primaria de otra tabla.

### Índices
Aceleran las consultas en columnas específicas.

```sql
CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_fecha ON pedidos(fecha_pedido);
```

### Tipos de Relaciones

| Tipo | Ejemplo |
|------|---------|
| Uno a Uno | Usuario → Perfil |
| Uno a Muchos | Cliente → Pedidos |
| Muchos a Muchos | Estudiantes ↔ Cursos (tabla intermedia) |

## Cuándo Normalizar vs Desnormalizar

| Escenario | Enfoque |
|-----------|---------|
| App transaccional (OLTP) | Normalizar |
| Analítica / reportes (OLAP) | Desnormalizar |
| Dashboards en tiempo real | Desnormalizar |
| Formularios de entrada de datos | Normalizar |
| Data warehouse | Esquema Estrella/Copo de Nieve |
| Datasets pequeños | Ambos funcionan |

## Resumen

| Concepto | Idea Clave |
|----------|------------|
| Normalización | Reducir redundancia, garantizar consistencia |
| Desnormalización | Añadir redundancia para lecturas más rápidas |
| Esquema Estrella | Tablas de hechos + dimensiones para analítica |
| 3NF | Estándar para bases de datos transaccionales |
| Índices | Acelerar consultas de lectura |
