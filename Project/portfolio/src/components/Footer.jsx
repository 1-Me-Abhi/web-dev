import React from 'react';
import styled from '@emotion/styled';
import { FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #070208;
  padding: 30px 20px;
  text-align: center;
  border-top: 1px solid rgba(106, 17, 203, 0.2);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Copyright = styled.p`
  color: #e0e0ff;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
  
  svg {
    color: #ff7b9c;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px 0;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const FooterLink = styled.a`
  color: #e0e0ff;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff7b9c;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="#home">Home</FooterLink>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterLinks>
        <Copyright>
          © {year} Abhishek Kumar. Made with <FaHeart /> using React
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 