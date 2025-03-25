import { ReactNode } from 'react';

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  text: string;
  target?: string;
}

export default function SocialLink({ href, icon, text, target = "_blank" }: SocialLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel="noreferrer"
      className="flex items-center hover:text-yellow-400 transition-colors"
      aria-label={text}
    >
      {icon}
      <span className="hidden md:inline ml-1 text-sm">{text}</span>
    </a>
  );
} 