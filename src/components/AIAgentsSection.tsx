
import { useEffect, useRef } from 'react';
import { Brain, TrendingUp, Award, Trophy, DollarSign, Target, Zap } from 'lucide-react';

const AIAgentsSection = () => {
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
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-matrix-dark via-matrix-darker to-matrix-dark" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-neon-green/5 to-transparent"></div>
      <div className="matrix-grid opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green mb-6 animate-glow-pulse">
            <span className="mr-2">🤖</span> MEET OUR AI AGENTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Your <span className="glow-text text-neon-green">Elite</span><br/>
            <span className="text-neon-green">AI Companions</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Two powerful AI agents designed to elevate your EAFC25 performance through 
            personalized coaching and intelligent matchmaking.
          </p>
        </div>

        {/* AI Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Coach Agent */}
          <div className="reveal">
            <div className="text-center lg:text-left space-y-6">
              {/* Coach Image */}
              <div className="relative h-[300px] w-full flex items-center justify-center mb-6">
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/lovable-uploads/cde5f0eb-ff04-46cd-89c6-7e4547433c81.png"
                    alt="Coach AI Agent"
                    className="max-w-full max-h-[280px] object-contain drop-shadow-2xl"
                    style={{ 
                      filter: 'drop-shadow(0 0 30px rgba(0, 255, 65, 0.4)) drop-shadow(0 0 60px rgba(0, 255, 65, 0.2))'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  <span className="text-neon-green">Coach AI</span> - Your Performance Analyst
                </h3>
                <p className="text-gray-300 mb-4">
                  Advanced AI that analyzes your gameplay and provides personalized training 
                  to elevate your competitive edge.
                </p>
                
                {/* Compact Features */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-4 w-4 text-neon-green flex-shrink-0" />
                    <span className="text-sm text-gray-300">Deep gameplay analysis & pattern recognition</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-4 w-4 text-neon-green flex-shrink-0" />
                    <span className="text-sm text-gray-300">Personalized training plans & skill development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-4 w-4 text-neon-green flex-shrink-0" />
                    <span className="text-sm text-gray-300">Elite strategy development & tactics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rivalizer Agent */}
          <div className="reveal">
            <div className="text-center lg:text-left space-y-6">
              {/* Rivalizer Image */}
              <div className="relative h-[300px] w-full flex items-center justify-center mb-6">
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/lovable-uploads/344f0c59-5812-4192-a509-3a456ba2e72d.png"
                    alt="Rivalizer AI Agent"
                    className="max-w-full max-h-[280px] object-contain drop-shadow-2xl"
                    style={{ 
                      filter: 'drop-shadow(0 0 30px rgba(0, 255, 65, 0.4)) drop-shadow(0 0 60px rgba(0, 255, 65, 0.2))'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  <span className="text-neon-green">Rivalizer AI</span> - Your Matchmaker
                </h3>
                <p className="text-gray-300 mb-4">
                  Smart matchmaking AI that creates perfect competitions and manages 
                  betting pools to maximize your earning potential.
                </p>
                
                {/* Compact Features */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-4 w-4 text-neon-green flex-shrink-0" />
                    <span className="text-sm text-gray-300">AI-powered skill-based matchmaking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-4 w-4 text-neon-green flex-shrink-0" />
                    <span className="text-sm text-gray-300">Automated betting pools & secure payouts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="h-4 w-4 text-neon-green flex-shrink-0" />
                    <span className="text-sm text-gray-300">Real-time optimization & earnings tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Stats */}
        <div className="mt-16 reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-neon-green">$50K+</div>
              <div className="text-sm text-gray-400">Total Winnings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-neon-green">10K+</div>
              <div className="text-sm text-gray-400">Active Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-neon-green">95%</div>
              <div className="text-sm text-gray-400">Improvement Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-neon-green">24/7</div>
              <div className="text-sm text-gray-400">AI Support</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-line mt-16"></div>
    </section>
  );
};

export default AIAgentsSection;
