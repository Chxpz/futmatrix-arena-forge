
import { useRef, useEffect } from 'react';

const FeatureDetail = () => {
  const detailRef = useRef<HTMLDivElement>(null);
  
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
    
    if (detailRef.current) {
      observer.observe(detailRef.current);
    }
    
    return () => {
      if (detailRef.current) {
        observer.unobserve(detailRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-20 relative" ref={detailRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 reveal">
            <div className="hud-panel p-6">
              <div className="text-xs text-neon-green/80 uppercase mb-2 flex justify-between">
                <span>AI Performance Analysis</span>
                <span className="text-2xs text-gray-500">REAL-TIME</span>
              </div>
              
              <div className="bg-matrix-dark/60 p-4 rounded border border-matrix-gray mb-4">
                <div className="text-2xs text-gray-400 mb-2">SKILL BREAKDOWN</div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Passing Accuracy</span>
                      <span className="text-neon-green">87%</span>
                    </div>
                    <div className="h-1 bg-matrix-gray/50 rounded-full">
                      <div className="h-1 bg-neon-green rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Shot Conversion</span>
                      <span className="text-neon-blue">62%</span>
                    </div>
                    <div className="h-1 bg-matrix-gray/50 rounded-full">
                      <div className="h-1 bg-neon-blue rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Defensive Success</span>
                      <span className="text-neon-yellow">74%</span>
                    </div>
                    <div className="h-1 bg-matrix-gray/50 rounded-full">
                      <div className="h-1 bg-neon-yellow rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-matrix-dark/60 p-3 rounded border border-matrix-gray">
                  <div className="text-2xs text-gray-400 mb-1">IMPROVEMENT</div>
                  <div className="text-xl font-bold text-white">+12<span className="text-neon-green">%</span></div>
                  <div className="text-2xs text-gray-500">vs previous month</div>
                </div>
                <div className="bg-matrix-dark/60 p-3 rounded border border-matrix-gray">
                  <div className="text-2xs text-gray-400 mb-1">EARNINGS</div>
                  <div className="text-xl font-bold text-white">$253</div>
                  <div className="text-2xs text-gray-500">total this season</div>
                </div>
              </div>
              
              <div className="bg-neon-green/10 p-3 rounded border border-neon-green/30">
                <div className="text-2xs text-neon-green mb-1">AI COACH RECOMMENDATION</div>
                <div className="text-sm text-white">Focus on improving through-ball timing and defensive positioning in the final third.</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-6 reveal">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="glow-text text-neon-green">AI-Driven</span> Analysis
            </h2>
            <p className="text-gray-300">
              Our advanced AI analyzes every aspect of your gameplay to provide personalized insights that help you improve where it matters most.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full bg-neon-green/10 w-8 h-8 flex items-center justify-center mr-3 mt-1 border border-neon-green/30">
                  <span className="text-neon-green">01</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">Match Data Collection</h3>
                  <p className="text-gray-400 text-sm">Automatically collects and analyzes your match data to track performance metrics.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-neon-green/10 w-8 h-8 flex items-center justify-center mr-3 mt-1 border border-neon-green/30">
                  <span className="text-neon-green">02</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">Performance Insights</h3>
                  <p className="text-gray-400 text-sm">Get detailed insights on your strengths and weaknesses to focus your practice.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-neon-green/10 w-8 h-8 flex items-center justify-center mr-3 mt-1 border border-neon-green/30">
                  <span className="text-neon-green">03</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">Personalized Training</h3>
                  <p className="text-gray-400 text-sm">Custom training plans based on your specific needs and gameplay style.</p>
                </div>
              </div>
            </div>
            
            <a href="#pricing" className="inline-block px-6 py-3 mt-4 bg-neon-green text-black font-medium rounded-md hover:bg-neon-green/90 transition-all button-glow">
              Start Improving Now
            </a>
          </div>
        </div>
      </div>
      
      <div className="section-line mt-20"></div>
    </section>
  );
};

export default FeatureDetail;
