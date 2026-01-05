export function initAccordion() {
  const accordionToggles = document.querySelectorAll('[data-accordion-toggle]');

  accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const guideId = toggle.getAttribute('data-accordion-toggle');
      const content = document.getElementById(`accordion-content-${guideId}`);
      const chevron = toggle.querySelector('.accordion-chevron');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      // Close all other accordions
      accordionToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          const otherGuideId = otherToggle.getAttribute('data-accordion-toggle');
          const otherContent = document.getElementById(`accordion-content-${otherGuideId}`);
          const otherChevron = otherToggle.querySelector('.accordion-chevron');

          otherToggle.setAttribute('aria-expanded', 'false');
          otherToggle.classList.remove('accordion-active');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherChevron) otherChevron.classList.remove('rotate-90');
        }
      });

      // Toggle current accordion
      if (isExpanded) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('accordion-active');
        if (content) content.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-90');
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.classList.add('accordion-active');
        if (content) content.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-90');
      }
    });
  });
}
