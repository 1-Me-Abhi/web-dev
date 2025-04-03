import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaHtml5, 
  FaCss3Alt, 
  FaGitAlt, 
  FaFigma, 
  FaCode, 
  FaMobileAlt,
  FaLaptopCode
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiFirebase, 
  SiBootstrap, 
  SiTailwindcss, 
  SiFramer,
  SiNetflix,
  SiResponsivedesign,
  SiAdobexd
} from 'react-icons/si';

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
  margin-bottom: 20px;
  color: #6a11cb;
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
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

const TechTag = styled(motion.span)`
  display: inline-block;
  background: rgba(106, 17, 203, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #6a11cb;
  margin: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(106, 17, 203, 0.2);
    transform: translateY(-2px);
  }
`;

const ProgressWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
`;

const ProgressTitle = styled.h3`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #6a11cb;
`;

const ProgressBars = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ProgressItem = styled.div`
  margin-bottom: 15px;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  span {
    font-size: 1rem;
    color: #333;
  }
`;

const ProgressBar = styled.div`
  height: 8px;
  background: rgba(106, 17, 203, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(to right, #6a11cb, #ff7b9c);
  border-radius: 4px;
  width: ${props => props.width}%;
`;

const skills = [
  {
    title: "Frontend Development",
    icon: <FaReact />,
    description: "Skilled in building responsive and interactive user interfaces with modern frontend technologies.",
    technologies: ["React", "HTML5", "CSS3", "JavaScript", "Responsive Design"]
  },
  {
    title: "UI/UX Design",
    icon: <FaFigma />,
    description: "Creating intuitive, beautiful user interfaces with attention to design principles and user experience.",
    technologies: ["Figma", "UI Design", "Wireframing", "User Flow", "Prototyping"]
  },
  {
    title: "Web Technologies",
    icon: <SiJavascript />,
    description: "Experience with various web development frameworks and libraries for creating dynamic applications.",
    technologies: ["Bootstrap", "Tailwind CSS", "Framer Motion", "Firebase", "RESTful APIs"]
  },
  {
    title: "Development Tools",
    icon: <FaGitAlt />,
    description: "Proficient with development tools and workflows to efficiently create and deploy web applications.",
    technologies: ["Git", "GitHub", "VS Code", "Responsive Testing", "Cross-Browser Testing"]
  }
];

const proficiencyData = [
  { skill: "HTML/CSS", percentage: 90 },
  { skill: "JavaScript", percentage: 85 },
  { skill: "React", percentage: 80 },
  { skill: "UI/UX Design", percentage: 75 },
  { skill: "Responsive Design", percentage: 90 },
  { skill: "Frontend Development", percentage: 85 }
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
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Based on my GitHub repositories and professional experience, I've developed expertise in the following areas:
        </Subtitle>
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
              <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {skill.technologies.map((tech, i) => (
                  <TechTag
                    key={i}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {tech}
                  </TechTag>
                ))}
              </div>
            </SkillCard>
          ))}
        </SkillsGrid>
        
        <ProgressWrapper>
          <ProgressTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Proficiency
          </ProgressTitle>
          <ProgressBars>
            {proficiencyData.map((item, index) => (
              <ProgressItem key={index}>
                <ProgressLabel>
                  <span>{item.skill}</span>
                  <span>{item.percentage}%</span>
                </ProgressLabel>
                <ProgressBar>
                  <ProgressFill
                    initial={{ width: 0 }}
                    whileInView={{ width: item.percentage }}
                    transition={{ duration: 1, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    width={item.percentage}
                  />
                </ProgressBar>
              </ProgressItem>
            ))}
          </ProgressBars>
        </ProgressWrapper>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 