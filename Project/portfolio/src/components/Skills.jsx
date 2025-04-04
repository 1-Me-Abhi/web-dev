import React from 'react';
import styled from '@emotion/styled';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, 
  FaGitAlt, FaDatabase, FaFigma, FaMobileAlt 
} from 'react-icons/fa';
import { SiJavascript, SiNextdotjs, SiMongodb, SiTailwindcss } from 'react-icons/si';

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: 100px 50px;
  background-color: #0c0513;
  
  @media (max-width: 768px) {
    padding: 80px 30px;
  }
  
  @media (max-width: 480px) {
    padding: 60px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const SkillCard = styled.div`
  background: rgba(13, 6, 32, 0.7);
  border-radius: 12px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(106, 17, 203, 0.2);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(106, 17, 203, 0.3);
  }
  
  @media (max-width: 480px) {
    padding: 25px;
  }
`;

const IconWrapper = styled.div`
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: ${props => props.color || '#6a11cb'};
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SkillName = styled.h3`
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 10px;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const SkillDescription = styled.p`
  font-size: 0.95rem;
  color: #e0e0ff;
  text-align: center;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.6rem;
  color: #ff7b9c;
  margin: 50px 0 30px;
  text-align: center;
  grid-column: 1 / -1;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 40px 0 25px;
  }
`;

const Skills = () => {
  const frontendSkills = [
    {
      name: "HTML5",
      icon: <FaHtml5 />,
      description: "Semantic markup, accessibility, and modern HTML features",
      color: "#E44D26"
    },
    {
      name: "CSS3",
      icon: <FaCss3Alt />,
      description: "Advanced styling, animations, and responsive design",
      color: "#264DE4"
    },
    {
      name: "JavaScript",
      icon: <SiJavascript />,
      description: "ES6+, DOM manipulation, and async programming",
      color: "#F7DF1E"
    },
    {
      name: "React",
      icon: <FaReact />,
      description: "Component-based architecture and state management",
      color: "#61DAFB"
    }
  ];

  const backendSkills = [
    {
      name: "Node.js",
      icon: <FaNodeJs />,
      description: "Server-side JavaScript, RESTful APIs, and Express",
      color: "#339933"
    },
    {
      name: "MongoDB",
      icon: <SiMongodb />,
      description: "NoSQL database design and Mongoose ODM",
      color: "#47A248"
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs />,
      description: "Server-side rendering and static site generation",
      color: "#ffffff"
    },
    {
      name: "Git & GitHub",
      icon: <FaGitAlt />,
      description: "Version control, branching strategies, and collaboration",
      color: "#F05032"
    }
  ];

  const otherSkills = [
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
      description: "Utility-first CSS framework for rapid UI development",
      color: "#06B6D4"
    },
    {
      name: "UI/UX Design",
      icon: <FaFigma />,
      description: "User-centered design principles and prototyping",
      color: "#F24E1E"
    },
    {
      name: "Responsive Design",
      icon: <FaMobileAlt />,
      description: "Mobile-first approach and cross-device compatibility",
      color: "#FF7B9C"
    },
    {
      name: "Database Design",
      icon: <FaDatabase />,
      description: "Schema design, relationships, and optimization",
      color: "#2575FC"
    }
  ];

  return (
    <SkillsSection id="skills">
      <Container>
        <Title>My Skills</Title>
        
        <SkillsContainer>
          <CategoryTitle>Front-End Development</CategoryTitle>
          {frontendSkills.map((skill, index) => (
            <SkillCard key={`frontend-${index}`}>
              <IconWrapper color={skill.color}>{skill.icon}</IconWrapper>
              <SkillName>{skill.name}</SkillName>
              <SkillDescription>{skill.description}</SkillDescription>
            </SkillCard>
          ))}
          
          <CategoryTitle>Back-End Development</CategoryTitle>
          {backendSkills.map((skill, index) => (
            <SkillCard key={`backend-${index}`}>
              <IconWrapper color={skill.color}>{skill.icon}</IconWrapper>
              <SkillName>{skill.name}</SkillName>
              <SkillDescription>{skill.description}</SkillDescription>
            </SkillCard>
          ))}
          
          <CategoryTitle>Other Skills</CategoryTitle>
          {otherSkills.map((skill, index) => (
            <SkillCard key={`other-${index}`}>
              <IconWrapper color={skill.color}>{skill.icon}</IconWrapper>
              <SkillName>{skill.name}</SkillName>
              <SkillDescription>{skill.description}</SkillDescription>
            </SkillCard>
          ))}
        </SkillsContainer>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 