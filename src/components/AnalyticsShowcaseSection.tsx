
import { useEffect, useRef } from 'react';
import { TrendingUp, Brain, BarChart3, Target, Activity, Award } from 'lucide-react';

const AnalyticsShowcaseSection = () => {
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

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Advanced algorithms analyze your gameplay patterns and provide actionable recommendations"
    },
    {
      icon: TrendingUp,
      title: "Performance Trends",
      description: "Track your improvement over time with detailed performance metrics and trend analysis"
    },
    {
      icon: Target,
      title: "Precision Analytics",
      description: "Get granular insights into every aspect of your game, from shot efficiency to tactical decisions"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Live performance tracking during matches with instant feedback and suggestions"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-matrix-darker via-matrix-dark to-matrix-darker" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/5 to-transparent"></div>
      <div className="matrix-grid opacity-20"></div>
      
      <div className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green mb-6 animate-glow-pulse">
              <span className="mr-2">📊</span> PERFORMANCE ANALYTICS
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="glow-text text-neon-green">Elite</span> Performance<br/>
              <span className="text-neon-green">Analytics Dashboard</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Unlock the power of <span className="text-neon-green font-semibold">AI-driven analysis</span> with our comprehensive 
              performance dashboard. Track every metric, identify improvement areas, and 
              <span className="text-neon-green font-semibold"> dominate your competition</span> with data-backed insights.
            </p>
          </div>

          {/* Dashboard Image Showcase */}
          <div className="mb-20 reveal">
            <div className="relative max-w-6xl mx-auto">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-neon-green/20 via-neon-green/10 to-neon-green/20 blur-2xl rounded-3xl"></div>
              
              {/* Main dashboard image */}
              <div className="relative bg-gradient-to-br from-matrix-dark/80 to-matrix-darker/80 backdrop-blur-sm rounded-2xl border border-neon-green/30 p-4 shadow-2xl">
                <img 
                  src="/lovable-uploads/9d81be41-f189-4f1c-94a0-4161de15e802.png"
                  alt="Futmatrix Performance Analytics Dashboard - Real-time AI-powered performance tracking"
                  className="w-full h-auto rounded-xl shadow-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 65, 0.2))'
                  }}
                />
              </div>

              {/* Floating feature cards */}
              <div className="absolute -left-8 top-1/4 hidden lg:block">
                <div className="bg-matrix-dark/90 backdrop-blur-sm border border-neon-green/30 rounded-lg p-4 shadow-xl max-w-xs">
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-5 w-5 text-neon-green mr-2" />
                    <span className="text-sm font-semibold text-white">Live Analytics</span>
                  </div>
                  <p className="text-xs text-gray-300">Real-time performance tracking with instant insights</p>
                </div>
              </div>

              <div className="absolute -right-8 bottom-1/4 hidden lg:block">
                <div className="bg-matrix-dark/90 backdrop-blur-sm border border-neon-green/30 rounded-lg p-4 shadow-xl max-w-xs">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-neon-green mr-2" />
                    <span className="text-sm font-semibold text-white">Elite Insights</span>
                  </div>
                  <p className="text-xs text-gray-300">AI-powered recommendations for peak performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 reveal">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="card-content">
                  <div className="rounded-full bg-neon-green/20 p-3 w-fit mb-4 border border-neon-green/30 group-hover:bg-neon-green/30 transition-colors">
                    <feature.icon className="h-6 w-6 text-neon-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-neon-green transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 reveal">
            <div className="bg-gradient-to-r from-matrix-dark/50 to-matrix-darker/50 backdrop-blur-sm rounded-2xl border border-neon-green/20 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-neon-green mb-2">50K+</div>
                  <div className="text-sm text-gray-400">Data Points Analyzed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-green mb-2">97%</div>
                  <div className="text-sm text-gray-400">Prediction Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-green mb-2">15+</div>
                  <div className="text-sm text-gray-400">Performance Metrics</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-green mb-2">24/7</div>
                  <div className="text-sm text-gray-400">Real-time Analysis</div>
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

export default AnalyticsShowcaseSection;
