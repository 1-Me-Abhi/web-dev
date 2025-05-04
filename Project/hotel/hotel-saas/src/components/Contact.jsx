import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // In a real app, you would send this data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to submit your message. Please try again later.');
      console.error('Error submitting form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>We're here to help and answer any question you might have. We look forward to hearing from you.</p>
          
          <div className="info-item">
            <div className="icon">📍</div>
            <div>
              <h3>Address</h3>
              <p>123 Hotel Street, Downtown<br />City, State 12345</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon">📞</div>
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <p>+1 (555) 987-6543</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon">📧</div>
            <div>
              <h3>Email</h3>
              <p>info@hotelease.com</p>
              <p>reservations@hotelease.com</p>
            </div>
          </div>
          
          <div className="social-contact">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/15551234567" className="social-icon" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          
          {success ? (
            <div className="success-message">
              <div className="checkmark-circle">
                <div className="checkmark"></div>
              </div>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
              <button 
                className="btn-primary" 
                onClick={() => setSuccess(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {error && <div className="error-alert">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="name">Your Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject*</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message*</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="form-control"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary btn-block"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="map-container">
        <h2>Find Us</h2>
        <div className="map">
          <iframe
            title="Hotel Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30599092534!2d-74.25987368715491!3d40.69767006766623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1649408192818!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      
      <div className="support-chat">
        <button className="chat-button">
          <span className="chat-icon">💬</span>
          <span className="chat-text">Chat with Us</span>
        </button>
      </div>
    </div>
  );
} 