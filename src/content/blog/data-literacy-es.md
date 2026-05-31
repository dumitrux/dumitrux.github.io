---
permalink: data-literacy
title: "Alfabetización de Datos: Dimensiones, Medidas e Information Marts"
description: "Conceptos clave de data literacy que todo profesional de datos debería conocer — dimensiones vs medidas, information marts y vocabulario de modelado de datos."
date: 2026-05-31
tags: ["Data"]
secondaryTags: ["Data Literacy", "BI", "Modelado de Datos"]
lang: es
---

Data literacy es la capacidad de leer, entender y comunicar con datos. Estos son los conceptos fundamentales.

## Dimensiones vs Medidas

La distinción más importante en analítica de datos:

| Concepto | Qué Es | Ejemplos |
|----------|--------|----------|
| **Dimensión** | Atributo descriptivo (el "por qué") | Fecha, Región, Producto, Categoría |
| **Medida** | Valor cuantitativo (el "qué") | Ingresos, Cantidad, Conteo, Promedio |

```sql
-- "Ingresos totales POR región POR año"
--    medida             dimensiones
SELECT
    region,           -- dimensión
    año,              -- dimensión
    SUM(ingresos)     -- medida
FROM ventas
GROUP BY region, año;
```

### Tipos de Dimensiones

| Tipo | Descripción | Ejemplo |
|------|------------|---------|
| **Descriptiva** | Atributos estáticos | Nombre de producto, color |
| **Temporal** | Períodos de fecha/hora | Año, trimestre, mes, día |
| **Geográfica** | Basada en ubicación | País, región, ciudad |
| **Jerárquica** | Niveles anidados | País → Región → Ciudad |
| **Cambio Lento (SCD)** | Cambia con el tiempo | Historial de dirección del cliente |

### Tipos de Medidas

| Tipo | Descripción | Ejemplo |
|------|------------|---------|
| **Aditiva** | Se puede sumar en todas las dimensiones | Ingresos, cantidad |
| **Semi-aditiva** | Se puede sumar en algunas dimensiones | Saldo de cuenta (sumar por cuentas, no por tiempo) |
| **No aditiva** | No se puede sumar | Ratios, porcentajes, promedios |

## Information Marts (Data Marts)

Un data mart es un **subconjunto del data warehouse** enfocado en un área de negocio específica.

```
Data Warehouse
├── Data Mart de Marketing   ← métricas de campaña, conversiones
├── Data Mart de Finanzas    ← ingresos, costes, presupuestos
├── Data Mart de Ventas      ← pedidos, pipeline, cuotas
└── Data Mart de RRHH        ← plantilla, rotación, contratación
```

**Beneficios:**
- Consultas más rápidas (dataset más pequeño)
- Adaptado a las necesidades del departamento
- Control de acceso más fácil
- Modelos de datos simplificados

## Conceptos Clave de Datos

### Grano (Grain)

El nivel de detalle en una tabla de hechos. Se define con la pregunta: "¿Qué representa una fila?"

| Grano | Ejemplo |
|-------|---------|
| Transacción | Una venta |
| Diario | Total ventas por día por tienda |
| Mensual | Ingresos mensuales por producto |

**Regla:** Define el grano primero, luego construye la tabla.

### ETL vs ELT

```
ETL: Extraer → Transformar → Cargar
     (fuente)   (staging)    (warehouse)

ELT: Extraer → Cargar → Transformar
     (fuente)   (lake)   (en el warehouse)
```

| Enfoque | Cuándo Usar |
|---------|------------|
| **ETL** | Transformar antes de cargar (tradicional) |
| **ELT** | Cargar datos crudos, transformar en el warehouse (moderno, cloud) |

### Dimensiones de Cambio Lento (SCD)

Cómo manejar cambios en dimensiones a lo largo del tiempo:

| Tipo | Estrategia | Ejemplo |
|------|-----------|---------|
| **SCD 1** | Sobrescribir | Actualizar dirección actual (pierdes historial) |
| **SCD 2** | Añadir nueva fila | Nueva fila con fechas inicio/fin (mantener historial) |
| **SCD 3** | Añadir columna | `direccion_actual` + `direccion_anterior` |

### Dimensiones de Calidad de Datos

| Dimensión | Pregunta |
|-----------|----------|
| **Exactitud** | ¿Son correctos los datos? |
| **Completitud** | ¿Están todos los datos presentes? |
| **Consistencia** | ¿Los mismos datos coinciden entre sistemas? |
| **Oportunidad** | ¿Son los datos lo suficientemente frescos? |
| **Unicidad** | ¿Hay duplicados? |
| **Validez** | ¿Los datos coinciden con los formatos esperados? |

## KPIs y Métricas

| Término | Significado |
|---------|-------------|
| **Métrica** | Una medida cuantificable (visitas, ingresos) |
| **KPI** | Una métrica vinculada a un objetivo de negocio (tasa conversión > 3%) |
| **Indicador adelantado** | Predice el futuro (tráfico web) |
| **Indicador retrasado** | Confirma el pasado (ingresos trimestrales) |

## Resumen

| Concepto | Idea Clave |
|----------|------------|
| Dimensión | El "por qué" — categorías para agrupar |
| Medida | El "qué" — números para agregar |
| Data Mart | Subconjunto del warehouse para un departamento |
| Grano | Nivel de detalle (qué significa una fila) |
| SCD | Cómo manejar cambios en el tiempo |
| ETL/ELT | Pipeline para mover y transformar datos |
