export function initCopyCommands() {
  // Find all bash code blocks
  const bashBlocks = document.querySelectorAll('pre code.language-bash, pre code.language-sh');

  bashBlocks.forEach((code) => {
    const pre = code.parentElement as HTMLElement;
    if (!pre) return;

    // Make the entire code block clickable
    pre.style.cursor = 'pointer';
    pre.setAttribute('title', 'Click to copy command');
    pre.classList.add('copyable-command');

    // Add click handler to copy
    pre.addEventListener('click', async () => {
      const command = code.textContent || '';

      try {
        await navigator.clipboard.writeText(command);

        // Show visual feedback
        pre.classList.add('copied');
        const originalTitle = pre.getAttribute('title');
        pre.setAttribute('title', 'Copied!');

        // Reset after 1.5 seconds
        setTimeout(() => {
          pre.classList.remove('copied');
          pre.setAttribute('title', originalTitle || 'Click to copy command');
        }, 1500);
      } catch (err) {
        console.error('Failed to copy command:', err);
      }
    });
  });
}
