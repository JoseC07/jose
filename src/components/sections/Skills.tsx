interface SkillCategory {
  title: string;
  skills: string[];
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Tech",
      skills: ["Go, Python, TypeScript, React, SQL"]
    },
    {
      title: "Cloud",
      skills: ["AWS, Azure"]
    },
    {
      title: "Tools",
      skills: ["Terraform, Docker, GitHub Actions"]
    },
    {
      title: "Specialties",
      skills: ["ERP systems, database optimization"]
    }
  ];

  return (
    <section className="mb-16" id="skills">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
            <ul className="list-disc pl-5 space-y-1 text-base">
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
} 