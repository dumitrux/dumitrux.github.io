---
permalink: code-agentic
title: "Fundamentos de la Entrega de Software con Agentes"
description: "Cómo configurar agentes, planes, permisos y verificación para que los agentes de IA puedan entregar software de forma autónoma y segura."
date: 2026-05-07
tags: ["DevOps", "Software"]
secondaryTags: ["IA", "Agentes", "CI/CD"]
thumbnail: "/images/blog/code-agentic-thumbnail.svg"
lang: es
---

La entrega de software con agentes consiste en darle a los agentes de IA la dirección, las barreras de seguridad y los bucles de retroalimentación que necesitan para realizar trabajo real. Así es como pienso en los fundamentos — desde los IDEs y la configuración hasta los permisos, las skills y la orquestación.

## Mejoras generales

- Usa inglés; otros idiomas pueden consumir más tokens.
- Empieza una nueva sesión de chat lo antes posible para evitar demasiado contexto en la misma sesión. Cuanto más contexto, mayor coste.
- System-prompt estilo "caveman" (directo y conciso).
- Ejecutar agentes en un contenedor con un sandbox en un entorno cloud es hacia donde vamos a largo plazo.

## IDEs

- VS Code
- Claude Code
- Google Antigravity

## Claude Code

- `/init` y luego recorta CLAUDE.md. Claude explora el proyecto actual y escribe consejos para sí mismo. Añádelo al repositorio Git para los demás.
- Jerarquía de configuración:
  - Gestión empresarial (enterprise managed)
  - Usuario: ~/.claude/
  - Compartida del proyecto: .claude/
  - Local del proyecto: .claude/
- `/permissions` para construir una allowlist. El modo automático es bueno pero aún puede ser eludido; no lo uses inicialmente en proyectos nuevos.
- Planifica antes de dejar que escriba código; tiene un gran impacto en mejores resultados. Entra en modo plan (Shift+Tab), edita el plan e implementa (Ctrl+G). Pregunta qué problemas anticipa, qué podría salir mal y qué falta. Incluye Criterios de Aceptación en el plan para poder medir y saber cuándo ha tenido éxito.
- `/compact`, `/clear`, `/context`; la calidad se degrada suavemente a medida que se llena el contexto.
- Dirígelo en tiempo real. No esperes a que el agente termine un camino equivocado. `Esc` interrumpe, `Esc+Esc` rebobina el último mensaje y `Shift+b` ejecuta en segundo plano.
- Dale una forma de verificar su propio trabajo. Anthropic lo llama "la práctica más impactante". Dale tests y herramientas específicas que pueda ejecutar.

## MCP

MCPs locales para revisiones rápidas.

- ~/AppData/Roaming/Code/User/mcp.json
- .vscode/mcp.json

## Fundamentos de los agentes

- CLI, escritorio, extensiones de VS Code, etc.
- Ventana de contexto y tamaño de tokens
- Modo automático
- Planificación y dirección en tiempo real
- /init para Claude Code

## Configuración del agente

- Agentes locales en profundidad
- Plan primero para tareas grandes
- Verificación + humano en el bucle (human-in-the-loop)
- Permisos
- Skills
- Herramientas

El "harness" es darle a Claude la capacidad de verificarse a sí mismo (peticiones de herramientas, revisión y tests). Le das un plan que describe qué quieres y cómo se ve el éxito, y entonces Claude puede ejecutarlo.

Ingredientes para la autonomía:

- Dirección (Planes con Criterios de Aceptación): marca el destino y la base para la auto-verificación.
- Contención (Permisos y Sandbox): acota el espacio de trabajo.
- Puertas de calidad (Retroalimentación rápida): señal durante el trabajo.
- Verificación (Tests automatizados): prueba al final.
- Continuidad (Memoria persistente): contexto entre ejecuciones.
- Alcance (MCP y Herramientas): qué toca el agente más allá de los archivos locales.

### Permisos

Los permisos en `.claude/settings.json` tienen un objeto de permisos que puede permitir, denegar o preguntar por comandos específicos, como denegar la lectura de `.env` o borrar cosas, permitir algunos comandos de git y preguntar antes de hacer commit. Activa el sandbox; esto bloquea si intenta leer algo fuera del espacio de trabajo.

Por defecto depende del modo. El modo por defecto te preguntará. Permitir todo no es recomendable. "Denegar siempre si no está permitido" es más para CI.

### Misceláneo

- En el archivo `CLAUDE.md` especifica `@AGENTS.md` para ser más agnóstico de cara a futuros agentes; el archivo de agentes está más estandarizado en la industria. Reglas a nivel de proyecto que pueden incluir principios de software, prioridades del proyecto, etc.
- El directorio `.claude/rules` es específico para reglas basadas en rutas; por ejemplo, si `marketing/` entonces especifica el formato del contenido o cualquier contexto o instrucción para esa ruta. Igual que las reglas de Cursor.
- Usa `Users/<username>/.claude/project/<project_name>/memory/MEMORY.md` para memoria a largo plazo; esto no se comparte con otros usuarios ni se commitea al repositorio. Úsalo para cosas como "prefiero mensajes de commit concisos" o "usamos tabuladores en lugar de espacios". Es distinto del archivo `CLAUDE.md`, que se comparte con todos y se commitea al repositorio, para no imponer las mismas reglas a todo el equipo.
- [skills.sh](https://www.skills.sh/) es un repositorio público de skills para agentes que funciona en una amplia variedad de agentes.
- En `.agents/skills/` se alojan directorios de skills específicas instaladas en el contexto del proyecto. Crea un archivo `skills-lock.json` para rastrear las skills instaladas y sus versiones, útil para reproducibilidad y para compartir skills entre proyectos. Normalmente están a nivel de usuario en el ordenador, no compartidas entre proyectos.
- [skills.sh/grill-me](https://www.skills.sh/mattpocock/skills/grill-me) es una skill de entrevista implacable que pone a prueba planes y diseños mediante preguntas sistemáticas.
- Las skills son comandos para inyectar prompts, herramientas o comportamientos específicos en el agente.
- Las skills personalizadas se comparten en el repositorio, pero las skills instaladas se ignoran al hacer commit.
- `/Users/<username>/.claude/Claude.md` es el archivo a nivel de usuario para preferencias e instrucciones personales; se inyectará en el contexto de todos los proyectos de ese usuario.
- [caveman](https://github.com/JuliusBrussee/caveman) es un framework de ingeniería de system prompts que ofrece un enfoque estructurado para diseñar prompts efectivos. Prioriza la simplicidad, la claridad y la concisión, lo que lo hace más barato en tokens y más eficiente para guiar el comportamiento del agente.
- La Ingeniería de Contexto es la práctica de diseñar el contexto de entrada para los modelos de lenguaje con el fin de optimizar su rendimiento y la calidad de su salida. Consiste en seleccionar y organizar la información que se proporciona al modelo —instrucciones, ejemplos y datos relevantes— para guiar su comprensión y generación de respuestas. Junto con la ingeniería de prompts, marca la diferencia en la calidad del resultado y el consumo de tokens. Practica, aprende de otros y prueba distintos enfoques.
- Opus para arquitectura y planes. Sonnet como caballo de batalla diario. Haiku para trabajo en masa y bucles largos. Cada modelo tiene un uso distinto. Puedes usar Opus para todo, pero costará muchos tokens y será más lento.

## Orquestación de agentes

- Agentes en la nube, subagentes
- Equipos de agentes
- Trabajo en paralelo de larga duración
