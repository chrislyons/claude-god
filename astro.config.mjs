import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { validateGuideConfig } from './src/utils/validate-guides';

// Validate guide configuration at build time
validateGuideConfig();

// https://astro.build/config
export default defineConfig({
  site: 'https://claude-god.pages.dev/',
  base: '/claude-god/',
  integrations: [
    tailwind({
      applyBaseStyles: false, // Use custom base styles
    }),
    mdx({
      shikiConfig: {
        theme: 'one-dark-pro',
        wrap: true,
      },
    }),
  ],
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
