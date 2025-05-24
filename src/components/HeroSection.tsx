
import { useEffect, useRef, useState } from 'react';

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
              {/* Elegant floating image container */}
              <div className="relative group">
                {/* Ambient glow backdrop */}
                <div className="absolute -inset-8 bg-gradient-to-r from-neon-green/15 via-neon-blue/10 to-neon-green/15 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                
                {/* Floating light orbs */}
                <div className="absolute -top-4 -left-4 w-3 h-3 bg-neon-green/80 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-2 h-2 bg-neon-blue/80 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/3 -right-8 w-1.5 h-1.5 bg-neon-green/60 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-1/4 -left-6 w-2.5 h-2.5 bg-neon-blue/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                
                {/* Subtle energy rings */}
                <div className="absolute inset-0 rounded-full border border-neon-green/20 animate-ping opacity-30"></div>
                <div className="absolute inset-4 rounded-full border border-neon-blue/20 animate-ping opacity-20" style={{animationDelay: '1s'}}></div>
                
                {/* Main image with elegant hover effect */}
                <div className="relative transform group-hover:scale-105 transition-all duration-700 ease-out">
                  {/* Soft shadow base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-matrix-dark/40 to-transparent rounded-2xl blur-lg transform translate-y-4"></div>
                  
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-matrix-dark/20 to-matrix-darker/40 backdrop-blur-sm">
                    <img 
                      src="/lovable-uploads/8bb77508-057d-4437-9118-abf86754f0cb.png" 
                      alt="AI Gaming Agents"
                      className="w-full h-auto max-w-lg filter brightness-110 contrast-105 saturate-105 group-hover:brightness-125 transition-all duration-500"
                    />
                    
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-matrix-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Elegant light streak */}
                  <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-neon-green/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-neon-blue/40 via-transparent to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
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
