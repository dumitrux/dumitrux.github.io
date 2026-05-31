---
permalink: hooks-webhooks-pipelines
title: "Hooks: Webhooks, Git Hooks y Hooks en Pipelines de Datos"
description: "Entender hooks en diferentes contextos — webhooks para APIs, Git hooks para control de versiones y hooks dentro de pipelines de datos."
date: 2026-05-31
tags: ["Software", "DevOps"]
secondaryTags: ["Webhooks", "Git Hooks", "Pipelines de Datos"]
lang: es
---

Los hooks son un patrón para ejecutar código personalizado en puntos específicos de un proceso. Aparecen en todas partes del software.

## ¿Qué es un Hook?

Un hook es un punto en un sistema donde puedes conectar tu propio código para que se ejecute automáticamente cuando algo sucede.

```
Evento ocurre → Hook se activa → Tu código se ejecuta
```

## Webhooks

Los webhooks son callbacks HTTP. Cuando ocurre un evento en un servicio, envía un HTTP POST a tu URL.

```
GitHub (evento push) ──HTTP POST──→ Tu Servidor (/webhook)
                                          │
                                     Procesar evento
                                     (desplegar, notificar, etc.)
```

### Cómo Funcionan

1. Registras una URL en el servicio
2. Ocurre un evento (push, pago, mensaje)
3. El servicio envía un POST con los datos del evento
4. Tu servidor procesa los datos

### Ejemplo: Webhook de GitHub

```python
from fastapi import FastAPI, Request
import hmac
import hashlib

app = FastAPI()

@app.post("/webhook")
async def github_webhook(request: Request):
    payload = await request.json()
    event = request.headers.get("X-GitHub-Event")

    if event == "push":
        branch = payload["ref"]
        if branch == "refs/heads/main":
            trigger_deployment()

    return {"status": "ok"}
```

### Casos de Uso Comunes de Webhooks

| Servicio | Evento | Acción |
|----------|--------|--------|
| GitHub | Push, PR abierto | Desplegar, ejecutar CI |
| Stripe | Pago recibido | Completar pedido |
| Slack | Mensaje enviado | Respuesta de bot |
| Twilio | SMS recibido | Auto-respuesta |

### Seguridad

Siempre verifica las firmas de los webhooks:

```python
def verificar_firma(payload, firma, secreto):
    esperada = hmac.new(secreto.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(f"sha256={esperada}", firma)
```

## Git Hooks

Scripts que se ejecutan en puntos específicos del flujo de trabajo de Git. Se ubican en `.git/hooks/`.

### Tipos

| Hook | Cuándo se Ejecuta | Uso Común |
|------|-------------------|-----------|
| `pre-commit` | Antes del commit | Lint, formatear, ejecutar tests |
| `commit-msg` | Después de escribir el mensaje | Validar formato del mensaje |
| `pre-push` | Antes del push | Ejecutar tests, verificar cobertura |
| `post-merge` | Después del merge | Instalar dependencias |
| `pre-rebase` | Antes del rebase | Prevenir en ramas protegidas |

### Ejemplo: pre-commit

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Ejecutar linting
python -m flake8 src/
if [ $? -ne 0 ]; then
    echo "El linting falló. Corrige los errores antes de commitear."
    exit 1
fi

# Ejecutar tests
python -m pytest tests/ --quiet
if [ $? -ne 0 ]; then
    echo "Los tests fallaron. Corrige antes de commitear."
    exit 1
fi
```

### Framework Pre-commit

Usa la herramienta `pre-commit` para gestionar hooks fácilmente:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
  - repo: https://github.com/psf/black
    rev: 24.3.0
    hooks:
      - id: black
  - repo: https://github.com/charliermarsh/ruff-pre-commit
    rev: v0.3.0
    hooks:
      - id: ruff
```

```bash
pip install pre-commit
pre-commit install
```

## Hooks en Pipelines de Datos

Los hooks en pipelines de datos te permiten ejecutar código personalizado en etapas específicas del pipeline.

### Hooks de Airflow

En Apache Airflow, los hooks conectan con sistemas externos:

```python
from airflow.hooks.postgres_hook import PostgresHook
from airflow.hooks.S3_hook import S3Hook

# Conectar a base de datos
pg_hook = PostgresHook(postgres_conn_id="my_database")
registros = pg_hook.get_records("SELECT * FROM orders")

# Conectar a S3
s3_hook = S3Hook(aws_conn_id="my_aws")
s3_hook.load_file("data.csv", key="exports/data.csv", bucket_name="my-bucket")
```

### Hooks de dbt

dbt usa `pre-hook` y `post-hook` para ejecutar SQL antes/después de un modelo:

```sql
-- En modelo dbt
{{ config(
    pre_hook="INSERT INTO audit_log VALUES (current_timestamp, 'inicio')",
    post_hook="INSERT INTO audit_log VALUES (current_timestamp, 'fin')"
) }}

SELECT * FROM {{ ref('raw_orders') }}
```

### Hooks del Ciclo de Vida del Pipeline

```
Extraer ──→ [pre-transform hook] ──→ Transformar ──→ [post-transform hook] ──→ Cargar
                   │                                          │
             Validar esquema                            Registrar métricas
             Verificar calidad                          Enviar alerta
```

## Comparación

| Tipo de Hook | Trigger | Transporte | Dirección |
|-------------|---------|------------|-----------|
| **Webhook** | Evento externo | HTTP POST | Servicio → Tú |
| **Git Hook** | Acción Git | Script local | Ejecución local |
| **Pipeline Hook** | Etapa del pipeline | Llamada a función | Dentro del pipeline |

## Resumen

| Concepto | Idea Clave |
|----------|------------|
| Webhooks | Callbacks HTTP para eventos externos |
| Git Hooks | Automatizar checks de calidad en commits |
| Pipeline Hooks | Código personalizado en etapas del pipeline |
| Seguridad | Siempre verificar firmas de webhooks |
| pre-commit | Framework para gestionar Git hooks |
