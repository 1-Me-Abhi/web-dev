import { useState } from 'react';

const features = [
  { 
    title: "Free Wi-Fi", 
    desc: "Stay connected during your stay with high-speed internet throughout the property.",
    icon: "wifi",
    color: "blue" 
  },
  { 
    title: "Luxury Pool", 
    desc: "Relax and unwind in our temperature-controlled swimming pool with poolside service.", 
    icon: "water",
    color: "cyan"
  },
  { 
    title: "24/7 Room Service", 
    desc: "Enjoy delicious meals and refreshments delivered directly to your room any time of day.", 
    icon: "room_service",
    color: "amber"
  },
  { 
    title: "Spa & Wellness", 
    desc: "Rejuvenate with our premium spa treatments and wellness activities.", 
    icon: "spa",
    color: "green"
  },
  { 
    title: "Gourmet Dining", 
    desc: "Experience exquisite cuisine prepared by our award-winning chefs.", 
    icon: "restaurant",
    color: "red"
  },
  { 
    title: "Concierge Service", 
    desc: "Our dedicated staff will assist with any requests to make your stay perfect.", 
    icon: "support_agent",
    color: "purple"
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(null);
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold mb-4 text-center">Why Choose Us</h3>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Experience the perfect blend of luxury, comfort, and exceptional service at our hotel.</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`bg-white p-6 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer ${activeFeature === i ? 'ring-2 ring-offset-2 ring-' + feature.color + '-400' : ''}`}
              onMouseEnter={() => setActiveFeature(i)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`w-14 h-14 rounded-full mb-4 flex items-center justify-center bg-${feature.color}-100 text-${feature.color}-600`}>
                <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>
              
              <div className={`mt-4 overflow-hidden transition-all duration-300 ${activeFeature === i ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <a href="#rooms" className={`text-${feature.color}-600 font-medium inline-flex items-center group`}>
                  Learn more
                  <span className="material-symbols-outlined ml-1 text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 