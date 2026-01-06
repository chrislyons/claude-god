import { GUIDES } from '../config/guides';

// Route to guideId mapping for URL sync
const ROUTE_TO_GUIDE: Record<string, string> = {
  '/quick-start': 'quickStart',
  '/no-code': 'noCode',
  '/': 'architecture',
  '/agent-sdk': 'agentSdk',
  '/plugins': 'plugins',
};

/**
 * Unified Accordion Manager
 *
 * Single source of truth for all accordion behavior across desktop sidebar
 * and mobile menu. Uses singleton pattern to prevent multiple initializations.
 *
 * Features:
 * - Singleton pattern (prevents double initialization)
 * - State tracking (currentOpenGuideId)
 * - AbortController cleanup (removes all listeners)
 * - Custom event dispatching ('accordion:change')
 * - Container scoping for desktop/mobile contexts
 */

// Debug flag - set to true for verbose logging
const DEBUG = true;

function debugLog(category: string, message: string, data?: unknown): void {
  if (DEBUG) {
    const timestamp = new Date().toISOString().slice(11, 23);
    const prefix = `[Accordion:${category}] ${timestamp}`;
    if (data !== undefined) {
      console.log(prefix, message, data);
    } else {
      console.log(prefix, message);
    }
  }
}

function debugWarn(category: string, message: string, data?: unknown): void {
  const timestamp = new Date().toISOString().slice(11, 23);
  const prefix = `[Accordion:${category}] ${timestamp}`;
  if (data !== undefined) {
    console.warn(prefix, message, data);
  } else {
    console.warn(prefix, message);
  }
}

function debugError(category: string, message: string, data?: unknown): void {
  const timestamp = new Date().toISOString().slice(11, 23);
  const prefix = `[Accordion:${category}] ${timestamp}`;
  if (data !== undefined) {
    console.error(prefix, message, data);
  } else {
    console.error(prefix, message);
  }
}

class AccordionManager {
  private static instance: AccordionManager | null = null;
  private initialized = false;
  private currentOpenGuideId: string | null = null;
  private abortController: AbortController | null = null;
  private initCount = 0;
  private clickCount = 0;

  private constructor() {
    debugLog('Init', 'AccordionManager instance created');
  }

  public static getInstance(): AccordionManager {
    if (!this.instance) {
      debugLog('Singleton', 'Creating new AccordionManager instance');
      this.instance = new AccordionManager();
    } else {
      debugLog('Singleton', 'Returning existing AccordionManager instance');
    }
    return this.instance;
  }

  /**
   * Initialize accordion behavior
   * @param options.container - Optional container to scope queries (for mobile menu)
   */
  public init(options?: { container?: HTMLElement }): void {
    this.initCount++;
    debugLog('Init', `init() called (attempt #${this.initCount})`, {
      initialized: this.initialized,
      hasContainer: !!options?.container,
      containerTag: options?.container?.tagName,
    });

    if (this.initialized) {
      debugWarn('Init', 'Already initialized, skipping duplicate init call');
      return;
    }

    // Clean up any existing listeners
    debugLog('Init', 'Calling cleanup before fresh initialization');
    this.cleanup();

    // Create new AbortController for cleanup
    this.abortController = new AbortController();
    const signal = this.abortController.signal;
    debugLog('Init', 'Created new AbortController');

    // Determine query scope (document or container)
    const root = options?.container || document;
    debugLog('Init', `Query root set to: ${root === document ? 'document' : 'container element'}`);

    // Find all accordion toggles (exclude mobile menu accordions - they have their own handler)
    const accordionToggles = root.querySelectorAll('[data-accordion-toggle]:not([data-mobile-menu-accordion])');
    debugLog('Init', `Found ${accordionToggles.length} accordion toggles (excluding mobile)`);

    if (accordionToggles.length === 0) {
      debugWarn('Init', 'No accordion toggles found in root');
      return;
    }

    // Log all found toggles
    accordionToggles.forEach((toggle, index) => {
      const guideId = toggle.getAttribute('data-accordion-toggle');
      const isExpanded = toggle.getAttribute('aria-expanded');
      debugLog('Init', `Toggle #${index}: guideId="${guideId}", aria-expanded="${isExpanded}"`);
    });

    // Attach click listeners with AbortController cleanup
    accordionToggles.forEach((toggle, index) => {
      const guideId = toggle.getAttribute('data-accordion-toggle');
      debugLog('Init', `Attaching click listener to toggle #${index} (${guideId})`);

      toggle.addEventListener('click', (event) => {
        this.clickCount++;
        debugLog('Click', `Click #${this.clickCount} on toggle: ${guideId}`, {
          target: (event.target as HTMLElement)?.tagName,
          currentTarget: (event.currentTarget as HTMLElement)?.tagName,
        });

        if (guideId) {
          this.toggleAccordion(guideId, root);
        } else {
          debugError('Click', 'Click handler fired but guideId is null/empty');
        }
      }, { signal });
    });

    this.initialized = true;
    debugLog('Init', `Initialization complete. ${accordionToggles.length} accordions ready.`);
  }

  /**
   * Clean up all event listeners and reset state
   */
  public cleanup(): void {
    debugLog('Cleanup', 'cleanup() called', {
      hasAbortController: !!this.abortController,
      wasInitialized: this.initialized,
      currentOpenGuideId: this.currentOpenGuideId,
    });

    if (this.abortController) {
      debugLog('Cleanup', 'Aborting AbortController to remove all listeners');
      this.abortController.abort();
      this.abortController = null;
    }
    this.initialized = false;
    debugLog('Cleanup', 'Cleanup complete');
  }

  /**
   * Get currently open guide ID
   */
  public getCurrentGuide(): string | null {
    debugLog('State', `getCurrentGuide() returning: ${this.currentOpenGuideId}`);
    return this.currentOpenGuideId;
  }

  /**
   * Toggle accordion for a specific guide
   * @param guideId - The guide ID to toggle
   * @param root - Query root (document or container)
   */
  private toggleAccordion(guideId: string, root: Document | HTMLElement = document): void {
    debugLog('Toggle', `toggleAccordion("${guideId}") called`, {
      currentOpenGuideId: this.currentOpenGuideId,
      rootType: root === document ? 'document' : 'container',
    });

    const toggle = root.querySelector(`[data-accordion-toggle="${guideId}"]`);
    if (!toggle) {
      debugError('Toggle', `Toggle element not found for guideId: ${guideId}`);
      return;
    }

    const content = root.querySelector(`#accordion-content-${guideId}`) as HTMLElement;
    const chevron = toggle.querySelector('.accordion-chevron');
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    debugLog('Toggle', `Current state for "${guideId}"`, {
      isExpanded,
      hasContent: !!content,
      contentHidden: content?.classList.contains('hidden'),
      hasChevron: !!chevron,
      chevronRotated: chevron?.classList.contains('rotate-90'),
    });

    // Find all accordions in the same context
    const allToggles = root.querySelectorAll('[data-accordion-toggle]');
    debugLog('Toggle', `Found ${allToggles.length} total toggles in context`);

    // Close all other accordions
    let closedCount = 0;
    allToggles.forEach(otherToggle => {
      if (otherToggle !== toggle) {
        const otherGuideId = otherToggle.getAttribute('data-accordion-toggle');
        const otherContent = root.querySelector(`#accordion-content-${otherGuideId}`) as HTMLElement;
        const otherChevron = otherToggle.querySelector('.accordion-chevron');
        const wasExpanded = otherToggle.getAttribute('aria-expanded') === 'true';

        if (wasExpanded) {
          closedCount++;
          debugLog('Toggle', `Closing other accordion: ${otherGuideId}`);
        }

        otherToggle.setAttribute('aria-expanded', 'false');
        otherToggle.classList.remove('accordion-active');
        if (otherContent) otherContent.classList.add('hidden');
        if (otherChevron) otherChevron.classList.remove('rotate-90');
      }
    });
    debugLog('Toggle', `Closed ${closedCount} other accordions`);

    // Toggle current accordion
    if (isExpanded) {
      // Close current
      debugLog('Toggle', `Closing current accordion: ${guideId}`);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('accordion-active');
      if (content) content.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-90');

      this.currentOpenGuideId = null;

      // Dispatch event (closing)
      this.dispatchAccordionChange(null, null);
    } else {
      // Open current
      debugLog('Toggle', `Opening current accordion: ${guideId}`);
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.add('accordion-active');
      if (content) content.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-90');

      this.currentOpenGuideId = guideId;

      // Get guide title for event
      const guide = GUIDES[guideId];
      const title = guide?.title || guideId;
      debugLog('Toggle', `Guide title resolved: "${title}"`);

      // Dispatch event (opening)
      this.dispatchAccordionChange(guideId, title);
    }

    // Log final state
    debugLog('Toggle', `Toggle complete. Final state:`, {
      currentOpenGuideId: this.currentOpenGuideId,
      ariaExpanded: toggle.getAttribute('aria-expanded'),
      contentHidden: content?.classList.contains('hidden'),
    });
  }

  /**
   * Dispatch custom event when accordion changes
   * @param guideId - The guide ID (null if closing)
   * @param title - The guide title (null if closing)
   */
  private dispatchAccordionChange(guideId: string | null, title: string | null): void {
    debugLog('Event', `Dispatching accordion:change event`, { guideId, title });
    const event = new CustomEvent('accordion:change', {
      detail: { guideId, title },
      bubbles: true,
    });
    document.dispatchEvent(event);
    debugLog('Event', 'Event dispatched successfully');
  }

  /**
   * Programmatically open an accordion
   * @param guideId - The guide ID to open
   */
  public openAccordion(guideId: string): void {
    debugLog('API', `openAccordion("${guideId}") called`);
    const toggle = document.querySelector(`[data-accordion-toggle="${guideId}"]:not([data-mobile-menu-accordion])`);
    if (toggle && toggle.getAttribute('aria-expanded') !== 'true') {
      this.toggleAccordion(guideId);
    } else {
      debugLog('API', `openAccordion skipped - already open or not found`);
    }
  }

  /**
   * Sync accordion state with current URL
   * Opens the accordion that matches the current page route
   */
  public syncWithUrl(): void {
    debugLog('Sync', 'syncWithUrl() called');

    // Get pathname and strip base URL
    const pathname = window.location.pathname;
    const base = '/claude-god'; // Matches astro.config.mjs base
    const route = pathname.replace(base, '') || '/';

    debugLog('Sync', `Current route: "${route}"`);

    // Find matching guideId
    const guideId = ROUTE_TO_GUIDE[route];

    if (!guideId) {
      debugLog('Sync', `No guide found for route: ${route}`);
      return;
    }

    debugLog('Sync', `Found guideId: "${guideId}" for route: "${route}"`);

    // If this accordion is already open, do nothing
    if (this.currentOpenGuideId === guideId) {
      debugLog('Sync', `Guide "${guideId}" already open, skipping sync`);
      return;
    }

    // Open the correct accordion
    this.openAccordion(guideId);
  }

  /**
   * Close all accordions
   */
  public closeAll(): void {
    debugLog('API', 'closeAll() called');
    const allToggles = document.querySelectorAll('[data-accordion-toggle]');
    let closedCount = 0;

    allToggles.forEach(toggle => {
      const guideId = toggle.getAttribute('data-accordion-toggle');
      const content = document.querySelector(`#accordion-content-${guideId}`) as HTMLElement;
      const chevron = toggle.querySelector('.accordion-chevron');
      const wasExpanded = toggle.getAttribute('aria-expanded') === 'true';

      if (wasExpanded) closedCount++;

      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('accordion-active');
      if (content) content.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-90');
    });

    this.currentOpenGuideId = null;
    this.dispatchAccordionChange(null, null);
    debugLog('API', `closeAll complete. Closed ${closedCount} accordions.`);
  }

  /**
   * Debug helper - get current state
   */
  public getDebugState(): object {
    return {
      initialized: this.initialized,
      currentOpenGuideId: this.currentOpenGuideId,
      hasAbortController: !!this.abortController,
      initCount: this.initCount,
      clickCount: this.clickCount,
    };
  }
}

// Export singleton instance methods
export const initAccordion = (options?: { container?: HTMLElement }) => {
  AccordionManager.getInstance().init(options);
};

export const cleanupAccordion = () => {
  AccordionManager.getInstance().cleanup();
};

export const getCurrentGuide = () => {
  return AccordionManager.getInstance().getCurrentGuide();
};

export const openAccordion = (guideId: string) => {
  AccordionManager.getInstance().openAccordion(guideId);
};

export const closeAllAccordions = () => {
  AccordionManager.getInstance().closeAll();
};

export const syncAccordionWithUrl = () => {
  AccordionManager.getInstance().syncWithUrl();
};

export const getAccordionDebugState = () => {
  return AccordionManager.getInstance().getDebugState();
};

// Expose to window for console debugging
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).AccordionDebug = {
    getState: () => AccordionManager.getInstance().getDebugState(),
    init: initAccordion,
    cleanup: cleanupAccordion,
    open: openAccordion,
    closeAll: closeAllAccordions,
    getCurrentGuide,
  };
  debugLog('Global', 'AccordionDebug exposed on window object');
}
