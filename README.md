# ClaudeGod

**Comprehensive guide to Claude Code architecture, configuration, and best practices.**

A modern, modular documentation site built with Astro, featuring:
- Three-level configuration hierarchy (User/Repo/Local)
- Agent and skill management patterns
- Best practices and troubleshooting guides
- Beautiful, responsive design with dark mode

**Live Site:** [claude-god.pages.dev](https://claude-god.pages.dev) *(deployment pending)*

---

## Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev
# → http://localhost:4321

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Deployment

```bash
# Build for Cloudflare Pages
pnpm run cf:pages

# Deploy to Cloudflare Pages
# → Connect repo at pages.cloudflare.com
# → Build command: pnpm run cf:pages
# → Build output: dist/
```

---

## Tech Stack

- **Framework:** Astro 4.16.19 (Static Site Generator)
- **Styling:** Tailwind CSS 3.4.19 + custom CSS
- **Content:** MDX 3.1.9 with content collections
- **Syntax Highlighting:** Shiki (one-dark-pro theme)
- **Diagrams:** Mermaid 10.9.5
- **Typography:** Cabinet Grotesk + Satoshi (local fonts)

---

## Project Structure

```
claude-god/
├── public/
│   └── fonts/              # Local font files
├── src/
│   ├── components/         # Reusable Astro components
│   ├── content/guide/      # MDX documentation sections
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   ├── scripts/            # Client-side TypeScript
│   └── styles/             # Global CSS and typography
├── docs/cgd/               # CGD-prefixed documentation
└── dist/                   # Build output (gitignored)
```

---

## Documentation

### CGD Prefix Registry

| Prefix | Purpose |
|--------|---------|
| **CGD** | Primary documentation for claude-god project |

### Available Docs

- [CGD001 Astro Migration Complete](./docs/cgd/CGD001%20Astro%20Migration%20Complete.md)

---

## Development Guidelines

See [`CLAUDE.md`](./CLAUDE.md) for:
- Documentation naming conventions
- Skill loading configuration
- Project-specific patterns
- Frontend design standards

---

## Features

- ✅ Three-level configuration hierarchy guide
- ✅ Agent and skill management documentation
- ✅ Interactive navigation with active section highlighting
- ✅ Dark mode with localStorage persistence
- ✅ Responsive mobile layout
- ✅ Mermaid diagrams for architecture visualization
- ✅ Syntax-highlighted code examples
- ✅ Searchable content (future enhancement)

---

## Contributing

This is a reference documentation site. For updates:
1. Content lives in `src/content/guide/*.mdx`
2. Components in `src/components/*.astro`
3. Follow naming conventions in `CLAUDE.md`
4. Test build with `pnpm run build`

---

## License

MIT License - Documentation for Claude Code architecture and best practices.

