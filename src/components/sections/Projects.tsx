import { useState } from 'react';
import { Button } from '../ui/button';
import JaguarSilhouette from '../ui/JaguarSilhouette';
import ProjectCard from '../ui/ProjectCard';
import { scrollToElement } from '../../utils/scrollTo';

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const handleButtonClick = () => {
    scrollToElement('projects');
  };

  const projects = [
    {
      title: "ERP System with AI Forecasting",
      period: "2024 – 2025",
      details: [
        "Lightweight ERP with AI for inventory smarts.",
        "Privacy-first, closed-environment AI setup."
      ],
      showDemoButton: true
    },
    {
      title: "AI Note Summarizer",
      period: "2024",
      details: [
        "Offline AI tool for private note-taking.",
        "Built with Tauri, React, and Go—local and slick."
      ],
      showDemoButton: true
    }
  ];

  return (
    <section className="mb-16 relative" id="projects">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <div key={index} className="relative">
            <ProjectCard 
              key={index}
              project={project}
              isActive={activeProject === index}
              onClick={() => setActiveProject(index === activeProject ? null : index)}
            />
            {project.showDemoButton && (
              <div className="absolute bottom-4 right-4">
                <Button
                  variant='metallic'
                  size="sm"
                  onClick={handleButtonClick}
                  showArrow={true}
                  aria-label="View projects and live demonstrations"
                  className='hover:text-yellow-400'
                >
                  Explore Live Demos
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex flex-col items-center relative">
        <JaguarSilhouette
          width={600}
          height={600}
          className="opacity-5"
          themeColors={['text-yellow-500', 'text-yellow-300']}
          animated={true}
          interactive={true}
        />
      </div>
    </section>
  );
} 