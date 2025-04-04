import React from 'react';
import styled from '@emotion/styled';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: 100px 50px;
  background-color: #0a0416;
  
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ProjectCard = styled.div`
  background: rgba(13, 6, 32, 0.7);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(106, 17, 203, 0.2);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(106, 17, 203, 0.3);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid rgba(106, 17, 203, 0.2);
`;

const ProjectContent = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: #ffffff;
  margin-bottom: 15px;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: #e0e0ff;
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background: rgba(106, 17, 203, 0.2);
  color: #ff7b9c;
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.primary ? 'linear-gradient(to right, #6a11cb, #2575fc)' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#e0e0ff'};
  padding: ${props => props.primary ? '10px 20px' : '10px 15px'};
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: ${props => props.primary ? 'none' : '1px solid rgba(224, 224, 255, 0.3)'};
  font-size: 0.9rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.primary ? '0 5px 15px rgba(106, 17, 203, 0.4)' : 'none'};
    border-color: ${props => props.primary ? 'none' : 'rgba(224, 224, 255, 0.6)'};
  }
`;

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Modern E-Commerce Platform",
      description: "A full-featured e-commerce platform with product browsing, cart functionality, and secure checkout process.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "https://ecommerce-platform.xyz",
      githubLink: "https://github.com/username/ecommerce-platform"
    },
    {
      id: 2,
      title: "Weather Forecast App",
      description: "Real-time weather application showing forecasts, weather maps, and historical data with beautiful visualizations.",
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["React", "Weather API", "Chart.js", "Geolocation"],
      liveLink: "https://weather-app.xyz",
      githubLink: "https://github.com/username/weather-app"
    },
    {
      id: 3,
      title: "Task Management Dashboard",
      description: "Collaborative task management system with real-time updates, task assignment, and progress tracking.",
      image: "https://images.unsplash.com/photo-1611224885990-ab7363d7a02e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["React", "Firebase", "Material UI", "Redux"],
      liveLink: "https://task-management.xyz",
      githubLink: "https://github.com/username/task-management"
    },
    {
      id: 4,
      title: "Fitness Tracking App",
      description: "Mobile-responsive fitness tracker with workout plans, progress charts, and nutrition monitoring features.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["React Native", "GraphQL", "Health API", "D3.js"],
      liveLink: "https://fitness-tracker.xyz",
      githubLink: "https://github.com/username/fitness-tracker"
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media managers with content scheduling and performance metrics.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Vue.js", "Node.js", "Social APIs", "Chart.js"],
      liveLink: "https://social-dashboard.xyz",
      githubLink: "https://github.com/username/social-dashboard"
    },
    {
      id: 6,
      title: "Real Estate Platform",
      description: "Property listing platform with virtual tours, neighborhood analytics, and mortgage calculators.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["React", "MongoDB", "Google Maps API", "AWS"],
      liveLink: "https://realestate-platform.xyz",
      githubLink: "https://github.com/username/realestate-platform"
    }
  ];

  return (
    <ProjectsSection id="projects">
      <Container>
        <Title>My Projects</Title>
        <ProjectsGrid>
          {projects.map(project => (
            <ProjectCard key={project.id}>
              <ProjectImage 
                src={project.image} 
                alt={project.title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x200?text=Project+Image";
                }}
              />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <Tags>
                  {project.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </Tags>
                <LinksContainer>
                  <LinkButton href={project.liveLink} target="_blank" rel="noopener noreferrer" primary>
                    <FaExternalLinkAlt /> Live Demo
                  </LinkButton>
                  <LinkButton href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </LinkButton>
                </LinksContainer>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 