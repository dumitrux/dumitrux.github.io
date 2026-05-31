---
permalink: testing-pytest
title: "Testing con Pytest y TDD"
description: "Por qué importa el testing, cómo usar Pytest, y por qué el Test-Driven Development es aún más importante en la era de la IA."
date: 2026-05-31
tags: ["Software", "Python"]
secondaryTags: ["Testing", "Pytest", "TDD", "IA"]
lang: es
---

El testing es una de las prácticas más importantes en el desarrollo de software. Te da confianza de que tu código funciona y previene que los bugs lleguen a producción.

## Por Qué Importa el Testing

- **Detecta bugs temprano** — más barato de arreglar en desarrollo que en producción
- **Documenta el comportamiento** — los tests muestran qué debe hacer el código
- **Permite refactorizar** — cambia código sin miedo a romper cosas
- **Acelera el desarrollo** — los tests automatizados son más rápidos que la revisión manual

### Testing para Validación de IA

Con código generado por IA (Copilot, Claude, ChatGPT), el testing es **crítico**:

- La IA puede generar código que parece correcto pero tiene bugs sutiles
- Los tests validan que el código generado por IA realmente funciona
- Dale tus tests como criterios de aceptación — produce mejor código
- Los tests son la "práctica más impactante" para coding agéntico (Anthropic)

## La Pirámide de Testing

```
        /  E2E  \          ← Pocos, lentos, caros
       /----------\
      / Integración \      ← Algunos, velocidad media
     /----------------\
    /   Tests Unitarios \  ← Muchos, rápidos, baratos
   /____________________\
```

| Nivel | Qué testea | Velocidad | Cantidad |
|-------|-----------|-----------|----------|
| **Unitario** | Una función o clase | Rápido | Muchos |
| **Integración** | Varios componentes juntos | Media | Algunos |
| **E2E** | Flujo completo del usuario | Lento | Pocos |

## Test-Driven Development (TDD)

TDD significa escribir tests **antes** de escribir código. El ciclo:

```
1. ROJO    → Escribe un test que falle
2. VERDE   → Escribe el mínimo código para pasar
3. REFACTOR → Limpia el código
↻ Repetir
```

**Beneficios de TDD:**
- Te obliga a pensar en el diseño primero
- Consigues 100% de cobertura por defecto
- Iteraciones pequeñas y enfocadas
- Sirve como documentación viva

## Conceptos Básicos de Pytest

Pytest es el framework de testing más popular para Python. Simple y potente.

### Instalar

```bash
pip install pytest
```

### Escribir un Test

```python
# calculator.py
def add(a, b):
    return a + b

# test_calculator.py
from calculator import add

def test_add_positive():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

def test_add_zero():
    assert add(0, 0) == 0
```

### Ejecutar Tests

```bash
pytest                    # ejecutar todos los tests
pytest test_calculator.py # ejecutar archivo específico
pytest -v                 # salida detallada
pytest -k "test_add"      # ejecutar tests que coincidan con patrón
```

## Funcionalidades Clave de Pytest

### Fixtures — Setup Reutilizable

```python
import pytest

@pytest.fixture
def database():
    db = create_test_db()
    yield db
    db.cleanup()

def test_insert(database):
    database.insert({"name": "Alice"})
    assert database.count() == 1
```

### Parametrize — Múltiples Entradas

```python
@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
])
def test_add(a, b, expected):
    assert add(a, b) == expected
```

### Markers — Categorizar Tests

```python
@pytest.mark.slow
def test_heavy_computation():
    ...

# Ejecutar: pytest -m "not slow"
```

### Mocking

```python
from unittest.mock import patch

def test_api_call():
    with patch("module.requests.get") as mock_get:
        mock_get.return_value.status_code = 200
        result = fetch_data()
        assert result is not None
```

## Estructura del Proyecto

```
project/
├── src/
│   └── calculator.py
├── tests/
│   ├── conftest.py        ← fixtures compartidos
│   ├── test_calculator.py
│   └── test_integration.py
├── pytest.ini             ← configuración de pytest
└── requirements.txt
```

## Ejemplo de pytest.ini

```ini
[pytest]
testpaths = tests
markers =
    slow: marca tests como lentos
    integration: tests de integración
addopts = -v --tb=short
```

## Resumen

| Concepto | Punto Clave |
|----------|-------------|
| Tests Unitarios | Testean una función, rápidos, muchos |
| Integración | Testean componentes juntos |
| TDD | Escribe test primero, luego código |
| Fixtures | Setup/teardown reutilizable |
| Parametrize | Testea múltiples inputs fácilmente |
| IA + Tests | Los tests validan código generado por IA |
