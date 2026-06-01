---
permalink: core-ml-algorithms
title: "Algoritmos Fundamentales de Machine Learning"
description: "Entiende las matemáticas y la lógica detrás de regresión, clasificación, métodos ensemble, clustering y SVMs."
date: 2026-05-31
tags: ["AI", "Data"]
secondaryTags: ["Machine Learning", "Algoritmos", "Python"]
thumbnail: "/images/blog/core-ml-algorithms-thumbnail.svg"
lang: es
---

Una visión práctica de los algoritmos clásicos de ML que necesitas conocer antes de pasar a deep learning.

## Categorías de ML

```
Machine Learning
├── Aprendizaje Supervisado (datos etiquetados)
│   ├── Regresión → predecir un número
│   └── Clasificación → predecir una categoría
├── Aprendizaje No Supervisado (sin etiquetas)
│   ├── Clustering → agrupar items similares
│   └── Reducción de Dimensionalidad → simplificar datos
└── Aprendizaje por Refuerzo → aprender por recompensa
```

## Regresión

### Regresión Lineal

Predice un valor continuo ajustando una línea.

$$y = mx + b$$

- **m** = pendiente (peso)
- **b** = intersección (sesgo)

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predicciones = model.predict(X_test)
```

**Casos de uso:** Predicción de precios, previsión de ventas.

**Métricas:** MSE (Error Cuadrático Medio), R² Score.

## Clasificación

### Regresión Logística

A pesar del nombre, es para **clasificación**. Predice probabilidades usando una función sigmoide.

$$P(y=1) = \frac{1}{1 + e^{-(mx+b)}}$$

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)
predicciones = model.predict(X_test)
```

**Casos de uso:** Detección de spam, diagnóstico médico (sí/no).

### Árboles de Decisión

Un árbol de condiciones if/else que divide los datos.

```
         [¿Edad > 30?]
        /              \
      Sí                No
  [¿Ingresos > 50K?]  [¿Estudiante?]
   /         \          /         \
 Compra   No Compra  Compra   No Compra
```

```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=5)
model.fit(X_train, y_train)
```

**Pros:** Fácil de entender, no necesita escalado.
**Contras:** Se sobreajusta fácilmente.

### K-Nearest Neighbors (KNN)

Clasifica basándose en los K puntos de datos más cercanos.

```python
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train, y_train)
```

**Casos de uso:** Recomendación, reconocimiento de imágenes.

## Métodos Ensemble

Combinan múltiples modelos para mejores resultados.

### Random Forest

Muchos árboles de decisión entrenados en subconjuntos aleatorios → votan la respuesta.

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
```

**Por qué funciona:** Cada árbol es ligeramente diferente. Juntos, se cancelan los errores.

### Gradient Boosting

Los árboles se construyen uno tras otro, cada uno corrigiendo los errores del anterior.

```python
from sklearn.ensemble import GradientBoostingClassifier

model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1)
model.fit(X_train, y_train)
```

**Implementaciones populares:** XGBoost, LightGBM, CatBoost.

## Clustering

### K-Means

Agrupa datos en K clusters basándose en distancia.

```
1. Elegir K centros aleatorios
2. Asignar cada punto al centro más cercano
3. Mover centros a la media de los puntos asignados
4. Repetir hasta que sea estable
```

```python
from sklearn.cluster import KMeans

model = KMeans(n_clusters=3)
model.fit(X)
etiquetas = model.labels_
```

**Casos de uso:** Segmentación de clientes, compresión de imágenes.

## Máquinas de Vectores de Soporte (SVM)

Encuentra la mejor frontera (hiperplano) para separar clases, maximizando el margen.

```
  Clase A: o o o  |  x x x :Clase B
              o   |   x x
           o o    |    x
                  |
        ← margen →
```

```python
from sklearn.svm import SVC

model = SVC(kernel="rbf", C=1.0)
model.fit(X_train, y_train)
```

**Truco del kernel:** Mapea datos a dimensiones más altas donde se vuelven separables.

| Kernel | Cuándo Usar |
|--------|------------|
| linear | Datos linealmente separables |
| rbf | Datos no lineales (por defecto) |
| poly | Fronteras polinómicas |

## Evaluación del Modelo

### Métricas de Clasificación

| Métrica | Qué Mide |
|---------|----------|
| **Accuracy** | % de predicciones correctas |
| **Precision** | De los positivos predichos, cuántos son correctos |
| **Recall** | De los positivos reales, cuántos se encontraron |
| **F1 Score** | Balance entre precision y recall |

```python
from sklearn.metrics import classification_report
print(classification_report(y_test, predicciones))
```

### Validación Cruzada

```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)
```

## Resumen

| Algoritmo | Tipo | Mejor Para |
|-----------|------|------------|
| Regresión Lineal | Regresión | Predecir números |
| Regresión Logística | Clasificación | Binario sí/no |
| Árbol de Decisión | Ambos | Reglas interpretables |
| Random Forest | Ambos | Propósito general, robusto |
| Gradient Boosting | Ambos | Competiciones, mejor accuracy |
| K-Means | Clustering | Agrupar datos sin etiquetas |
| SVM | Clasificación | Datasets pequeños/medianos |
