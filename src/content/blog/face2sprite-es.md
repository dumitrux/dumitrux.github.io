---
permalink: face2sprite
title: "Face2Sprite: Convirtiendo Caras en Personajes Pixel Art"
description: "Un proyecto de hackathon que convierte fotografías de rostros en sprites de pixel art estilo retro para videojuegos usando técnicas de procesamiento de imagen."
date: 2026-01-02
tags: ["Projects"]
secondaryTags: ["Hackathon", "Python", "Procesamiento de Imagen"]
thumbnail: "/images/blog/face2sprite-thumbnail.jpg"
lang: es
---

## La Idea

Durante un hackathon, mi equipo y yo construimos **Face2Sprite** — una herramienta que toma una fotografía del rostro de alguien y genera un sprite de pixel art adecuado para videojuegos estilo retro.

El concepto era simple: ¿y si pudieras convertirte a ti mismo (o a tus amigos) en personajes jugables en cuestión de segundos?

## Cómo Funciona

El pipeline tiene tres etapas principales:

1. **Detección Facial** — Detectamos y recortamos el rostro de la imagen de entrada usando cascadas de Haar de OpenCV.
2. **Extracción de Características** — Se identifican las características faciales clave (ojos, nariz, boca, color de pelo, tono de piel) y se mapean a atributos del sprite.
3. **Generación del Sprite** — Basándose en las características extraídas, seleccionamos y combinamos componentes de pixel art predibujados para ensamblar una hoja de sprites final.

```python
import cv2

# Detectar rostro en la imagen
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, 1.3, 5)
```

## La Experiencia del Hackathon

Construir esto en un tiempo limitado nos obligó a tomar decisiones pragmáticas:

- Usamos un **enfoque basado en plantillas** para la generación de sprites en lugar de entrenar una red neuronal — más rápido de implementar y resultados más predecibles.
- Los componentes de los sprites fueron dibujados a mano en una cuadrícula de 16x16 píxeles, dando ese auténtico aspecto retro.
- Nos enfocamos en hacer funcionar el pipeline completo de principio a fin en lugar de perfeccionar un solo paso.

## Lo Que Aprendí

- **El prototipado rápido** es una habilidad en sí misma — saber cuándo "suficientemente bueno" es la respuesta correcta.
- **Los fundamentos del procesamiento de imagen** (espacios de color, detección de bordes, coincidencia de características) son increíblemente útiles incluso en la era del deep learning.
- Trabajar bajo presión de tiempo con un equipo te enseña a comunicar alcance y compromisos rápidamente.

## Pruébalo

El proyecto es open source: [Face2Sprite en GitHub](https://github.com/dumitrux/Face2Sprite)

[Face2Sprite en Devpost](https://devpost.com/software/face2sprite)
