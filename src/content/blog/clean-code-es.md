---
permalink: clean-code
title: "Principios de Código Limpio"
description: "Los principios de código limpio más importantes para escribir software legible, mantenible y profesional."
date: 2026-05-31
tags: ["Software"]
secondaryTags: ["Código Limpio", "Buenas Prácticas", "Refactoring"]
lang: es
---

El código limpio es código fácil de leer, entender y cambiar. Estos principios están basados en el libro "Clean Code" de Robert C. Martin y buenas prácticas de la industria.

## Por Qué Importa el Código Limpio

- Lees código **10 veces más** de lo que lo escribes
- El código limpio reduce bugs
- El código limpio hace el onboarding más rápido
- Las herramientas de IA producen mejores resultados con código limpio

## Nombres

La habilidad más importante. Buenos nombres eliminan la necesidad de comentarios.

```python
# Mal
d = 5
lst = get_data()
def calc(x, y): ...

# Bien
dias_desde_ultimo_login = 5
usuarios_activos = get_usuarios_activos()
def calcular_precio_total(cantidad, precio_unitario): ...
```

**Reglas:**
- Usa nombres que revelen la intención
- Evita abreviaciones (excepto las conocidas como `url`, `id`)
- Clases = sustantivos (`UserService`, `OrderRepository`)
- Funciones = verbos (`get_user`, `calcular_precio`, `enviar_email`)
- Booleanos = preguntas (`is_active`, `has_permission`, `can_edit`)

## Funciones

```python
# Mal — hace demasiadas cosas
def procesar_pedido(pedido):
    validar(pedido)
    calcular_impuestos(pedido)
    guardar_en_bd(pedido)
    enviar_email(pedido)
    actualizar_inventario(pedido)

# Bien — cada función hace una cosa
def procesar_pedido(pedido):
    pedido_validado = validar(pedido)
    pedido_con_impuestos = calcular_impuestos(pedido_validado)
    guardar_pedido(pedido_con_impuestos)
    notificar_cliente(pedido_con_impuestos)
    actualizar_inventario(pedido_con_impuestos)
```

**Reglas:**
- **Pequeñas** — 5-20 líneas idealmente
- **Hacer una cosa** — si puedes extraer una función, la original hace demasiado
- **Un nivel de abstracción** — no mezclar lógica de alto y bajo nivel
- **Pocos argumentos** — 0-2 es ideal, 3+ es code smell
- **Sin efectos secundarios** — una función llamada `get_user` no debería modificar nada

## DRY — Don't Repeat Yourself

```python
# Mal — lógica duplicada
def get_admin_greeting(name):
    return f"Hola, {name}! Bienvenido. Hoy es {date.today()}"

def get_user_greeting(name):
    return f"Hola, {name}! Bienvenido. Hoy es {date.today()}"

# Bien
def get_greeting(name):
    return f"Hola, {name}! Bienvenido. Hoy es {date.today()}"
```

Pero: **no sobre-abstraigas**. La duplicación es mejor que una abstracción incorrecta.

## Comentarios

```python
# Mal — el comentario dice lo que el código ya dice
# incrementar contador en 1
contador += 1

# Mal — comentario desactualizado
# Retorna la edad del usuario
def get_user_name(): ...

# Bien — explica POR QUÉ, no QUÉ
# Sumamos 1 porque la API usa indexación base-1
index = posicion + 1

# Bien — advierte sobre consecuencias
# ADVERTENCIA: Esta consulta tarda ~30 segundos en datasets grandes
resultados = ejecutar_scan_completo()
```

**Regla:** Si necesitas un comentario, primero intenta hacer el código más claro.

## Manejo de Errores

```python
# Mal — catch genérico
try:
    procesar_pedido(pedido)
except:
    print("error")

# Bien — excepciones específicas, mensajes significativos
try:
    procesar_pedido(pedido)
except StockInsuficienteError as e:
    logger.warning(f"Pedido fallido: {e}")
    notificar_cliente_sin_stock(pedido)
except PagoRechazadoError as e:
    logger.error(f"Pago fallido: {e}")
    reintentar_pago(pedido)
```

## Code Smells

| Smell | Problema | Solución |
|-------|----------|----------|
| Funciones largas | Difíciles de entender | Extraer funciones más pequeñas |
| Muchos parámetros | Interfaz compleja | Usar objetos/dataclasses |
| Código duplicado | Múltiples lugares que cambiar | Extraer función compartida |
| Condicionales anidados | Difícil de seguir | Guard clauses, early return |
| Números mágicos | Significado poco claro | Constantes con nombre |
| Código muerto | Confusión | Borrarlo |

### Guard Clauses

```python
# Mal — muy anidado
def procesar(usuario):
    if usuario is not None:
        if usuario.is_active:
            if usuario.has_permission:
                hacer_trabajo(usuario)

# Bien — guard clauses
def procesar(usuario):
    if usuario is None:
        return
    if not usuario.is_active:
        return
    if not usuario.has_permission:
        return
    hacer_trabajo(usuario)
```

## La Regla del Boy Scout

> Deja el código más limpio de lo que lo encontraste.

Cada vez que tocas un archivo, haz una pequeña mejora: renombrar una variable, extraer una función, eliminar código muerto.

## Resumen

| Principio | Regla Clave |
|-----------|-------------|
| Nombres | Deben revelar la intención |
| Funciones | Pequeñas, hacer una cosa |
| DRY | No repetir, pero no sobre-abstraer |
| Comentarios | Explicar por qué, no qué |
| Errores | Excepciones específicas, mensajes significativos |
| Boy Scout | Déjalo mejor de como lo encontraste |
