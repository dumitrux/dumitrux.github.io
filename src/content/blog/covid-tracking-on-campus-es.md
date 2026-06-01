---
permalink: covid-tracking-on-campus
title: "Covid-Tracking on Campus"
description: "Una app Android ganadora de hackathon que notifica a los estudiantes si han estado en contacto cercano con un compañero positivo en COVID-19, usando escaneo por Bluetooth Low Energy."
date: 2020-12-20
tags: ["Projects"]
secondaryTags: ["Hackathon", "Android", "Python", "MongoDB", "BLE"]
thumbnail: "/images/blog/covid-tracking-on-campus-thumbnail.jpg"
lang: es
---

## Inspiración

Sin tener ni idea sobre IA y machine learning, nuestro equipo decidió abordar un problema más práctico e impactante: **Covid-Tracking on Campus**. El objetivo era ayudar a los estudiantes universitarios a mantenerse seguros alertándoles si habían estado cerca de alguien que dio positivo en COVID-19.

## Qué Hace

Si un usuario comunica su positivo COVID, todos sus contactos cercanos reciben una notificación sobre la posible exposición. La app usa **Bluetooth Low Energy (BLE)** para escanear dispositivos cercanos, construyendo un historial de contactos sin necesidad de GPS o datos de ubicación.

## Cómo Lo Construimos

Dividimos el proyecto en dos frentes:

1. **Frontend** — Una app Android construida con Android Studio que gestiona el escaneo BLE y la interfaz de usuario.
2. **Backend** — Una base de datos MongoDB junto con una API en Python Flask para gestionar datos de usuarios, registros de contactos y notificaciones push.

## Retos

Descubrimos tarde en el desarrollo que no podíamos acceder directamente a la dirección MAC de nuestro propio dispositivo en versiones nuevas de Android — una restricción de seguridad que tuvimos que sortear con identificadores alternativos.

## Logros

- Implementamos con éxito el escaneo BLE para detección de proximidad
- Entregamos un proyecto full-stack funcional (frontend + backend) en solo 40 horas
- **Ganamos el "Challenge: Covid-Tracking on Campus" en BitsxLaMarató 2020**

## Lo Que Aprendimos

Fundamentalmente, aprendimos a trabajar con smartphones a bajo nivel — protocolos BLE, permisos de Android y las restricciones del desarrollo móvil bajo presión de tiempo.

## Enlaces

- [DummyTracker en Devpost](https://devpost.com/software/dummy-tracker)
- [Código fuente en GitHub](https://github.com/Blaios/JamelgosCentrales.git)
