
import { Link } from 'react-router-dom';

export function CosmicButtons() {
  return (
    <div className="p-8">
      <div className="btn-group">
        <Link to="/" className="btn-primary-node animate-primary-pulse">
          <span className="status-indicator animate-status-blink"></span>
          Ready Player One
        </Link>
        
        <Link to="/blog" className="btn-secondary-node">
          Join as Player Two
        </Link>
      </div>
      
      {/* Accessibility Information */}
      <div className="mt-6 text-sm opacity-80 max-w-md mx-auto border border-secondary-glow/20 bg-deep-space/30 p-4 rounded-md">
        <h3 className="font-medium mb-2 text-primary-glow/90">Navigation Guide</h3>
        <p className="mb-2">
          <span className="text-status-indicator font-medium">Ready Player One:</span>{" "}
          Launches an immersive experience showcasing my current career state and professional journey.
        </p>
        <p>
          <span className="text-secondary-glow/90 font-medium">Join as Player Two:</span>{" "}
          Takes you to a classic dashboard featuring my Blog, Live Demos, and About Me sections.
        </p>
      </div>
    </div>
  );
} 