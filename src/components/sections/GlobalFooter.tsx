import { Linkedin, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import SocialLink from '../ui/SocialLink';
import ShieldDivider from '../ui/ShieldDivider';

export default function GlobalFooter() {
  return (
    <footer className="bg-slate-800 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <p className="text-slate-400 mb-4">
              Open to consultation—let's simplify and amplify your systems.
            </p>
            <Button 
              variant={'metallic'}
              className="bg-slate-800 hover:bg-slate-700 hover:text-yellow-400 transition-colors"
              onClick={() => window.location.href = '/contact'}
            >
              Get in Touch
            </Button>
          </div>
          
          <ShieldDivider />

          {/* Social Links */}
          <div className="md:justify-self-end">
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <SocialLink
                href="https://linkedin.com/in/josecaud"
                icon={<Linkedin className="h-6 w-6" />}
                text="LinkedIn"
              />
              <SocialLink
                href="https://github.com/josec07"
                icon={<Github className="h-6 w-6" />}
                text="GitHub"
              />
              <SocialLink 
                href="mailto:caudillojose5@gmail.com" 
                icon={<Mail className="h-6 w-6" />} 
                text="Email" 
              />
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-slate-700 pt-6 mt-8">
          <p className="text-sm text-slate-400 text-center">
            © {new Date().getFullYear()} José Caudillo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 