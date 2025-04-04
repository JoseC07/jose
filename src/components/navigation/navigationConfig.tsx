import { Briefcase, Code, Mail, BookOpen, User } from 'lucide-react';

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
    label: 'Experience',
    href: '/experience',
    icon: <Briefcase size={16} />,
    subsections: [
      { id: 'about', label: 'About', href: '#about', icon: <User size={16} /> },
      { id: 'work', label: 'Work History', href: '#work', icon: <Briefcase size={16} /> },
      { id: 'skills', label: 'Skills', href: '#skills', icon: <Code size={16} /> },
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
    icon: <BookOpen size={16} />,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    icon: <Mail size={16} />,
  },
]; 