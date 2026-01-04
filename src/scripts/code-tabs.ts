// Code tabs language switching with localStorage persistence

export function initCodeTabs() {
  // Get preferred language from localStorage or default to 'python'
  const preferredLang = localStorage.getItem('code-tab-lang') || 'python';

  // Initialize all code tabs on the page
  const allTabContainers = document.querySelectorAll('.code-tabs');

  allTabContainers.forEach((container) => {
    // Set initial active state based on preference
    const buttons = container.querySelectorAll('.code-tab-btn');
    const contents = container.querySelectorAll('.code-tab-content');

    // Remove all active states first
    buttons.forEach((btn) => btn.classList.remove('active'));
    contents.forEach((content) => content.classList.remove('active'));

    // Set active state for preferred language
    const activeButton = container.querySelector(
      `.code-tab-btn[data-lang="${preferredLang}"]`,
    );
    const activeContent = container.querySelector(
      `.code-tab-content[data-lang="${preferredLang}"]`,
    );

    if (activeButton) activeButton.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
  });

  // Add click event listeners to all tab buttons
  const allButtons = document.querySelectorAll('.code-tab-btn');

  allButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const lang = target.getAttribute('data-lang');

      if (!lang) return;

      // Save preference to localStorage
      localStorage.setItem('code-tab-lang', lang);

      // Switch ALL tabs on the page to the selected language (global sync)
      allTabContainers.forEach((container) => {
        const containerButtons = container.querySelectorAll('.code-tab-btn');
        const containerContents =
          container.querySelectorAll('.code-tab-content');

        // Remove active class from all buttons and contents in this container
        containerButtons.forEach((btn) => btn.classList.remove('active'));
        containerContents.forEach((content) =>
          content.classList.remove('active'),
        );

        // Add active class to matching language
        const activeBtn = container.querySelector(
          `.code-tab-btn[data-lang="${lang}"]`,
        );
        const activeContent = container.querySelector(
          `.code-tab-content[data-lang="${lang}"]`,
        );

        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
      });
    });
  });
}

// Initialize code tabs when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeTabs);
  } else {
    initCodeTabs();
  }
}
