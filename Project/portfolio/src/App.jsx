import React from 'react';
import styled from '@emotion/styled';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

const AppContainer = styled.div`
  font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #0a192f;
  color: #e6f1ff;
`;

const App = () => {
  return (
    <AppContainer>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </AppContainer>
  );
};

export default App;
