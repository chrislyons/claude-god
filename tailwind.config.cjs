/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          accent: '#F55036',
        },
        bg: {
          light: '#FAF9F6',
          dark: '#1A1514',
        },
        text: {
          light: '#2D2926',
          dark: '#E8E6E3',
        },
        code: {
          bg: {
            light: '#F5F3F0',
            dark: '#2A2421',
          },
        },
        border: {
          light: '#E5E0DB',
          dark: '#3A3330',
        },
        success: '#2D7A4F',
        warning: '#F59E0B',
        info: '#3B82F6',
        danger: '#DC2626',
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'system-ui', 'sans-serif'],
        code: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      spacing: {
        sidebar: '280px',
        header: '64px',
      },
      maxWidth: {
        content: '1000px',
      },
    },
  },
  plugins: [],
};
