import styled, { keyframes } from 'styled-components';

type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

interface JaguarSilhouetteProps {
  width?: number | string;
  height?: number | string;
  position?: PositionType;
  className?: string;
  opacity?: string;
  themeColors?: string[];
  animated?: boolean;
  interactive?: boolean;
}

// Create rotation keyframes
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled SVG container with animation
const AnimatedSvg = styled.svg`
  .outer-circle {
    animation: ${rotate} 12s linear infinite;
    transform-origin: 256px 256px;
  }
`;

function JaguarSilhouette({
  width = 32,
  height = 32,
  position = 'absolute',
  className = '',
  opacity = '',
  themeColors = [],
  animated = false,
  interactive = false
}: JaguarSilhouetteProps) {
  // Main circles
  const centerX = 256;
  const centerY = 256;
  const outerRadius = 224;
  const innerRadius = 192;
  const smallCircleRadius = 10.5;
  
  // Prevent unused variable warnings
  void { themeColors, animated, interactive };
  
  // Arc parameters
  const arcFraction = 1/50; // 1/50 of the circle
  const arcAngle = 360 * arcFraction; // 7.2 degrees
  const startAngle = 0; // Starting position of the arc (can be adjusted)
  const endAngle = startAngle + 360 - arcAngle; // End before completing the full circle
  // Convert polar to cartesian coordinates
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  // Create an arc path
  const createArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };
  
  // Small circle positions (extracted from SVG path)
  const smallCircles = [
    { cx: 234.9, cy: 102.6 },
    { cx: 277.1, cy: 102.6 },
    { cx: 213.8, cy: 144.8 },
    { cx: 298.2, cy: 144.8 },
    { cx: 256.0, cy: 165.9 },
    { cx: 192.7, cy: 187.0 },
    { cx: 319.3, cy: 187.0 },
    { cx: 234.9, cy: 208.1 },
    { cx: 277.1, cy: 208.1 },
    { cx: 192.7, cy: 229.2 },
    { cx: 319.3, cy: 229.2 },
    { cx: 256.0, cy: 250.3 },
    { cx: 213.8, cy: 271.4 },
    { cx: 298.2, cy: 271.4 },
    { cx: 256.0, cy: 292.5 }
  ];

  return (
    <div
      style={{
        position,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      className={className}
    >
      <AnimatedSvg
        viewBox="0 0 512 512"
        style={{ width: '100%', height: '100%' }}
        aria-hidden="true"
        className={opacity}
      >
        {/* Gradient Definition */}
        <defs>
          <radialGradient id="metalGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#666633" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Outer circle with gap */}
        <path 
          className="outer-circle"
          d={createArc(centerX, centerY, outerRadius, startAngle, endAngle)}
          fill="none"
          stroke="url(#metalGradient)"
          strokeWidth="2"
        />

        {/* Inner circle (complete) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="none"
          stroke="url(#metalGradient)"
        />

        {/* Animated Dots */}
        {/* All 15 Animated Dots */}
        {smallCircles.map((circle, index) => (
          <circle
            key={index}
            cx={circle.cx}
            cy={circle.cy}
            r={smallCircleRadius}
            style={{
              fill: '#000000',
              animation: 'colorTransition 4s infinite alternate',
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </AnimatedSvg>

      {/* Inline CSS */}
      <style>
        {`
          @keyframes colorTransition {
            0% {
              fill: #1a1a1a;
              opacity: 0.4;
            }
            50% {
              fill: #FFD700;
              opacity: 1;
            }
            100% {
              fill: #000000;
              opacity: 0.8;
            }
          }

          @keyframes ringPulse {
            0% {
              stroke: url(#metalGradient);
              opacity: 0.6;
            }
            50% {
              stroke: #FFD700;
              opacity: 1;
            }
            100% {
              stroke: url(#metalGradient);
              opacity: 0.6;
            }
          }
        `}
      </style>
    </div>
  );
}

export default JaguarSilhouette;