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
    <section className="relative overflow-hidden bg-gradient-to-b from-matrix-dark via-matrix-darker to-matrix-dark" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-neon-green/5 to-transparent"></div>
      <div className="matrix-grid opacity-20"></div>
      
      {/* Main Section Header */}
      <div className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
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
        </div>
      </div>

      {/* Coach AI Section */}
      <div className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left side - Coach Agent Image */}
            <div className="lg:w-1/2 reveal">
              <div className="relative h-[500px] w-full flex items-center justify-center">
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/lovable-uploads/cde5f0eb-ff04-46cd-89c6-7e4547433c81.png"
                    alt="Coach AI Agent - Your Elite Performance Analyst"
                    className="max-w-full max-h-[450px] object-contain drop-shadow-2xl"
                    style={{ 
                      filter: 'drop-shadow(0 0 30px rgba(0, 255, 65, 0.4)) drop-shadow(0 0 60px rgba(0, 255, 65, 0.2))'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:w-1/2 space-y-6 reveal">
              <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green mb-4 animate-glow-pulse">
                <span className="mr-2">🧠</span> MEET YOUR COACH AI
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                Your <span className="glow-text text-neon-green">Personal</span><br/>
                <span className="text-neon-green">Performance Coach</span>
              </h3>
              
              <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
                Meet your <span className="text-neon-green font-semibold">AI Coach</span> - an advanced performance analyst that studies your gameplay, 
                identifies weaknesses, and provides <span className="text-neon-green font-semibold">personalized training</span> 
                to elevate your competitive edge to elite levels.
              </p>
              
              {/* Key Features */}
              <div className="space-y-5 pt-4">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-neon-green/20 p-2.5 border border-neon-green/30 mt-1">
                    <Brain className="h-4 w-4 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Advanced Gameplay Analysis</h4>
                    <p className="text-gray-400 text-sm">Deep learning algorithms analyze every match to identify patterns and improvement opportunities</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-neon-green/20 p-2.5 border border-neon-green/30 mt-1">
                    <TrendingUp className="h-4 w-4 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Personalized Training Plans</h4>
                    <p className="text-gray-400 text-sm">Custom training regimens designed specifically for your playstyle and skill gaps</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-neon-green/20 p-2.5 border border-neon-green/30 mt-1">
                    <Award className="h-4 w-4 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Elite Strategy Development</h4>
                    <p className="text-gray-400 text-sm">Learn advanced tactics and strategies used by top-tier professional players</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rivalizer AI Section */}
      <div className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left side - Content */}
            <div className="lg:w-1/2 space-y-8 reveal">
              <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green mb-6 animate-glow-pulse">
                <span className="mr-2">🤖</span> MEET THE RIVALIZER AI
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                Your <span className="glow-text text-neon-green">AI Matchmaker</span><br/>
                for <span className="text-neon-green">Elite Competition</span>
              </h3>
              
              <p className="text-gray-300 text-xl max-w-lg leading-relaxed">
                Meet the <span className="text-neon-green font-semibold">Rivalizer</span> - our advanced AI agent that creates perfect matches, 
                manages betting pools, and ensures you maximize your <span className="text-neon-green font-semibold">earning potential</span> 
                against players of your skill level.
              </p>
              
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
            </div>
            
            {/* Right side - AI Agent Image */}
            <div className="lg:w-1/2 reveal">
              <div className="relative h-[500px] w-full flex items-center justify-center">
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/lovable-uploads/344f0c59-5812-4192-a509-3a456ba2e72d.png"
                    alt="Rivalizer AI Agent - Your Elite Matchmaking Assistant"
                    className="max-w-full max-h-[450px] object-contain drop-shadow-2xl"
                    style={{ 
                      filter: 'drop-shadow(0 0 30px rgba(0, 255, 65, 0.4)) drop-shadow(0 0 60px rgba(0, 255, 65, 0.2))'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Stats */}
      <div className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="reveal">
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
      </div>
      
      <div className="section-line"></div>
    </section>
  );
};

export default AIAgentsSection;
