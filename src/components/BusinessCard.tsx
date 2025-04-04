import styled from 'styled-components';
import SkillGraph from './Graph/SkillGraph'; // Updated import
import { Github, Linkedin} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const CardContainer = styled.div`
  width: 60vw;
  max-width: 700px;
  height: auto;
  padding: 2rem;
  margin: 2rem auto;
  border-radius: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, #1a2526, #2a3b3c); /* Subdued, professional gradient */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3); /* Softer shadow */
  border: 1px solid #d4af37; /* Subtle gold border */
  box-sizing: border-box;

  /* Subtle glossy overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    border-radius: 1rem 1rem 0 0;
    pointer-events: none;
  }

  @media (max-width: 1200px) {
    width: 70vw;
    padding: 1.8rem;
  }

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  z-index: 2;
  width: 100%;
`;

const GraphSection = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  height: ${props => props.$isMobile ? '280px' : '350px'};
  position: relative;
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SkillItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05); /* Subtle white background for contrast */
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;
  border-left: 2px solid #d4af37; /* Thinner border */
  position: relative;
  overflow: hidden;

  /* Subtle glossy overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    pointer-events: none;
  }
`;

const SkillName = styled.h3`
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.4rem; /* Thinner progress bar */
  background-color: #2a3b3c;
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
  color: #d4af37; /* Gold for consistency */
  font-size: 0.85rem;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1.5rem;
  z-index: 2;
`;

const Title = styled.h1`
  font-family: 'Georgia', serif;
  color: #ffffff;
  font-size: 2.2rem; /* Slightly smaller for balance */
  margin: 0.5rem;
  z-index: 2;

  @media (max-width: 1200px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h2`
  font-family: 'Georgia', serif;
  color: #d4af37; /* Gold for emphasis */
  font-size: 1.1rem;
  margin: 0.25rem;
  z-index: 2;

  @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Tagline = styled.p`
  font-family: 'Georgia', serif;
  color: #ffffff;
  font-size: 1.1rem;
  margin: 1rem;
  z-index: 2;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.7rem 1.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  color: #d4af37;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid #d4af37;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(212, 175, 55, 0);
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: #d4af37;
    color: #1a2526;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.7);
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.7);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
    gap: 0.8rem;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
  z-index: 2;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-top: 0.8rem;
  }
`;

const SocialIcon = styled.a`
  color: #d4af37;
  font-size: 1.3rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
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
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <CardContainer>
      <HeaderSection>
        <Title>JOSE G. CAUDILLO JR.</Title>
        <Subtitle>BACKEND ENGINEER | CLOUD & SYSTEMS SPECIALIST</Subtitle>
      </HeaderSection>

      <GraphSection $isMobile={isMobile}>
        <SkillGraph
          skills={skillData}
          goldColor="#d4af37"
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
          <SocialIcon href="https://linkedin.com/in/josecaud" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
            <Linkedin size={20} />
          </SocialIcon>
          <SocialIcon href="https://github.com/josec07" target="_blank" rel="noopener noreferrer" title="GitHub Profile">
            <Github size={20} />
          </SocialIcon>
        </SocialMediaContainer>

        <ButtonContainer>
          <RouterLink
            to="/experience"
            title="View my work experience and portfolio projects"
            style={{ textDecoration: 'none' }}
          >
            <Button>Experience & Projects</Button>
          </RouterLink>
          <RouterLink
            to="/blog"
            title="Read my articles and insights"
            style={{ textDecoration: 'none' }}
          >
            <Button>Blog</Button>
          </RouterLink>
          <RouterLink
            to="/contact"
            title="Get in touch or book a consultation"
            style={{ textDecoration: 'none' }}
          >
            <Button>Contact Me</Button>
          </RouterLink>
        </ButtonContainer>
      </FooterSection>
    </CardContainer>
  );
};

export default BusinessCard; 