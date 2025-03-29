import React from 'react';
import { Briefcase, Code, Award, Mail, Newspaper } from 'lucide-react';

interface SubsectionItem {
  id: string;
  href: string;
  icon: JSX.Element;
  label: string;
}

export interface NavigationItem {
  id: string;
  href: string;
  icon: JSX.Element;
  label: string;
  subsections?: SubsectionItem[];
  isExternal?: boolean;
  prefetch?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'experience',
    href: '/experience',
    icon: <Briefcase size={20} />,
    label: 'Experience',
    prefetch: true,
    subsections: [
      { id: 'projects', href: '#projects', icon: <Code size={16} />, label: 'Projects' },
      { id: 'skills', href: '#skills', icon: <Award size={16} />, label: 'Skills' },
    ],
  },
  {
    id: 'blog',
    href: '/blog',
    icon: <Newspaper size={20} />,
    label: 'Blog',
    prefetch: true,
    subsections: [
      { id: 'live-demos', href: '#live-demos', icon: <Code size={16} />, label: 'Live Demos' },
      { id: 'case-studies', href: '#case-studies', icon: <Code size={16} />, label: 'Case Studies' },
      { id: 'system-design', href: '#system-design', icon: <Award size={16} />, label: 'System Design' },
    ],
  },
  {
    id: 'contact',
    href: '/contact',
    icon: <Mail size={20} />,
    label: 'Contact',
    prefetch: true,
  },
]; 