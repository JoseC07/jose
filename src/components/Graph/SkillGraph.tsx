import styled from 'styled-components';
import { useMemo } from 'react';

interface Skill {
  label: string;
  value: number;
}

const defaultSkills: Skill[] = [
  { label: "AI Integration", value: 0.8 },
  { label: "Backend Development", value: 0.9 },
  { label: "System Design", value: 0.85 },
  { label: "Infrastructure", value: 0.95 },
];

interface SkillGraphProps {
  skills?: Skill[];
  goldColor?: string;
}

const GraphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// Define viewBox dimensions and padding
const VIEWBOX_WIDTH = 400;
const VIEWBOX_HEIGHT = 350; // Adjusted height slightly for better label spacing
const PADDING = 45; // Increased padding slightly

const SkillGraph = ({
  skills = defaultSkills,
  goldColor = "#d4af37",
}: SkillGraphProps) => {
  // Calculate based on viewBox and padding
  const radius = Math.min(VIEWBOX_WIDTH / 2, VIEWBOX_HEIGHT / 2) - PADDING;
  const centerX = VIEWBOX_WIDTH / 2;
  const centerY = VIEWBOX_HEIGHT / 2;

  // Calculate points for the radar chart
  const points = useMemo(() => {
    return skills.map((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
      const skillRadius = radius * skill.value;
      const x = centerX + Math.cos(angle) * skillRadius;
      const y = centerY + Math.sin(angle) * skillRadius;
      return { x, y };
    });
  }, [skills, radius, centerX, centerY]);

  // Create points string for the polygon
  const pointsString = points.map((point) => `${point.x},${point.y}`).join(" ");

  // Calculate label positions
  const labelPositions = useMemo(() => {
      return skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
        // Position labels slightly further out based on padding
        const labelRadius = Math.min(VIEWBOX_WIDTH / 2, VIEWBOX_HEIGHT / 2) - PADDING / 2.5;
        const x = centerX + Math.cos(angle) * labelRadius;
        const y = centerY + Math.sin(angle) * labelRadius;
        return { x, y, label: skill.label, value: skill.value };
      });
  }, [skills, radius, centerX, centerY]); // Dependencies updated slightly, labelRadius now derived inside

  return (
    <GraphContainer>
      <svg
        width="100%" // Fill container width
        height="100%" // Fill container height
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} // Define coordinate system
        preserveAspectRatio="xMidYMid meet" // Scale proportionally and center
      >
        {/* Background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={goldColor}
          strokeWidth="1"
          opacity="0.3"
        />
        {/* Inner circles for reference */}
        {[0.25, 0.5, 0.75].map((factor, i) => (
          <circle
            key={`circle-${i}`}
            cx={centerX}
            cy={centerY}
            r={radius * factor}
            fill="none"
            stroke={goldColor}
            strokeWidth="0.5"
            opacity="0.2"
          />
        ))}
        {/* Radial lines */}
        {skills.map((_, index) => {
          const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          return (
            <line
              key={`line-${index}`}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={goldColor}
              strokeWidth="0.5"
              opacity="0.2"
            />
          );
        })}
        {/* Skill polygon */}
        <polygon
          points={pointsString}
          fill={goldColor}
          fillOpacity="0.2"
          stroke={goldColor}
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
        {/* Skill points */}
        {points.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="4" // Keep radius in viewBox units
            fill={goldColor}
            stroke="white"
            strokeWidth="1"
          />
        ))}
        {/* Labels */}
        {labelPositions.map((pos, index) => (
          <g key={`label-${index}`}>
            <text
              x={pos.x}
              y={pos.y}
              fill="white"
              fontSize="12" // Adjusted font size for viewBox
              fontFamily="Roboto, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {pos.label}
            </text>
            {/* Percentage text positioned relative to skill point */}
            <text
              x={points[index].x}
              y={points[index].y + 18} // Adjusted offset for viewBox
              fill={goldColor}
              fontSize="10" // Adjusted font size for viewBox
              fontFamily="Roboto, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {`${Math.round(pos.value * 100)}%`}
            </text>
          </g>
        ))}
      </svg>
    </GraphContainer>
  );
};

export default SkillGraph; 