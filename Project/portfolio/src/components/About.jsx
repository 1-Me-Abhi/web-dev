import React from 'react';
import styled from '@emotion/styled';
import { FaDownload } from 'react-icons/fa';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 100px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const ProfileImage = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #6a11cb;
  box-shadow: 0 0 20px rgba(106, 17, 203, 0.6);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
  }
  
  @media (max-width: 1200px) {
    width: 300px;
    height: 300px;
  }
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const TextContent = styled.div`
  flex: 1;
  
  @media (max-width: 992px) {
    width: 100%;
    text-align: center;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  color: #ff7b9c;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #e0e0ff;
  line-height: 1.6;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(106, 17, 203, 0.5);
  }
  
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const About = () => {
  return (
    <AboutSection id="about">
      <Container>
        <ContentWrapper>
          <ImageContainer>
            <ProfileImage 
              src="https://images.unsplash.com/photo-1531891570158-e71b35a485bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
              alt="Profile"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/350x350?text=Profile+Image";
              }}
            />
          </ImageContainer>
          <TextContent>
            <Title>About Me</Title>
            <Subtitle>Full Stack Developer & UI/UX Enthusiast</Subtitle>
            <Description>
              I am a passionate Full Stack Developer with expertise in modern web technologies.
              My journey in web development started 3 years ago, and since then, I've been
              creating responsive and user-friendly applications. I love solving complex problems
              and turning ideas into digital reality.
              <br /><br />
              I specialize in JavaScript, React, Node.js, and databases like MongoDB. My approach
              combines technical excellence with creative design thinking to deliver exceptional
              user experiences.
            </Description>
            <ResumeButton href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FaDownload /> Download Resume
            </ResumeButton>
          </TextContent>
        </ContentWrapper>
      </Container>
    </AboutSection>
  );
};

export default About; 