import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 100px 50px;
  background-color: #0a0416;
  
  @media (max-width: 768px) {
    padding: 80px 30px;
  }
  
  @media (max-width: 480px) {
    padding: 60px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: start;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  
  @media (max-width: 992px) {
    order: 2;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
  
  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
`;

const InfoText = styled.div`
  h3 {
    color: #ff7b9c;
    margin-bottom: 5px;
    font-size: 1.2rem;
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }
  
  p, a {
    color: #e0e0ff;
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff7b9c;
    }
    
    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  
  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

const SocialLink = styled.a`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(13, 6, 32, 0.7);
  border: 1px solid rgba(106, 17, 203, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e0e0ff;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.4);
    color: white;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
`;

const ContactForm = styled.form`
  background: rgba(13, 6, 32, 0.7);
  padding: 40px;
  border-radius: 12px;
  border: 1px solid rgba(106, 17, 203, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 992px) {
    order: 1;
  }
  
  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 25px;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  display: block;
  color: #e0e0ff;
  margin-bottom: 8px;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(106, 17, 203, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6a11cb;
    box-shadow: 0 0 10px rgba(106, 17, 203, 0.3);
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 0.95rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(106, 17, 203, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6a11cb;
    box-shadow: 0 0 10px rgba(106, 17, 203, 0.3);
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 0.95rem;
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  padding: 14px 30px;
  border-radius: 50px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(106, 17, 203, 0.5);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 480px) {
    padding: 12px 25px;
    font-size: 0.95rem;
  }
`;

const FormMessage = styled.div`
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  background-color: ${props => props.success ? 'rgba(39, 174, 96, 0.15)' : 'rgba(231, 76, 60, 0.15)'};
  color: ${props => props.success ? '#2ecc71' : '#e74c3c'};
  border: 1px solid ${props => props.success ? 'rgba(39, 174, 96, 0.3)' : 'rgba(231, 76, 60, 0.3)'};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setStatus({
        submitted: true,
        success: true,
        message: 'Thank you! Your message has been sent successfully.'
      });
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1500);
  };
  
  return (
    <ContactSection id="contact">
      <Container>
        <Title>Get In Touch</Title>
        <ContactWrapper>
          <ContactInfo>
            <InfoItem>
              <IconWrapper>
                <FaEnvelope />
              </IconWrapper>
              <InfoText>
                <h3>Email</h3>
                <a href="mailto:kumarabhi45380@gmail.com">kumarabhi45380@gmail.com</a>
              </InfoText>
            </InfoItem>
            <InfoItem>
              <IconWrapper>
                <FaMapMarkerAlt />
              </IconWrapper>
              <InfoText>
                <h3>Location</h3>
                <p>Mumbai, India</p>
              </InfoText>
            </InfoItem>
            <InfoItem>
              <IconWrapper>
                <FaLinkedin />
              </IconWrapper>
              <InfoText>
                <h3>LinkedIn</h3>
                <a href="https://www.linkedin.com/in/1meabhi1/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/1meabhi1
                </a>
              </InfoText>
            </InfoItem>
            
            <SocialLinks>
              <SocialLink href="https://github.com/1-Me-Abhi" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/1meabhi1" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>
          
          <ContactForm onSubmit={handleSubmit}>
            <FormTitle>Send Me a Message</FormTitle>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </SubmitButton>
            
            {status.submitted && (
              <FormMessage success={status.success}>
                {status.message}
              </FormMessage>
            )}
          </ContactForm>
        </ContactWrapper>
      </Container>
    </ContactSection>
  );
};

export default Contact; 