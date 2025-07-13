# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview built site
- `npm start` - Start production server

### Content Development
The project uses Nuxt Content for blog posts located in `content/blog/`. Each blog post is a markdown file with frontmatter containing title, slug, date, header, and excerpt fields.

## Architecture Overview

### Technology Stack
- **Framework**: Nuxt 3 (static site generation mode)
- **Content Management**: Nuxt Content with structured collections
- **Styling**: CSS with Stylus preprocessing, normalize.css, and CSS variables
- **Image Optimization**: Nuxt Image module
- **SEO**: Nuxt Robots, Sitemap, and OG Image generation
- **Dark Mode**: Nuxt Color Mode with class suffix configuration
- **Deployment**: Cloudflare Pages (configured via wrangler.jsonc)

### Project Structure
- `pages/` - File-based routing with dynamic blog post routes
- `components/` - Reusable Vue components including AppIcon, BlogCard, ThemeSwitcher, etc.
- `layouts/` - Default layout with navbar/footer structure and clean layout option
- `content/` - Markdown content with structured blog collection
- `assets/` - Static assets including CSS, data files, and legacy Stylus files
- `public/` - Static files served directly

### Key Configuration
- Static site generation enabled via `target: 'static'` and `nitro.static: true`
- Content highlighting configured for GitHub light/dark themes
- Color mode uses class-based theming without suffix
- Site configured for https://ismail9k.com/ with Google Analytics integration

### Content Schema
Blog posts use a structured schema with required title, slug, and date fields, plus optional header and excerpt objects. Content is organized in numbered directories under `content/blog/`.

### Styling Approach
The project uses a hybrid approach with modern CSS variables for spacing and colors, while maintaining legacy Stylus files in the assets directory. Components use scoped CSS with responsive design patterns.