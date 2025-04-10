// import { Canvas } from '@react-three/fiber';
// import { Text } from '@react-three/drei';

// import { useMemo } from 'react';

// interface Skill {
//   label: string;
//   value: number;
// }

// const defaultSkills: Skill[] = [
//   { label: "AI Integration", value: 0.8 },
//   { label: "Backend Development", value: 0.9 },
//   { label: "System Design", value: 0.85 },
//   { label: "Infrastructure", value: 0.95 },
// ];

// interface SkillGraphProps {
//   skills?: Skill[];
//   height?: string;
//   goldColor?: string;
//   radius?: number;
//   labelRadius?: number;
//   fontSize?: number;
//   cameraFov?: number;
// }

// const AlternativeSkillGraph = ({
//   skills = defaultSkills,
//   height = "420px",
//   goldColor = "#ffd700",
//   radius = 1.5,
//   labelRadius = 2.1,
//   fontSize = 0.26,
//   cameraFov = 45,
// }: SkillGraphProps) => {
//   // Create hexagon points for base shape
//   const createHexagonPoints = (r: number, segments = 6) => {
//     const points = [];
//     for (let i = 0; i < segments; i++) {
//       const angle = (i / segments) * Math.PI * 2;
//       const x = Math.cos(angle) * r;
//       const y = Math.sin(angle) * r;
//       points.push(new THREE.Vector2(x, y));
//     }
//     return points;
//   };

//   // Create hexagon shape
//   const hexagonShape = useMemo(() => {
//     const shape = new THREE.Shape();
//     const points = createHexagonPoints(radius);
//     shape.moveTo(points[0].x, points[0].y);
//     for (let i = 1; i < points.length; i++) {
//       shape.lineTo(points[i].x, points[i].y);
//     }
//     shape.closePath();
//     return shape;
//   }, [radius]);

//   // Create inner hexagon shape
//   const innerHexagonShape = useMemo(() => {
//     const shape = new THREE.Shape();
//     const points = createHexagonPoints(radius * 0.75);
//     shape.moveTo(points[0].x, points[0].y);
//     for (let i = 1; i < points.length; i++) {
//       shape.lineTo(points[i].x, points[i].y);
//     }
//     shape.closePath();
//     return shape;
//   }, [radius]);

//   // Add error handling for vertices calculation
//   const { vertices, positions } = useMemo(() => {
//     try {
//       const verts = skills.map((skill, index) => {
//         const angle = (index / skills.length) * Math.PI * 2;
//         const skillRadius = radius * skill.value;
//         const x = Math.cos(angle) * skillRadius;
//         const y = Math.sin(angle) * skillRadius;
//         return [x, y, 0];
//       });
//       const allPositions = verts.flat();
//       return { vertices: verts, positions: allPositions };
//     } catch (error) {
//       console.error("Error calculating vertices:", error);
//       return { vertices: [], positions: [] };
//     }
//   }, [skills, radius]);

//   const shape = useMemo(() => {
//     try {
//       const shape = new THREE.Shape();
//       vertices.forEach(([x, y], index) => {
//         if (index === 0) shape.moveTo(x, y);
//         else shape.lineTo(x, y);
//       });
//       shape.closePath();
//       return shape;
//     } catch (error) {
//       console.error("Error creating shape:", error);
//       return new THREE.Shape();
//     }
//   }, [vertices]);

//   return (
//     <div
//       style={{
//         position: 'relative',
//         width: '100%',
//         height,
//         margin: '0 auto',
//         boxSizing: 'border-box',
//         overflow: 'visible',
//         background: 'transparent',
//       }}
//     >
//       <Canvas
//         camera={{ position: [0, 0, 5], fov: cameraFov }}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           zIndex: 2,
//         }}
//         gl={{ antialias: true }}
//       >
//         <ambientLight intensity={1.0} />
//         <pointLight position={[10, 10, 10]} intensity={1.5} />

//         {/* Base hexagon with increased line width */}
//         <lineLoop>
//           <shapeGeometry args={[hexagonShape]} />
//           <lineBasicMaterial color={goldColor} opacity={0.7} transparent={true} linewidth={1.5} />
//         </lineLoop>

//         {/* Inner hexagon */}
//         <lineLoop>
//           <shapeGeometry args={[innerHexagonShape]} />
//           <lineBasicMaterial color={goldColor} opacity={0.5} transparent={true} />
//         </lineLoop>

//         {/* Hexagon grid lines for reference (creates a radar grid effect) */}
//         {[0.25, 0.5].map((factor, i) => (
//           <lineLoop key={`grid-${i}`}>
//             <shapeGeometry args={[new THREE.Shape(createHexagonPoints(radius * factor))]} />
//             <lineBasicMaterial color={goldColor} opacity={0.3} transparent={true} />
//           </lineLoop>
//         ))}

//         {/* Center point - adjusted size */}
//         <mesh>
//           <sphereGeometry args={[0.12, 32, 32]} />
//           <meshStandardMaterial
//             color={goldColor}
//             metalness={0.8}
//             roughness={0.2}
//             emissive={goldColor}
//             emissiveIntensity={0.5}
//           />
//         </mesh>

//         {/* Radial lines */}
//         {skills.map((_, index) => {
//           const angle = (index / skills.length) * Math.PI * 2;
//           const x = Math.cos(angle) * radius;
//           const y = Math.sin(angle) * radius;
          
//           return (
//             <line key={`line-${index}`}>
//               <bufferGeometry>
//                 <bufferAttribute
//                   attach="attributes-position"
//                   count={2}
//                   array={new Float32Array([0, 0, 0, x, y, 0])}
//                   itemSize={3}
//                 />
//               </bufferGeometry>
//               <lineBasicMaterial color={goldColor} opacity={0.5} transparent={true} />
//             </line>
//           );
//         })}

//         {/* Skill value polygon */}
//         {vertices.length > 0 && (
//           <mesh>
//             <shapeGeometry args={[shape]} />
//             <meshBasicMaterial
//               color={goldColor}
//               opacity={0.35}
//               transparent={true}
//               side={THREE.DoubleSide}
//             />
//           </mesh>
//         )}

//         {/* Skill value polygon outline */}
//         {vertices.length > 0 && (
//           <lineLoop>
//             <bufferGeometry>
//               <bufferAttribute
//                 attach="attributes-position"
//                 count={vertices.length}
//                 array={new Float32Array(positions)}
//                 itemSize={3}
//               />
//             </bufferGeometry>
//             <lineBasicMaterial color={goldColor} opacity={0.7} transparent={true} linewidth={1.5} />
//           </lineLoop>
//         )}

//         {/* Skill points and labels with adjusted size */}
//         {skills.map((skill, index) => {
//           const angle = (index / skills.length) * Math.PI * 2;
//           const skillRadius = radius * skill.value;
//           const x = Math.cos(angle) * skillRadius;
//           const y = Math.sin(angle) * skillRadius;
//           const labelX = Math.cos(angle) * labelRadius;
//           const labelY = Math.sin(angle) * labelRadius;

//           return (
//             <group key={`skill-${index}`}>
//               {/* Skill points */}
//               <mesh position={[x, y, 0]}>
//                 <sphereGeometry args={[0.11, 16, 16]} />
//                 <meshStandardMaterial
//                   color={goldColor}
//                   metalness={0.9}
//                   roughness={0.1}
//                   emissive={goldColor}
//                   emissiveIntensity={0.8}
//                 />
//               </mesh>
              
//               {/* Skill labels */}
//               <Text
//                 position={[labelX, labelY, 0]}
//                 color="white"
//                 fontSize={fontSize}
//                 anchorX="center"
//                 anchorY="middle"
//                 maxWidth={2.2}
//                 outlineColor="black"
//                 outlineWidth={0.02}
//                 fillOpacity={1}
//               >
//                 {skill.label}
//               </Text>
              
//               {/* Percentage labels - smaller and closer */}
//               <Text
//                 position={[x * 1.12, y * 1.12, 0]}
//                 color={goldColor}
//                 fontSize={fontSize * 0.75}
//                 anchorX="center"
//                 anchorY="middle"
//                 outlineColor="black"
//                 outlineWidth={0.01}
//               >
//                 {`${Math.round(skill.value * 100)}%`}
//               </Text>
//             </group>
//           );
//         })}
//       </Canvas>
//     </div>
//   );
// };

// export default AlternativeSkillGraph;