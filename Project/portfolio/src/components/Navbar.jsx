import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-scroll';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background: rgba(10, 25, 47, 0.95);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #e6f1ff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const NavLink = styled(Link)`
  cursor: pointer;
  color: #8892b0;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #64ffda;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo>Abhishek Kumar</Logo>
      <NavLinks>
        <NavLink to="home" smooth={true} duration={500}>Home</NavLink>
        <NavLink to="about" smooth={true} duration={500}>About</NavLink>
        <NavLink to="projects" smooth={true} duration={500}>Projects</NavLink>
        <NavLink to="skills" smooth={true} duration={500}>Skills</NavLink>
        <NavLink to="contact" smooth={true} duration={500}>Contact</NavLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar; 