# claude-god Development Guide

**Workspace:** Inherits conventions from `~/chrislyons/dev/CLAUDE.md`
**Documentation PREFIX:** CGD

---

## Configuration Inheritance

This repository follows a three-tier configuration hierarchy:

1. **This file (CLAUDE.md)** — Repository-specific rules and conventions
2. **Workspace config** (`~/chrislyons/dev/CLAUDE.md`) — Cross-repo patterns
3. **Global config** (`~/.claude/CLAUDE.md`) — Universal rules

**Conflict Resolution:** Repo > Workspace > Global > Code behavior

---

## Documentation Standards

### Naming Convention

**CRITICAL:** All PREFIX-numbered documentation MUST include a descriptive title.

**Pattern:** `{CGD###} {Verbose Title}.md`

- **PREFIX:** CGD (all caps)
- **NUMBER:** 3-4 digits, sequential
- **SPACE:** Single space separator (REQUIRED)
- **TITLE:** Descriptive title indicating content (REQUIRED)
- **Extension:** `.md` or `.mdx`

**Examples (CORRECT):**
- `CGD001 Project Overview.md`
- `CGD042 Sprint 7 Implementation.md`
- `CGD100 Architecture Decisions.md`

**Examples (WRONG - DO NOT USE):**
- ❌ `CGD001.md` (missing title)
- ❌ `CGD-001-Overview.md` (wrong separator format)
- ❌ `001 Overview.md` (missing PREFIX)

### Creating New Documents

1. **Check existing numbers:**
   ```bash
   ls -1 docs/cgd/ | grep -E '^CGD[0-9]{3,4}\s+' | sort
   ```

2. **Find next number:**
   ```bash
   # Get highest number + 1
   last=$(ls -1 docs/cgd/ | grep -E '^CGD[0-9]{3}' | sed -E 's/CGD([0-9]+).*/\1/' | sort -n | tail -1)
   next=$((last + 1))
   echo "Next: CGD${next} Your Title Here.md"
   ```

3. **Use template:**
   ```markdown
   # Title

   Brief 1-4 sentence purpose statement.

   ## Context

   Background and motivation.

   ## Decisions / Implementation

   Technical details and rationale.

   ## Next Actions

   - [ ] Task 1
   - [ ] Task 2

   ## References

   [1] https://example.com/resource1
   [2] https://example.com/resource2
   ```

### Citation Style

Use IEEE-style numbered citations: `[1]`, `[2]`, etc.

References section should contain plain URLs (no markdown links in references).

---

## Documentation Indexing

**Active Documentation:**
- `docs/cgd/` — All current documents

**Excluded from Indexing:**
- `docs/cgd/archive/**` — Archived documents (180+ days old)
- `*.draft.md` — Draft documents not yet finalized

**Archive Management:**
Use `~/dev/scripts/archive-old-docs.sh` to move docs older than 180 days.

---

## Documentation Discovery (On-Demand Only)

**CRITICAL:** PREFIX docs in `docs/cgd/` are excluded from auto-indexing to save context. Access them on-demand only.

**Find highest 6 docs:**
```bash
ls -1 docs/cgd/CGD*.md | sort -V | tail -6
```

**Read specific doc (example):**
```bash
# Use Read tool with specific path:
docs/cgd/CGD001 Project Overview.md
```

**Search for topic:**
```bash
grep -l "keyword" docs/cgd/*.md
```

---

## Skill Loading

Skills are lazy-loaded based on file patterns to reduce context overhead.

**Template-Based Skills** (from `~/dev/.claude/skill-templates/`):

- **ci-troubleshooter** → `.github/workflows/**/*.yml`
- **test-analyzer** → `tests/**/*`, `**/*.test.*`
- **schema-linter** → `**/*.{json,yaml,yml}` (excludes build, node_modules)
- **dependency-audit** → `package.json`, `pnpm-lock.yaml`, etc. (triggers on change)
- **doc-standards** → `docs/cgd/**/*.md`

**Skip Skills For:**
- Quick edits (<5 min, single file changes)
- Read-only exploration
- Docs-only sessions without code changes

**Config:** See `.claude/skills.json` for file pattern mappings.

---

## Project Structure

```
claude-god/
├── CLAUDE.md              # This file (repo conventions)
├── README.md              # Project overview
├── docs/cgd/    # Documentation (CGD### Title.md files)
│   └── INDEX.md           # Document registry
├── src/                   # Source code
├── tests/                 # Test suite
├── .claude/               # Claude Code configuration
│   ├── skills.json        # Skill loading configuration
│   └── scratch/           # Temporary workspace (gitignored)
├── .claudeignore          # Claude Code ignore patterns
└── .gitignore             # Git ignore patterns
```

---

## Quick Reference

### Common Tasks

**Check for documentation clutter:**
```bash
~/dev/scripts/find-root-clutter.sh
```

**Check for PREFIX collisions:**
```bash
~/dev/scripts/check-prefix-collisions.sh --verbose
```

**Archive old documentation:**
```bash
~/dev/scripts/archive-old-docs.sh
```

**Validate configuration hierarchy:**
```bash
~/dev/scripts/validate-config-hierarchy.sh
```

---

## Additional Resources

- **Workspace config:** `~/chrislyons/dev/CLAUDE.md`
- **Global config:** `~/.claude/CLAUDE.md`
- **Skill templates:** `~/dev/.claude/skill-templates/`
- **Automation scripts:** `~/dev/scripts/`

---

## Context Management

- Use `/clear` between unrelated tasks
- Read files selectively based on current task
- Archive docs >180 days: `~/dev/scripts/archive-old-docs.sh`

---

## Feature Implementation

7-parallel-task for React/TS features:
1. Component files
2. Styles
3. Tests
4. Types
5. Hooks/utils
6. Integration (routing, exports)
7. Remaining (docs, config)

Always read files before editing.

---

## Frontend (If Applicable)

**Design Context Required:** Check for `DESIGN_BRIEF.md` before UI implementation.

**Measurement-based feedback only:**
- ✅ "Gap is 32px, should be 12px"
- ❌ "Make it more compact"

**Shared resources:**
- Fonts: `~/dev/shared-fonts/fontshare/`
- Guides: `~/dev/docs/claude-code-frontend-best-practices.md`, `~/dev/docs/media-asset-handling-guide.md`

---

**Last Updated:** 2026-01-02
