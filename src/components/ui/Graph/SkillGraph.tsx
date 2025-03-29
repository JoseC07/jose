import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useEffect, useState } from 'react';

const skills = [
  { label: "AI Integration", value: 1 },
  { label: "Backend Development", value: 3 },
  { label: "System Design", value: 2 },
  { label: "Infrastructure", value: 4 },
];

const SkillGraph = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { vertices, positions } = useMemo(() => {
    const verts = skills.map((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const radius = (skill.value / 5) * 1.5; // Reduced max radius to fit better
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return [x, y, 0];
    });
    const positions = verts.flat();
    return { vertices: verts, positions };
  }, []);

  // Calculate responsive values
  const labelRadiusBase = 1.8;
  const labelRadius = isMobile ? 1.6 : labelRadiusBase;
  const fontSize = isMobile ? 0.2 : 0.25;
  const titlePosition = isMobile ? -1.6 : -1.8;

  // Calculate fixed height based on viewport width
  const fixedHeight = isMobile ? '320px' : '450px';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%', // Full width of parent
        height: fixedHeight, // Fixed height
        margin: '0 auto',
        boxSizing: 'border-box',
        overflow: 'visible', // Allow content to overflow without being cut off
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: isMobile ? 55 : 50 }} // Adjusted for mobile
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '8px',
        }}
      >
        <ambientLight intensity={0.8} />

        {/* Reduced to just one main circle for better visibility */}
        <lineLoop>
          <circleGeometry args={[1.2, 64]} />
          <lineBasicMaterial color="#ffd700" opacity={0.5} transparent={true} />
        </lineLoop>

        {/* Only draw major axes for key points */}
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const x = Math.cos(angle) * 1.5;
          const y = Math.sin(angle) * 1.5;
          return (
            <line key={`axis-${index}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, x, y, 0])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ffd700" opacity={0.5} transparent={true} />
            </line>
          );
        })}

        {/* Add subtle fill to the polygon */}
        <mesh>
          <shapeGeometry>
            {(() => {
              const shape = new THREE.Shape();
              vertices.forEach(([x, y], index) => {
                if (index === 0) shape.moveTo(x, y);
                else shape.lineTo(x, y);
              });
              shape.closePath();
              return <shapeGeometry args={[shape]} />;
            })()}
          </shapeGeometry>
          <meshBasicMaterial color="#ffd700" opacity={0.2} transparent={true} />
        </mesh>

        {/* Polygon Outline with thicker line */}
        <lineLoop>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={vertices.length}
              array={new Float32Array(positions)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ffd700" linewidth={2} />
        </lineLoop>

        {/* Skill Points and Labels */}
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = (skill.value / 5) * 1.5;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const labelX = Math.cos(angle) * labelRadius;
          const labelY = Math.sin(angle) * labelRadius;
          return (
            <group key={skill.label}>
              <mesh position={[x, y, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color="#ffd700" />
              </mesh>
              <Text
                position={[labelX, labelY, 0]}
                color="#ffffff"
                fontSize={fontSize}
                anchorX="center"
                anchorY="middle"
                maxWidth={1}
              >
                {skill.label}
              </Text>
            </group>
          );
        })}

        {/* Title */}
        <Text
          position={[0, titlePosition, 0]}
          color="#ffffff"
          fontSize={isMobile ? 0.3 : 0.35}
          anchorX="center"
          anchorY="middle"
        >
          Intelligent Systems
        </Text>
      </Canvas>
    </div>
  );
};

export default SkillGraph;