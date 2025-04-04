import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
  ArrowRight, Briefcase, Calendar, Code, Database,GraduationCap,
  Laptop, Layers, MapPin, Server, Star, User, Zap
} from "lucide-react"
import Hero from "../components/sections/Hero"
import { useHashScroll } from "../hooks/useHashScroll"

// Generic card container for sections like About, Experience, Skills, Education
const InfoCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-800 border border-slate-700 rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

// Header section within an InfoCard
const InfoCardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Content section within an InfoCard
const InfoCardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Title element within an InfoCardHeader
const InfoCardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

// Description text, often used in InfoCardHeader
const InfoCardDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={`text-sm text-slate-400 ${className}`}>{children}</p>
);

// Badge for status indicators (e.g., job type, education status)
const StatusBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

// Progress bar specifically for skills section
const SkillProgressBar = ({ value, className }: { value: number, className?: string }) => (
  <div className={`relative h-2 w-full overflow-hidden rounded-full bg-slate-700 ${className}`}>
    <div
      className="h-full w-full flex-1 bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
);

const experiences = [
    {
        title: "IT Trainer",
        company: "Cyber-Seniors",
        period: "Oct 2024 – Present",
        location: "Remote",
        type: "Part-time",
        icon: <GraduationCap className="h-5 w-5" />,
        achievements: [
        { text: "Trained 200+ seniors on software and cloud tools." },
        { text: "Simplified tech for non-techies, boosted efficiency 15%.", highlight: true },
        { text: "Mentored devs, grew the team 20%." },
        ],
    },
    {
        title: "System and Database Administrator - ERP & Cloud",
        company: "Awe Sum Organics",
        period: "Apr 2023 – Nov 2023",
        location: "Santa Cruz, CA",
        type: "Full-time",
        icon: <Server className="h-5 w-5" />,
        achievements: [
        { text: "Upgraded an ERP system, zero data loss." },
        { text: "Automated reports with SQL, slashed time by 80%.", highlight: true },
        { text: "Set up Azure cloud—secure and smooth." },
        ],
    },
    {
        title: "Freelance Developer – Backend & Infrastructure Projects",
        company: "Self-employed",
        period: "Jan 2021 – Present",
        location: "Remote",
        type: "Freelance",
        icon: <Code className="h-5 w-5" />,
        achievements: [
        { text: "Built ERP integrations and apps with Go, React, SQL." },
        { text: "Sped up databases 30% with smart tweaks.", highlight: true },
        { text: "Automated deployments with CI/CD and Docker." },
        ],
    },
]

const skills = [
  { name: "Backend Development", level: 90, category: "Development", icon: <Server className="h-4 w-4" /> },
  { name: "ERP Systems", level: 95, category: "Systems", icon: <Database className="h-4 w-4" /> },
  { name: "Cloud Infrastructure", level: 85, category: "Infrastructure", icon: <Layers className="h-4 w-4" /> },
  { name: "SQL & Database Optimization", level: 90, category: "Data", icon: <Database className="h-4 w-4" /> },
  { name: "React & Frontend", level: 80, category: "Development", icon: <Code className="h-4 w-4" /> },
  { name: "CI/CD & Automation", level: 85, category: "Infrastructure", icon: <Zap className="h-4 w-4" /> },
]

const skillCategories = ["All", ...new Set(skills.map((skill) => skill.category))]

export default function ExperiencePage() {
  useHashScroll();

  const [activeSkillCategory, setActiveSkillCategory] = useState("All")

  const filteredSkills = skills.filter(
    (skill) => activeSkillCategory === "All" || skill.category === activeSkillCategory,
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Hero />
      
      <main id="main-content" className="container mx-auto px-6 py-16 max-w-6xl flex-grow relative z-10">
      <section id="about" aria-labelledby="about-me-heading" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-6">
            <User className="text-yellow-400 h-5 w-5 mr-2" />
            <h2 id="about-me-heading" className="text-2xl font-bold">About Me</h2>
          </div>
          <InfoCard className="hover:shadow-lg hover:shadow-yellow-900/5 transition-all duration-300">
            <InfoCardContent className="pt-4">
              <div className="space-y-4 text-slate-300">
                <p>
                  I'm a Backend Engineer who thrives on turning backend chaos into scalable systems that work — from ERP deployments and SQL automation to cloud-based integrations and CI/CD workflows. At Awe Sum Organics, I helped slash deployment times by 80% and automated backend reporting with zero data loss. I've also built full-stack apps as a freelancer and taught backend/cloud tools to hundreds of learners through nonprofit work.
                </p>
                <p>
                  My journey hasn't been linear — raised by hard-working immigrant parents, I learned to problem-solve by fixing Minecraft servers and hustling through freelance work before returning to finish my CS degree (expected Summer 2025). I believe great tech doesn't just ship clean code — it creates access, reduces friction, and gives people a voice.
                </p>
                <p>
                  I specialize in backend development with cloud infrastructure, and I'm passionate about building tools that empower both users and devs through clarity, automation, and accessibility.
                </p>
                <blockquote className="relative pl-4 border-l-2 border-yellow-400 italic text-slate-200 my-6">
                  My vision is clear: hybrid people-AI systems that prioritize accessibility through smarter abstractions. <span className="text-yellow-400">How can technology amplify imperfection to create something greater?</span> The best tech doesn't erase our flaws—it celebrates them, turning chaos into creation. I'm here to build solutions that balance innovation with ethics, so tech empowers the many, not the few. Where can your imperfections shine today? Let's connect and find out.
                </blockquote>
              </div>
            </InfoCardContent>
          </InfoCard>
        </section>

        <section id="work" aria-labelledby="experience-heading" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-6">
            <Briefcase className="text-yellow-400 h-5 w-5 mr-2" />
            <h2 id="experience-heading" className="text-2xl font-bold">Professional Experience</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-yellow-400 via-yellow-400/50 to-slate-700 -z-10"></div>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-20">
                  <div className="absolute left-0 top-6 transform -translate-y-1/2 w-16 h-16 rounded-full bg-slate-900 border-4 border-yellow-400/30 flex items-center justify-center text-yellow-400 z-10">
                    {exp.icon}
                  </div>
                  <InfoCard className="bg-slate-800/80 backdrop-blur-sm border-slate-700 hover:shadow-lg hover:shadow-yellow-900/5 transition-all duration-300">
                    <InfoCardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <InfoCardTitle>{exp.title}</InfoCardTitle>
                          <InfoCardDescription className="text-slate-300 font-medium">{exp.company}</InfoCardDescription>
                        </div>
                        <div className="flex flex-col sm:items-end text-right">
                          <div className="flex items-center text-sm text-slate-400">
                            <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center text-sm text-slate-400 mt-1">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span>{exp.location}</span>
                            <StatusBadge className="ml-2 bg-slate-700 text-slate-300 hover:bg-slate-600">{exp.type}</StatusBadge>
                          </div>
                        </div>
                      </div>
                    </InfoCardHeader>
                    <InfoCardContent>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className={`flex items-start ${achievement.highlight ? "text-yellow-300" : "text-slate-300"}`}
                          >
                            <Star
                              className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${achievement.highlight ? "text-yellow-400 fill-yellow-400/30" : "text-slate-500"}`}
                            />
                            <span>{achievement.text}</span>
                          </li>
                        ))}
                      </ul>
                    </InfoCardContent>
                  </InfoCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-heading" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-6">
            <Zap className="text-yellow-400 h-5 w-5 mr-2" />
            <h2 id="skills-heading" className="text-2xl font-bold">Skills & Expertise</h2>
          </div>
          <InfoCard>
            <InfoCardHeader className="pb-2">
               <div className="flex flex-wrap gap-y-1 space-x-1 p-1 bg-slate-700 border border-slate-600 rounded-md w-full sm:w-auto">
                  {skillCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveSkillCategory(category)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors sm:flex-grow-0 ${
                        activeSkillCategory === category
                          ? 'bg-yellow-400 text-black shadow-md'
                          : 'text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
            </InfoCardHeader>
            <InfoCardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-yellow-400/10 flex items-center justify-center mr-3 flex-shrink-0">
                          {skill.icon}
                        </div>
                        <span className="font-medium text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm text-slate-400">{skill.level}%</span>
                    </div>
                    <SkillProgressBar value={skill.level} />
                  </div>
                ))}
                {filteredSkills.length === 0 && (
                    <p className="text-slate-400 sm:col-span-2 text-center">No skills match the selected category.</p>
                )}
              </div>
            </InfoCardContent>
          </InfoCard>
        </section>

        <section id="education" aria-labelledby="education-heading" className="mb-16 scroll-mt-20 mt-16">
          <div className="flex items-center mb-6">
            <GraduationCap className="text-yellow-400 h-5 w-5 mr-2" />
            <h2 id="education-heading" className="text-2xl font-bold">Education</h2>
          </div>
          <InfoCard>
            <InfoCardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between gap-4 items-start md:items-center">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-yellow-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white pt-5">Bachelor of Science in Computer Science</h3>
                    <p className="text-slate-400">California State University, Monterey Bay</p>
                    <p className="text-slate-300">Expected Summer 2025</p>
                  </div>
                </div>
                <StatusBadge className="bg-yellow-400 text-black hover:bg-yellow-300 w-fit mt-2 md:mt-0">In Progress</StatusBadge>
              </div>
            </InfoCardContent>
          </InfoCard>
        </section>

        <section id="cta" aria-label="Call to action" className="mb-16 scroll-mt-20">
  <InfoCard className="bg-gradient-to-br from-slate-900 via-indigo-900 to-yellow-800/30 border border-indigo-500/50 shadow-xl rounded-xl overflow-hidden">
    <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Text Section */}
      <div className="max-w-lg">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-3 text-white tracking-tight">
          Let's Build Something Amazing Together!
        </h3>
        <p className="text-slate-200 text-lg leading-relaxed">
          Got a project in mind? I'm here to bring your ideas to life with creativity, expertise, and a passion for innovation.
        </p>
      </div>

      {/* Button Section */}
      <div className="flex flex-wrap gap-4">
        <Link to="/contact" role="button" tabIndex={0}>
          <Button
            className="group relative overflow-hidden bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 focus-visible:from-yellow-500 focus-visible:to-yellow-300 text-gray-950 font-semibold text-lg px-6 py-3 rounded-lg shadow-lg hover:shadow-xl focus-visible:shadow-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <span className="relative z-10 flex items-center">
              Start the Conversation
              <ArrowRight
                className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2"
                aria-hidden="true"
              />
            </span>
            <span className="absolute inset-0 bg-white/30 transform scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Button>
        </Link>
        <Link to="/blog" role="button" tabIndex={0}>
          <Button
            variant="outline"
            className="group bg-transparent border-indigo-400/60 hover:border-indigo-300 focus-visible:border-indigo-300 hover:bg-indigo-600/20 focus-visible:bg-indigo-600/20 text-white font-medium text-lg px-6 py-3 rounded-lg transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <span className="relative z-10 flex items-center">
              Explore Portfolio/Blog
              <Laptop
                className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2"
                aria-hidden="true"
              />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  </InfoCard>
</section>
      </main>
      
  
    </div>
  )
} 