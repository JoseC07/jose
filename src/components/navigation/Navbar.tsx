import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import { navigationItems } from './navigationConfig';
import { ChevronLeft, ChevronRight, Menu, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from '../ui/button';
type NavbarState = 'hidden' | 'collapsed' | 'open';

interface NavbarProps {
  scrollThreshold?: number;
  mobileBreakpoint?: number;
  showCollapseButton?: boolean;
  showHideButton?: boolean;
  autoScrollHide?: boolean; // New prop to toggle auto-scroll hiding
}

export default function Navbar({
  scrollThreshold = 150,
  mobileBreakpoint = 768,
  showCollapseButton = true,
  showHideButton = true,
  autoScrollHide = true, // Default to true for backward compatibility
}: NavbarProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('');
  const [activeSubsection, setActiveSubsection] = useState<string>('');
  const [navState, setNavState] = useState<NavbarState>('open');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [mobileBreakpoint]);

  // Update active item and subsection
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    const hash = location.hash ? location.hash.substring(1) : '';
    
    // Check if the current hash matches any subsection
    let foundSubsection = false;
    let parentSection = '';
    
    navigationItems.forEach(item => {
      if (item.subsections) {
        item.subsections.forEach(subsection => {
          if (subsection.id === hash) {
            foundSubsection = true;
            parentSection = item.id;
            setActiveSubsection(hash);
          }
        });
      }
    });
    
    if (foundSubsection) {
      setActiveItem(parentSection);
    } else {
      setActiveItem(hash || path);
      setActiveSubsection('');
    }
  }, [location]);

  // Handle auto-scroll behavior (only if enabled)
  useEffect(() => {
    if (!autoScrollHide) return;

    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > scrollThreshold) {
        setHasScrolled(true);
        setNavState('hidden');
      } else if (hasScrolled && window.scrollY <= scrollThreshold) {
        setHasScrolled(false);
        setNavState('open');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled, scrollThreshold, autoScrollHide]);

  // Toggle collapse state
  const toggleCollapse = () => {
    setNavState(navState === 'open' ? 'collapsed' : 'open');
  };

  // Show navbar from hidden state
  const showNavbar = () => {
    setNavState('open');
  };

  // Hide navbar
  const hideNavbar = () => {
    setNavState('hidden');
  };

  const isExtraSmall = typeof window !== 'undefined' && window.innerWidth < 640;

  // Handle navigation item activation
  const handleItemActivation = (id: string, subsectionId?: string) => {
    if (subsectionId) {
      setActiveItem(id);
      setActiveSubsection(subsectionId);
    } else {
      setActiveItem(id);
      setActiveSubsection('');
    }
    
    if (isMobile && navState === 'open') {
      setNavState('collapsed');
    }
  };

  return (
    <>
      {/* Show button when hidden */}
      {navState === 'hidden' && showHideButton && (
        <Button
          variant={'metallic'}
         
          onClick={showNavbar}
          className="fixed top-4 right-4 flex items-center justify-center px-3 py-2 bg-slate-800/90 rounded-lg border border-slate-700 
                    text-white hover:text-yellow-400 hover:bg-slate-700/90 transition-colors z-50"
          aria-label="Show navigation"
        >
          <div className="flex items-center">
            <ArrowDownLeft size={16} />
            <span className="text-sm font-medium ml-1">Menu</span>
          </div>
        </Button>
      )}

      {/* Main navbar */}
      <nav
        className={`fixed top-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg 
                  shadow-lg z-50 border border-slate-700 transition-all duration-300
                  ${navState === 'open' ? 'px-4' : 'px-3'}
                  ${navState === 'hidden' ? 'translate-x-[calc(100%+1rem)]' : 'translate-x-0'}
                  ${isExtraSmall ? 'scale-90 origin-top-right' : ''}`}
        aria-label="Main navigation"
      >
        {/* Collapse button */}
        {showCollapseButton && !isExtraSmall && navState !== 'hidden' && (
          <button
            onClick={toggleCollapse}
            className="absolute -left-3 top-7 bg-slate-800 rounded-full p-1 border border-slate-700 
                      shadow-md text-white hover:text-yellow-400 transition-colors"
            aria-label={navState === 'open' ? 'Collapse menu' : 'Expand menu'}
          >
            {navState === 'open' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}

        {/* Hide button */}
        {showHideButton && navState !== 'hidden' && (
          <Button
            variant={'metallic'}
            onClick={hideNavbar}
            size={'sm'}
            className="absolute -left-3 bottom-5 bg-slate-800 rounded-full p-1 border border-slate-700 
                      shadow-md text-white hover:text-yellow-400 transition-colors"
            aria-label="Hide navigation"
          >
            <ChevronRight size={16} />
          </Button>
        )}

        {/* Mobile toggle */}
        {showCollapseButton && isExtraSmall && navState !== 'hidden' && (
          <button
            onClick={toggleCollapse}
            className="absolute -left-2 -bottom-3 bg-slate-800 rounded-full p-1 border border-slate-700 
                      shadow-md text-white hover:text-yellow-400 transition-colors"
            aria-label={navState === 'open' ? 'Collapse menu' : 'Expand menu'}
          >
            <Menu size={16} />
          </button>
        )}

        {/* Navigation items */}
        <ul className={`flex flex-col justify-start items-center py-4 px-1 ${isExtraSmall ? 'py-3' : ''}`}>
          {navigationItems.map((item) => (
            <NavItem
              key={item.id}
              {...item}
              isActive={activeItem === item.id}
              onActivate={() => handleItemActivation(item.id)}
              isCollapsed={navState === 'collapsed'}
              isCompact={isExtraSmall}
              activeSubsection={activeSubsection}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}