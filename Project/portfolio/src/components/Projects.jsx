import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background: #f8f9fa;
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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background: #ddd;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectContent = styled.div`
  padding: 20px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 15px;
    line-height: 1.6;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const TechTag = styled.span`
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #495057;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #0056b3;
    }
  }
`;

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with React and Node.js, featuring user authentication, product management, and payment integration.",
    image: "https://via.placeholder.com/400x200",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: "#",
    live: "#"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "https://via.placeholder.com/400x200",
    technologies: ["React", "Firebase", "Material-UI"],
    github: "#",
    live: "#"
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and styled-components, featuring smooth animations and responsive design.",
    image: "https://via.placeholder.com/400x200",
    technologies: ["React", "Styled Components", "Framer Motion"],
    github: "#",
    live: "#"
  }
];

const Projects = () => {
  return (
    <ProjectsSection id="projects">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My Projects
        </Title>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectImage>
                <img src={project.image} alt={project.title} />
              </ProjectImage>
              <ProjectContent>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <TechStack>
                  {project.technologies.map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">Live Demo</a>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 