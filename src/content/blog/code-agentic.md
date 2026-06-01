---
permalink: code-agentic
title: "Foundations of Agentic Software Delivery"
description: ""
date: 2026-05-07
tags: ["DevOps", "Software"]
secondaryTags: ["Git", "CI/CD", "Version Control"]
thumbnail: "/images/blog/code-agentic-thumbnail.svg"
lang: en
---

Choosing the right Git branching strategy can make or break your team's delivery speed. Here's a quick breakdown of the most common approaches and when to use each one.

## General improvements

- Use Enlighs, other languages might take more tockens.
- Start a new chat session as soon as possible to avoid to much context in the same session. The more context, the more cost.
- Caveman system-prompt.
- Running agents in a container with a sandbox in a cloud environment is long-term where we are going

## IDEs

- VS Code
- Claude Code
- Google Antigravity

## Claude Code

- `/init` then trim CLAUDE.md. Claude explore current project and writes tips for itself. Add it in Git Repo for others.
- Settings hierarchy:
  - Enterprise managed
  - Use: ~/.claude/
  - Project shared: .claude/
  - Project local: .claude/
- `/permissions` build an allowlist. Automode good but sill can be bypassed, do not use it intially in new projects.
- Plan before you let it code, huge impact in better outcome. Go to plan mode (Shift+Tab), edit the plan, and implement (Ctrl+G). Ask what issues anticipates, what could go wrong and what is missing. Include Acceptance Criteria in the plan so you can measure so know when plan succeded.
- `/compact`, `/clear`, `/context` quality degrades smoothly as context fills.
- Steer in real time. Don't wait agent to finish wrong turn. `Esc` interrupt, `Esc+Esc` rewind last message and `Shift+b` execute in background.
- Give it a way to check its own work. Anthropic calls this "the single most impactful practice". Give specific tests and tools to run it.

## MCP

Local MCPs for quick reviews.

- ~/AppData/Roaming/Code/User/mcp.json
- .vscode/mcp.json
