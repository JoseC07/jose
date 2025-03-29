import { Linkedin, Github, Send } from 'lucide-react';
import { Button } from '../ui/button';
import SocialLink from '../ui/SocialLink';

export default function GlobalFooter() {
  return (
    <footer className="bg-slate-800 py-8 pb-80 md:pb-40">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-1 items-center gap-6">
          {/* Combined "Let's Connect" Section */}
          <div className="text-center">
            <p className="text-slate-400 mb-4">Connect with me on social media.</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-slate-700 pt-4 mt-6">
          {/* Newsletter Section */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 text-center">Subscribe to My Newsletter</h3>
            <div className="relative max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full pl-4 pr-12 py-3 bg-slate-700 border-2 border-slate-600 text-gray-100 rounded-full focus:outline-none focus:border-yellow-400 transition-all duration-300 ease-in-out" 
              />
              <Button 
                variant={'metallic'} 
                className="absolute right-2 top-2 bottom-1 rounded-full px-3 bg-slate-800 hover:bg-slate-700 hover:text-yellow-400 transition-all duration-300 ease-in-out"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-slate-400 text-center pt-8">
            © {new Date().getFullYear()} José Caudillo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}