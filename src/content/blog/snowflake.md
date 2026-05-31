---
permalink: snowflake
title: "Snowflake: Cloud Data Platform"
description: "An overview of Snowflake — its architecture, Snowpipe, Snowpark, and key features for modern data engineering."
date: 2026-05-31
tags: ["Data", "Infrastructure"]
secondaryTags: ["Snowflake", "Cloud", "Data Warehouse"]
lang: en
---

Snowflake is a cloud-native **data platform** that separates storage from compute. It runs on AWS, Azure, or GCP.

## Architecture

Snowflake has a unique three-layer architecture:

```
┌──────────────────────────────────────┐
│        Cloud Services Layer          │
│  (authentication, metadata, query    │
│   optimization, access control)      │
├──────────────────────────────────────┤
│        Compute Layer                 │
│  ┌──────────┐ ┌──────────┐          │
│  │Warehouse │ │Warehouse │  ...     │
│  │  (XS)    │ │  (XL)    │          │
│  └──────────┘ └──────────┘          │
│  (independent, auto-scale)           │
├──────────────────────────────────────┤
│        Storage Layer                 │
│  (compressed, columnar, immutable)   │
│  (S3 / Azure Blob / GCS)            │
└──────────────────────────────────────┘
```

### Why This Matters

| Layer | Benefit |
|-------|---------|
| **Separate storage** | Pay for storage independently |
| **Separate compute** | Scale up/down per workload |
| **Cloud services** | Zero infrastructure management |

**Key advantage:** Multiple teams can use different warehouses on the same data without competing for resources.

## Key Concepts

| Concept | What It Is |
|---------|-----------|
| **Database** | Container for schemas and tables |
| **Schema** | Container for tables, views, functions |
| **Virtual Warehouse** | Compute cluster (T-shirt sizing: XS to 6XL) |
| **Stage** | Location for loading files (internal or external) |
| **Table** | Structured data storage (columnar) |

## Snowpipe

**Snowpipe** automatically loads data as soon as files arrive. No scheduling needed.

```
Files arrive      →  Snowpipe detects  →  Data loaded
(S3/Azure/GCS)       (event notification)   (into tables)
```

### How It Works

```sql
-- 1. Create a stage pointing to your cloud storage
CREATE STAGE my_stage
  URL = 's3://my-bucket/data/'
  CREDENTIALS = (AWS_KEY_ID = '...' AWS_SECRET_KEY = '...');

-- 2. Create the Snowpipe
CREATE PIPE my_pipe AUTO_INGEST = TRUE AS
  COPY INTO my_table
  FROM @my_stage
  FILE_FORMAT = (TYPE = 'PARQUET');
```

| Feature | Description |
|---------|------------|
| **Auto-ingest** | Triggered by cloud storage events |
| **Serverless** | No warehouse needed, Snowflake manages compute |
| **Near real-time** | Data available within minutes |
| **Cost** | Pay per file loaded (not per warehouse time) |

## Snowpark

**Snowpark** lets you write data pipelines in Python, Java, or Scala that run **inside Snowflake** — your code pushes down to Snowflake's compute.

```
Traditional:
  Data → Download to local → Process (Python) → Upload back

Snowpark:
  Data stays in Snowflake → Process (Python in Snowflake) → Results in Snowflake
```

### Snowpark Example (Python)

```python
from snowflake.snowpark import Session
from snowflake.snowpark.functions import col, sum as sum_

# Connect
session = Session.builder.configs(connection_params).create()

# Read and transform (runs inside Snowflake)
df = session.table("sales")
result = (df
    .filter(col("year") == 2025)
    .group_by("region")
    .agg(sum_("revenue").alias("total_revenue"))
    .sort("total_revenue", ascending=False)
)

# Save results
result.write.save_as_table("sales_summary")
```

### Snowpark Use Cases

| Use Case | How |
|----------|-----|
| **ETL/ELT** | Transform data without moving it |
| **ML training** | Train models inside Snowflake |
| **UDFs** | Write Python functions that run in Snowflake |
| **Stored procedures** | Complex logic in Python |

## Other Key Features

### Time Travel

Query data as it was in the past:

```sql
-- What did this table look like 1 hour ago?
SELECT * FROM my_table AT (OFFSET => -3600);

-- What did it look like before a specific query?
SELECT * FROM my_table BEFORE (STATEMENT => 'query-id-here');
```

### Zero-Copy Cloning

Create a copy of a table/database instantly without duplicating data:

```sql
CREATE TABLE my_table_clone CLONE my_table;
CREATE DATABASE dev_db CLONE prod_db;
```

### Data Sharing

Share data with other Snowflake accounts without copying:

```sql
CREATE SHARE my_share;
GRANT USAGE ON DATABASE my_db TO SHARE my_share;
-- Consumer gets live access, no data movement
```

### Streams and Tasks

| Feature | Purpose |
|---------|---------|
| **Streams** | Track changes (CDC) on tables |
| **Tasks** | Schedule and automate SQL/procedures |

```sql
-- Stream: track inserts/updates/deletes
CREATE STREAM my_stream ON TABLE my_table;

-- Task: run every hour
CREATE TASK my_task
  WAREHOUSE = my_wh
  SCHEDULE = '60 MINUTE'
AS
  INSERT INTO target SELECT * FROM my_stream;
```

## Snowflake vs Others

| Feature | Snowflake | BigQuery | Redshift |
|---------|-----------|----------|----------|
| **Architecture** | Separate storage/compute | Serverless | Cluster-based |
| **Scaling** | Per-warehouse | Auto | Manual/auto |
| **Multi-cloud** | AWS, Azure, GCP | GCP only | AWS only |
| **Data sharing** | Native | Analytics Hub | Via S3 |
| **Pricing** | Credits (compute) + storage | Per query + storage | Per node + storage |

## Summary

| Concept | Key Idea |
|---------|----------|
| Architecture | 3 layers: storage, compute, cloud services |
| Virtual Warehouse | Independent compute clusters, scale on demand |
| Snowpipe | Auto-ingest files as they arrive |
| Snowpark | Run Python/Java/Scala inside Snowflake |
| Time Travel | Query historical data |
| Zero-Copy Clone | Instant copy without duplicating storage |
| Data Sharing | Share live data between accounts |
