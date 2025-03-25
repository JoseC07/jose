import { Zap } from 'lucide-react';

interface Achievement {
  text: string;
  highlight?: boolean;
}

interface ExperienceCardProps {
  title: string;
  period: string;
  achievements: Achievement[];
}

export default function ExperienceCard({ title, period, achievements }: ExperienceCardProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-slate-400">{period}</span>
      </div>
      <ul className="list-disc pl-5 space-y-1 text-base">
        {achievements.map((achievement, index) => (
          <li key={index} className={achievement.highlight ? "flex items-center" : ""}>
            <span>{achievement.text}</span>
            {achievement.highlight && <Zap className="ml-2 h-4 w-4 text-yellow-400" />}
          </li>
        ))}
      </ul>
    </div>
  );
} 