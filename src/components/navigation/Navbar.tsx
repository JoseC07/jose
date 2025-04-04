import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navigationItems, NavigationItem } from './navigationConfig';
import styles from './styles/navigation.module.css';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';

// Unified NavItem component for both expanded and collapsed states
const NavItem: React.FC<{
  item: NavigationItem;
  isExpanded: boolean;
  isActive: (id: string) => boolean;
  isSubActive: (parentId: string, subId: string) => boolean;
  isBlog: (id: string) => boolean;
  isOpen: boolean;
  onItemClick: (itemId: string) => void;
}> = ({ item, isExpanded, isActive, isSubActive, isBlog, onItemClick }) => {
  const [showSubs, setShowSubs] = useState(false);
  const isItemActive = isActive(item.id);
  const isBlogItem = isBlog(item.id);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const itemRef = useRef<HTMLLIElement>(null);

  // Handle clicks outside the item
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (itemRef.current && 
          !itemRef.current.contains(target) &&
          !target.closest('a') &&
          !target.closest('button')) {
        setShowSubs(false);
        if (isMobile) {
          onItemClick(item.id); // Close the parent item on mobile
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, onItemClick, item.id]);

  const handleMouseEnter = () => {
    if (!isMobile && item.subsections) {
      setShowSubs(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && item.subsections) {
      setShowSubs(false);
    }
  };

  const handleClick = () => {
    if (item.subsections) {
      onItemClick(item.id);
      if (isMobile) {
        setShowSubs(prev => !prev);
      }
    }
  };

  const linkStyles = clsx(
    styles.navLink,
    isExpanded ? 'w-full' : 'flex-row items-center',
    isItemActive && (isBlogItem ? styles.blogLinkActive : styles.navLinkActive)
  );

  return (
    <li 
      ref={itemRef}
      key={item.id} 
      className={clsx(
        isExpanded ? 'w-full' : 'flex-shrink-0 relative px-2 py-1 rounded',
        item.subsections && 'group'
      )}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      {item.isExternal ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(linkStyles, 'block w-full h-full')}
        >
          <span className={styles.iconWrapper}>{item.icon}</span>
          <span className={isExpanded ? 'ml-2' : 'ml-1 text-xs'}>{item.label}</span>
        </a>
      ) : (
        <Link 
          to={item.href} 
          className={clsx(linkStyles, 'block w-full h-full')}
          onClick={handleClick}
        >
          <span className={styles.iconWrapper}>{item.icon}</span>
          <span className={isExpanded ? 'ml-2' : 'ml-1 text-xs'}>{item.label}</span>
        </Link>
      )}

      {item.subsections && (
        <ul className={clsx(
          styles.subsectionDropdown,
          isMobile ? "static mt-1" : "absolute bottom-full left-1/2 -translate-x-1/2",
          !isMobile && 'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
          !isMobile && !showSubs && 'pointer-events-none',
          isMobile && !showSubs && 'hidden'
        )}>
          {item.subsections.map((sub) => (
            <li key={sub.id}>
              <Link
                to={`${item.href}${sub.href}`}
                className={clsx(
                  styles.subsectionDropdownItem,
                  isSubActive(item.id, sub.id) && styles.navLinkActive
                )}
              >
                {sub.icon}
                <span>{sub.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default function Navbar() {
  const location = useLocation();

  // Add this useEffect to handle hash-based scrolling
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Handle clicks outside the navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (navRef.current && 
          !navRef.current.contains(target) &&
          !target.closest('a') &&
          !target.closest('button')) {
        setOpenItemId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const activeState = useMemo(() => ({
    path: location.pathname === '/' ? 'home' : location.pathname.substring(1),
    hash: location.hash.substring(1),
  }), [location]);

  const isActive = useCallback(
    (id: string) => activeState.path === id || (id === 'home' && !activeState.path && !activeState.hash),
    [activeState]
  );

  const isSubActive = useCallback(
    (parentId: string, subId: string) => 
      activeState.path === parentId && 
      (activeState.hash === subId || (subId === 'about' && !activeState.hash)),
    [activeState]
  );

  const isBlog = useCallback((id: string) => id === 'blog', []);

  const handleItemClick = useCallback((itemId: string) => {
    setOpenItemId(prev => prev === itemId ? null : itemId);
    // Scroll to top when switching sections
    if (window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={clsx(
        styles.navContainer,
        styles.collapsed,
        'w-auto'
      )}
      aria-label="Main navigation"
    >
      <ul
        className={clsx(
          'flex',
          'flex-row justify-center items-center h-full space-x-3 px-4 py-1'
        )}
      >
        {navigationItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isExpanded={false}
            isActive={isActive}
            isSubActive={isSubActive}
            isBlog={isBlog}
            isOpen={openItemId === item.id}
            onItemClick={handleItemClick}
          />
        ))}
      </ul>
    </nav>
  );
}