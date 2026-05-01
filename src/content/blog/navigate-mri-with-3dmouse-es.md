---
permalink: navigate-mri-with-3dmouse
title: "Navegando Escáneres MRI con un Ratón 3D"
description: "Un proyecto de imagen médica que integra un SpaceMouse 3D con 3D Slicer para la navegación intuitiva a través de volúmenes MRI."
date: 2026-01-04
tags: ["Projects"]
secondaryTags: ["Imagen Médica", "3D Slicer", "Python"]
thumbnail: "/images/blog/navigate-mri-thumbnail.svg"
lang: es
---

## El Problema

Radiólogos e investigadores pasan horas navegando por datos volumétricos de MRI. El flujo de trabajo estándar implica desplazarse por cortes 2D con un ratón normal — clic, scroll, clic, scroll. Funciona, pero no es intuitivo para datos 3D.

¿Y si pudieras navegar un escáner cerebral de la misma forma que explorarías un modelo 3D — con movimientos naturales y espaciales?

## La Solución

Este proyecto integra un **SpaceMouse 3D** con **3D Slicer**, la plataforma open source de imagen médica. El SpaceMouse tiene seis grados de libertad (traslación X/Y/Z, rotación X/Y/Z), haciéndolo ideal para navegar datos volumétricos.

La integración permite a los usuarios:

- **Desplazarse** por los cortes empujando el SpaceMouse hacia adelante/atrás
- **Hacer zoom** tirando hacia arriba/empujando hacia abajo
- **Rotar** la reconstrucción del volumen 3D con movimientos naturales de muñeca
- **Navegar** por los planos axial, sagital y coronal simultáneamente

## Implementación Técnica

El proyecto funciona como una extensión de 3D Slicer que:

1. **Lee la entrada del SpaceMouse** — Captura la entrada de 6DOF del driver del dispositivo
2. **Mapea movimientos a navegación** — Traduce movimientos físicos en transformaciones de cámara/corte
3. **Actualiza vistas en tiempo real** — Proporciona navegación fluida y responsiva en todos los paneles del viewport

```python
# Mapear ejes del SpaceMouse a navegación de 3D Slicer
def on_spacemouse_event(tx, ty, tz, rx, ry, rz):
    # La traslación controla la posición del corte
    slice_node.SetSliceOffset(current_offset + tz * sensitivity)
    # La rotación controla la cámara de la vista 3D
    camera.Azimuth(rx * rotation_speed)
    camera.Elevation(ry * rotation_speed)
```

## Casos de Uso

- **Revisión radiológica** — Exploración más rápida de escáneres MRI de cerebro, columna o abdomen
- **Planificación quirúrgica** — Navegación 3D intuitiva para revisión preoperatoria
- **Investigación** — Exploración eficiente de grandes datasets volumétricos
- **Educación** — Forma más atractiva de enseñar anatomía desde escáneres reales

## Lo Que Aprendí

- **La integración de hardware** añade una cantidad sorprendente de complejidad — compatibilidad de drivers, mapeo de entrada, ajuste de sensibilidad.
- **El software médico** tiene altos estándares de fiabilidad. Incluso una herramienta de visualización necesita ser predecible y responsiva.
- A veces la mejor mejora de UX no es una nueva interfaz — es un mejor dispositivo de entrada.

## Pruébalo

El proyecto es open source: [navigate-MRI-with-3Dmouse en GitHub](https://github.com/dumitrux/navigate-MRI-with-3Dmouse)
