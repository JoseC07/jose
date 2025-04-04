import { useEffect } from 'react';

interface UseHashScrollOptions {
  // Optional: Specify a default scroll-margin-top value (in pixels)
  // This helps if different pages need different offsets, though CSS is often preferred.
  defaultOffset?: number; 
}

/**
 * Custom hook to handle smooth scrolling to URL hash anchors.
 * Listens for hash changes and scrolls the corresponding element into view.
 * 
 * @param options - Optional configuration for the hook.
 */
export function useHashScroll(options?: UseHashScrollOptions): void {
  const { defaultOffset = 80 } = options || {}; // Default offset if needed (e.g., 80px)

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Use requestAnimationFrame for smoother rendering after potential layout shifts
        requestAnimationFrame(() => {
          try {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              // Note: 'scroll-margin-top' CSS property on the target element 
              // is the preferred way to handle fixed headers.
              // The defaultOffset option here is a fallback if CSS isn't sufficient.
            } else {
              // Optional: Log if the element isn't found, could indicate a typo in the hash or ID
              // console.warn(`Element with ID "${hash}" not found for scrolling.`);
            }
          } catch (e) {
             // Ignore DOMException: Failed to execute 'querySelector' on 'Document': '...' is not a valid selector.
             // This can happen if the hash contains invalid characters for a CSS selector.
             if (!(e instanceof DOMException)) {
               console.error("Error during hash scroll:", e);
             }
          }
        });
      } else {
        // Optional: Scroll to top if no hash is present when navigating to the base page
        // Consider if this is desired behavior on all pages using the hook.
        // window.scrollTo({ top: 0, behavior: 'smooth' }); 
      }
    };

    // Initial scroll check on mount
    // Use a small timeout to ensure the layout is stable, especially with dynamic content
    const timeoutId = setTimeout(handleScroll, 100); 

    // Listen for hash changes
    window.addEventListener('hashchange', handleScroll, { passive: true });

    // Cleanup listener and timeout on component unmount
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleScroll);
    };
    // defaultOffset is included for completeness, though typically stable
  }, [defaultOffset]); 
} 