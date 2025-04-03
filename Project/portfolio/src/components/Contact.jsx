import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaUserGraduate } from 'react-icons/fa';

const ContactSection = styled.section`
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

const ContactInfo = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: #6a11cb;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    margin-bottom: 30px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const SocialLink = styled.a`
  color: #6a11cb;
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #ff7b9c;
    transform: translateY(-3px);
  }
`;

const ContactMethods = styled.div`
  margin-top: 30px;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(106, 17, 203, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #6a11cb;
`;

const ContactDetail = styled.div`
  h4 {
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 5px;
  }
  
  p {
    font-size: 1rem;
    color: #666;
    margin: 0;
  }
  
  a {
    color: #ff7b9c;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactForm = styled.form`
  background: #f9f9ff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #ff7b9c;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #6a11cb;
    }
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  background: #6a11cb;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);

  &:hover {
    background: #ff7b9c;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // In a real application, you would send this data to a server
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <ContactSection id="contact">
      <Container>
        <ContactInfo>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm always interested in discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the following methods.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ContactMethods>
              <ContactMethod>
                <IconContainer>
                  <FaGithub />
                </IconContainer>
                <ContactDetail>
                  <h4>GitHub</h4>
                  <p>
                    <a href="https://github.com/1-Me-Abhi" target="_blank" rel="noopener noreferrer">
                      github.com/1-Me-Abhi
                    </a>
                  </p>
                </ContactDetail>
              </ContactMethod>
              
              <ContactMethod>
                <IconContainer>
                  <FaEnvelope />
                </IconContainer>
                <ContactDetail>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:contact@example.com">
                      contact@example.com
                    </a>
                  </p>
                </ContactDetail>
              </ContactMethod>
              
              <ContactMethod>
                <IconContainer>
                  <FaUserGraduate />
                </IconContainer>
                <ContactDetail>
                  <h4>Student Status</h4>
                  <p>Computer Science Student</p>
                </ContactDetail>
              </ContactMethod>

              <ContactMethod>
                <IconContainer>
                  <FaLinkedin />
                </IconContainer>
                <ContactDetail>
                  <h4>LinkedIn</h4>
                  <p>
                    <a href="https://www.linkedin.com/in/1meabhi1/" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/1meabhi1
                    </a>
                  </p>
                </ContactDetail>
              </ContactMethod>
            </ContactMethods>
          </motion.div>
          
          <SocialLinks>
            <SocialLink href="https://github.com/1-Me-Abhi" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/1meabhi1/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </SubmitButton>
          </ContactForm>
        </motion.div>
      </Container>
    </ContactSection>
  );
};

export default Contact; 