import React from 'react';
import { Global, css } from '@emotion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    color: #e0e0ff;
    background-color: #0c0513;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #0a0416;
  }

  ::-webkit-scrollbar-thumb {
    background: #6a11cb;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #4c0d91;
  }

  /* Typography responsive adjustments */
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    font-size: clamp(1rem, 1.5vw, 1.1rem);
  }

  /* Focus styles for accessibility */
  :focus {
    outline: 2px solid #6a11cb;
    outline-offset: 2px;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    body {
      font-size: 16px;
    }
  }
  
  @media (max-width: 480px) {
    body {
      font-size: 15px;
    }
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
