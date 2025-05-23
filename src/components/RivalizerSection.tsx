
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
              <span className="mr-2">⚔️</span> AI RIVALIZER MODULE
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="glow-text text-neon-green">Dominate</span> Your<br/>
              Competition & <span className="text-neon-green">Earn Big</span>
            </h2>
            
            <p className="text-gray-300 text-xl max-w-lg leading-relaxed">
              Turn your skills into <span className="text-neon-green font-semibold">cold hard cash</span>. Challenge elite players, 
              climb the ranks, and prove you're the best while earning real money through competitive matches.
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
                <div className="text-sm text-gray-400">Payout Rate</div>
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-neon-green/20 p-2 border border-neon-green/30">
                  <Trophy className="h-4 w-4 text-neon-green" />
                </div>
                <span className="text-gray-300">Ranked competitive matches with real stakes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-neon-green/20 p-2 border border-neon-green/30">
                  <DollarSign className="h-4 w-4 text-neon-green" />
                </div>
                <span className="text-gray-300">Instant payouts for every victory</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-neon-green/20 p-2 border border-neon-green/30">
                  <Target className="h-4 w-4 text-neon-green" />
                </div>
                <span className="text-gray-300">AI-powered matchmaking for fair competition</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-neon-green/20 p-2 border border-neon-green/30">
                  <Zap className="h-4 w-4 text-neon-green" />
                </div>
                <span className="text-gray-300">Real-time performance tracking during matches</span>
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
              {/* Glow effects */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-neon-green/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-neon-green/15 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
              
              {/* Main image container */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/b5a7b547-fee9-4374-9c3f-17544c371d1f.png"
                    alt="AI Agent Rivalizer"
                    className="max-w-full max-h-[500px] object-contain drop-shadow-2xl"
                    style={{ 
                      filter: 'drop-shadow(0 0 30px rgba(0, 255, 65, 0.4)) drop-shadow(0 0 60px rgba(0, 255, 65, 0.2))'
                    }}
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute -top-8 -right-8 bg-neon-green/90 text-black px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                    +$127
                  </div>
                  <div className="absolute -bottom-4 -left-8 bg-matrix-dark border border-neon-green/40 px-3 py-1 rounded-full text-xs text-neon-green animate-pulse">
                    🏆 Rank #1
                  </div>
                  <div className="absolute top-1/3 -left-12 bg-matrix-dark border border-neon-green/40 px-3 py-1 rounded-full text-xs text-neon-green animate-pulse delay-500">
                    💰 Prize Pool: $5K
                  </div>
                </div>
              </div>
              
              {/* Circuit lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-20" viewBox="0 0 400 400">
                  <path
                    d="M50,200 Q200,50 350,200 Q200,350 50,200"
                    stroke="rgba(0, 255, 65, 0.3)"
                    strokeWidth="1"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M100,100 L300,100 L300,300 L100,300 Z"
                    stroke="rgba(0, 255, 65, 0.2)"
                    strokeWidth="1"
                    fill="none"
                    className="animate-pulse delay-700"
                  />
                </svg>
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
