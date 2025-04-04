import { Send, Linkedin, Github, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import axios from 'axios';

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    setNewsletterError(null);
    setNewsletterSubmitted(false);
    setIsSubmitting(true);

    console.log("Footer Newsletter Email Submitted:", newsletterEmail);

    try {
      const response = await axios.post('/api/newsletter', { email: newsletterEmail });

      if (response.data.success) {
        console.log("Simulated footer subscription successful");
        setNewsletterSubmitted(true);
        setNewsletterEmail("");
        setTimeout(() => setNewsletterSubmitted(false), 5000);
      } else {
        setNewsletterError(response.data.message || "An unknown error occurred.");
      }

    } catch (error: any) {
      console.error("Footer newsletter subscription error:", error);
      const errMsg = error.response?.data?.message || error.message || "Subscription failed. Please try again.";
      setNewsletterError(errMsg);
      setNewsletterSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-800 py-8 pb-24 md:pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-1 items-center gap-6">
          {/* "Let's Connect" Section */}
          <div className="text-center">
            <p className="text-slate-400 mb-4">Connect with me</p>
            {/* Copied Social Links from Hero */}
            <div className="mt-2 md:mt-4 flex items-center justify-center space-x-4 md:space-x-6">
              {/* Contact Link */}
              <a
                href="/contact"
                aria-label="Contact Me"
                className="inline-flex items-center text-slate-300 hover:text-yellow-400 transition-colors group text-xs md:text-sm"
              >
                <Send className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="ml-1.5 inline text-slate-500 opacity-60 md:text-inherit md:opacity-100 group-hover:text-yellow-400 transition-colors">
                  Contact
                </span>
              </a>
              {/* LinkedIn Link */}
              <a
                href="https://linkedin.com/in/josecaud"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex items-center text-slate-300 hover:text-yellow-400 transition-colors group text-xs md:text-sm"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="ml-1.5 inline text-slate-500 opacity-60 md:text-inherit md:opacity-100 group-hover:text-yellow-400 transition-colors">
                  Linkedin
                </span>
              </a>
              {/* GitHub Link */}
              <a
                href="https://github.com/josec07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex items-center text-slate-300 hover:text-yellow-400 transition-colors group text-xs md:text-sm"
              >
                <Github className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="ml-1.5 inline text-slate-500 opacity-60 md:text-inherit md:opacity-100 group-hover:text-yellow-400 transition-colors">
                  Github
                </span>
              </a>
              {/* Resume Download Link */}
              <a
                href="/Jose_Caudillo_Resume.pdf"
                download
                aria-label="Download Resume"
                className="inline-flex items-center text-slate-300 hover:text-yellow-400 transition-colors group text-xs md:text-sm"
              >
                <Download className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="ml-1.5 inline text-slate-500 opacity-60 md:text-inherit md:opacity-100 group-hover:text-yellow-400 transition-colors">
                  Resume
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-slate-700 pt-4 mt-8">
          {/* Newsletter Section */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold mb-4 text-center">Escape the Loop: Newsletter</h3>
            {!newsletterSubmitted && (
              <form onSubmit={handleNewsletterSubmit} className="relative max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-label="Newsletter email for footer"
                  className="w-full pl-4 pr-28 py-3 bg-slate-700 border-2 border-slate-600 text-gray-100 rounded-full focus:outline-none focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300 ease-in-out"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-0 top-0 bottom-0 rounded-full px-4 bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-300 ease-in-out text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            )}
            {newsletterSubmitted && (
              <p className="text-sm text-green-400 mt-3">Thanks for subscribing!</p>
            )}
            {newsletterError && (
              <p className="text-sm text-red-400 mt-3">{newsletterError}</p>
            )}
          </div>
          <p className="text-sm text-slate-400 text-center pt-8">
            © {currentYear} José Caudillo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}