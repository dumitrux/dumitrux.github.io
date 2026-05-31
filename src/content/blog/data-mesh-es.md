---
permalink: data-mesh
title: "Data Mesh: Arquitectura de Datos Descentralizada"
description: "Una visión práctica de la arquitectura Data Mesh, sus cuatro principios y cómo cambia la forma en que las organizaciones gestionan los datos analíticos."
date: 2026-05-31
tags: ["Data", "Arquitectura"]
secondaryTags: ["Data Mesh", "Plataforma de Datos", "Diseño Orientado a Dominio"]
lang: es
---

Data Mesh es un enfoque de arquitectura de datos que traslada la propiedad de los datos analíticos desde un equipo central de datos hacia los equipos de dominio que producen y conocen mejor esos datos.

## El Problema con los Datos Centralizados

La mayoría de las organizaciones tienen un **equipo central de datos** que gestiona un data lake o data warehouse. Este equipo se convierte en un cuello de botella porque:

- Tiene que aprender cada dominio para dar insights útiles
- Las pipelines de datos rotas consumen la mayor parte del tiempo
- No pueden responder preguntas analíticas lo suficientemente rápido
- Cuanto más crece la organización, peor se pone

![Cuello de botella del equipo central de datos](https://www.datamesh-architecture.com/images/whyteam.png.webp)

## ¿Qué es Data Mesh?

Data Mesh fue creado por **Zhamak Dehghani** en 2019. Se basa en **cuatro principios**:

![Cuatro principios de Data Mesh](https://www.datamesh-architecture.com/images/datamesh.png.webp)

### 1. Propiedad del Dominio

Cada equipo de dominio es dueño de sus datos analíticos. El equipo que construye el microservicio de `pedidos` también es dueño y sirve los datos analíticos de `pedidos`.

- Los datos analíticos se organizan por **dominios de negocio**, no por tecnología
- Los equipos de dominio conocen mejor sus datos
- Ningún equipo central necesita aprender todos los dominios

### 2. Datos como Producto

Los equipos de dominio tratan sus datos como un producto con usuarios reales:

- **Descubribles** — otros equipos pueden encontrarlos
- **Comprensibles** — documentación clara y esquema definido
- **Confiables** — garantías de calidad y SLOs
- **Accesibles** — interfaces estándar para consumirlos
- **Interoperables** — siguen convenciones globales

### 3. Plataforma de Datos Self-Serve

Un equipo de plataforma proporciona herramientas para que los equipos de dominio puedan construir productos de datos sin necesidad de conocimientos profundos de infraestructura:

- Provisión de almacenamiento (BigQuery, S3, Snowflake)
- Orquestación de pipelines
- Catálogo de datos y descubrimiento
- Monitorización y observabilidad
- Control de acceso

### 4. Gobernanza Federada

Un grupo de gobernanza con representantes de todos los dominios acuerda estándares globales:

- **Interoperabilidad** — formatos y protocolos comunes
- **Documentación** — estándares de metadatos
- **Seguridad** — control de acceso y manejo de PII
- **Cumplimiento** — requisitos regulatorios
- **Calidad** — SLOs y métricas de calidad

## Conceptos Clave

### Producto de Datos

Un producto de datos es la pieza fundamental. Contiene:

- **Código** — pipelines para ingestar, transformar y servir datos
- **Datos** — los datos analíticos reales (tablas, archivos, eventos)
- **Infraestructura** — computación y almacenamiento para ejecutar todo

Los productos de datos exponen datos a través de **output ports** (por ejemplo, un dataset de BigQuery, archivos Parquet en S3, topics de Kafka).

### Contrato de Datos

Un contrato de datos define el acuerdo entre un proveedor de datos y sus consumidores:

- Esquema y semántica
- Expectativas de calidad (frescura, completitud)
- SLOs (disponibilidad, soporte)
- Términos de uso

## Vista General de la Arquitectura Data Mesh

![Arquitectura Data Mesh](https://www.datamesh-architecture.com/images/datamesharchitecture.png.webp)

## Tipos de Dominio

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Source-aligned** | Publica datos cercanos a eventos operacionales | Pedidos, Pagos, Envíos |
| **Aggregate** | Combina datos de múltiples dominios | Vista 360° del Cliente |
| **Consumer-aligned** | Optimizado para necesidades específicas del negocio | Reportes de Gestión, Analítica de Marketing |

## Cuándo Usar Data Mesh

**Buen encaje:**
- Múltiples equipos de ingeniería independientes (5+)
- Ya usan diseño orientado a dominio y microservicios
- Necesidad de insights analíticos cross-domain

**Mal encaje:**
- Organización pequeña con un solo equipo
- Requisitos de baja latencia en datos
- Contentos con un sistema monolítico integrado

## Tech Stacks Comunes

- Google BigQuery + Data Catalog
- AWS S3 + Athena + Glue
- Azure Synapse Analytics
- dbt + Snowflake
- Databricks
- Kafka + Plataformas de streaming

## Referencias

- [Data Mesh Architecture](https://www.datamesh-architecture.com/) — Jochen Christ, Larysa Visengeriyeva, Simon Harrer
- [Data Mesh Principles](https://martinfowler.com/articles/data-mesh-principles.html) — Zhamak Dehghani
- [How to Move Beyond a Monolithic Data Lake to a Distributed Data Mesh](https://martinfowler.com/articles/data-monolith-to-mesh.html) — Zhamak Dehghani
