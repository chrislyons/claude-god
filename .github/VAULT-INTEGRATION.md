# Obsidian Vault Integration (Option 4)

This file explains how to use your Claude vault alongside the public claude-god tutorial.

## Setup

### 1. Create a Learning Note

In `~/dev/claude-vault/inbox/`, create a file like `claude-god-learning-2026.md`:

```yaml
---
agent: human
status: active
source: https://claude-god.pages.dev
public_site: [[../../repos/GCD/GCD001 Architecture]]
confidence: high
tags:
  - claude-god-public
  - claude-code-learning
---

# Claude God - Learning Archive

## Links to Public Sections
- [[../repos/GCD/GCD001 Architecture Overview]]
- [[../repos/GCD/GCD002 Configuration Levels]]

## Personal Notes & Patterns

### How I Use Configuration in My 6 Repos
[Your detailed notes here with carbon-acx, hotbox references]

### Custom Plugins I've Built
[Links to your internal plugins and how they relate to public documentation]

### Workspace Conventions
[Your specific ~/dev/ setup that doesn't belong in public tutorial]
```

### 2. Structure Your Notes by Public Section

Match the structure of the public site:

```
vault/inbox/
└── claude-god/
    ├── architecture-notes.md     → links to public Architecture guide
    ├── plugins-implementation.md → links to public Plugins guide
    ├── sdk-patterns.md           → links to public Agent SDK guide
    └── repo-specific/
        ├── carbon-acx-patterns.md
        ├── hotbox-setup.md
        └── wordbird-config.md
```

### 3. Cross-Reference Pattern

In your vault notes:
```markdown
## From Public Tutorial: Configuration Hierarchy
[[https://claude-god.pages.dev]]

**General concept:** Three levels of configuration (user, project, local)

**How I implemented in carbon-acx:**
- User level: ~/dev/carbon-acx/.claude/settings.json with data processing tools
- Project level: .claude/agents/carbon-analyzer.md
- Local overrides: .claude/settings.local.json for sensitive credentials
```

## Workflow

1. **Encounter something in public tutorial**
2. **Create vault note** expanding on it with personal examples
3. **Link back** to public section using the site URL
4. **Tag** with `#claude-god-public` and `#claude-god-internal`

## Benefits

✅ Keep public site clean and generic
✅ Maintain detailed personal notes separately
✅ Easy to see which public concepts apply to your setup
✅ Can update public tutorial without affecting vault
✅ Learn from both versions simultaneously

## Don't

- ❌ Copy personal content into public site
- ❌ Link vault notes as source of truth for public content
- ❌ Use vault as draft for public site (maintain separate)
- ❌ Commit vault changes to git (vault is local/private)

---

## Tag Strategy

Use these tags in your vault to keep public and internal content organized:

| Tag | Meaning |
|-----|---------|
| `#claude-god-public` | References the public tutorial site |
| `#claude-god-internal` | Personal implementation notes |
| `#claude-code-learning` | General Claude Code concepts |
| `#6-repo-pattern` | Specific to your multi-repo setup |

---

**Created:** 2026-01-04
**Integration:** Obsidian vault + claude-god public site (Option 4)
