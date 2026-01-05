export function initKeyboardNav() {
  // Map number keys to guide navigation via accordion
  const accordionHeaders = Array.from(document.querySelectorAll('.accordion-header[data-accordion-toggle]')) as HTMLButtonElement[];

  document.addEventListener('keydown', (e) => {
    // Ignore if user is typing in an input/textarea
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    // Number keys 1-5 for guide navigation
    if (e.key >= '1' && e.key <= '5') {
      const index = parseInt(e.key) - 1;
      if (accordionHeaders[index]) {
        e.preventDefault();
        // Click the accordion header to expand and navigate
        accordionHeaders[index].click();

        // Get the guide route and navigate
        const guideId = accordionHeaders[index].getAttribute('data-accordion-toggle');
        if (guideId) {
          // Find the guide route from the config
          const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
          const routes: Record<string, string> = {
            'quick-start': '/guides/quick-start/',
            'no-code': '/guides/no-code/',
            'claude-cli': '/',
            'agent-sdk': '/guides/agent-sdk/',
            'plugins': '/guides/plugins/'
          };
          const route = routes[guideId];
          if (route) {
            window.location.href = baseUrl + route;
          }
        }
      }
    }

    // Backslash for theme toggle
    if (e.key === '\\') {
      e.preventDefault();
      const brandToggle = document.querySelector('[data-brand-toggle]') as HTMLButtonElement;
      if (brandToggle) {
        brandToggle.click();
      }
    }
  });
}
