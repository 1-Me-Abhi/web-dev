import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 0 20px;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ImageContainer = styled(motion.div)`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ff7b9c;
  box-shadow: 0 0 30px rgba(255, 123, 156, 0.4);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #e0e0ff;
  margin-bottom: 30px;
`;

const ActionButton = styled(motion.button)`
  padding: 15px 35px;
  font-size: 1.1rem;
  background: #ff7b9c;
  color: #ffffff;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 123, 156, 0.4);

  &:hover {
    background: #ff5c85;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 123, 156, 0.6);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const SocialLink = styled.a`
  color: #ffffff;
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #ff7b9c;
    transform: translateY(-3px);
  }
`;

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="home">
      <Container>
        <ContentWrapper>
          <TextContent>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hi, I'm <span style={{ color: '#ff7b9c' }}>Abhishek Kumar</span>
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Full Stack Developer | UI/UX Designer | Problem Solver
            </Subtitle>
            
            <SocialLinks>
              <SocialLink 
                href="https://github.com/1-Me-Abhi" 
                target="_blank" 
                rel="noopener noreferrer"
                as={motion.a}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <FaGithub />
              </SocialLink>
              <SocialLink 
                href="https://www.linkedin.com/in/1meabhi1/" 
                target="_blank" 
                rel="noopener noreferrer"
                as={motion.a}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <FaLinkedin />
              </SocialLink>
              <SocialLink 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                as={motion.a}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <FaTwitter />
              </SocialLink>
            </SocialLinks>
          </TextContent>
          
          <ImageContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Abhishek Kumar"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
              }}
            />
          </ImageContainer>
        </ContentWrapper>
        
        <ActionButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('projects')}
        >
          View My Work
        </ActionButton>
      </Container>
    </HeroSection>
  );
};

export default Hero; 