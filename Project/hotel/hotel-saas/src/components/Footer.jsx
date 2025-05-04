export default function Footer() {
  return (
    <footer className="py-8 border-t border-border-color mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">HotelEase</h3>
            <p className="text-gray-500 mb-4">
              Providing premium hotel accommodations for business and leisure travelers.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-accent">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-accent">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-accent">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-accent">Home</a></li>
              <li><a href="#rooms" className="text-gray-500 hover:text-accent">Rooms</a></li>
              <li><a href="#about" className="text-gray-500 hover:text-accent">About Us</a></li>
              <li><a href="#contact" className="text-gray-500 hover:text-accent">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-500">
              <p className="mb-2">123 Hotel Street, Downtown</p>
              <p className="mb-2">City, State 12345</p>
              <p className="mb-2">Phone: +1 (555) 123-4567</p>
              <p>Email: info@hotelease.com</p>
            </address>
          </div>
        </div>
        
        <div className="pt-6 border-t border-border-color text-center">
          <p className="text-gray-500 mb-2">&copy; {new Date().getFullYear()} HotelEase. All rights reserved.</p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#privacy" className="text-gray-500 hover:text-accent">Privacy Policy</a>
            <a href="#terms" className="text-gray-500 hover:text-accent">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 