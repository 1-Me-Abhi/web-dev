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
  color: #6a11cb;
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
  border-top: 4px solid #ff7b9c;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(106, 17, 203, 0.2);
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
  background: rgba(106, 17, 203, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #6a11cb;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: #ff7b9c;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #6a11cb;
    }
  }
`;

const projects = [
  {
    title: "Netflix Clone",
    description: "A functional clone of Netflix streaming platform with similar UI and features, demonstrating front-end development skills and responsive design.",
    image: "https://cdn.dribbble.com/users/3798646/screenshots/14933133/media/bf4513dee26d4826e059c7a2ef4e0944.png",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    github: "https://github.com/1-Me-Abhi/Netflix-Clone",
    live: "https://github.com/1-Me-Abhi/Netflix-Clone"
  },
  {
    title: "Web Development",
    description: "A collection of web development projects and exercises, showcasing HTML, CSS and JavaScript implementations for various web applications.",
    image: "https://cdn.dribbble.com/users/1626229/screenshots/14543231/media/5f305371e822b77376b76aaf1e3adbb5.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/1-Me-Abhi/web-dev",
    live: "https://github.com/1-Me-Abhi/web-dev"
  },
  {
    title: "Portfolio Website",
    description: "This modern portfolio website built with React and styled with Emotion, featuring smooth animations and responsive design with Framer Motion.",
    image: "https://cdn.dribbble.com/users/702789/screenshots/16900669/media/21a9e81982de2dd126e6f97c5c3738e3.png",
    technologies: ["React", "Emotion", "Framer Motion"],
    github: "https://github.com/1-Me-Abhi/1-Me-Abhi",
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