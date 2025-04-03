import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode, FaLaptopCode, FaUserGraduate } from 'react-icons/fa';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: #6a11cb;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    margin-bottom: 20px;
  }
`;

const ProfileBadge = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const BadgeIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(106, 17, 203, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #6a11cb;
`;

const BadgeText = styled.div`
  h4 {
    font-size: 1.2rem;
    color: #333;
    margin: 0 0 5px 0;
  }
  
  p {
    font-size: 1rem;
    color: #666;
    margin: 0;
  }
`;

const InfoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const InfoItem = styled.li`
  display: flex;
  margin-bottom: 15px;
  font-size: 1.1rem;
  
  strong {
    min-width: 120px;
    color: #333;
  }
  
  span {
    color: #666;
  }
`;

const ImageContainer = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(106, 17, 203, 0.2);
    border: 4px solid #fff;
  }
`;

const HighlightText = styled.span`
  color: #ff7b9c;
  font-weight: 600;
`;

const ProfileLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const ProfileLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: rgba(106, 17, 203, 0.08);
  border-radius: 5px;
  color: #6a11cb;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(106, 17, 203, 0.15);
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

const About = () => {
  return (
    <AboutSection id="about">
      <Container>
        <Content>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          
          <ProfileBadge>
            <BadgeIcon>
              <FaUserGraduate />
            </BadgeIcon>
            <BadgeText>
              <h4>Abhishek Kumar</h4>
              <p>Computer Science Student & Full Stack Developer</p>
            </BadgeText>
          </ProfileBadge>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I am a passionate <HighlightText>Full Stack Developer</HighlightText> and <HighlightText>UI/UX Designer</HighlightText> currently pursuing my Computer Science degree. With a focus on creating beautiful, functional web applications, I combine creative design with technical expertise to build seamless user experiences.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            My journey in web development started with creating simple websites, and has grown into developing complex applications. I'm particularly interested in front-end technologies like React and enjoy building creative interfaces with smooth animations and responsive designs. My GitHub repositories showcase my ability to create modern web applications including a Netflix clone and other web development projects.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <InfoList>
              <InfoItem>
                <strong>Name:</strong>
                <span>Abhishek Kumar</span>
              </InfoItem>
              <InfoItem>
                <strong>Education:</strong>
                <span>Computer Science Student</span>
              </InfoItem>
              <InfoItem>
                <strong>Role:</strong>
                <span>Full Stack Developer & UI/UX Designer</span>
              </InfoItem>
              <InfoItem>
                <strong>Experience:</strong>
                <span>Web Development, Frontend Development, UI Design</span>
              </InfoItem>
              <InfoItem>
                <strong>Projects:</strong>
                <span>Netflix Clone, Web Development Portfolio, UI Components</span>
              </InfoItem>
              <InfoItem>
                <strong>Interests:</strong>
                <span>Web Development, UI Design, Problem Solving</span>
              </InfoItem>
            </InfoList>
            
            <ProfileLinks>
              <ProfileLink 
                href="https://github.com/1-Me-Abhi" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaGithub /> GitHub Profile
              </ProfileLink>
              <ProfileLink 
                href="https://www.linkedin.com/in/1meabhi1/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedin /> LinkedIn Profile
              </ProfileLink>
            </ProfileLinks>
          </motion.div>
        </Content>
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src="/images/luffy-profile.jpg" alt="Abhishek Kumar" onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://cdn.dribbble.com/users/1162077/screenshots/7475318/media/8837a0ae1265548e27a3e5580f468b86.png";
          }} />
        </ImageContainer>
      </Container>
    </AboutSection>
  );
};

export default About; 