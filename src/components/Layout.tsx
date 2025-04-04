import React from 'react';
import '../index.css';
import Navbar from './navigation/Navbar';
import GlobalFooter from './sections/GlobalFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen antialiased bg-slate-900 text-white">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <GlobalFooter />
    </div>
  );
} 