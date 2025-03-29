import React from 'react';
import '../index.css';
import Navbar from './navigation/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="antialiased pb-16 md:pb-0">
      {children}
      <Navbar />
    </div>
  );
} 