/**
 * Accordion initialization - DEPRECATED
 *
 * This file is kept for backward compatibility.
 * All accordion logic has been moved to accordion-manager.ts
 * which provides a unified, singleton-based implementation with proper cleanup.
 *
 * @see accordion-manager.ts for the current implementation
 */

// Re-export all functions from the unified manager
export {
  initAccordion,
  cleanupAccordion,
  getCurrentGuide,
  openAccordion,
  closeAllAccordions,
} from './accordion-manager';
