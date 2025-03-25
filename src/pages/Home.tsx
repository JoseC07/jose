import Hero from '../components/sections/Hero';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Services from '../components/sections/Services';
import GlobalFooter from '../components/sections/GlobalFooter';
import SectionDivider from '../components/ui/SectionDivider';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Hero />
      
      <main id="main-content" className="container mx-auto px-6 pt-4 md:pt-24 pb-16 max-w-4xl">
        <Experience />
        
        <SectionDivider />
        
        <Projects />
        
        <Skills />
        
        <SectionDivider />
        
        <Services />
      </main>
      
      <GlobalFooter />
    </div>
  );
} 