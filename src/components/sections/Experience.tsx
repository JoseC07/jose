import ExperienceCard from '../ui/ExperienceCard';

export default function Experience() {
  // Data-driven component
  const experiences = [
    {
      title: "IT Trainer, Cyber-Seniors",
      period: "Oct 2024 – Present",
      achievements: [
        { text: "Trained 200+ seniors on software and cloud tools." },
        { text: "Simplified tech for non-techies, boosted efficiency 15%.", highlight: true },
        { text: "Mentored devs, grew the team 20%." }
      ]
    },
    {
      title: "Systems Engineer, Awe Sum Organics",
      period: "Apr 2023 – Nov 2023",
      achievements: [
        { text: "Upgraded an ERP system, zero data loss." },
        { text: "Automated reports with SQL, slashed time by 80%.", highlight: true },
        { text: "Set up Azure cloud—secure and smooth." }
      ]
    },
    {
      title: "Freelance Full-Stack Engineer",
      period: "Jan 2021 – Present",
      achievements: [
        { text: "Built ERP integrations and apps with Go, React, SQL." },
        { text: "Sped up databases 30% with smart tweaks.", highlight: true },
        { text: "Automated deployments with CI/CD and Docker." }
      ]
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} {...exp} />
        ))}
      </div>
    </section>
  );
} 