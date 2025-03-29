import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { navigationItems, NavigationItem } from './navigationConfig';
import styles from './styles/navigation.module.css';
import clsx from 'clsx';

interface NavbarProps {
  mobileBreakpoint?: number;
}

interface SubsectionItem {
  id: string;
  href: string;
  icon: JSX.Element;
  label: string;
}

export default function Navbar({ mobileBreakpoint = 768 }: NavbarProps) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Derive active state from URL
  const activeState = {
    path: location.pathname.substring(1) || 'home',
    hash: location.hash.substring(1)
  };

  // Determine if an item is active
  const isItemActive = useCallback((id: string) => {
    return id === activeState.path || id === activeState.hash;
  }, [activeState]);

  // Determine if a subsection is active
  const isSubsectionActive = useCallback((parentId: string, subId: string) => {
    return activeState.hash === subId && activeState.path === parentId;
  }, [activeState]);

  // Determine if an item is a blog section
  const isBlogSection = useCallback((id: string) => {
    return id === 'blog';
  }, []);

  return (
    <nav className={clsx(
      styles.navContainer,
      isExpanded ? styles.expanded : styles.collapsed
    )}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-0 right-0 bg-slate-800 rounded-full p-1 border border-slate-700 shadow-md text-white hover:text-yellow-400 transition-colors"
        aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      {isExpanded ? (
        // Expanded View
        <ul className="flex flex-col items-center justify-center space-y-2 px-4 py-2">
          {navigationItems.map((item: NavigationItem) => (
            <li key={item.id} className="w-full">
              {item.isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    styles.navLink,
                    isItemActive(item.id) && (isBlogSection(item.id) ? styles.blogLinkActive : styles.navLinkActive)
                  )}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={clsx(
                    styles.navLink,
                    isItemActive(item.id) && (isBlogSection(item.id) ? styles.blogLinkActive : styles.navLinkActive)
                  )}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              )}
              
              {/* Subsections */}
              {item.subsections && (
                <ul className={styles.subsectionList}>
                  {item.subsections.map((sub: SubsectionItem) => (
                    <li key={sub.id}>
                      <Link
                        to={sub.href}
                        className={clsx(
                          styles.subsectionLink,
                          isSubsectionActive(item.id, sub.id) && 
                            (isBlogSection(item.id) ? styles.blogLinkActive : styles.navLinkActive)
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
          ))}
        </ul>
      ) : (
        // Collapsed View
        <ul className="flex flex-row justify-center items-center h-full space-x-4">
          {navigationItems.map((item: NavigationItem) => (
            <li key={item.id}>
              {item.isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    styles.navLink,
                    isItemActive(item.id) && (isBlogSection(item.id) ? styles.blogLinkActive : styles.navLinkActive)
                  )}
                >
                  {item.icon}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={clsx(
                    styles.navLink,
                    isItemActive(item.id) && (isBlogSection(item.id) ? styles.blogLinkActive : styles.navLinkActive)
                  )}
                >
                  {item.icon}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
} 