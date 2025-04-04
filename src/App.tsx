import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ExperiencePage from './pages/Experience';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import LandingPage from './pages/LandingPage';
import { ReactNode, useState, useEffect } from 'react';
import './App.css';

// Simple layout without navbar for landing page
const EmptyLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-900 text-white">
    {children}
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div style={{ visibility: 'hidden' }}>Loading...</div>;
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
        Skip to main content
      </a>
      
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <Routes>
          <Route path="/" element={
            <EmptyLayout>
              <LandingPage />
            </EmptyLayout>
          } />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </main>
    </Router>
  );
}

export default App; 