import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I am a passionate <HighlightText>Full Stack Developer</HighlightText> and <HighlightText>UI/UX Designer</HighlightText> currently pursuing my studies. With a focus on creating beautiful, functional web applications, I combine creative design with technical expertise to build seamless user experiences.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            My journey in web development started with creating simple websites, and has grown into developing complex applications. I'm particularly interested in front-end technologies like React and enjoy building creative interfaces with smooth animations and responsive designs.
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
                <strong>Interests:</strong>
                <span>Web Development, UI Design, Problem Solving</span>
              </InfoItem>
              <InfoItem>
                <strong>GitHub:</strong>
                <span>
                  <a 
                    href="https://github.com/1-Me-Abhi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#ff7b9c', textDecoration: 'none' }}
                  >
                    github.com/1-Me-Abhi
                  </a>
                </span>
              </InfoItem>
              <InfoItem>
                <strong>LinkedIn:</strong>
                <span>
                  <a 
                    href="https://www.linkedin.com/in/1meabhi1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#ff7b9c', textDecoration: 'none' }}
                  >
                    linkedin.com/in/1meabhi1
                  </a>
                </span>
              </InfoItem>
            </InfoList>
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