import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background: rgba(106, 17, 203, 0.95);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 0 30px;
  }
  
  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 250px;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(106, 17, 203, 0.98);
    transition: all 0.3s ease-in-out;
    gap: 40px;
    box-shadow: ${({ isOpen }) => (isOpen ? '-5px 0 10px rgba(0, 0, 0, 0.1)' : 'none')};
  }
`;

const NavLink = styled(Link)`
  cursor: pointer;
  color: #e0e0ff;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 10px 0;
  
  &:hover {
    color: #ff7b9c;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1100;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Nav style={{ 
        background: scrolled ? 'rgba(106, 17, 203, 0.98)' : 'rgba(106, 17, 203, 0.95)',
        boxShadow: scrolled ? '0 2px 15px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.2)',
        height: scrolled ? '60px' : '70px',
        transition: 'all 0.3s ease'
      }}>
        <Logo>Abhishek Kumar</Logo>
        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        <NavLinks isOpen={isOpen}>
          <NavLink to="home" smooth={true} duration={500} onClick={closeMenu}>Home</NavLink>
          <NavLink to="about" smooth={true} duration={500} onClick={closeMenu}>About</NavLink>
          <NavLink to="projects" smooth={true} duration={500} onClick={closeMenu}>Projects</NavLink>
          <NavLink to="skills" smooth={true} duration={500} onClick={closeMenu}>Skills</NavLink>
          <NavLink to="contact" smooth={true} duration={500} onClick={closeMenu}>Contact</NavLink>
        </NavLinks>
      </Nav>
      <Overlay isOpen={isOpen} onClick={closeMenu} />
    </>
  );
};

export default Navbar; 