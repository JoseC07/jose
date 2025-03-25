/**
 * Utility for smooth scrolling to elements
 */

/**
 * Scrolls to an element with the given ID using smooth behavior
 */
export const scrollToElement = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Scrolls to an element with the given selector using smooth behavior
 */
export const scrollToSelector = (selector: string): void => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}; 