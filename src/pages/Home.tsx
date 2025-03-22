import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
// import { CosmicButtons } from '../components/CosmicButtons';
import CustomImage from '../components/CustomImage';
import JaguarSilhouette from '../components/JaguarSilhouette';

export default function Home() {
  const handleButtonClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header Section */}
      <header className="relative">
        {/* Player Buttons */}
        {/* <div className="absolute top-4 right-6 md:right-12 z-20">
          <CosmicButtons/>
        </div> */}

        <div className="relative h-[300px] w-full overflow-hidden">
          {/* Banner Image */}
          <CustomImage
            src="/assets/images/setup.jpg"
            alt="Tech workspace setup"
            fill
            className="object-cover"
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/50">
            {/* Subtle lightning bolt flare */}
            <div className="absolute right-20 top-1/2 h-40 w-1 bg-yellow-400 opacity-60 blur-md transform -rotate-20"></div>
            <div className="absolute right-24 top-1/2 h-40 w-1 bg-yellow-400 opacity-60 blur-md transform -rotate-30"></div>

          {/* Jaguar Silhouette positioned above the image */}
          <JaguarSilhouette 
            width={100}
            height={100}
            position="absolute"
            className="bottom-3 left-3 z-[0]"
            opacity="opacity-80" 
            themeColors={['text-emerald-700', 'text-blue-400']}
            animated={true}
            interactive={true}
          />
          </div>
          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
            <h1 className="font-serif text-3xl md:text-5xl italic font-bold tracking-wide">Jose G. Caudillo Jr.</h1>
            <h2 className="mt-2 text-lg md:text-xl font-medium">Systems & Cloud Specialist | DevOps | AI Enthusiast</h2>
            <div className="mt-4 flex items-center space-x-4">
              <a
                href="mailto:caudillojose5@gmail.com"
                className="flex items-center text-sm hover:text-yellow-400 transition-colors"
              >
                <Mail className="mr-1 h-4 w-4" />
                caudillojose5@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/josecaud"
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-sm hover:text-yellow-400 transition-colors"
              >
                <Linkedin className="mr-1 h-4 w-4" />
                linkedin.com/in/josecaud
              </a>
              <a
                href="https://github.com/josec07"
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-sm hover:text-yellow-400 transition-colors"
              >
                <Github className="mr-1 h-4 w-4" />
                github.com/josec07
              </a>
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-6 md:left-12">
          <div className="h-32 w-32 rounded-full border-4 border-slate-900 overflow-hidden">
            <CustomImage
              src="/assets/images/profile.png"
              alt="Jose G. Caudillo Jr."
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-24 pb-16 max-w-4xl">
        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">IT Trainer, Cyber-Seniors</h3>
                <span className="text-slate-400">Oct 2024 – Present</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>Trained 200+ seniors on software and cloud tools.</li>
                <li className="flex items-center">
                  <span>Simplified tech for non-techies, boosted efficiency 15%.</span>
                  <Zap className="ml-2 h-4 w-4 text-yellow-400" />
                </li>
                <li>Mentored devs, grew the team 20%.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Systems Engineer, Awe Sum Organics</h3>
                <span className="text-slate-400">Apr 2023 – Nov 2023</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>Upgraded an ERP system, zero data loss.</li>
                <li className="flex items-center">
                  <span>Automated reports with SQL, slashed time by 80%.</span>
                  <Zap className="ml-2 h-4 w-4 text-yellow-400" />
                </li>
                <li>Set up Azure cloud—secure and smooth.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Freelance Full-Stack Engineer</h3>
                <span className="text-slate-400">Jan 2021 – Present</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>Built ERP integrations and apps with Go, React, SQL.</li>
                <li className="flex items-center">
                  <span>Sped up databases 30% with smart tweaks.</span>
                  <Zap className="ml-2 h-4 w-4 text-yellow-400" />
                </li>
                <li>Automated deployments with CI/CD and Docker.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sword Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-slate-900 px-4 transform rotate-90">⚔️</div>
          </div>
        </div>

        {/* Projects Section */}
        <section className="mb-16 relative">
          {/* Subtle jaguar watermark */}
          
          <JaguarSilhouette
            width={200} // Reduced size to fit better
            height={200}
            position="absolute"
            className="bottom-0 right-0 opacity-30" // Increased opacity for visibility
            opacity="opacity-80"
            themeColors={['#FFD700', '#4A3F1F']} // Match the button's yellow flair
            animated={true}
            interactive={true}
          />
          <Button
            className="absolute bottom-4 right-4 opacity-100 z-10"
            variant='metallic'
            size="sm"
            onClick={handleButtonClick}
            showArrow={true}
          >
            Explore Live Demos
          </Button>
        

          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">ERP System with AI Forecasting (2024 – 2025)</h3>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>Lightweight ERP with AI for inventory smarts.</li>
                <li>Privacy-first, closed-environment AI setup.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">AI Note Summarizer (2024)</h3>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>Offline AI tool for private note-taking.</li>
                <li>Built with Tauri, React, and Go—local and slick.</li>
              </ul>
            </div>
          </div>
        </section>

                {/* Skills Section */}
                <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tech</h3>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>Go, Python, TypeScript, React, SQL</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Cloud</h3>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>AWS, Azure</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Tools</h3>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>Terraform, Docker, GitHub Actions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Specialties</h3>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>ERP systems, database optimization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sword Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-slate-900 px-4 transform rotate-90">⚔️</div>
          </div>
        </div>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Services</h2>
          <p className="text-lg">
            I offer consultation for ERP and DevOps solutions, plus in-person senior tech support—let's make tech work
            for you.
          </p>
          <div className="mt-8">
            <Button className="bg-slate-800 hover:bg-slate-700 hover:text-yellow-400 transition-colors">
              Get in Touch
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">Open to consultation—let's simplify and amplify your systems.</p>
            <div className="flex space-x-4">
              <Link
                to="https://linkedin.com/in/josecaud"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                to="https://github.com/josec07"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 