export function initThemeToggle() {
  const toggle = document.querySelector('[data-theme-toggle]');

  if (!toggle) {
    console.warn('Theme toggle button not found');
    return;
  }

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Toggle theme on click
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
