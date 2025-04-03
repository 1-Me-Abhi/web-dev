import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma } from 'react-icons/fa';
import { SiJavascript, SiFirebase, SiBootstrap, SiTailwindcss, SiFramer } from 'react-icons/si';

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background: #f9f9ff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #6a11cb;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const SkillCard = styled(motion.div)`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-bottom: 4px solid #ff7b9c;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(106, 17, 203, 0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #6a11cb;
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
`;

const SkillDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const skills = [
  {
    title: "Frontend Development",
    icon: <FaReact />,
    description: "I specialize in building responsive, interactive, and visually appealing user interfaces with modern frontend technologies.",
    technologies: ["React", "HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "CSS & Design Systems",
    icon: <FaCss3Alt />,
    description: "Proficient in creating beautiful UIs with advanced CSS techniques, animations, and responsive designs for all screen sizes.",
    technologies: ["CSS3", "Flexbox", "Grid", "Animations", "Responsive Design"]
  },
  {
    title: "UI Frameworks & Libraries",
    icon: <SiBootstrap />,
    description: "Experience with various CSS frameworks and animation libraries to create efficient and visually stunning web applications.",
    technologies: ["Bootstrap", "Tailwind CSS", "Framer Motion", "Emotion"]
  },
  {
    title: "Development Tools",
    icon: <FaGitAlt />,
    description: "Skilled with modern development workflows, version control, and design tools to efficiently build and deploy websites.",
    technologies: ["Git", "GitHub", "Figma", "VS Code", "Responsive Testing"]
  }
];

const Skills = () => {
  return (
    <SkillsSection id="skills">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </Title>
        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <IconWrapper>{skill.icon}</IconWrapper>
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillDescription>{skill.description}</SkillDescription>
              <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {skill.technologies.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(106, 17, 203, 0.1)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      color: '#6a11cb'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </SkillCard>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 