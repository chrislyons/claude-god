// Use a flag to prevent multiple initialization
let activeNavInitialized = false;

export function initActiveNav() {
  if (activeNavInitialized) {
    return;
  }

  const navLinks = document.querySelectorAll('[data-nav-link]');
  const sections = document.querySelectorAll('section[id]');

  // Function to update active link
  function updateActiveLink(id: string) {
    navLinks.forEach((link) => {
      link.classList.remove('active');
      link.setAttribute('aria-current', 'false');
    });

    const activeLink = document.querySelector(`[data-nav-link="${id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-current', 'page');
    }
  }

  // Add immediate feedback on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const linkId = link.getAttribute('data-nav-link');
      if (linkId) {
        // Immediate visual feedback
        updateActiveLink(linkId);
      }
    });
  });

  // IntersectionObserver to track visible sections for continuous updates
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveLink(entry.target.id);
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
  activeNavInitialized = true;
}

// Initialize on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initActiveNav);
}
