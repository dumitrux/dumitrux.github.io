---
permalink: github-codespaces-devcontainers
title: "GitHub Codespaces & Dev Containers: Consistent Environments in Seconds"
description: "How to use Dev Containers and devcontainer.json to create reproducible development environments for GitHub Codespaces, VS Code, and beyond."
date: 2026-04-12
tags: ["DevOps", "Infrastructure"]
secondaryTags: ["GitHub", "Docker", "Developer Experience"]
thumbnail: "/images/blog/devcontainers-thumbnail.svg"
lang: en
---

Setting up a dev environment shouldn't take a full day. Clone, install, configure, debug missing dependencies, install the right version of Node... you know the drill. **Dev Containers** fix this by defining your environment as code.

## What Are Dev Containers?

[Dev Containers](https://containers.dev/) is an **open specification** for defining development environments using Docker containers. The configuration lives in a `devcontainer.json` file inside your repository.

When you open the project in GitHub Codespaces or VS Code (with the Dev Containers extension), it:

1. Builds or pulls the container image
2. Installs the specified tools and extensions
3. Runs any setup commands
4. Drops you into a fully configured environment

Everyone on the team gets the **exact same setup**. No more "it works on my machine."

## The devcontainer.json File

Place it at `.devcontainer/devcontainer.json`:

```json
{
  "name": "My Project",
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

Features are the real superpower. Instead of writing Dockerfiles to install tools, you **compose pre-built modules**. Some popular ones:

| Feature | What It Installs |
|---|---|
| `ghcr.io/devcontainers/features/python:1` | Python + pip |
| `ghcr.io/devcontainers/features/node:1` | Node.js + npm |
| `ghcr.io/devcontainers/features/azure-cli:1` | Azure CLI |
| `ghcr.io/devcontainers/features/docker-in-docker:1` | Docker inside the container |
| `ghcr.io/devcontainers/features/kubectl-helm-minikube:1` | Kubernetes tools |
| `ghcr.io/devcontainers/features/terraform:1` | Terraform CLI |
| `ghcr.io/devcontainers/features/github-cli:1` | GitHub CLI (gh) |
| `ghcr.io/devcontainers/features/powershell:1` | PowerShell |

Browse all available features at [containers.dev/features](https://containers.dev/features).

You can also **create your own features** and publish them to a container registry.

## GitHub Codespaces

GitHub Codespaces is a cloud-hosted dev environment that uses Dev Containers under the hood. When you click "Create Codespace" on a repo:

1. GitHub provisions a VM
2. Builds the container from `devcontainer.json`
3. Opens VS Code in the browser (or your local VS Code)

### Why Codespaces?

- **Zero local setup** — works from any machine, even a tablet
- **Prebuilds** — configure prebuilt images so Codespaces start in seconds instead of minutes
- **Consistent** — the `devcontainer.json` is version-controlled, so every branch can have its own config
- **Secure** — code stays in the cloud, not on local machines (important for enterprise)

### Prebuilds

For large projects, you can configure **prebuilds** that build the container image in advance:

1. Go to repo **Settings → Codespaces → Prebuilds**
2. Configure which branches trigger a prebuild
3. Codespaces start almost instantly

## Using a Custom Dockerfile

For more control, reference a Dockerfile:

```json
{
  "name": "Custom Environment",
  "build": {
    "dockerfile": "Dockerfile",
    "context": ".."
  },
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {}
  }
}
```

This lets you combine a custom base image with Dev Container Features.

## Lifecycle Scripts

You can run scripts at different stages:

| Hook | When It Runs |
|---|---|
| `initializeCommand` | Before the container is created (runs on host) |
| `onCreateCommand` | After the container is created (first time only) |
| `updateContentCommand` | After creating or updating content |
| `postCreateCommand` | After everything is set up |
| `postStartCommand` | Every time the container starts |
| `postAttachCommand` | Every time a tool attaches to the container |

```json
{
  "postCreateCommand": "pip install -r requirements.txt && npm install",
  "postStartCommand": "echo 'Ready to code!'"
}
```

## My Take

Dev Containers changed how I onboard to projects. Instead of a wiki page with 20 steps, I point people to the `devcontainer.json` and say "open in Codespaces." Five minutes later, they're writing code.

If you maintain a project with more than one contributor, **add a devcontainer.json today**. Start simple with an image and a few features, then iterate.
