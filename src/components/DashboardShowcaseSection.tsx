
import { useRef, useEffect } from 'react';

const DashboardShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach(el => el.classList.add('active'));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-20 relative bg-gradient-to-b from-matrix-darker via-matrix-dark to-matrix-darker" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/5 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left side - Content */}
          <div className="lg:w-1/2 space-y-6 reveal">
            <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green mb-4 animate-glow-pulse">
              <span className="mr-2">📊</span> PERFORMANCE DASHBOARD
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="glow-text text-neon-green">Elite Analytics</span><br/>
              at Your Fingertips
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Experience the power of professional-grade performance analytics with our comprehensive dashboard. 
              Track your progress, analyze match data, and discover insights that will elevate your gameplay to elite levels.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full bg-neon-green/10 w-8 h-8 flex items-center justify-center mr-3 mt-1 border border-neon-green/30">
                  <span className="text-neon-green text-sm">01</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">Real-Time Performance Metrics</h3>
                  <p className="text-gray-400 text-sm">Monitor your goals, shots, efficiency ratings, and match statistics in real-time with beautiful visualizations.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-neon-green/10 w-8 h-8 flex items-center justify-center mr-3 mt-1 border border-neon-green/30">
                  <span className="text-neon-green text-sm">02</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">Advanced Trend Analysis</h3>
                  <p className="text-gray-400 text-sm">Visualize your performance trends with interactive charts and moving averages to identify improvement patterns.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-neon-green/10 w-8 h-8 flex items-center justify-center mr-3 mt-1 border border-neon-green/30">
                  <span className="text-neon-green text-sm">03</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">Comprehensive Match History</h3>
                  <p className="text-gray-400 text-sm">Access detailed match breakdowns with performance insights and personalized recommendations for improvement.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Dashboard Image */}
          <div className="lg:w-1/2 reveal">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-neon-green/20 via-neon-green/10 to-transparent opacity-60 rounded-lg"></div>
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="/lovable-uploads/5cfbe646-bfb4-4c21-a48b-922a45eba6c7.png"
                  alt="Futmatrix Performance Analytics Dashboard"
                  className="w-full h-auto rounded-lg shadow-2xl border border-matrix-gray/30"
                  style={{ 
                    filter: 'drop-shadow(0 0 30px rgba(0, 255, 65, 0.3)) drop-shadow(0 0 60px rgba(0, 255, 65, 0.1))'
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

export default DashboardShowcaseSection;
