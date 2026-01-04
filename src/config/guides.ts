export interface NavigationItem {
  id: string;
  label: string;
}

export interface GuideConfig {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  collection: string;
  navigation: NavigationItem[];
  features?: {
    codeTabs?: boolean;  // For agent-sdk code examples
    diagrams?: boolean;   // For mermaid diagrams
  };
}

export const GUIDES: Record<string, GuideConfig> = {
  quickStart: {
    id: 'quickStart',
    title: 'Quick Start',
    subtitle: '5-Minute Setup',
    route: '/quick-start',
    collection: 'quickStart',
    navigation: [
      { id: 'installation', label: 'Installation' },
      { id: 'first-steps', label: 'First Steps' },
      { id: 'common-tasks', label: 'Common Tasks' },
    ],
  },
  noCode: {
    id: 'noCode',
    title: 'No-Code',
    subtitle: 'Non-Coding Workflows',
    route: '/no-code',
    collection: 'noCode',
    navigation: [
      { id: 'overview', label: 'Overview' },
      { id: 'research-workflows', label: 'Research Workflows' },
      { id: 'writing-automation', label: 'Writing & Content' },
      { id: 'document-processing', label: 'Document Processing' },
      { id: 'data-analysis', label: 'Data Analysis' },
      { id: 'web-research', label: 'Web Research' },
      { id: 'automation-scripts', label: 'Simple Automation' },
    ],
  },
  architecture: {
    id: 'architecture',
    title: 'Claude CLI',
    subtitle: 'Architecture Guide',
    route: '/',
    collection: 'guide',
    navigation: [
      { id: 'overview', label: 'Overview' },
      { id: 'architecture-levels', label: 'Architecture Levels' },
      { id: 'migration-summary', label: 'Migration Summary' },
      { id: 'configuration-files', label: 'Configuration Files' },
      { id: 'agents-skills', label: 'Agents & Skills' },
      { id: 'best-practices', label: 'Best Practices' },
      { id: 'examples', label: 'Examples' },
      { id: 'troubleshooting', label: 'Troubleshooting' },
      { id: 'quick-reference', label: 'Quick Reference' },
    ],
  },
  agentSdk: {
    id: 'agentSdk',
    title: 'Agent SDK',
    subtitle: 'Complete Guide',
    route: '/agent-sdk',
    collection: 'agentSdk',
    features: {
      codeTabs: true,
      diagrams: true,
    },
    navigation: [
      { id: 'what-is-sdk', label: 'What is Agent SDK?' },
      { id: 'relation-to-cli', label: 'Relationship to CLI' },
      { id: 'use-cases', label: 'What Can You Build?' },
      { id: 'basic-workflow', label: 'Basic Workflow' },
      { id: 'key-apis', label: 'Key APIs' },
      { id: 'code-examples', label: 'Code Examples' },
      { id: 'cli-vs-sdk', label: 'CLI vs SDK' },
      { id: 'concepts-patterns', label: 'Concepts & Patterns' },
      { id: 'getting-started', label: 'Getting Started' },
      { id: 'documentation', label: 'Documentation' },
    ],
  },
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
};

// Helper to get guide list for navigation
export function getGuideList(): Array<{ id: string; title: string; route: string }> {
  return Object.values(GUIDES).map(g => ({
    id: g.id,
    title: g.title,
    route: g.route,
  }));
}
