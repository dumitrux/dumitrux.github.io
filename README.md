# Portfolio — Dumitru

Personal portfolio website built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

## Tech Stack

- **Astro** v5 — static site generator
- **Astro View Transitions** — smooth client-side page navigation without full-page reloads
- **Tailwind CSS** v3 — utility-first styling
- **@tailwindcss/typography** — prose styling for blog posts
- **TypeScript** — strict mode
- **GitHub Pages** — hosting with automated CI/CD

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header.astro   # Navigation, dark mode toggle, language dropdown
│   ├── Hero.astro     # Intro section with career overview
│   ├── Skills.astro   # Work experience with skill tags
│   ├── Projects.astro # Personal/hackathon projects
│   ├── Blog.astro     # Latest blog posts preview
│   └── Footer.astro   # Footer with social links
├── content/
│   └── blog/          # Markdown blog posts (content collection)
├── i18n/
│   └── ui.ts          # EN/ES translations and helper functions
├── layouts/
│   └── Layout.astro   # Base HTML layout with theme persistence
├── pages/
│   ├── index.astro    # English homepage
│   ├── blog/
│   │   ├── index.astro    # Blog listing
│   │   └── [slug].astro   # Blog post detail
│   └── es/            # Spanish versions (same structure)
└── content.config.ts  # Blog collection schema
public/
└── images/            # Static assets (blog thumbnails)
```

## Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to GitHub Pages

Deployment is automated. Push to `main` and the GitHub Actions workflow (`.github/workflows/deploy.yml`) will build and deploy to GitHub Pages.

To set it up on a new repo:

1. Go to **Settings → Pages → Source** and select **GitHub Actions**
2. Push to `main` — the workflow runs automatically

The site URL is configured in `astro.config.mjs` via the `site` property.

## Adding Content

### Blog Posts

Create a `.md` file in `src/content/blog/`:

```markdown
---
title: "Post Title"
description: "Short description"
date: 2026-01-01
tags: ["Tag1", "Tag2"]
thumbnail: "/images/blog/my-thumbnail.svg"
lang: en
---

Post content in Markdown...
```

- Set `lang: en` or `lang: es` to assign the post to a language
- Place thumbnail images in `public/images/blog/`
- Posts appear automatically on the blog listing and homepage preview

### Work Experience

Edit `src/data/experience.ts` — add entries to the `workExperience` array with `slug`, `name`, `description` (EN/ES), `details` (EN/ES), and `skills` tags.

### Personal Projects

Edit `src/data/projects.ts` — add entries to the `personalProjects` array with `slug`, `name`, `description` (EN/ES), `details` (EN/ES), `url`, and `tags`.

### Translations

Edit `src/i18n/ui.ts` — add keys to both the `en` and `es` objects.
