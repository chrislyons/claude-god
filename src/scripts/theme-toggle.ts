// Use a flag to prevent multiple initialization
let themeToggleInitialized = false;

export function initThemeToggle() {
  if (themeToggleInitialized) {
    return;
  }

  const toggle = document.querySelector('[data-brand-toggle]');

  if (!toggle) {
    console.warn('Brand toggle button not found');
    return;
  }

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Validate saved theme
  const validThemes = ['light', 'dark', 'ember'];
  const initialTheme = validThemes.includes(savedTheme) ? savedTheme : 'light';

  document.documentElement.setAttribute('data-theme', initialTheme);

  // Cycle through themes: light → dark → ember → light
  const handleThemeToggle = () => {
    const current = document.documentElement.getAttribute('data-theme');
    let newTheme: string;

    if (current === 'light') newTheme = 'dark';
    else if (current === 'dark') newTheme = 'ember';
    else newTheme = 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Brief transition animation
    document.documentElement.style.transition = 'background-color 200ms ease-out, color 200ms ease-out';
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 200);
  };

  toggle.addEventListener('click', handleThemeToggle);
  themeToggleInitialized = true;
}
