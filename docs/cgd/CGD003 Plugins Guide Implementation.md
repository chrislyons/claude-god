# CGD003 Plugins Guide Implementation

Complete implementation of a new `/plugins` guide page for the ClaudeGod documentation site.

## Context

After installing 8 essential Claude Code plugins (ralph-wiggum, commit-commands, frontend-design, security-guidance, hookify, pr-review-toolkit, feature-dev, agent-sdk-dev), the user needed comprehensive documentation about how to use them effectively in a multi-repo workflow.

**Problem Solved:**
- Some plugins are complex (ralph-wiggum, hookify) and require understanding best practices
- Other plugins are automatic (security-guidance, frontend-design) but users didn't know they existed
- No centralized guide for the 8-plugin stack

**Solution:**
Created a new `/plugins` guide following the existing ClaudeGod architecture pattern, with 8 sections covering all essential plugins.

---

## Implementation Summary

**Files Created:**
1. `src/config/guides.ts` - Added plugins guide definition
2. `src/content/plugins/*.mdx` - 8 MDX content files (sections 1-8)
3. `src/pages/plugins.astro` - Page template
4. `docs/cgd/CGD003 Plugins Guide Implementation.md` - This file

**Route:** `/plugins`
**URL:** http://localhost:4322/plugins

---

## Files Modified

### 1. src/config/guides.ts

**Change:** Added `plugins` guide definition to GUIDES object.

**Code:**
```typescript
plugins: {
  id: 'plugins',
  title: 'Plugins',
  subtitle: 'Complete Guide',
  route: '/plugins',
  collection: 'plugins',
  features: {
    codeTabs: true,
    diagrams: true,
  },
  navigation: [
    { id: 'overview', label: 'Overview' },
    { id: 'installation', label: 'Installation' },
    { id: 'essential-plugins', label: 'Essential Plugins' },
    { id: 'ralph-wiggum', label: 'Ralph Wiggum' },
    { id: 'hookify', label: 'Hookify' },
    { id: 'frontend-security', label: 'Frontend & Security' },
    { id: 'agent-sdk-dev', label: 'Agent Development' },
    { id: 'marketplace', label: 'Marketplace' },
  ],
},
```

**Result:** Sidebar automatically includes plugins guide in navigation.

---

## Content Files Created

### src/content/plugins/01-overview.mdx
**Section:** Overview
**Topics:**
- What are Claude Code plugins?
- Plugin types (Commands, Skills, Agents, Hooks)
- Benefits for multi-repo workflows
- The 8 essential plugins table
- What you'll learn

**Key Content:**
- Explains plugin architecture
- Sets context for the 8-plugin stack
- Differentiates simple vs complex plugins

---

### src/content/plugins/02-installation.mdx
**Section:** Installation
**Topics:**
- `claude plugin install` commands
- Managing plugins (enable, disable, uninstall, update)
- Marketplace discovery
- Troubleshooting

**Key Content:**
- All 8 installation commands ready to copy/paste
- Plugin management lifecycle
- Official marketplace link

---

### src/content/plugins/03-essential-plugins.mdx
**Section:** Essential Plugins
**Topics:**
- commit-commands (`/commit`, `/commit-push-pr`, `/clean_gone`)
- pr-review-toolkit (6 specialized agents)
- feature-dev (7-phase workflow)

**Key Content:**
- Self-guided plugins that don't require complex setup
- Real workflow examples
- When to use each plugin

---

### src/content/plugins/04-ralph-wiggum.mdx
**Section:** Ralph Wiggum (MOST IMPORTANT)
**Topics:**
- How autonomous iteration loops work
- Command syntax with all parameters
- Real examples for the user's 6-repo workflow
- Prompting best practices
- When to use vs avoid

**Key Content:**
- **Production examples:**
  - PREFIX doc compliance sweep
  - Overnight refactoring with test validation
  - TDD feature development
  - Cross-repo pattern enforcement
- **Best practices:**
  - Always set `--max-iterations`
  - Clear completion criteria
  - Self-correction loops
  - Safety mechanisms
- **Testing guide** for first-time users

---

### src/content/plugins/05-hookify.mdx
**Section:** Hookify
**Topics:**
- Custom rule enforcement
- Commands (`/hookify`, `/hookify:list`, `/hookify:configure`)
- PREFIX naming enforcement (user's specific use case)
- Hook syntax patterns
- Multi-repo hook strategy

**Key Content:**
- **Real use case:** Blocking PREFIX files without titles
- **Hook patterns:**
  - File pattern matching
  - Content pattern matching
  - Action types (Block, Warn, Confirm)
- **Pairing with ralph-wiggum:** hookify prevents, ralph fixes
- User-level vs repo-level hooks

---

### src/content/plugins/06-frontend-security.mdx
**Section:** Frontend & Security
**Topics:**
- frontend-design (auto-invoked skill)
- security-guidance (PreToolUse hook)
- How they work automatically

**Key Content:**
- **frontend-design:**
  - References user's font library and spacing standards
  - Active repos: osd-v2, orpheus-sdk/apps/clip-composer, listmaker, etc.
  - Example of good vs generic output
- **security-guidance:**
  - 9 security patterns monitored
  - Multi-language support (Python, TS, Rust, C++)
  - What happens when triggered
- No action required - just install

---

### src/content/plugins/07-agent-sdk-dev.mdx
**Section:** Agent Development
**Topics:**
- Validating existing agents in `.claude/agents/`
- Building new agents with `/new-sdk-app`
- Python and TypeScript validators
- Best practices

**Key Content:**
- User already has agents in 6 repos
- Validator catches common issues (missing await, wrong imports, no error handling)
- CLI agents vs SDK apps
- When to use each

---

### src/content/plugins/08-marketplace.mdx
**Section:** Marketplace
**Topics:**
- Official marketplace browsing
- Available plugins (what's installed vs not)
- Evaluating new plugins (problem, token cost, conflicts)
- Building custom plugins
- Custom plugin ideas for the user's workflow

**Key Content:**
- **Evaluation criteria:**
  - What problem does it solve?
  - What's the token cost?
  - Does it conflict?
  - Is it maintained?
- **Building guide:** When to build, plugin anatomy, using plugin-dev
- **Custom ideas:** Cross-repo doc syncer, PREFIX checker, multi-repo test runner
- Integration with MCP servers

---

## Page File Created

### src/pages/plugins.astro

**Pattern:** Follows existing guide page structure.

**Code:**
```astro
---
import GuideLayout from '../layouts/GuideLayout.astro';
import { GUIDES } from '../config/guides';
import { loadGuideContent } from '../utils/guide-loader';

const guide = GUIDES.plugins;
const sections = await loadGuideContent(guide.collection);
---

<GuideLayout
  title="Claude Code Plugins - Complete Guide"
  description="Master Claude Code plugins: autonomous iteration loops, custom enforcement rules, and workflow automation"
  headerTitle="Plugins Guide"
  guideId="plugins"
>
  <h1>Claude Code Plugins</h1>
  <p style="font-size: 1.1em; opacity: 0.8; margin-bottom: 3rem;">
    Extend Claude Code with 8 essential plugins: autonomous iteration (ralph-wiggum), custom rules (hookify), workflow automation, and more.
  </p>

  {sections.map(({ id, Content }) => (
    <section id={id}>
      <Content />
    </section>
  ))}
</GuideLayout>
```

**Result:** Page renders at `/plugins` with all 8 sections loaded dynamically.

---

## Testing

**Dev Server:**
```bash
cd /Users/chrislyons/dev/claude-god
pnpm dev
```

**URL:** http://localhost:4322/plugins

**Results:**
- ✅ Dev server started successfully (port 4322)
- ✅ Page builds without errors
- ✅ All 8 sections render
- ✅ Sidebar navigation includes plugins guide
- ✅ Typography and spacing consistent with other guides

---

## Content Characteristics

**Total Sections:** 8
**Total Words:** ~6,500 words
**Code Examples:** 50+ real-world examples
**Callouts:** 25+ info/warning/success callouts

**Tailored to User:**
- 6-repo setup (carbon-acx, hotbox, orpheus-sdk, wordbird, helm, undone)
- Multi-language stack (Python, TS, Rust, C++)
- PREFIX naming convention: `{PREFIX###} Descriptive Title.md`
- Sprint-based workflow with mandatory documentation
- Design system (Fontshare fonts, workspace-asset-standards.md)

**Not Generic:**
- All examples use user's actual repos
- PREFIX enforcement examples match user's convention
- Frontend examples reference user's font library
- Multi-repo patterns specific to user's 6 projects

---

## Technical Details

**Architecture Pattern:**
1. **Guide Registration** - guides.ts defines metadata
2. **Content Collection** - MDX files in src/content/plugins/
3. **Dynamic Loading** - guide-loader.ts loads and sorts by section number
4. **Page Rendering** - Astro page maps sections to DOM
5. **Sidebar Updates** - Automatic via GUIDES registry

**Features Enabled:**
- `codeTabs: true` - Syntax-highlighted code examples (Python/TS tabs)
- `diagrams: true` - Mermaid diagram support (for future plugin architecture diagrams)

**Components Used:**
- `<Callout type="info|warning|success|danger">` - 25+ callouts for emphasis
- Code blocks with language hints (`bash`, `typescript`, `python`, `json`)
- Tables for comparison (8-plugin overview, when-to-use matrix)

---

## Next Steps

### Deployment
```bash
# Build for production
cd /Users/chrislyons/dev/claude-god
pnpm run build

# Deploy to Cloudflare Pages (already configured)
# Automatic via git push to main
```

### Future Enhancements
1. **Mermaid Diagrams:**
   - Plugin architecture diagram (Commands, Skills, Agents, Hooks)
   - Ralph-wiggum iteration loop flowchart
   - Hookify workflow diagram

2. **Interactive Examples:**
   - ralph-wiggum prompt builder
   - hookify rule generator
   - Plugin compatibility checker

3. **Video Tutorials:**
   - ralph-wiggum in action (overnight refactoring)
   - hookify setup walkthrough
   - Multi-plugin workflow demo

---

## References

[1] https://github.com/anthropics/claude-code/tree/main/plugins - Official plugin marketplace
[2] /Users/chrislyons/dev/claude-god/src/config/guides.ts - Guide configuration
[3] /Users/chrislyons/dev/CLAUDE.md - Workspace conventions
[4] /Users/chrislyons/dev/claude-god/CLAUDE.md - Repo-specific rules

---

**Completion Date:** 2026-01-04
**Total Implementation Time:** ~2 hours
**Files Created:** 11 (1 config, 8 MDX, 1 page, 1 doc)
**Lines of Code:** ~1,500 lines of content
**Status:** Complete and tested locally
