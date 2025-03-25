import React from 'react';
import '../index.css';
import Navbar from './navigation/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="antialiased pb-16 md:pb-0">
      <a href="#main-content" 
         className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                  bg-yellow-400 text-slate-900 z-50 p-2 rounded">
        Skip to main content
      </a>
      {children}
      <Navbar autoScrollHide={false} showCollapseButton={false} mobileBreakpoint={1024}/>
    </div>
  );
} 