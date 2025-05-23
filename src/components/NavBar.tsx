
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-2 bg-matrix-darker/90 backdrop-blur-md shadow-md' : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img 
              src="/lovable-uploads/43b4aae5-404e-48b7-9d0b-f05717d5161a.png" 
              alt="Futmatrix" 
              className="h-14 w-auto hover:opacity-90 transition-opacity" 
            />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="#features" className="text-sm text-gray-300 hover:text-neon-green transition-colors">Features</Link>
          <Link to="#pricing" className="text-sm text-gray-300 hover:text-neon-green transition-colors">Pricing</Link>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="text-sm border border-neon-green/50 text-neon-green hover:bg-neon-green/10"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
            <Button 
              className="text-sm bg-neon-green text-black hover:bg-neon-green/90"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>
        </div>

        <button className="md:hidden text-gray-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
