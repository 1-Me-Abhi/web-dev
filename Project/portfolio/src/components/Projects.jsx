import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 30px;
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-top: 4px solid #ff7b9c;
  position: relative;

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
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(106, 17, 203, 0.9);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 2;
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
  margin-top: 20px;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ff7b9c;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    color: #6a11cb;
    transform: translateY(-2px);
  }
`;

const ProjectDetailsButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6a11cb;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  padding: 0;
  
  &:hover {
    color: #ff7b9c;
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 10px;
  padding: 30px;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: #6a11cb;
  margin-bottom: 15px;
`;

const ModalSection = styled.div`
  margin-bottom: 20px;
  
  h3 {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 10px;
  }
`;

const FeatureList = styled.ul`
  padding-left: 20px;
  margin-bottom: 15px;
  
  li {
    margin-bottom: 8px;
    color: #666;
  }
`;

const projects = [
  {
    title: "Netflix Clone",
    description: "A functional clone of Netflix streaming platform with similar UI and features, demonstrating front-end development skills and responsive design.",
    image: "https://cdn.dribbble.com/users/3798646/screenshots/14933133/media/bf4513dee26d4826e059c7a2ef4e0944.png",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    github: "https://github.com/1-Me-Abhi/Netflix-Clone",
    live: "https://github.com/1-Me-Abhi/Netflix-Clone",
    badge: "Featured",
    details: {
      fullDescription: "A comprehensive Netflix clone that replicates the user interface and core functionality of the popular streaming platform. This project demonstrates my ability to create complex, responsive web applications with modern frontend technologies.",
      features: [
        "Responsive user interface matching Netflix's design",
        "Movie/TV show browsing by categories",
        "Dynamic content loading with thumbnail previews",
        "Animated transitions between sections",
        "Mobile-friendly design with touch support"
      ],
      challenges: "The main challenges included implementing the smooth scrolling carousels, creating responsive layouts that work across all devices, and managing state efficiently for optimal performance.",
      learnings: "This project helped me deepen my understanding of React component architecture, CSS animations, and responsive design principles. I also gained experience in organizing large frontend projects."
    }
  },
  {
    title: "Web Development",
    description: "A collection of web development projects and exercises, showcasing HTML, CSS and JavaScript implementations for various web applications.",
    image: "https://cdn.dribbble.com/users/1626229/screenshots/14543231/media/5f305371e822b77376b76aaf1e3adbb5.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/1-Me-Abhi/web-dev",
    live: "https://github.com/1-Me-Abhi/web-dev",
    badge: "Collection",
    details: {
      fullDescription: "This repository serves as a showcase of my web development journey, containing multiple mini-projects and exercises that demonstrate my growing proficiency in frontend technologies.",
      features: [
        "Various UI components and layouts",
        "Responsive design implementations",
        "Interactive JavaScript functionality",
        "CSS animations and transitions",
        "Form validations and user interactions"
      ],
      challenges: "Each project presented unique challenges, from creating pixel-perfect designs to implementing complex interactive elements and ensuring cross-browser compatibility.",
      learnings: "Through these projects, I've developed a strong foundation in core web technologies and gained practical experience in solving common web development problems."
    }
  },
  {
    title: "Portfolio Website",
    description: "This modern portfolio website built with React and styled with Emotion, featuring smooth animations and responsive design with Framer Motion.",
    image: "https://cdn.dribbble.com/users/702789/screenshots/16900669/media/21a9e81982de2dd126e6f97c5c3738e3.png",
    technologies: ["React", "Emotion", "Framer Motion"],
    github: "https://github.com/1-Me-Abhi/1-Me-Abhi",
    live: "#",
    badge: "Current",
    details: {
      fullDescription: "A personal portfolio website designed to showcase my skills, projects, and professional journey. The site features a modern, clean design with smooth animations and intuitive navigation.",
      features: [
        "Responsive layout that works on all devices",
        "Smooth page transitions and scroll animations",
        "Interactive UI elements with Framer Motion",
        "Styled with Emotion for maintainable CSS-in-JS",
        "Contact form with validation"
      ],
      challenges: "Creating a balance between aesthetics and performance was a key challenge, along with ensuring the animations enhance rather than distract from the content.",
      learnings: "This project allowed me to explore advanced animation techniques with Framer Motion and deepen my understanding of component-based styling with Emotion."
    }
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

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
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Showcasing my work from GitHub repositories and personal projects, demonstrating my skills and experience in web development.
        </Subtitle>
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
                {project.badge && <ProjectBadge>{project.badge}</ProjectBadge>}
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
                  <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </ProjectLink>
                  <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> Live Demo
                  </ProjectLink>
                  <ProjectDetailsButton onClick={() => openProjectDetails(project)}>
                    <FaInfoCircle /> Details
                  </ProjectDetailsButton>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
        
        {selectedProject && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectDetails}
          >
            <ModalContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClick={closeProjectDetails}>×</ModalCloseButton>
              <ModalTitle>{selectedProject.title}</ModalTitle>
              
              <ModalSection>
                <h3>Overview</h3>
                <p>{selectedProject.details.fullDescription}</p>
              </ModalSection>
              
              <ModalSection>
                <h3>Features</h3>
                <FeatureList>
                  {selectedProject.details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </FeatureList>
              </ModalSection>
              
              <ModalSection>
                <h3>Technologies Used</h3>
                <TechStack>
                  {selectedProject.technologies.map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechStack>
              </ModalSection>
              
              <ModalSection>
                <h3>Challenges & Learnings</h3>
                <p><strong>Challenges:</strong> {selectedProject.details.challenges}</p>
                <p><strong>Learnings:</strong> {selectedProject.details.learnings}</p>
              </ModalSection>
              
              <ProjectLinks>
                <ProjectLink href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> View on GitHub
                </ProjectLink>
                {selectedProject.live !== "#" && (
                  <ProjectLink href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> View Live Demo
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 