import { Home, Briefcase, Code, Award, Mail, Newspaper } from 'lucide-react';


export const navigationItems = [

  {
    id: 'experience',
    href: '#experience',
    icon: <Briefcase size={20} />,
    label: 'Experience',
    subsections: [
      {
        id: 'projects',
        href: '#projects',
        icon: <Code size={16} />,
        label: 'Projects'
      },
      {
        id: 'skills',
        href: '#skills',
        icon: <Award size={16} />,
        label: 'Skills'
      }
    ]
  },
  {
    id: 'blog',
    href: '/blog',
    icon: <Newspaper size={20} />,
    label: 'Blog',
    isExternal: true,
    subsections: [
      {
        id: 'projects',
        href: '#projects',
        icon: <Code size={16} />,
        label: 'Live Demos'
      },
      {
        id: 'projects',
        href: '#projects',
        icon: <Code size={16} />,
        label: 'Case Studies'
      },
      {
        id: 'skills',
        href: '#skills',
        icon: <Award size={16} />,
        label: 'System Design'
      }
    ]
  },
  
  {
    id: 'contact',
    href: '/contact',
    icon: <Mail size={20} />,
    label: 'Contact',
    isExternal: true
  }
]; 