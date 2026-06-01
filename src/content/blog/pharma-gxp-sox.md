---
permalink: pharma-gxp-sox
title: "Pharma GxP and SOX Compliance"
description: "An overview of GxP regulations in pharmaceuticals and SOX compliance — what they mean for data and software engineering."
date: 2026-05-31
tags: ["Data", "Compliance"]
secondaryTags: ["GxP", "SOX", "Pharma", "Regulatory"]
thumbnail: "/images/blog/pharma-gxp-sox-thumbnail.svg"
lang: en
---

GxP and SOX are regulatory frameworks that affect how we build and manage systems in pharmaceuticals and finance. If you work with data in these industries, you need to understand them.

## What Is GxP?

**GxP** = "Good _x_ Practice" — a set of quality guidelines for regulated industries (mainly pharma, biotech, medical devices).

The "_x_" changes depending on the area:

| Abbreviation | Full Name | Applies To |
|-------------|-----------|------------|
| **GMP** | Good Manufacturing Practice | Production, manufacturing |
| **GLP** | Good Laboratory Practice | Lab testing, research |
| **GCP** | Good Clinical Practice | Clinical trials |
| **GDP** | Good Distribution Practice | Storage, transport |
| **GDocP** | Good Documentation Practice | All documentation |

### GxP in Data & Software

When software is used in GxP processes, it must be **validated**:

```
GxP Software Lifecycle:
Requirements → Design → Build → Testing → Validation → Production
    │            │        │        │          │
    └── documented ── traceable ── tested ── approved
```

| Principle | Meaning |
|-----------|---------|
| **ALCOA+** | Data must be Attributable, Legible, Contemporaneous, Original, Accurate (+ Complete, Consistent, Enduring, Available) |
| **Data Integrity** | Data cannot be modified without audit trail |
| **Validation** | Prove the system does what it's supposed to do |
| **21 CFR Part 11** | FDA rule for electronic records and signatures |
| **Annex 11** | EU equivalent for computerized systems |

### Computer System Validation (CSV)

The process of proving a system works correctly in a GxP environment:

```
┌─────────────────────────────────────────────┐
│              V-Model                        │
│                                             │
│  User Requirements ◄──────► User Testing    │
│       │                          ▲          │
│  Functional Spec  ◄──────► Integration Test │
│       │                          ▲          │
│  Design Spec     ◄──────► Unit Testing      │
│       │                          ▲          │
│       └──────► Build ────────────┘          │
└─────────────────────────────────────────────┘
```

### GAMP 5 Categories

Software is classified by risk:

| Category | Type | Validation Effort |
|----------|------|-------------------|
| **Cat 1** | Infrastructure (OS, network) | Low |
| **Cat 3** | Non-configured (off-the-shelf) | Medium |
| **Cat 4** | Configured (ERP, LIMS) | High |
| **Cat 5** | Custom built | Highest |

## What Is SOX?

**SOX** = Sarbanes-Oxley Act (2002). A US law that requires public companies to have controls over financial reporting.

### SOX and IT

SOX affects IT because financial data flows through IT systems:

```
Financial Transaction
    │
    ▼
IT System (ERP, database, reporting)
    │
    ▼
Financial Report → must be accurate and auditable
```

### Key SOX IT Controls

| Control | What It Means |
|---------|--------------|
| **Access control** | Who can access what? Least privilege |
| **Change management** | All changes documented and approved |
| **Segregation of duties** | No one person controls everything |
| **Audit trail** | Log who did what and when |
| **Backup & recovery** | Data can be recovered |
| **Data integrity** | Data is accurate and complete |

### SOX for Data Engineers

| Area | Requirement |
|------|------------|
| **ETL pipelines** | Documented, tested, change-controlled |
| **Database access** | Role-based, reviewed regularly |
| **Data changes** | Audit trail for all modifications |
| **Reports** | Validated, reconciled with source |
| **Deployments** | Approved, tested in non-prod first |

## GxP vs SOX Comparison

| Aspect | GxP | SOX |
|--------|-----|-----|
| **Industry** | Pharma, biotech, medical | Public companies (finance) |
| **Focus** | Patient safety, product quality | Financial reporting accuracy |
| **Regulator** | FDA, EMA | SEC, PCAOB |
| **Data focus** | ALCOA+ data integrity | Financial data accuracy |
| **System focus** | Validation (CSV) | IT controls |
| **Documentation** | Extensive (SOPs, protocols) | Control documentation |
| **Audit** | FDA inspections | External auditors (annual) |

## Impact on Data Platforms

```
Data Platform in Regulated Environment:
┌─────────────────────────────────────────┐
│  Access Control (who can see what)      │
├─────────────────────────────────────────┤
│  Audit Trail (who changed what, when)   │
├─────────────────────────────────────────┤
│  Change Management (approved changes)   │
├─────────────────────────────────────────┤
│  Validation (tested and documented)     │
├─────────────────────────────────────────┤
│  Data Quality (ALCOA+, reconciliation)  │
└─────────────────────────────────────────┘
```

### Practical Tips

| Practice | How |
|----------|-----|
| **Version control** | Git for all code and config |
| **CI/CD with gates** | Automated tests + manual approval |
| **Infrastructure as Code** | Reproducible, auditable environments |
| **Logging** | Centralized, immutable logs |
| **Access reviews** | Quarterly review of permissions |
| **Documentation** | Keep SOPs and runbooks updated |

## Summary

| Concept | Key Idea |
|---------|----------|
| GxP | Quality guidelines for pharma/biotech |
| CSV | Prove your system works correctly |
| ALCOA+ | Data integrity principles |
| SOX | Controls over financial reporting |
| IT controls | Access, changes, audit trails |
| Common thread | Document everything, control access, audit |
