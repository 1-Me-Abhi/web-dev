import React from 'react';
import './AboutUs.css';

// Team member data
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "With over 20 years in hospitality, Sarah founded HotelEase with a vision to revolutionize the boutique hotel experience. Her passion for exceptional service and attention to detail shapes our company culture."
  },
  {
    name: "David Chen",
    role: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "David brings 15 years of operational excellence from leading luxury hotel chains. He ensures every property in our portfolio maintains the highest standards while maximizing efficiency."
  },
  {
    name: "Maya Patel",
    role: "Customer Experience Director",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "Maya's background in guest relations and hospitality psychology helps us create memorable experiences. She leads our team in understanding and exceeding guest expectations at every touchpoint."
  },
  {
    name: "James Wilson",
    role: "Head of Property Acquisition",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "James has an eye for unique properties with character and potential. He travels the world discovering hidden gems and transforming them into distinctive HotelEase destinations."
  }
];

// Milestones data
const milestones = [
  {
    year: "2010",
    title: "The Beginning",
    description: "HotelEase was founded with a single boutique property in San Francisco."
  },
  {
    year: "2013",
    title: "Expansion",
    description: "Opened our second and third locations in New York and Chicago."
  },
  {
    year: "2016",
    title: "International Growth",
    description: "Expanded to international markets with properties in London and Paris."
  },
  {
    year: "2018",
    title: "Digital Innovation",
    description: "Launched our award-winning mobile app and booking platform."
  },
  {
    year: "2021",
    title: "Sustainability Initiative",
    description: "Implemented comprehensive sustainability practices across all properties."
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Named 'Boutique Hotel Group of the Year' by Travel Excellence Awards."
  }
];

// Trust signals/certifications
const trustSignals = [
  {
    name: "Travel Safety Certified",
    image: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    description: "All our properties meet the highest safety standards for travelers."
  },
  {
    name: "Green Globe Member",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    description: "Committed to sustainable tourism and environmental practices."
  },
  {
    name: "Five Star Service",
    image: "https://images.unsplash.com/photo-1535615615570-3b839f4359be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    description: "Consistently rated five stars for exceptional guest experiences."
  },
  {
    name: "Luxury Travel Consortium",
    image: "https://images.unsplash.com/photo-1626897505425-44d243c594b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    description: "Member of the elite network of luxury travel providers."
  }
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About HotelEase</h1>
          <p className="tagline">Redefining Luxury Hospitality Since 2010</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section story-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Story</h2>
            <div className="section-divider"></div>
          </div>
          <div className="story-content">
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" alt="Hotel lobby" />
            </div>
            <div className="story-text">
              <p>Founded in 2010, HotelEase began with a simple yet ambitious vision: to create extraordinary spaces where travelers could experience the authentic character of a destination while enjoying world-class amenities and service.</p>
              <p>Our founder, Sarah Johnson, a seasoned traveler herself, noticed a gap in the market between large corporate hotels that lacked personality and small boutique properties that often compromised on quality. She set out to bridge this gap by creating a collection of carefully curated hotels that would offer the best of both worlds.</p>
              <p>What started as a single property in San Francisco has grown into an international collection of distinctive hotels, each reflecting the unique culture and aesthetic of its location while maintaining our signature blend of luxury, comfort, and personalized service.</p>
              <p>Today, HotelEase is recognized worldwide for creating memorable experiences that go beyond traditional hospitality. We continue to grow and evolve, but our core mission remains unchanged: to make every stay exceptional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="about-section mission-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Mission & Values</h2>
            <div className="section-divider"></div>
          </div>
          <div className="mission-content">
            <div className="mission-statement">
              <h3>Our Mission</h3>
              <p>To transform hospitality by creating extraordinary spaces and experiences that connect travelers with authentic local culture while providing uncompromising comfort and service.</p>
            </div>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">✦</div>
                <h4>Excellence</h4>
                <p>We strive for excellence in every detail, from the design of our spaces to the quality of our service.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">✦</div>
                <h4>Authenticity</h4>
                <p>We celebrate and showcase the unique character and culture of each location.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">✦</div>
                <h4>Innovation</h4>
                <p>We continuously evolve and improve our guest experience through creative solutions.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">✦</div>
                <h4>Sustainability</h4>
                <p>We are committed to responsible practices that respect our environment and communities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section team-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Leadership Team</h2>
            <div className="section-divider"></div>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-member-card" key={index}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="about-section milestones-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <div className="section-divider"></div>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="about-section trust-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <div className="section-divider"></div>
          </div>
          <div className="trust-intro">
            <p>At HotelEase, we're committed to providing exceptional experiences backed by industry-leading standards. Our dedication to quality and service has earned us recognition from the most respected organizations in travel and hospitality.</p>
          </div>
          <div className="trust-signals-grid">
            {trustSignals.map((signal, index) => (
              <div className="trust-signal-card" key={index}>
                <div className="trust-signal-image">
                  <img src={signal.image} alt={signal.name} />
                </div>
                <h3>{signal.name}</h3>
                <p>{signal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-section cta-section">
        <div className="cta-content">
          <h2>Ready to Experience HotelEase?</h2>
          <p>Discover our collection of exceptional properties and start planning your next unforgettable stay.</p>
          <div className="cta-buttons">
            <a href="#rooms" className="cta-button primary">View Our Rooms</a>
            <a href="#booking" className="cta-button secondary">Book Now</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs; 