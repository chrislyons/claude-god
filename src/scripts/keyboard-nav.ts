export function initKeyboardNav() {
  // Map number keys to guide navigation
  const guideLinks = Array.from(document.querySelectorAll('header nav a[href]')) as HTMLAnchorElement[];

  document.addEventListener('keydown', (e) => {
    // Ignore if user is typing in an input/textarea
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    // Number keys 1-5 for guide navigation
    if (e.key >= '1' && e.key <= '5') {
      const index = parseInt(e.key) - 1;
      if (guideLinks[index]) {
        e.preventDefault();
        window.location.href = guideLinks[index].href;
      }
    }

    // Backslash for theme toggle
    if (e.key === '\\') {
      e.preventDefault();
      const themeButton = document.querySelector('.theme-toggle') as HTMLButtonElement;
      if (themeButton) {
        themeButton.click();
      }
    }
  });
}
