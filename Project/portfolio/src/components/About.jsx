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
    color: #333;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    margin-bottom: 20px;
  }
`;

const ImageContainer = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I am a passionate Full Stack Developer with expertise in building modern web applications.
            With a strong foundation in both front-end and back-end development, I create seamless
            and user-friendly experiences that solve real-world problems.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            My journey in web development started with a curiosity for creating things that live on
            the internet. Today, I specialize in React, Node.js, and modern web technologies,
            always staying up-to-date with the latest industry trends and best practices.
          </motion.p>
        </Content>
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src="https://via.placeholder.com/500x400" alt="Profile" />
        </ImageContainer>
      </Container>
    </AboutSection>
  );
};

export default About; 