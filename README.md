# ClaudeGod

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with Astro](https://img.shields.io/badge/Built_with-Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build)

**Open-source guide to Claude Code architecture, configuration, and best practices.**

A modern, modular documentation site built with Astro, featuring:
- 📚 Three-level configuration hierarchy (User/Workspace/Repo)
- 🤖 Agent and skill management patterns
- 🛠️ Best practices and troubleshooting guides
- 🎨 Beautiful, responsive design with dark mode
- 🔍 Searchable content with syntax-highlighted examples

**Live Site:** [claude-god.pages.dev](https://claude-god.pages.dev)

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

We welcome contributions to improve this guide! Here's how to help:

### Content Updates
1. **Documentation:** Edit files in `src/content/guide/*.mdx` or `src/content/plugins/*.mdx`
2. **Components:** Improve UI in `src/components/*.astro`
3. **Styling:** Modify themes in `src/styles/`

### Before Submitting
1. Follow the naming conventions in [`CLAUDE.md`](./CLAUDE.md)
2. Test your changes:
   ```bash
   pnpm install
   pnpm run build
   pnpm run preview
   ```
3. Ensure all syntax highlighting and diagrams render correctly
4. Submit a pull request with a clear description of your changes

### Reporting Issues
Found a bug or have a suggestion? [Open an issue](https://github.com/chrislyons/claude-god/issues) with:
- Clear description of the problem or enhancement
- Steps to reproduce (for bugs)
- Screenshots (if applicable)

---

## License

MIT License - See [LICENSE](./LICENSE) for details.

This is an open-source documentation project for Claude Code architecture and best practices.

---

## Acknowledgments

- Built with [Astro](https://astro.build)
- Syntax highlighting by [Shiki](https://github.com/shikijs/shiki)
- Diagrams powered by [Mermaid](https://mermaid.js.org)
- Typography: [Cabinet Grotesk](https://fonts.adobe.com/fonts/cabinet-grotesk) + [Satoshi](https://www.fontshare.com/fonts/satoshi)

---

**Questions?** Check out the [documentation](https://claude-god.pages.dev) or [open an issue](https://github.com/chrislyons/claude-god/issues).

