import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

interface SubsectionProps {
  id: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  isExternal?: boolean;
}

interface NavItemProps {
  id: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  isExternal?: boolean;
  isActive: boolean;
  onActivate: () => void;
  isCollapsed?: boolean;
  isCompact?: boolean;
  subsections?: SubsectionProps[];
  activeSubsection?: string;
}

export default function NavItem({ 
  id, 
  href, 
  icon, 
  label, 
  isExternal = false,
  isActive,
  onActivate,
  isCollapsed = false,
  isCompact = false,
  subsections = [],
  activeSubsection = ''
}: NavItemProps) {
  const [isFocused, setIsFocused] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  
  // Check if this is a blog section
  const isBlogSection = href.toLowerCase().includes('/blog') || label.toLowerCase() === 'blog';
  
  // Determine colors based on section type
  const activeColor = isBlogSection ? 'blue' : 'yellow';
  const hoverColor = 'yellow';
  
  // Handle keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate();
      
      // If it's an anchor link (not external), scroll to the element
      if (!isExternal && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
  
  // Content for both link types
  const content = (
    <>
      <span 
        className={`transition-transform ${isActive ? `text-${activeColor}-400` : ''} 
                   ${isFocused ? 'scale-110' : 'hover:scale-110'}
                   ${isCompact ? 'scale-90' : ''}
                   ${isBlogSection && !isActive ? 'text-blue-400' : ''}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className={`${isCollapsed ? 'sr-only' : 'ml-2 text-xs'} 
                       ${isActive ? `text-${activeColor}-400 font-semibold` : ''} 
                       ${isBlogSection && !isActive ? 'text-blue-400' : ''}`}>
        {label}
      </span>
      {isActive && (
        <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-${activeColor}-400`}
              aria-hidden="true">
        </span>
      )}
    </>
  );

  // Common props for both link types
  const commonProps = {
    ref: linkRef,
    className: `relative flex items-center 
               ${isBlogSection ? 'text-blue-300' : 'text-slate-300'} 
               hover:text-${hoverColor}-400 
               ${isBlogSection ? 'hover:bg-blue-900/20' : ''} 
               transition-colors py-1 px-2 
               focus:outline-none focus:ring-2 focus:ring-${activeColor}-400 focus:ring-opacity-50 rounded
               ${isCompact ? 'py-0.5 my-0.5' : ''}`,
    'aria-label': label,
    'aria-current': isActive ? 'page' as const : undefined,
    role: 'menuitem',
    tabIndex: 0,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    onKeyDown: handleKeyDown,
    onClick: onActivate
  };

  const hasSubsections = subsections && subsections.length > 0;

  return (
    <li className={`w-full mb-1 last:mb-0 ${isCompact ? 'mb-0.5' : ''} ${isBlogSection ? 'blog-section' : ''}`} role="none">
      {isExternal ? (
        <Link to={href} {...commonProps}>
          {content}
        </Link>
      ) : (
        <a href={href} {...commonProps}>
          {content}
        </a>
      )}
      
      {/* Subsections */}
      {hasSubsections && !isCollapsed && (
        <ul className={`ml-4 mt-1 border-l ${isBlogSection ? 'border-blue-700' : 'border-slate-700'} pl-2`}>
          {subsections.map((subsection) => (
            <li key={subsection.id} className="w-full mb-1 last:mb-0" role="none">
              <a 
                href={subsection.href}
                className={`relative flex items-center 
                          ${isBlogSection ? 'text-blue-400' : 'text-slate-400'} 
                          hover:text-${hoverColor}-400 
                          transition-colors py-1 px-2 text-xs rounded
                          ${activeSubsection === subsection.id ? `text-${activeColor}-400 font-semibold` : ''}`}
                aria-label={subsection.label}
                role="menuitem"
              >
                <span className="transition-transform hover:scale-110 mr-1">
                  {subsection.icon}
                </span>
                <span>{subsection.label}</span>
                {activeSubsection === subsection.id && (
                  <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-${activeColor}-400 opacity-70 rounded-full`}
                        aria-hidden="true">
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
} 