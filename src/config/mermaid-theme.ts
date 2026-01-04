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
    primaryColor: '#2A2421',
    primaryTextColor: '#E8E6E3',
    primaryBorderColor: '#999',
    lineColor: '#F55036',
    secondaryColor: '#3B82F6',
    tertiaryColor: '#2D7A4F',
    background: 'transparent',
    mainBkg: '#2A2421',
    secondaryBkg: '#1A1514',
    tertiaryBkg: '#2A2421',
    edgeLabelBackground: '#1A1514',
    fontFamily: 'Satoshi, system-ui, sans-serif',
    nodeBorder: '#999',
    clusterBkg: '#2A2421',
    clusterBorder: '#999',
    titleColor: '#E8E6E3',
    actorTextColor: '#E8E6E3',
    labelTextColor: '#E8E6E3',
    loopTextColor: '#E8E6E3',
    activationBorderColor: '#999',
    signalColor: '#E8E6E3',
    signalTextColor: '#E8E6E3',
  },
};

export function getMermaidTheme(isDark: boolean): MermaidThemeConfig {
  return MERMAID_THEMES[isDark ? 'dark' : 'light'];
}
