import { Github, Linkedin, ArrowLeft, Download, Send } from 'lucide-react';
import CustomImage from '../ui/Image';
import JaguarSilhouette from '../ui/JaguarSilhouette';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <header className="relative" id="experience">
      <div className="relative h-[160px] md:h-[300px] w-full overflow-hidden">
        <BannerImage />
        <OverlayGradient />
        <ProfileInfo />
      </div>
      <ProfilePicture />
      
      {/* Title for mobile - positioned with consistent spacing */}
      <div className="md:hidden bg-slate-900 px-8 pt-2 pb-4">
        <div className="flex items-center">
          <div className="w-20"></div> {/* Space for profile picture */}
          <div className="pl-12">
            <h2 className="text-xs font-medium">Backend Engineer | Cloud & Systems Specialist</h2>
          </div>
        </div>
      </div>
    </header>
  );
}

// Banner Image
const BannerImage = () => (
  <div className="absolute inset-0 md:inset-0">
    <CustomImage
      src="/assets/images/setup.jpg"
      alt="Tech workspace setup"
      fill
      className="object-cover object-center md:object-center scale-125 md:scale-100"
    />
  </div>
);

// Overlay Gradient with effects
const OverlayGradient = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/70 md:from-slate-900/80 md:to-slate-800/50">
    <LightningEffects />
    <JaguarSilhouette 
      width={100}
      height={100}
      position="absolute"
      className="bottom-3 left-3 z-[0]"
      opacity="opacity-100" 
      themeColors={['text-emerald-700', 'text-blue-400']}
      animated={true}
      interactive={true}
    />
  </div>
);

// Lightning Effects
const LightningEffects = () => (
  <>
    <div className="absolute right-20 top-1/2 h-40 w-1 bg-yellow-400 opacity-60 blur-md transform -rotate-20"></div>
    <div className="absolute right-24 top-1/2 h-40 w-1 bg-yellow-400 opacity-60 blur-md transform -rotate-30"></div>
  </>
);

// Profile Information
const ProfileInfo = () => (
  <div className="relative z-10 inset-0 flex flex-col justify-start pt-2 md:pt-8 px-6 md:px-12">
    <Link to="/" className="inline-flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 hover:underline mb-2 md:mb-4 self-start">
      <ArrowLeft size={16} />
      <span>Home</span>
    </Link>
    
    <h1 className="font-serif text-xl md:text-5xl italic font-bold tracking-wide">Jose G. Caudillo Jr.</h1>
    <h2 className="hidden md:block mt-2 text-xl font-medium">Backend Engineer | Cloud & Systems Specialist</h2>
    
    <SocialLinks />
  </div>
);

// Social Links
const SocialLinks = () => (
  <div className="mt-2 md:mt-4 flex items-center space-x-3">
    {/* Contact Link */}
    <a
      href="/contact"
      aria-label="Contact Me"
      // Default/Mobile: yellow. Desktop: slate. Hover: yellow.
      className="inline-flex items-center text-yellow-400 md:text-slate-300 hover:text-yellow-400 transition-colors group text-xs md:text-sm"
    >
      <Send className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
      {/* Mobile: faint opacity. Desktop: full opacity. Color inherited. */}
      <span className="ml-1.5 inline opacity-60 md:opacity-100">
        Contact
      </span>
    </a>

    {/* LinkedIn Link */}
    <a
      href="https://linkedin.com/in/josecaud"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn Profile"
      // Default/Mobile: yellow. Desktop: slate. Hover: yellow.
      className="inline-flex items-center text-yellow-400 md:text-slate-300 hover:text-yellow-400 transition-colors group text-xs md:text-sm"
    >
      <Linkedin className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
      {/* Mobile: faint opacity. Desktop: full opacity. Color inherited. */}
      <span className="ml-1.5 inline opacity-60 md:opacity-100">
        Linkedin
      </span>
    </a>

    {/* GitHub Link */}
    <a
      href="https://github.com/josec07"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub Profile"
      // Default/Mobile: yellow. Desktop: slate. Hover: yellow.
      className="inline-flex items-center text-yellow-400 md:text-slate-300 hover:text-yellow-400 transition-colors group text-xs md:text-sm"
    >
      <Github className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
      {/* Mobile: faint opacity. Desktop: full opacity. Color inherited. */}
      <span className="ml-1.5 inline opacity-60 md:opacity-100">
        Github
      </span>
    </a>

    {/* Resume Download Link */}
    <a
      href="/caudillojose_resume.pdf"
      download
      aria-label="Download Resume"
      // Default/Mobile: yellow. Desktop: slate. Hover: yellow.
      className="inline-flex items-center text-yellow-400 md:text-slate-300 hover:text-yellow-400 transition-colors group text-xs md:text-sm"
    >
      <Download className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
      {/* Mobile: faint opacity. Desktop: full opacity. Color inherited. */}
      <span className="ml-1.5 inline opacity-60 md:opacity-100">
        Resume
      </span>
    </a>
  </div>
);

// Profile Picture
const ProfilePicture = () => (
  <div className="absolute bottom-3 md:-bottom-16 left-4 md:left-12">
    <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-3 md:border-4 border-slate-900 overflow-hidden">
      <CustomImage
        src="/assets/images/profile.png"
        alt="Jose G. Caudillo Jr."
        width={128}
        height={128}
        className="object-cover w-full h-full object-[center_80%]"
      />
    </div>
  </div>
); 