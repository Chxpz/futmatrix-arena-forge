
import { useEffect, useRef } from 'react';
import { ChartBar, ChartLine, Database, Gamepad } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, delay = 0 }: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
  delay?: number;
}) => {
  return (
    <div 
      className="feature-card reveal" 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col h-full">
        <div className="rounded-full bg-neon-green/10 w-12 h-12 flex items-center justify-center mb-4 border border-neon-green/30">
          <Icon className="text-neon-green h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 flex-grow">{description}</p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

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
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);
  
  return (
    <section id="features" className="py-20 relative" ref={featuresRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="glow-text text-neon-green">Upgrade</span> Your Game
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Our comprehensive tools help you analyze, improve, and monetize your EAFC25 gameplay like never before.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            title="AI Data Collector" 
            description="Upload match data and get automatic performance metrics to track your progress and identify areas for improvement."
            icon={Database}
            delay={100}
          />
          <FeatureCard 
            title="AI Coach" 
            description="Get personalized training programs from our AI-driven coach based on your gameplay style and performance metrics."
            icon={Gamepad}
            delay={200}
          />
          <FeatureCard 
            title="AI Rivalizer" 
            description="Compete in ranked matches against other members and earn money through prize pools or player-vs-player stakes."
            icon={ChartBar}
            delay={300}
          />
          <FeatureCard 
            title="Performance Dashboard" 
            description="Access a beautiful, real-time interface with all your stats, match history, and progress tracking in one place."
            icon={ChartLine}
            delay={400}
          />
        </div>
      </div>
      
      <div className="section-line mt-20"></div>
    </section>
  );
};

export default FeaturesSection;
