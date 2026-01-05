export function initMobileMenu() {
  const menu = document.querySelector('[data-mobile-menu]') as HTMLElement;
  const toggle = document.querySelector('[data-mobile-menu-toggle]') as HTMLButtonElement;
  const backdrop = document.querySelector('[data-mobile-menu-backdrop]') as HTMLElement;
  const panel = document.querySelector('[data-mobile-menu-panel]') as HTMLElement;
  const close = document.querySelector('[data-mobile-menu-close]') as HTMLButtonElement;
  const links = document.querySelectorAll('[data-mobile-menu-link]');

  if (!menu || !toggle || !backdrop || !panel || !close) {
    console.warn('Mobile menu elements not found');
    return;
  }

  let isOpen = false;
  let isAnimating = false;
  let lastFocusedElement: HTMLElement | null = null;

  function openMenu() {
    if (isAnimating) return;
    isAnimating = true;
    isOpen = true;
    lastFocusedElement = document.activeElement as HTMLElement;

    menu.classList.remove('hidden');
    toggle.setAttribute('aria-expanded', 'true');

    // Trigger animation
    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
      panel.style.transform = 'translateX(0)';
    });

    // Focus first link
    const firstLink = panel.querySelector('a') as HTMLElement;
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 300);
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    setTimeout(() => { isAnimating = false; }, 300);
  }

  function closeMenu() {
    if (isAnimating) return;
    isAnimating = true;
    isOpen = false;

    backdrop.style.opacity = '0';
    panel.style.transform = 'translateX(100%)';
    toggle.setAttribute('aria-expanded', 'false');

    // Remove from DOM after animation
    setTimeout(() => {
      menu.classList.add('hidden');
      document.body.style.overflow = '';

      // Restore focus
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }

      isAnimating = false;
    }, 300);
  }

  // Event listeners
  toggle.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Handle mobile menu accordion
  const mobileAccordions = panel.querySelectorAll('[data-mobile-menu-accordion]');
  mobileAccordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
      const guideId = accordion.getAttribute('data-accordion-toggle');
      const content = panel.querySelector(`#mobile-accordion-content-${guideId}`);
      const chevron = accordion.querySelector('.accordion-chevron');
      const isExpanded = accordion.getAttribute('aria-expanded') === 'true';

      // Close all other mobile accordions
      mobileAccordions.forEach(other => {
        if (other !== accordion) {
          const otherId = other.getAttribute('data-accordion-toggle');
          const otherContent = panel.querySelector(`#mobile-accordion-content-${otherId}`);
          const otherChevron = other.querySelector('.accordion-chevron');

          other.setAttribute('aria-expanded', 'false');
          other.classList.remove('accordion-active');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherChevron) otherChevron.classList.remove('rotate-90');
        }
      });

      // Toggle current
      if (isExpanded) {
        accordion.setAttribute('aria-expanded', 'false');
        accordion.classList.remove('accordion-active');
        if (content) content.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-90');
      } else {
        accordion.setAttribute('aria-expanded', 'true');
        accordion.classList.add('accordion-active');
        if (content) content.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-90');
      }
    });
  });

  // Keyboard: Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isOpen) {
      closeMenu();
    }
  });
}
