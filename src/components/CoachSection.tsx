
import { useEffect, useRef } from 'react';
import { Brain, TrendingUp, Award } from 'lucide-react';

const CoachSection = () => {
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
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-matrix-dark via-matrix-darker to-matrix-dark" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-neon-green/5 to-transparent"></div>
      <div className="matrix-grid opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left side - Coach Agent Image */}
          <div className="lg:w-1/2 reveal">
            <div className="relative h-[500px] w-full flex items-center justify-center">
              {/* Main image container with same effects as Rivalizer */}
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
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Your <span className="glow-text text-neon-green">Personal</span><br/>
              <span className="text-neon-green">Performance Coach</span>
            </h2>
            
            <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
              Meet your <span className="text-neon-green font-semibold">AI Coach</span> - an advanced performance analyst that studies your gameplay, 
              identifies weaknesses, and provides <span className="text-neon-green font-semibold">personalized training</span> 
              to elevate your competitive edge to elite levels.
            </p>
            
            {/* Key Features in a compact layout */}
            <div className="space-y-5 pt-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-neon-green/20 p-2.5 border border-neon-green/30 mt-1">
                  <Brain className="h-4 w-4 text-neon-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Advanced Gameplay Analysis</h3>
                  <p className="text-gray-400 text-sm">Deep learning algorithms analyze every match to identify patterns and improvement opportunities</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-neon-green/20 p-2.5 border border-neon-green/30 mt-1">
                  <TrendingUp className="h-4 w-4 text-neon-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Personalized Training Plans</h3>
                  <p className="text-gray-400 text-sm">Custom training regimens designed specifically for your playstyle and skill gaps</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-neon-green/20 p-2.5 border border-neon-green/30 mt-1">
                  <Award className="h-4 w-4 text-neon-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Elite Strategy Development</h3>
                  <p className="text-gray-400 text-sm">Learn advanced tactics and strategies used by top-tier professional players</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-line mt-16"></div>
    </section>
  );
};

export default CoachSection;
