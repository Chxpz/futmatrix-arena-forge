
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden" ref={heroRef}>
      {/* Stadium Background with Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/25ab6b21-2c68-4f52-93e7-5203eb406fa6.png" 
          alt="Stadium Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-matrix-darker/80"></div>
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-matrix-darker/90 via-matrix-darker/60 to-matrix-darker/90"></div>
        {/* Matrix grid overlay */}
        <div className="absolute inset-0 matrix-grid opacity-30"></div>
        {/* Neon glow effect */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2 space-y-6 reveal">
            <div className="inline-block py-1 px-3 rounded-full bg-matrix-gray/20 border border-neon-green/30 text-xs text-neon-green mb-4 animate-fade-in">
              <span className="mr-2">⚡</span> For competitive EAFC25 players
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="glow-text text-neon-green">Elite Platform</span> for <br/>
              EAFC25 Players
            </h1>
            <p className="text-gray-300 text-lg max-w-lg">
              Chase performance, money and visibility with our AI-driven tools designed for competitive gamers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#pricing" className="px-6 py-3 bg-neon-green text-black font-medium rounded-md hover:bg-neon-green/90 transition-all button-glow">
                Get Started
              </a>
              <a href="#features" className="px-6 py-3 bg-transparent border border-neon-green/50 text-neon-green rounded-md hover:bg-neon-green/10 transition-all button-glow">
                Explore Features
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 reveal">
            <div className="relative h-[500px] w-full flex items-center justify-center">
              {/* Elegant floating image container with cool effects */}
              <div className="relative group">
                {/* Dynamic ambient glow backdrop */}
                <div className="absolute -inset-12 bg-gradient-radial from-neon-green/20 via-neon-blue/15 to-transparent rounded-full blur-3xl opacity-70 group-hover:opacity-90 transition-all duration-700 animate-pulse"></div>
                
                {/* Orbital light elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-8 right-12 w-3 h-3 bg-neon-green rounded-full animate-bounce opacity-80" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
                  <div className="absolute bottom-16 left-8 w-2 h-2 bg-neon-blue rounded-full animate-bounce opacity-70" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
                  <div className="absolute top-1/3 left-4 w-1.5 h-1.5 bg-neon-yellow rounded-full animate-bounce opacity-60" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
                  <div className="absolute bottom-1/3 right-6 w-2.5 h-2.5 bg-neon-green/80 rounded-full animate-bounce opacity-75" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
                </div>
                
                {/* Rotating energy rings */}
                <div className="absolute inset-0 rounded-full border border-neon-green/30 animate-spin opacity-20" style={{animationDuration: '20s'}}></div>
                <div className="absolute inset-8 rounded-full border border-neon-blue/25 animate-spin opacity-15" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                
                {/* Main image with elegant hover effects */}
                <div className="relative transform group-hover:scale-110 transition-all duration-1000 ease-out">
                  {/* Layered shadow effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 to-transparent rounded-3xl blur-2xl transform translate-y-6 opacity-60"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/15 to-transparent rounded-3xl blur-xl transform -translate-y-2 opacity-40"></div>
                  
                  {/* Image container with dynamic effects */}
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-matrix-dark/10 to-transparent backdrop-blur-sm">
                    <img 
                      src="/lovable-uploads/43b4aae5-404e-48b7-9d0b-f05717d5161a.png" 
                      alt="Gaming Character"
                      className="w-full h-auto max-w-lg transform group-hover:brightness-110 group-hover:contrast-110 transition-all duration-700"
                    />
                    
                    {/* Dynamic light overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-neon-green/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Animated light streaks */}
                    <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-neon-green/60 via-neon-green/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-neon-blue/50 via-neon-blue/15 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  
                  {/* Floating energy particles */}
                  <div className="absolute -top-4 -right-4 w-4 h-4 bg-neon-green/70 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute -bottom-6 -left-6 w-3 h-3 bg-neon-blue/70 rounded-full animate-ping opacity-50" style={{animationDelay: '1.5s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-2">Scroll to explore</span>
          <svg className="animate-bounce h-5 w-5 text-neon-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
