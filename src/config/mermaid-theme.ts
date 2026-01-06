export interface MermaidThemeConfig {
  primaryColor: string;
  primaryTextColor: string;
  primaryBorderColor: string;
  lineColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  background: string;
  mainBkg: string;
  secondaryBkg: string;
  tertiaryBkg: string;
  edgeLabelBackground: string;
  fontFamily: string;
  nodeBorder: string;
  clusterBkg: string;
  clusterBorder: string;
  titleColor: string;
  actorTextColor: string;
  labelTextColor: string;
  loopTextColor: string;
  activationBorderColor: string;
  signalColor: string;
  signalTextColor: string;
}

export const MERMAID_THEMES: Record<'light' | 'dark', MermaidThemeConfig> = {
  light: {
    primaryColor: '#F5F3F0',
    primaryTextColor: '#2D2926',
    primaryBorderColor: '#999',
    lineColor: '#F55036',
    secondaryColor: '#3B82F6',
    tertiaryColor: '#2D7A4F',
    background: 'transparent',
    mainBkg: '#F5F3F0',
    secondaryBkg: '#FAF9F6',
    tertiaryBkg: '#F5F3F0',
    edgeLabelBackground: 'white',
    fontFamily: 'Satoshi, system-ui, sans-serif',
    nodeBorder: '#999',
    clusterBkg: '#F5F3F0',
    clusterBorder: '#999',
    titleColor: '#2D2926',
    actorTextColor: '#2D2926',
    labelTextColor: '#2D2926',
    loopTextColor: '#2D2926',
    activationBorderColor: '#999',
    signalColor: '#2D2926',
    signalTextColor: '#2D2926',
  },
  dark: {
    primaryColor: '#2D1810',
    primaryTextColor: '#FFF8F0',
    primaryBorderColor: '#4A2818',
    lineColor: '#FF6B4A',
    secondaryColor: '#3B82F6',
    tertiaryColor: '#2D7A4F',
    background: 'transparent',
    mainBkg: '#2D1810',
    secondaryBkg: '#1C0F0A',
    tertiaryBkg: '#2D1810',
    edgeLabelBackground: '#1C0F0A',
    fontFamily: 'Satoshi, system-ui, sans-serif',
    nodeBorder: '#4A2818',
    clusterBkg: '#2D1810',
    clusterBorder: '#4A2818',
    titleColor: '#FFF8F0',
    actorTextColor: '#FFF8F0',
    labelTextColor: '#FFF8F0',
    loopTextColor: '#FFF8F0',
    activationBorderColor: '#4A2818',
    signalColor: '#FFF8F0',
    signalTextColor: '#FFF8F0',
  },
};

export function getMermaidTheme(isDark: boolean): MermaidThemeConfig {
  return MERMAID_THEMES[isDark ? 'dark' : 'light'];
}
