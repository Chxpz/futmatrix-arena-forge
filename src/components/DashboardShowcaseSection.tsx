
import { useEffect, useRef } from 'react';
import { BarChart3, TrendingUp, Target, Brain, Zap, Award } from 'lucide-react';

const DashboardShowcaseSection = () => {
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
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/5 to-transparent"></div>
      <div className="matrix-grid opacity-20"></div>
      
      <div className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green mb-6 animate-glow-pulse">
              <span className="mr-2">📈</span> ELITE DASHBOARD
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="glow-text text-neon-green">AI-Driven</span> Performance<br/>
              <span className="text-neon-green">Command Center</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Experience the ultimate <span className="text-neon-green font-semibold">professional-grade dashboard</span> that transforms 
              raw gameplay data into actionable insights. Monitor, analyze, and 
              <span className="text-neon-green font-semibold"> dominate with precision</span> using our AI-powered analytics suite.
            </p>
          </div>

          {/* Dashboard Showcase */}
          <div className="mb-20 reveal">
            <div className="relative max-w-7xl mx-auto">
              {/* Ambient glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-r from-neon-green/20 via-neon-green/30 to-neon-green/20 blur-3xl rounded-3xl opacity-60"></div>
              
              {/* Main dashboard container */}
              <div className="relative bg-gradient-to-br from-matrix-dark/90 to-matrix-darker/90 backdrop-blur-xl rounded-3xl border border-neon-green/40 p-6 shadow-2xl">
                <img 
                  src="/lovable-uploads/b5a7b547-fee9-4374-9c3f-17544c371d1f.png"
                  alt="Futmatrix Elite Dashboard - AI-Powered Performance Analytics Command Center"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 0 25px rgba(0, 255, 65, 0.3)) brightness(1.05) contrast(1.1)'
                  }}
                />
                
                {/* Floating dashboard features */}
                <div className="absolute -top-4 -right-4 hidden xl:block">
                  <div className="bg-gradient-to-br from-neon-green/20 to-neon-green/10 backdrop-blur-sm border border-neon-green/40 rounded-xl p-4 shadow-xl">
                    <div className="flex items-center mb-2">
                      <Brain className="h-5 w-5 text-neon-green mr-2" />
                      <span className="text-sm font-semibold text-white">AI Insights</span>
                    </div>
                    <p className="text-xs text-gray-300">Real-time AI recommendations</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 hidden xl:block">
                  <div className="bg-gradient-to-br from-neon-green/20 to-neon-green/10 backdrop-blur-sm border border-neon-green/40 rounded-xl p-4 shadow-xl">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-neon-green mr-2" />
                      <span className="text-sm font-semibold text-white">Live Analytics</span>
                    </div>
                    <p className="text-xs text-gray-300">Performance tracking in real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 reveal">
            <div className="feature-card group">
              <div className="card-content">
                <div className="rounded-full bg-neon-green/20 p-3 w-fit mb-4 border border-neon-green/30 group-hover:bg-neon-green/30 transition-colors">
                  <BarChart3 className="h-6 w-6 text-neon-green" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-neon-green transition-colors">
                  Advanced Metrics
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Track 50+ performance indicators with military-grade precision and professional-level depth
                </p>
              </div>
            </div>

            <div className="feature-card group">
              <div className="card-content">
                <div className="rounded-full bg-neon-green/20 p-3 w-fit mb-4 border border-neon-green/30 group-hover:bg-neon-green/30 transition-colors">
                  <Target className="h-6 w-6 text-neon-green" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-neon-green transition-colors">
                  Tactical Analysis
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  AI-powered pattern recognition reveals hidden gameplay strategies and optimal decision paths
                </p>
              </div>
            </div>

            <div className="feature-card group">
              <div className="card-content">
                <div className="rounded-full bg-neon-green/20 p-3 w-fit mb-4 border border-neon-green/30 group-hover:bg-neon-green/30 transition-colors">
                  <Zap className="h-6 w-6 text-neon-green" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-neon-green transition-colors">
                  Instant Intelligence
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Get real-time performance insights and improvement suggestions during active gameplay
                </p>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="reveal">
            <div className="bg-gradient-to-r from-matrix-dark/60 to-matrix-darker/60 backdrop-blur-sm rounded-2xl border border-neon-green/30 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-neon-green mb-2">1M+</div>
                  <div className="text-sm text-gray-400">Matches Analyzed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-green mb-2">99.7%</div>
                  <div className="text-sm text-gray-400">Analysis Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-green mb-2">50+</div>
                  <div className="text-sm text-gray-400">Key Metrics</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-green mb-2">0.2s</div>
                  <div className="text-sm text-gray-400">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-line"></div>
    </section>
  );
};

export default DashboardShowcaseSection;
