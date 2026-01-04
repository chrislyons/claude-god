# Branch Strategy: Dual-Version Documentation

This repository uses a dual-branch approach to maintain both a public tutorial and private learning resources.

## Branches

### `main` (Published)
- **Purpose:** Public-facing tutorial site with anonymized content
- **Audience:** External users learning Claude Code
- **Deployment:** Published to https://claude-god.pages.dev
- **Content:** Generic examples, no personal identifiers or repo names
- **Stability:** Production-ready

### `internal` (Learning Archive)
- **Purpose:** Private reference with full personal details for learning
- **Audience:** Creator only (never published)
- **Content:** Includes specific repo names (carbon-acx, hotbox, etc.), personal workflows, customizations
- **Tracking:** Local or private remote only
- **Use:** Source of truth for understanding patterns, maintaining notes

### `backup/full-content-2026-01-04`
- **Purpose:** Safety backup of original content before anonymization
- **Retention:** Keep indefinitely for reference

## Workflow: Option 1 + Option 4

### When Working on Content

1. **For learning/exploration:**
   ```bash
   git checkout internal
   # Edit with full details, personal repo references, etc.
   git commit -m "Add notes about carbon-acx pattern"
   ```

2. **For public improvements:**
   ```bash
   git checkout main
   # Edit with generic examples
   git commit -m "Improve architecture explanation"
   ```

3. **To port improvements from internal → main:**
   ```bash
   # Review the change on internal
   git checkout internal
   git show <commit-hash>

   # Cherry-pick to main
   git checkout main
   git cherry-pick <commit-hash> --strategy=ours
   # Fix any conflicts to anonymize
   ```

### Content Anonymization Rules

**Internal Branch (allowed):**
- ✅ `carbon-acx`, `hotbox`, `orpheus-sdk`, `wordbird`, `helm`, `undone`
- ✅ `/Users/chrislyons/`, `~/dev/`
- ✅ Personal workflow details
- ✅ Specific project patterns

**Main Branch (forbidden):**
- ❌ Repo names → use `<repo>`, `my-project`, generic examples
- ❌ Home paths → use `~`, `$HOME`, `/path/to/project`
- ❌ Personal identifiers → use "you", "your team", "developer"
- ❌ Specific 6-repo setup → reference "multi-repo workflows" generically

### Obsidian Vault Integration (Option 4)

Create cross-references between the public site and your learning archive:

1. **In claude-vault/inbox/**
   - Create `claude-god-notes.md` with metadata:
   ```yaml
   ---
   related: [[../repos/GCD001 Title]]
   source: https://claude-god.pages.dev/
   status: learning
   ---
   ```

2. **Link back to public tutorial** in your notes
3. **Use tags:** `#claude-god-public`, `#claude-god-internal`
4. **Cross-reference specific patterns:**
   - Public tutorial explains general concept
   - Your vault notes explain how you applied it

## Never

- ⚠️ Never merge `internal` into `main`
- ⚠️ Never push `internal` to public remote
- ⚠️ Never commit personal details to `main`
- ⚠️ Never strip content when porting to `internal`

## Maintenance

- **main:** Update when improving public documentation
- **internal:** Always kept in sync with main's structure, just with details
- **Vault:** Link relevant public sections to your internal notes

---

**Created:** 2026-01-04
**Strategy:** Option 1 (dual branches) + Option 4 (Obsidian vault)
