// Use a flag to prevent multiple initialization
let keyboardNavInitialized = false;

export function initKeyboardNav() {
  if (keyboardNavInitialized) {
    return;
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ignore if user is typing in an input/textarea
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    // Number keys 1-5 for guide navigation
    if (e.key >= '1' && e.key <= '5') {
      const index = parseInt(e.key) - 1;
      // Query accordion headers dynamically each time (handles View Transitions)
      const accordionHeaders = Array.from(document.querySelectorAll('.accordion-header[data-accordion-toggle]')) as HTMLButtonElement[];

      if (accordionHeaders[index]) {
        e.preventDefault();
        // Click the accordion header to expand and navigate
        accordionHeaders[index].click();

        // Get the guide route and navigate
        const guideId = accordionHeaders[index].getAttribute('data-accordion-toggle');
        if (guideId) {
          // Route mapping for all guides (with /claude-god/ prefix)
          const routes: Record<string, string> = {
            'quickStart': '/claude-god/quick-start',
            'noCode': '/claude-god/no-code',
            'architecture': '/claude-god/',
            'agentSdk': '/claude-god/agent-sdk',
            'plugins': '/claude-god/plugins'
          };
          const route = routes[guideId];
          if (route) {
            window.location.href = route;
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
  };

  document.addEventListener('keydown', handleKeyDown);
  keyboardNavInitialized = true;
}
