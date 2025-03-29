import { Link } from 'react-router-dom'; // Use Link for internal navigation
import { Button } from '../components/ui/button'; // Reusing existing Button
import CustomImage from '../components/ui/Image'; // Import the CustomImage component
import BusinessCard from '../components/BusinessCard';

export default function LandingPage() {
  return (
    <div
      id="main-content"
      className="relative min-h-screen flex flex-col items-center justify-center text-white p-4 overflow-hidden"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 overflow-hidden">
        <CustomImage
          src="/assets/images/nature-background.webp" // Use base image format (jpg/png)
          alt="Nature background"
          fill={true}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-slate-800/10"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center w-full">
        <BusinessCard />
      </div>
    </div>
  );
} 