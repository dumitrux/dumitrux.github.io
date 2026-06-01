---
permalink: distributed-processing
title: "Distributed Processing"
description: "Key concepts of distributed systems, how data is processed across multiple machines, and common patterns."
date: 2026-05-31
tags: ["Data", "Infrastructure"]
secondaryTags: ["Distributed Systems", "MapReduce", "Scalability"]
thumbnail: "/images/blog/distributed-processing-thumbnail.svg"
lang: en
---

Distributed processing splits work across multiple machines to handle data too large for a single computer.

## Why Distributed?

- **Scale** — process terabytes/petabytes of data
- **Speed** — parallel processing is faster
- **Reliability** — if one machine fails, others continue
- **Cost** — many cheap machines vs one expensive one

## Key Concepts

### Vertical vs Horizontal Scaling

```
Vertical (Scale Up)          Horizontal (Scale Out)
┌────────────────┐          ┌──────┐ ┌──────┐ ┌──────┐
│  BIG Machine   │          │Small │ │Small │ │Small │
│  More CPU      │          │Node 1│ │Node 2│ │Node 3│
│  More RAM      │          └──────┘ └──────┘ └──────┘
│  More Storage  │          
└────────────────┘          ← Distributed processing does this
```

### CAP Theorem

A distributed system can only guarantee **two of three**:

| Property | Meaning |
|----------|---------|
| **Consistency** | All nodes see the same data |
| **Availability** | Every request gets a response |
| **Partition tolerance** | System works despite network failures |

In practice, network partitions happen, so you choose between **CP** (consistent) or **AP** (available).

### MapReduce

The classic pattern for distributed data processing:

```
         ┌──→ Map (Node 1) ──→ Shuffle ──→ Reduce (Node A) ──┐
Data ────┼──→ Map (Node 2) ──→ Shuffle ──→ Reduce (Node B) ──┼──→ Result
         └──→ Map (Node 3) ──→ Shuffle ──→ Reduce (Node C) ──┘
```

1. **Map** — process each piece of data independently
2. **Shuffle** — group results by key
3. **Reduce** — aggregate grouped results

### Partitioning (Sharding)

Split data across nodes:

```
Data: users
├── Shard 1: users A-M  → Node 1
└── Shard 2: users N-Z  → Node 2
```

**Strategies:**
- Hash-based: `hash(key) % num_shards`
- Range-based: alphabetical, by date
- Geographic: by region

### Replication

Copy data across nodes for reliability:

```
Write ──→ Leader ──→ Follower 1
                 ──→ Follower 2
Read ←── any node
```

## Common Patterns

### Batch Processing

Process large datasets at scheduled times.

```
Raw Data (HDFS/S3) → Process (Spark/MapReduce) → Results (DB/Files)
                     (runs overnight)
```

**Tools:** Apache Spark, Hadoop MapReduce, AWS EMR

### Stream Processing

Process data in real-time as it arrives.

```
Events → Message Queue → Process → Output
         (Kafka)         (Flink)   (DB/Dashboard)
```

**Tools:** Apache Kafka, Apache Flink, Spark Streaming

### Lambda Architecture

Combine batch and stream processing:

```
                ┌── Batch Layer (Spark) ──→ Batch Views
Data Source ────┤
                └── Speed Layer (Flink) ──→ Real-time Views
                                                │
                                          Serving Layer
                                          (merge both)
```

## Distributed Consensus

How nodes agree on values (leader election, distributed locks):

- **Raft** — understandable consensus algorithm
- **Paxos** — classic but complex
- **ZooKeeper** — coordination service

## Summary

| Concept | Key Idea |
|---------|----------|
| MapReduce | Split work → process → combine results |
| Sharding | Divide data across machines |
| Replication | Copy data for reliability |
| Batch | Process large data periodically |
| Streaming | Process data in real-time |
| CAP | Choose consistency or availability |
