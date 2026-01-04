export function initActiveNav() {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const sections = document.querySelectorAll('section[id]');

  // IntersectionObserver to track visible sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          // Remove active class from all links
          navLinks.forEach((link) => link.classList.remove('active'));

          // Add active class to corresponding link
          const activeLink = document.querySelector(`[data-nav-link="${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
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
