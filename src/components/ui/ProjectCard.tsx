interface Project {
  title: string;
  period: string;
  details: string[];
}

interface ProjectCardProps {
  project: Project;
  // isActive?: boolean;
  // onClick?: () => void;
}

export default function ProjectCard({ project}: ProjectCardProps) {
  // const cardClasses = `p-4 rounded-lg transition-all ${
  //   isActive ? 'bg-slate-800' : 'bg-slate-800/50'
  // } ${onClick ? 'cursor-pointer' : ''}`;

  return (
    
      <div className=" p-4 rounded-lgspace-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span className="text-slate-400">{project.period}</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-base">
          {project.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    
  );
}