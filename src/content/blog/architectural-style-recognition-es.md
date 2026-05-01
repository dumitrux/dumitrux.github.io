---
permalink: architectural-style-recognition
title: "Reconocimiento de Estilos Arquitectónicos: Deep Learning y Arquitectura"
description: "Un proyecto de deep learning que clasifica estilos arquitectónicos a partir de fotografías usando redes neuronales convolucionales — creado antes de que la IA estuviera de moda."
date: 2026-01-03
tags: ["Projects", "AI/ML"]
secondaryTags: ["Deep Learning", "Visión por Computador", "Python"]
thumbnail: "/images/blog/architectural-style-recognition-thumbnail.svg"
lang: es
---

## La Motivación

Mi pareja siempre ha sido apasionada de la arquitectura. Caminando por cualquier ciudad, puede nombrar el estilo de casi cualquier edificio — Gótico, Barroco, Art Deco, Modernista. Quise ver si una red neuronal podía aprender la misma habilidad.

Este proyecto fue construido antes del hype actual de la IA. Sin ChatGPT, sin Stable Diffusion — solo TensorFlow, una GPU y mucha paciencia.

## El Enfoque

El sistema usa una **red neuronal convolucional (CNN)** para clasificar estilos arquitectónicos a partir de fotografías:

1. **Curación del Dataset** — Recopilación y etiquetado de imágenes abarcando múltiples estilos arquitectónicos: Gótico, Barroco, Art Deco, Moderno, Neoclásico y más.
2. **Arquitectura del Modelo** — Transfer learning con una red pre-entrenada (ResNet/VGG) ajustada sobre el dataset arquitectónico.
3. **Entrenamiento y Evaluación** — Entrenado con aumento de datos (rotaciones, reflejos, recortes) para mejorar la generalización.

```python
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

base_model = ResNet50(weights='imagenet', include_top=False)
x = GlobalAveragePooling2D()(base_model.output)
x = Dense(256, activation='relu')(x)
predictions = Dense(num_styles, activation='softmax')(x)
```

## Desafíos

- **Desbalance de clases** — Algunos estilos (Moderno) tienen muchos más ejemplos en línea que otros (Art Deco). Se abordó con pesos de clase y sobremuestreo.
- **Subjetividad** — La arquitectura no siempre encaja ordenadamente en una categoría. Muchos edificios mezclan estilos. El modelo tuvo que aprender las características dominantes.
- **Calidad de imagen** — Las imágenes de entrenamiento iban desde fotografía profesional hasta instantáneas de turistas. El aumento agresivo de datos ayudó al modelo a generalizar.

## Resultados

El modelo logró una precisión sólida en el conjunto de prueba, con la mayor confusión entre estilos visualmente similares (p. ej., Barroco vs. Rococó). El mejor rendimiento fue en estilos altamente distintivos como Gótico y Art Deco.

## Lo Que Aprendí

- **Transfer learning** es increíblemente poderoso para datasets pequeños — las características pre-entrenadas de ImageNet se transfieren sorprendentemente bien a características arquitectónicas.
- **El conocimiento del dominio importa** — Entender qué hace único a cada estilo (arcos apuntados para Gótico, patrones geométricos para Art Deco) ayudó con el análisis de errores.
- Construir algo para alguien que te importa es la mejor motivación.

## Pruébalo

El proyecto es open source: [architectural-style-recognition en GitHub](https://github.com/dumitrux/architectural-style-recognition)
