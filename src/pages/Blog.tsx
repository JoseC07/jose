import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import GlobalFooter from '../components/sections/GlobalFooter';

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div id="main-content" className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="text-yellow-400 hover:underline">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Player Two Area</h1>

        <div className="bg-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Welcome, Player Two!</h2>
          <p className="text-lg mb-6">
            This is a special area for recruiters and potential collaborators. Here you'll find more detailed
            information about my projects, technical blog posts, and interactive demos.
          </p>
          <p className="text-lg">This page is currently under construction. Check back soon for more content!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Technical Blog</h3>
            <p className="mb-4">In-depth articles about my experiences with ERP systems, DevOps, and AI.</p>
            <Button className="bg-slate-700 hover:bg-slate-600 hover:text-yellow-400">Coming Soon</Button>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Interactive Demos</h3>
            <p className="mb-4">Try out some of my projects and see my code in action.</p>
            <Button className="bg-slate-700 hover:bg-slate-600 hover:text-yellow-400">Coming Soon</Button>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </div>
  );
} 