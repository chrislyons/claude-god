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

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';

  // Validate saved theme
  const validThemes = ['light', 'dark'];
  const initialTheme = validThemes.includes(savedTheme) ? savedTheme : 'dark';

  document.documentElement.setAttribute('data-theme', initialTheme);

  // Toggle between light and dark themes
  const handleThemeToggle = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';

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
