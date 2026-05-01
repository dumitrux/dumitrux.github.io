---
permalink: github-codespaces-devcontainers
title: "GitHub Codespaces y Dev Containers: Entornos Consistentes en Segundos"
description: "Cómo usar Dev Containers y devcontainer.json para crear entornos de desarrollo reproducibles para GitHub Codespaces, VS Code y más."
date: 2026-04-12
tags: ["DevOps", "Infrastructure"]
secondaryTags: ["GitHub", "Docker", "Experiencia de Desarrollo"]
thumbnail: "/images/blog/devcontainers-thumbnail.svg"
lang: es
---

Configurar un entorno de desarrollo no debería llevar un día entero. Clonar, instalar, configurar, depurar dependencias que faltan, instalar la versión correcta de Node... ya conoces el proceso. **Dev Containers** resuelve esto definiendo tu entorno como código.

## ¿Qué Son los Dev Containers?

[Dev Containers](https://containers.dev/) es una **especificación abierta** para definir entornos de desarrollo usando contenedores Docker. La configuración vive en un archivo `devcontainer.json` dentro de tu repositorio.

Cuando abres el proyecto en GitHub Codespaces o VS Code (con la extensión Dev Containers):

1. Construye o descarga la imagen del contenedor
2. Instala las herramientas y extensiones especificadas
3. Ejecuta cualquier comando de configuración
4. Te deja en un entorno completamente configurado

Todos en el equipo obtienen **exactamente la misma configuración**. No más "funciona en mi máquina."

## El Archivo devcontainer.json

Colócalo en `.devcontainer/devcontainer.json`:

```json
{
  "name": "Mi Proyecto",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.12"
    },
    "ghcr.io/devcontainers/features/node:1": {
      "version": "20"
    },
    "ghcr.io/devcontainers/features/azure-cli:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode"
      ],
      "settings": {
        "editor.formatOnSave": true
      }
    }
  },
  "postCreateCommand": "npm install",
  "forwardPorts": [3000, 8080]
}
```

## Dev Container Features

Las Features son el verdadero superpoder. En lugar de escribir Dockerfiles para instalar herramientas, **compones módulos pre-construidos**. Algunos populares:

| Feature | Qué Instala |
|---|---|
| `ghcr.io/devcontainers/features/python:1` | Python + pip |
| `ghcr.io/devcontainers/features/node:1` | Node.js + npm |
| `ghcr.io/devcontainers/features/azure-cli:1` | Azure CLI |
| `ghcr.io/devcontainers/features/docker-in-docker:1` | Docker dentro del contenedor |
| `ghcr.io/devcontainers/features/kubectl-helm-minikube:1` | Herramientas de Kubernetes |
| `ghcr.io/devcontainers/features/terraform:1` | Terraform CLI |
| `ghcr.io/devcontainers/features/github-cli:1` | GitHub CLI (gh) |
| `ghcr.io/devcontainers/features/powershell:1` | PowerShell |

Explora todas las features disponibles en [containers.dev/features](https://containers.dev/features).

También puedes **crear tus propias features** y publicarlas en un registro de contenedores.

## GitHub Codespaces

GitHub Codespaces es un entorno de desarrollo alojado en la nube que usa Dev Containers internamente. Cuando haces clic en "Create Codespace" en un repo:

1. GitHub provisiona una VM
2. Construye el contenedor desde `devcontainer.json`
3. Abre VS Code en el navegador (o tu VS Code local)

### ¿Por Qué Codespaces?

- **Cero configuración local** — funciona desde cualquier máquina, incluso una tablet
- **Prebuilds** — configura imágenes pre-construidas para que los Codespaces arranquen en segundos en lugar de minutos
- **Consistente** — el `devcontainer.json` está versionado, así que cada rama puede tener su propia configuración
- **Seguro** — el código se queda en la nube, no en máquinas locales (importante para empresas)

### Prebuilds

Para proyectos grandes, puedes configurar **prebuilds** que construyen la imagen del contenedor de antemano:

1. Ve a **Settings → Codespaces → Prebuilds** del repo
2. Configura qué ramas disparan un prebuild
3. Los Codespaces arrancan casi instantáneamente

## Usando un Dockerfile Personalizado

Para más control, referencia un Dockerfile:

```json
{
  "name": "Entorno Personalizado",
  "build": {
    "dockerfile": "Dockerfile",
    "context": ".."
  },
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {}
  }
}
```

Esto te permite combinar una imagen base personalizada con Dev Container Features.

## Scripts de Ciclo de Vida

Puedes ejecutar scripts en diferentes etapas:

| Hook | Cuándo Se Ejecuta |
|---|---|
| `initializeCommand` | Antes de crear el contenedor (se ejecuta en el host) |
| `onCreateCommand` | Después de crear el contenedor (solo la primera vez) |
| `updateContentCommand` | Después de crear o actualizar contenido |
| `postCreateCommand` | Después de que todo esté configurado |
| `postStartCommand` | Cada vez que el contenedor arranca |
| `postAttachCommand` | Cada vez que una herramienta se conecta al contenedor |

```json
{
  "postCreateCommand": "pip install -r requirements.txt && npm install",
  "postStartCommand": "echo '¡Listo para programar!'"
}
```

## Mi Opinión

Los Dev Containers cambiaron cómo hago onboarding en proyectos. En lugar de una página wiki con 20 pasos, apunto a la gente al `devcontainer.json` y digo "ábrelo en Codespaces." Cinco minutos después, están escribiendo código.

Si mantienes un proyecto con más de un contribuidor, **añade un devcontainer.json hoy**. Empieza simple con una imagen y unas pocas features, y luego itera.
