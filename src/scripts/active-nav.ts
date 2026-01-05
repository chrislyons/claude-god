export function initActiveNav() {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const sections = document.querySelectorAll('section[id]');

  // IntersectionObserver to track visible sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          // Remove active class and aria-current from all links
          navLinks.forEach((link) => {
            link.classList.remove('active');
            link.setAttribute('aria-current', 'false');
          });

          // Add active class and aria-current to corresponding link
          const activeLink = document.querySelector(`[data-nav-link="${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
          }
        }
      });
    },
    {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    }
  );

  // Observe all sections
  sections.forEach((section) => observer.observe(section));
}

// Initialize on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initActiveNav);
}
