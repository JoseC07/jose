import { Mail, Github, Linkedin } from 'lucide-react';
import CustomImage from '../ui/Image';
import JaguarSilhouette from '../ui/JaguarSilhouette';
import SocialLink from '../ui/SocialLink';

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
            <h2 className="text-xs font-medium">Systems & Cloud Specialist | DevOps | AI Enthusiast</h2>
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
  <div className="absolute inset-0 flex flex-col justify-start pt-10 md:pt-16 px-6 md:px-12">
    <h1 className="font-serif text-xl md:text-5xl italic font-bold tracking-wide">Jose G. Caudillo Jr.</h1>
    <h2 className="hidden md:block mt-2 text-xl font-medium">Systems & Cloud Specialist | DevOps | AI Enthusiast</h2>
    
    <SocialLinks />
  </div>
);

// Social Links
const SocialLinks = () => (
  <div className="mt-2 md:mt-4 flex items-center space-x-3">
    <SocialLink 
      href="mailto:caudillojose5@gmail.com" 
      icon={<Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />} 
      text="Connect" 
    />
    <SocialLink 
      href="https://linkedin.com/in/josecaud" 
      icon={<Linkedin className="h-3.5 w-3.5 md:h-4 md:w-4" />} 
      text="Linkedin" 
    />
    <SocialLink 
      href="https://github.com/josec07" 
      icon={<Github className="h-3.5 w-3.5 md:h-4 md:w-4" />} 
      text="Github" 
    />
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