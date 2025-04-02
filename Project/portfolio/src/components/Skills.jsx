import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #333;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const SkillCard = styled(motion.div)`
  background: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #007bff;
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
    description: "Expert in React.js, JavaScript, TypeScript, and modern frontend frameworks.",
    technologies: ["React", "JavaScript", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend Development",
    icon: <FaNodeJs />,
    description: "Proficient in Node.js, Express.js, and building scalable server-side applications.",
    technologies: ["Node.js", "Express", "REST APIs", "GraphQL"]
  },
  {
    title: "Database Management",
    icon: <FaDatabase />,
    description: "Experience with various databases including MongoDB, SQL, and database optimization.",
    technologies: ["MongoDB", "SQL", "Redis", "PostgreSQL"]
  },
  {
    title: "DevOps & Tools",
    icon: <FaGitAlt />,
    description: "Familiar with version control, CI/CD, and modern development tools.",
    technologies: ["Git", "Docker", "AWS", "Jenkins"]
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
                      background: '#e9ecef',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      color: '#495057'
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