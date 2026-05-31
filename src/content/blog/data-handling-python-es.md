---
permalink: data-handling-python
title: "Manejo de Datos con Python: NumPy, Pandas, Matplotlib, Seaborn"
description: "Una guía práctica de preprocesamiento y limpieza de datos usando NumPy, Pandas, Matplotlib y Seaborn."
date: 2026-05-31
tags: ["Data", "Python"]
secondaryTags: ["NumPy", "Pandas", "Matplotlib", "Seaborn"]
lang: es
---

El preprocesamiento y limpieza de datos es donde empieza la mayoría del trabajo con datos. Estas cuatro librerías son la base.

## El Pipeline de Datos

```
Datos Crudos → Limpiar → Transformar → Analizar → Visualizar
                ↑            ↑            ↑           ↑
              Pandas       Pandas       Pandas    Matplotlib
              NumPy        NumPy        NumPy     Seaborn
```

## NumPy — Computación Numérica

NumPy es la base para toda la computación científica en Python. Proporciona arrays rápidos y operaciones matemáticas.

```python
import numpy as np

# Crear arrays
arr = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 4))        # matriz 3x4 de ceros
ones = np.ones((2, 3))          # matriz 2x3 de unos
rng = np.arange(0, 10, 2)      # [0, 2, 4, 6, 8]

# Operaciones matemáticas (vectorizadas — rápidas)
arr * 2          # [2, 4, 6, 8, 10]
arr ** 2         # [1, 4, 9, 16, 25]
np.mean(arr)     # 3.0
np.std(arr)      # 1.414
np.sum(arr)      # 15

# Redimensionar
matrix = np.arange(12).reshape(3, 4)

# Indexación booleana
arr[arr > 3]     # [4, 5]
```

## Pandas — Manipulación de Datos

Pandas es la herramienta principal para trabajar con datos tabulares (como Excel o tablas SQL).

### Conceptos Básicos de DataFrame

```python
import pandas as pd

# Leer datos
df = pd.read_csv("ventas.csv")
df = pd.read_json("datos.json")
df = pd.read_parquet("datos.parquet")

# Explorar
df.head()          # primeras 5 filas
df.shape           # (filas, columnas)
df.dtypes          # tipos de columna
df.describe()      # estadísticas
df.info()          # resumen
df.columns         # nombres de columnas
```

### Limpieza de Datos

```python
# Valores faltantes
df.isnull().sum()              # contar nulls por columna
df.dropna()                    # eliminar filas con nulls
df.fillna(0)                   # rellenar nulls con 0
df["col"].fillna(df["col"].mean())  # rellenar con media

# Duplicados
df.duplicated().sum()          # contar duplicados
df.drop_duplicates()           # eliminar duplicados

# Tipos
df["fecha"] = pd.to_datetime(df["fecha"])
df["precio"] = df["precio"].astype(float)

# Renombrar
df.rename(columns={"viejo": "nuevo"}, inplace=True)

# Eliminar columnas
df.drop(columns=["no_deseada"], inplace=True)
```

### Filtrar y Seleccionar

```python
# Filtrar filas
df[df["precio"] > 100]
df[(df["precio"] > 100) & (df["categoria"] == "A")]

# Seleccionar columnas
df[["nombre", "precio"]]
df.loc[0:5, "nombre":"precio"]    # por etiqueta
df.iloc[0:5, 0:3]                 # por posición
```

### Agrupación y Agregación

```python
# Agrupar
df.groupby("categoria")["precio"].mean()
df.groupby("categoria").agg({"precio": "mean", "cantidad": "sum"})

# Tabla pivote
df.pivot_table(values="precio", index="categoria", columns="año", aggfunc="mean")
```

### Merge y Join

```python
# Merge (como SQL JOIN)
merged = pd.merge(pedidos, clientes, on="id_cliente", how="left")

# Concat (apilar DataFrames)
combinado = pd.concat([df1, df2], axis=0)
```

## Matplotlib — Gráficos Básicos

Matplotlib es la base para crear gráficos en Python.

```python
import matplotlib.pyplot as plt

# Gráfico de líneas
plt.plot(x, y)
plt.title("Ventas a lo Largo del Tiempo")
plt.xlabel("Mes")
plt.ylabel("Ingresos")
plt.show()

# Gráfico de barras
plt.bar(categorias, valores)
plt.show()

# Histograma
plt.hist(df["precio"], bins=20)
plt.show()

# Gráfico de dispersión
plt.scatter(df["edad"], df["ingresos"])
plt.show()

# Subplots
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].plot(x, y1)
axes[1].bar(categorias, valores)
plt.tight_layout()
plt.show()
```

## Seaborn — Visualización Estadística

Seaborn se construye sobre Matplotlib con mejores estilos por defecto y gráficos estadísticos.

```python
import seaborn as sns

# Distribución
sns.histplot(df["precio"], kde=True)

# Relaciones
sns.scatterplot(data=df, x="edad", y="ingresos", hue="categoria")

# Categóricos
sns.boxplot(data=df, x="categoria", y="precio")
sns.violinplot(data=df, x="categoria", y="precio")

# Heatmap de correlación
sns.heatmap(df.corr(), annot=True, cmap="coolwarm")

# Pairplot (todas las relaciones)
sns.pairplot(df, hue="categoria")
```

## Tareas Comunes de Limpieza

| Tarea | Código |
|-------|--------|
| Eliminar nulls | `df.dropna()` |
| Rellenar nulls | `df.fillna(valor)` |
| Eliminar duplicados | `df.drop_duplicates()` |
| Corregir tipos | `df["col"].astype(tipo)` |
| Limpiar strings | `df["col"].str.strip().str.lower()` |
| Eliminar outliers | `df[df["col"] < df["col"].quantile(0.99)]` |
| Codificar categorías | `pd.get_dummies(df, columns=["cat"])` |
| Normalizar | `(df["col"] - df["col"].mean()) / df["col"].std()` |

## Resumen

| Librería | Propósito | Uso Clave |
|----------|-----------|-----------|
| **NumPy** | Matemáticas rápidas en arrays | Computación numérica, operaciones vectorizadas |
| **Pandas** | Manipulación de datos tabulares | Leer, limpiar, transformar, agregar |
| **Matplotlib** | Gráficos básicos | Líneas, barras, dispersión, histogramas |
| **Seaborn** | Visualización estadística | Heatmaps, distribuciones, correlaciones |
