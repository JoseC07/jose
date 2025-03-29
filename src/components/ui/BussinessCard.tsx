import styled from 'styled-components';
import AlternativeSkillGraph from './Graph/AlternativeSkillGraph';
import { Mail, Github, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

const CardContainer = styled.div`
  width: 60vw;
  max-width: 700px;
  height: auto;
  padding: 2.5rem;
  margin: 2rem auto;
  border-radius: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(10, 20, 40, 0.85), rgba(20, 30, 50, 0.85)); /* More transparent background */
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.4);
  border: 2px solid #d4af37;
  box-sizing: border-box;
  backdrop-filter: blur(5px); /* Glass-like blur effect */

  /* Enhanced glossy overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%; /* Increased height for more gloss */
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1),
      transparent
    );
    border-radius: 1.4rem 1.4rem 0 0;
    pointer-events: none;
  }

  /* Inner glow effect */
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 1.4rem;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(255, 255, 255, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 1200px) {
    width: 70vw;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  z-index: 2;
  width: 100%;
`;

const GraphSection = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin: 1.5rem 0;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SkillItem = styled.div`
  background-color: rgba(0, 0, 0, 0.3); /* More transparent */
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  border-left: 3px solid #d4af37;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(3px); /* Glass-like blur effect */

  /* Enhanced glossy overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60%; /* Increased height for more gloss */
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    pointer-events: none;
  }
`;

const SkillName = styled.h3`
  color: white;
  font-size: 1.1rem; /* Increased for readability */
  font-weight: 500;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #1a2a3a;
  border-radius: 1rem;
  margin: 0.5rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $value: number }>`
  height: 100%;
  border-radius: 1rem;
  background-color: #d4af37;
  width: ${props => props.$value * 100}%;
`;

const ProgressValue = styled.p`
  color: #ffffff; /* White for better contrast */
  font-size: 0.9rem; /* Increased for readability */
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  z-index: 2;
`;

const Title = styled.h1`
  font-family: 'Georgia', serif;
  color: #ffffff;
  font-size: 2.5rem;
  margin: 0.5rem;
  z-index: 2;

  @media (max-width: 1200px) {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-family: 'Georgia', serif;
  color: #ffffff;
  font-size: 1.3rem; /* Increased for readability */
  margin: 0.25rem;
  z-index: 2;

  @media (max-width: 1200px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Tagline = styled.p`
  font-family: 'Georgia', serif;
  color: #d4af37;
  font-size: 1.3rem; /* Increased for readability */
  margin: 1rem;
  z-index: 2;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3); /* Transparent background */
  color: #ffffff;
  font-size: 1.2rem;
  font-family: 'Georgia', serif;
  cursor: pointer;
  border: 1px solid #d4af37;
  margin-top: 1.5rem;
  z-index: 2;
  position: relative;
  backdrop-filter: blur(3px); /* Glass-like blur effect */

  /* Glossy overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 1.1rem;
    margin-top: 1rem;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  z-index: 2;

  @media (max-width: 768px) {
    gap: 1.2rem;
    margin-top: 1rem;
  }
`;

const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const skillData = [
  { label: "AI Integration", value: 0.8 },
  { label: "Backend Development", value: 0.9 },
  { label: "System Design", value: 0.85 },
  { label: "Infrastructure", value: 0.95 },
];

const BusinessCard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize); // Cleanup
  }, []);

  const graphHeight = isMobile ? "350px" : "450px";
  const graphRadius = isMobile ? 1.3 : 1.5;
  const graphLabelRadius = isMobile ? 1.7 : 2.1;
  const graphFontSize = isMobile ? 0.22 : 0.26;
  const graphCameraFov = isMobile ? 55 : 45;

  return (
    <CardContainer>
      <HeaderSection>
        <Title>JOSE G. CAUDILLO JR.</Title>
        <Subtitle>SYSTEMS & CLOUD SPECIALIST | DEVOPS | AI ENTHUSIAST</Subtitle>
      </HeaderSection>

      <GraphSection>
        <AlternativeSkillGraph
          skills={skillData}
          height={graphHeight}
          goldColor="#d4af37"
          radius={graphRadius}
          labelRadius={graphLabelRadius}
          fontSize={graphFontSize}
          cameraFov={graphCameraFov}
        />
      </GraphSection>

      <SkillsGrid>
        {skillData.map((skill, index) => (
          <SkillItem key={index}>
            <SkillName>{skill.label}</SkillName>
            <ProgressBar>
              <ProgressFill $value={skill.value} />
            </ProgressBar>
            <ProgressValue>{Math.round(skill.value * 100)}%</ProgressValue>
          </SkillItem>
        ))}
      </SkillsGrid>

      <FooterSection>
        <Tagline>BUILDING DYNAMIC SYSTEMS</Tagline>
        <SocialMediaContainer>
          <SocialIcon href="https://linkedin.com/in/josecaud">
            <Linkedin size={24} />
          </SocialIcon>
          <SocialIcon href="https://github.com/josec07">
            <Github size={24} />
          </SocialIcon>
          <SocialIcon href="mailto:caudillojose5@gmail.com">
            <Mail size={24} />
          </SocialIcon>
        </SocialMediaContainer>
        <Button>See My Work</Button>
      </FooterSection>
    </CardContainer>
  );
};

export default BusinessCard;