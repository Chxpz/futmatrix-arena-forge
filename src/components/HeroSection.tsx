
import { useEffect, useRef, useState } from 'react';
import { removeBackground, loadImage } from '../utils/backgroundRemoval';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(true);
  
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

  useEffect(() => {
    const processImage = async () => {
      try {
        console.log('Starting image background removal...');
        setIsProcessing(true);
        
        // Fetch the original image
        const response = await fetch('/lovable-uploads/49656df3-fd56-4961-8db9-4b24bd9621bc.png');
        const blob = await response.blob();
        
        // Load the image
        const imageElement = await loadImage(blob);
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        
        // Create object URL for the processed image
        const url = URL.createObjectURL(processedBlob);
        setProcessedImageUrl(url);
        setIsProcessing(false);
        
        console.log('Background removal completed successfully');
      } catch (error) {
        console.error('Failed to process image:', error);
        setIsProcessing(false);
        // Fallback to original image
        setProcessedImageUrl('/lovable-uploads/49656df3-fd56-4961-8db9-4b24bd9621bc.png');
      }
    };

    processImage();
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
              {/* High-tech image container with multiple effects */}
              <div className="relative group">
                {/* Outer glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-neon-green/20 via-neon-blue/20 to-neon-green/20 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                
                {/* Scanner lines effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/10 to-transparent rounded-xl animate-slide-up opacity-30"></div>
                
                {/* Image container with border effects */}
                <div className="relative overflow-hidden rounded-xl border border-neon-green/30 group-hover:border-neon-green/60 transition-all duration-300 bg-matrix-dark/30 backdrop-blur-sm">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-green/80 z-10"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-green/80 z-10"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-green/80 z-10"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-green/80 z-10"></div>
                  
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  
                  {/* Processing indicator */}
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-matrix-dark/50 z-20">
                      <div className="text-neon-green animate-pulse">Processing image...</div>
                    </div>
                  )}
                  
                  {/* Main image */}
                  <img 
                    src={processedImageUrl || '/lovable-uploads/49656df3-fd56-4961-8db9-4b24bd9621bc.png'} 
                    alt="Futuristic Gaming AI Agents"
                    className="w-full h-auto max-w-lg transform group-hover:scale-105 transition-transform duration-500 filter brightness-110 contrast-110 saturate-110"
                    style={{ opacity: isProcessing ? 0.5 : 1 }}
                  />
                  
                  {/* Scanning line animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-60 animate-slide-up"></div>
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute -top-2 -left-2 w-2 h-2 bg-neon-green rounded-full animate-float opacity-80"></div>
                <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-neon-blue rounded-full animate-float opacity-80" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/3 -left-4 w-1 h-1 bg-neon-green rounded-full animate-float opacity-60" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-1/3 -right-4 w-1 h-1 bg-neon-blue rounded-full animate-float opacity-60" style={{animationDelay: '0.5s'}}></div>
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
