import { useState, useEffect, useCallback } from 'react';

export const useMenuState = () => {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  const closeMenu = useCallback(() => {
    setOpenSectionId(null);
  }, []);

  const toggleMenu = useCallback((sectionId: string) => {
    setOpenSectionId(prev => prev === sectionId ? null : sectionId);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openSectionId && !(event.target as HTMLElement).closest(`[data-section="${openSectionId}"]`)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openSectionId, closeMenu]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeMenu]);

  return {
    openSectionId,
    toggleMenu,
    closeMenu,
    isOpen: (sectionId: string) => openSectionId === sectionId,
  };
}; 