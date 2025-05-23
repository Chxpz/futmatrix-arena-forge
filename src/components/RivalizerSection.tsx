
import { useEffect, useRef } from 'react';
import { Trophy, DollarSign, Target, Zap } from 'lucide-react';

const RivalizerSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-matrix-darker via-matrix-dark to-matrix-darker" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/5 to-transparent"></div>
      <div className="matrix-grid opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left side - Content */}
          <div className="lg:w-1/2 space-y-8 reveal">
            <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green mb-6 animate-glow-pulse">
              <span className="mr-2">🤖</span> MEET THE RIVALIZER AI
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your <span className="glow-text text-neon-green">AI Matchmaker</span><br/>
              for <span className="text-neon-green">Elite Competition</span>
            </h2>
            
            <p className="text-gray-300 text-xl max-w-lg leading-relaxed">
              Meet the <span className="text-neon-green font-semibold">Rivalizer</span> - our advanced AI agent that creates perfect matches, 
              manages betting pools, and ensures you maximize your <span className="text-neon-green font-semibold">earning potential</span> 
              against players of your skill level.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green">$50K+</div>
                <div className="text-sm text-gray-400">Total Winnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green">10K+</div>
                <div className="text-sm text-gray-400">Active Rivals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green">95%</div>
                <div className="text-sm text-gray-400">Fair Matches</div>
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-neon-green/20 p-2 border border-neon-green/30">
                  <Trophy className="h-4 w-4 text-neon-green" />
                </div>
                <span className="text-gray-300">AI-powered skill-based matchmaking system</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-neon-green/20 p-2 border border-neon-green/30">
                  <DollarSign className="h-4 w-4 text-neon-green" />
                </div>
                <span className="text-gray-300">Automated betting pools with secure payouts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-neon-green/20 p-2 border border-neon-green/30">
                  <Target className="h-4 w-4 text-neon-green" />
                </div>
                <span className="text-gray-300">Real-time performance analysis and optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-neon-green/20 p-2 border border-neon-green/30">
                  <Zap className="h-4 w-4 text-neon-green" />
                </div>
                <span className="text-gray-300">Instant match proposals and earnings tracking</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a href="/rivalizer" className="px-8 py-4 bg-neon-green text-black font-bold text-lg rounded-md hover:bg-neon-green/90 transition-all button-glow shadow-neon-green">
                Start Earning Now
              </a>
              <a href="#pricing" className="px-8 py-4 bg-transparent border-2 border-neon-green/60 text-neon-green font-medium text-lg rounded-md hover:bg-neon-green/10 transition-all button-glow">
                View Prize Pools
              </a>
            </div>
          </div>
          
          {/* Right side - AI Agent Image */}
          <div className="lg:w-1/2 reveal">
            <div className="relative h-[600px] w-full flex items-center justify-center">
              {/* Main image container - clean with no overlays */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="/lovable-uploads/344f0c59-5812-4192-a509-3a456ba2e72d.png"
                  alt="Rivalizer AI Agent - Your Elite Matchmaking Assistant"
                  className="max-w-full max-h-[500px] object-contain drop-shadow-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 0 30px rgba(0, 255, 65, 0.4)) drop-shadow(0 0 60px rgba(0, 255, 65, 0.2))'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-line mt-20"></div>
    </section>
  );
};

export default RivalizerSection;
