import React from 'react';
import '../index.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="antialiased">
      {children}
    </div>
  );
} 