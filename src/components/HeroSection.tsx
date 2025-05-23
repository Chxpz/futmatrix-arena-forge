
import { useEffect, useRef } from 'react';
import AIAgent3D from './AIAgent3D';

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
    <section className="relative min-h-screen pt-24 pb-16 flex items-center hero-glow overflow-hidden" ref={heroRef}>
      <div className="matrix-grid"></div>
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
            <div className="relative h-[500px] w-full">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-neon-green/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-neon-blue/10 rounded-full filter blur-3xl"></div>
              
              <AIAgent3D />
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
