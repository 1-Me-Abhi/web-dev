import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaApple, FaCode, FaLayerGroup, FaTerminal } from 'react-icons/fa';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a192f 0%, #112240 100%);
  padding: 0 20px;
  position: relative;
  overflow: hidden;
`;

// macOS-inspired floating dock
const MacOSDock = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 18px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
  /* Fix for backdrop-filter not working in some browsers */
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
  }
  @supports not (backdrop-filter: blur(10px)) {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const DockIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  background: ${props => props.bg || '#1e88e5'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

// macOS window component
const MacWindow = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 1000px;
  /* Fix for backdrop-filter not working in some browsers */
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
  }
  @supports not (backdrop-filter: blur(10px)) {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const MacWindowHeader = styled.div`
  background: rgba(58, 58, 60, 0.8);
  padding: 10px 15px;
  display: flex;
  align-items: center;
`;

const WindowControls = styled.div`
  display: flex;
  gap: 8px;
`;

const WindowButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
`;

const WindowTitle = styled.div`
  color: #e6f1ff;
  font-size: 14px;
  flex: 1;
  text-align: center;
  font-weight: 500;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 40px;
  margin-bottom: 30px;
  
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
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #64ffda;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FloatingAnimation = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 20px;
  color: #e6f1ff;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #8892b0;
  margin-bottom: 30px;
`;

// macOS-styled button
const MacButton = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1.1rem;
  color: white;
  background: linear-gradient(to bottom, #5a74e4, #4254b5);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(66, 84, 181, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to bottom, #6583f7, #4e62cc);
    transform: translateY(-2px);
  }
`;

// Notification badge
const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 10px;
  color: #e6f1ff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  /* Fix for backdrop-filter not working in some browsers */
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
  }
  @supports not (backdrop-filter: blur(10px)) {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const Hero = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Ensure the correct image path
  const imagePath = "/images/luffy-profile.jpg";
  
  // Add click handlers for dock icons
  const handleDockIconClick = (icon) => {
    console.log(`Clicked on ${icon} icon`);
    // You can add specific functionality for each icon here
  };

  return (
    <HeroSection id="home">
      {/* macOS-style notification */}
      <NotificationBadge
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <FaApple /> Welcome to my portfolio
      </NotificationBadge>

      <MacWindow
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: isMinimized ? 300 : 0,
          scale: isMinimized ? 0.6 : 1
        }}
        transition={{ duration: 0.6 }}
      >
        <MacWindowHeader>
          <WindowControls>
            <WindowButton 
              color="#ff5f56" 
              onClick={() => setIsMinimized(!isMinimized)}
            />
            <WindowButton color="#ffbd2e" />
            <WindowButton color="#27c93f" />
          </WindowControls>
          <WindowTitle>Abhishek Kumar ~ Portfolio</WindowTitle>
          <div style={{ width: 36 }}></div>
        </MacWindowHeader>

        <HeroContent>
          <ContentWrapper>
            <TextContent>
              <Title
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Hi, I'm <span style={{ color: '#64ffda' }}>Abhishek Kumar</span>
              </Title>
              <Subtitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Full Stack Developer | UI/UX Designer | Problem Solver
              </Subtitle>
            </TextContent>
            
            <ImageContainer>
              <FloatingAnimation
                animate={{ 
                  y: [0, -10, 0],
                  rotateZ: [-2, 2, -2]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                {/* Fallback in case image fails to load */}
                <img 
                  src={imagePath}
                  alt="Abhishek Kumar" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/220";
                  }}
                />
              </FloatingAnimation>
            </ImageContainer>
          </ContentWrapper>
          
          <MacButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            <FaTerminal /> View My Work
          </MacButton>
        </HeroContent>
      </MacWindow>

      {/* macOS Dock */}
      <MacOSDock
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <DockIcon 
          bg="#5a74e4" 
          whileHover={{ scale: 1.15, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDockIconClick('Apple')}
        >
          <FaApple />
        </DockIcon>
        <DockIcon 
          bg="#27ae60" 
          whileHover={{ scale: 1.15, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
        >
          <FaCode />
        </DockIcon>
        <DockIcon 
          bg="#e74c3c" 
          whileHover={{ scale: 1.15, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
        >
          <FaLayerGroup />
        </DockIcon>
        <DockIcon 
          bg="#f39c12" 
          whileHover={{ scale: 1.15, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
        >
          <FaTerminal />
        </DockIcon>
      </MacOSDock>
    </HeroSection>
  );
};

export default Hero; 