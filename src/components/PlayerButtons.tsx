import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export function PlayerButtons() {
  const [isHovered, setIsHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  // Text animation for the introduction
  const introTexts = [
    "Welcome to my Portfolio",
    "Browse my Projects",
    "Read my Blog posts",
    "See Live Demos & More"
  ];
  
  // Add effect to change text index
  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % introTexts.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [introTexts.length]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      {/* Animated intro text */}
      <div className="text-sm md:text-base text-gray-300 mb-3 md:mb-0 overflow-hidden relative h-6">
        <span className="animate-slide-in-out absolute">
          <strong>{introTexts[textIndex]}</strong> →
        </span>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Ready Player One Button (Main Button) */}
        <Link
          to="/"
          className={cn(
            "relative px-6 py-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20",
            "border-2 border-purple-400/50 text-purple-300 rounded-lg",
            "text-base md:text-lg font-semibold transition-all duration-300",
            "hover:scale-[1.02] hover:border-purple-400 hover:text-purple-200",
            "hover:shadow-[0_0_12px_rgba(139,92,246,0.5)]",
            "animate-pulse-main group"
          )}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"/>
            <strong>Ready Player One</strong>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-lg" />
        </Link>

        {/* Player Two Button (Secondary) */}
        <Link
          to="/blog"
          className={cn(
            "relative px-4 py-2 border-2 text-white/80 rounded-md text-sm md:text-base",
            "transition-all duration-300 bg-black/20",
            isHovered ? (
              "border-gray-400/70 text-gray-300 scale-[1.02] shadow-[0_0_10px_rgba(156,163,175,0.3)]"
            ) : (
              "border-white/30 animate-pulse-subtle"
            )
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Join as Player Two to view detailed portfolio and blogs"
        >
          <span className="relative z-10"><strong>Join as Player Two</strong></span>
        </Link>
      </div>
    </div>
  );
} 