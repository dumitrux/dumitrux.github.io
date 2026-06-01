---
permalink: github-repository-templates
title: "Plantillas de Repositorio en GitHub: Buenas Prácticas desde el Día Uno"
description: "Una guía sobre los archivos de salud comunitaria y plantillas que todo repositorio de GitHub debería tener — CONTRIBUTING.md, CODE_OF_CONDUCT.md, plantillas de issues y PRs, CODEOWNERS, .devcontainer, .copilot y más."
date: 2026-04-15
tags: ["DevOps", "Software"]
secondaryTags: ["GitHub", "Buenas Prácticas", "Open Source"]
thumbnail: "/images/blog/github-templates-thumbnail.svg"
lang: es
---

Todo repositorio empieza con buenas intenciones. Pero sin estructura, las cosas se complican rápido — issues inconsistentes, reglas de contribución poco claras, sin propiedad en las revisiones de código. GitHub te da un conjunto de **archivos de salud comunitaria y plantillas** que resuelven esto desde el inicio.

## El Directorio `.github/`

GitHub busca archivos especiales dentro de un directorio `.github/` en la raíz de tu repositorio (o en un repositorio especial `.github` para valores predeterminados a nivel de organización). Estos archivos definen cómo las personas interactúan con tu proyecto.

## CONTRIBUTING.md

Este archivo indica a los contribuidores **cómo participar**. Normalmente cubre:

- Cómo reportar bugs
- Cómo sugerir funcionalidades
- Estándares de código y guías de estilo
- Convenciones de nombres de ramas
- Cómo enviar un pull request

GitHub enlaza automáticamente a este archivo cuando alguien abre un nuevo issue o PR.

```markdown
## Cómo Contribuir

1. Haz fork del repositorio
2. Crea una rama de feature (`git checkout -b feature/mi-feature`)
3. Haz commit de tus cambios
4. Abre un Pull Request contra `main`
```

## CODE_OF_CONDUCT.md

Establece las expectativas de comportamiento para todos los involucrados. GitHub proporciona plantillas basadas en el [Contributor Covenant](https://www.contributor-covenant.org/), que es el estándar más adoptado.

Tener un CODE_OF_CONDUCT.md señala que tu proyecto es un espacio seguro y acogedor.

## Plantillas de Issues

En lugar de issues vacíos, puedes definir plantillas estructuradas:

```
.github/
└── ISSUE_TEMPLATE/
    ├── bug_report.md
    ├── feature_request.md
    └── config.yml
```

Cada plantilla tiene frontmatter YAML con nombre, descripción, etiquetas y asignados. El `config.yml` puede deshabilitar issues en blanco y añadir enlaces externos (ej. a un foro de discusión).

```yaml
name: Reporte de Bug
description: Reportar un bug
labels: ["bug"]
body:
  - type: textarea
    attributes:
      label: ¿Qué pasó?
      description: Describe el bug
    validations:
      required: true
  - type: textarea
    attributes:
      label: Pasos para reproducir
```

Esto obliga a los reporteros a darte la información que realmente necesitas.

## PULL_REQUEST_TEMPLATE.md

Una plantilla predeterminada que pre-llena la descripción del PR:

```markdown
## ¿Qué hace este PR?

## Checklist

- [ ] Tests añadidos/actualizados
- [ ] Documentación actualizada
- [ ] Sin cambios breaking
```

Colócalo en `.github/PULL_REQUEST_TEMPLATE.md`. Cada nuevo PR empezará con esta estructura.

## CODEOWNERS

Define **quién es responsable de qué**. Cuando un PR modifica ciertos archivos, los propietarios correspondientes se solicitan automáticamente como revisores.

```
# El equipo de plataforma gestiona infra
/terraform/       @org/platform-team
*.tf              @org/platform-team

# El equipo de datos gestiona pipelines
/pipelines/       @org/data-team

# Propietario por defecto
*                 @dumitrux
```

Esto es crítico para equipos grandes — asegura que las personas correctas revisen el código correcto.

## .devcontainer/

Define una configuración de **contenedor de desarrollo** para que cualquiera pueda levantar un entorno de desarrollo consistente. Más sobre esto en mi [post sobre DevContainers](/es/blog/github-codespaces-devcontainers/).

```json
{
  "name": "Project Dev",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {}
  }
}
```

## .copilot/

Una adición más reciente — puedes configurar el comportamiento de **GitHub Copilot** por repositorio:

- `.copilot/instructions.md` — instrucciones personalizadas que Copilot usa como contexto al generar sugerencias
- Útil para imponer convenciones de código, librerías preferidas o terminología específica del dominio

## Otros Archivos Útiles

| Archivo | Propósito |
|---|---|
| `SECURITY.md` | Cómo reportar vulnerabilidades de seguridad |
| `SUPPORT.md` | Dónde obtener ayuda |
| `FUNDING.yml` | Configuración del botón de patrocinio |
| `dependabot.yml` | Actualizaciones automáticas de dependencias |
| `LICENSE` | Términos legales para usar el código |

## Valores Predeterminados a Nivel de Organización

Puedes crear un repositorio especial llamado `.github` en tu organización. Cualquier archivo de salud comunitaria colocado allí se convierte en el **valor predeterminado para todos los repositorios** de la org que no tengan los suyos.

Esto es muy potente para imponer estándares en decenas o cientos de repos sin duplicar archivos.

## Mi Opinión

Configurar estas plantillas lleva 30 minutos. El tiempo ahorrado en onboarding, revisiones de código y triaje de issues es enorme. Si estás empezando un proyecto nuevo o manteniendo uno existente, añade estos archivos hoy. Tus futuros contribuidores (y tu yo del futuro) te lo agradecerán.

**Empieza con**: CONTRIBUTING.md, una plantilla de PR, CODEOWNERS y plantillas de issues. Añade el resto a medida que tu proyecto crezca.
