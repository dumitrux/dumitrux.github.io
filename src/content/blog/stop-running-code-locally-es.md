---
permalink: stop-running-code-locally
title: "Deja de Ejecutar Código en Tu Máquina Local"
description: "Por qué nunca deberías ejecutar frontend, backend, IA, scripts ni ningún código directamente en tu máquina local — y las alternativas sandboxed que te mantienen seguro y productivo."
date: 2026-04-05
tags: ["DevOps", "Seguridad", "Docker", "Buenas Prácticas"]
thumbnail: "/images/blog/sandboxed-dev-thumbnail.svg"
lang: es
---

Tu máquina local es tu herramienta más valiosa. Tiene tus credenciales, claves SSH, sesiones de navegador, archivos personales y acceso a recursos de la empresa. Entonces, ¿por qué ejecutamos código no confiable en ella todos los días?

## El Problema

Cada vez que ejecutas código localmente, le estás dando acceso a:

- **Tu sistema de archivos** — puede leer, escribir o borrar cualquier cosa que tu usuario pueda
- **Tu red** — puede hacer peticiones a servicios internos, APIs cloud o exfiltrar datos
- **Tus credenciales** — variables de entorno, archivos `.env`, sesiones de CLI cloud, claves SSH, cookies del navegador
- **Tu hardware** — CPU, GPU, memoria (a los mineros de crypto les encanta esto)

Esto aplica a **todo el código**:

- `npm install` ejecuta scripts arbitrarios de miles de paquetes
- `pip install` puede ejecutar `setup.py` con acceso total al sistema
- Ese "script rápido" de Stack Overflow o un asistente de IA
- Servidores de desarrollo frontend, APIs backend, motores de base de datos
- Scripts de entrenamiento de IA/ML que descargan modelos de internet

## Riesgos Reales

- **Ataques a la cadena de suministro**: Paquetes maliciosos en npm, PyPI y otros registros se descubren regularmente. Una sola dependencia comprometida en tu `node_modules` puede robar tus claves de AWS.
- **Typosquatting**: Instala `colorsss` en lugar de `colors` y tienes malware.
- **Scripts post-install**: `npm install` ejecuta scripts de ciclo de vida que pueden hacer cualquier cosa — descargar binarios, modificar archivos, abrir conexiones de red.
- **Código generado por IA**: Los LLMs pueden alucinar paquetes que no existen. Los atacantes registran esos nombres con código malicioso.

## La Solución: Entornos Sandboxed

Ejecuta tu código en un entorno aislado donde el peor escenario significa **borrar el sandbox**, no formatear tu portátil.

### Contenedores Docker

La opción más accesible. Ejecuta cualquier proyecto dentro de un contenedor:

```bash
# Ejecutar un proyecto Node.js
docker run -it --rm -v $(pwd):/app -w /app -p 3000:3000 node:20 npm run dev

# Ejecutar un proyecto Python
docker run -it --rm -v $(pwd):/app -w /app python:3.12 python main.py
```

El contenedor está aislado de tu host. No puede acceder a tus claves SSH, credenciales cloud u otros archivos a menos que los montes explícitamente.

### GitHub Codespaces

Un entorno de desarrollo completo alojado en la nube. Tu código se ejecuta en una VM remota, no en tu máquina. Ventajas:

- Cero exposición a tu sistema de archivos local
- Pre-configurado con `devcontainer.json`
- Accesible desde cualquier dispositivo
- Las políticas de organización pueden imponer controles de seguridad

### Dev Containers (Local)

La extensión Dev Containers de VS Code te permite desarrollar dentro de Docker localmente. Obtienes el aislamiento de contenedores con la sensación de desarrollo local:

```json
{
  "name": "Dev Seguro",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {}
  }
}
```

### Máquinas Virtuales

Para aislamiento más fuerte, ejecuta una VM:

- **Local**: VirtualBox, Hyper-V, UTM (macOS), WSL2
- **Cloud**: Azure VMs, AWS EC2, GCP Compute Engine

Las VMs proporcionan aislamiento a nivel de SO completo. Incluso si el malware obtiene root dentro de la VM, tu host está seguro.

## ¿Y el Rendimiento?

El argumento de "pero es más lento" ya no se sostiene:

| Entorno | Overhead | Suficiente Para |
|---|---|---|
| Docker | ~5% CPU, RAM mínima | Casi todo |
| Codespaces | Solo latencia de red | Desarrollo web, scripts, APIs |
| Dev Containers | Igual que Docker | Desarrollo full-stack |
| VM Local | ~10-15% | Cuando necesitas aislamiento completo de SO |

El hardware moderno maneja contenedores sin impacto notable. Los Codespaces con buena conexión se sienten como desarrollo local.

## Una Configuración Práctica

Esto es lo que recomiendo para la mayoría de desarrolladores:

1. **Desarrollo diario**: Dev Containers o GitHub Codespaces
2. **Scripts rápidos**: One-liners de Docker (`docker run --rm ...`)
3. **Código no confiable**: VM desechable o Codespace
4. **Experimentos de IA**: Contenedores con passthrough de GPU, o VMs cloud

Mantén tu máquina local para:
- Tu IDE / editor
- Operaciones de Git
- Navegador
- Herramientas de comunicación

**Todo lo demás se ejecuta en un sandbox.**

## Mi Opinión

Bloqueamos nuestros teléfonos, ciframos nuestros discos y usamos 2FA — pero luego ejecutamos `npm install` con 1.500 paquetes directamente en nuestra estación de trabajo. El modelo de amenazas no tiene sentido.

Hacer sandbox de tu entorno de desarrollo no es paranoia — es higiene básica. Docker es gratis, Codespaces tiene un tier gratuito generoso, y Dev Containers funciona con VS Code de serie.

**El código más seguro es el que no puede tocar tu máquina.**
