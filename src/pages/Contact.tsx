import { Link } from 'react-router-dom';
import GlobalFooter from '../components/sections/GlobalFooter';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div id="main-content" className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="text-yellow-400 hover:underline">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>

        <div className="bg-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <p className="text-lg mb-6">
            This is a placeholder for the contact form. Feel free to reach out and discuss how we can work together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Contact Form</h3>
              <p className="text-slate-400 mb-4">Placeholder for contact form</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Contact Information</h3>
              <p className="text-slate-400 mb-4">Placeholder for contact information</p>
            </div>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </div>
  );
} 