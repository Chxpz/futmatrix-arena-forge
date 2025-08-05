
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ 
  plan, 
  price, 
  features, 
  cta, 
  highlight = false 
}: { 
  plan: string;
  price: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div 
      className={`pricing-card ${plan.toLowerCase()} reveal`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="card-content flex flex-col h-full">
        <div className={`text-sm font-medium px-3 py-1.5 mb-4 rounded-full inline-self-start
          ${highlight ? 'bg-neon-green text-black' : 'bg-matrix-gray/20 text-gray-300 border border-matrix-gray/50'}`}>
          {highlight ? '🔥 ' : '⚡ '}{plan} Plan
        </div>
        
        <h3 className="text-3xl font-bold mb-6">
          <span className={highlight ? 'text-neon-green' : 'text-neon-blue'}>{price}</span>
          <span className="text-sm text-gray-400">/mo</span>
        </h3>
        
        <div className="flex-grow space-y-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <span className="text-neon-green mr-2">✓</span>
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => navigate('/dashboard')}
          className={`py-3 px-4 rounded-md font-medium transition-all button-glow text-center
            ${highlight 
              ? 'bg-neon-green text-black hover:bg-neon-green/90' 
              : 'bg-transparent border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10'
            }`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
};

const PricingToggle = ({ 
  isMonthly, 
  setIsMonthly 
}: { 
  isMonthly: boolean; 
  setIsMonthly: (value: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-12">
      <button 
        onClick={() => setIsMonthly(true)}
        className={`px-4 py-2 rounded-md text-sm transition-all ${isMonthly ? 'bg-neon-green/20 text-neon-green' : 'text-gray-400'}`}
      >
        Monthly
      </button>
      <button 
        onClick={() => setIsMonthly(false)}
        className={`px-4 py-2 rounded-md text-sm transition-all ${!isMonthly ? 'bg-neon-green/20 text-neon-green' : 'text-gray-400'}`}
      >
        Yearly <span className="text-xs ml-1 opacity-70">Save 20%</span>
      </button>
    </div>
  );
};

const PricingSection = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  
  const basicFeatures = [
    "Access to Discord community",
    "Up to 5 Rivalizer matches per month",
    "AI Coach: Reviews last 5 matches only",
    "Core performance stats"
  ];
  
  const advancedFeatures = [
    "Unlimited Rivalizer matches",
    "Full access to all EAFC25 stats",
    "AI Coach with custom training plan",
    "Real-time dashboard",
    "Full Discord access"
  ];
  
  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="glow-text text-neon-green">Game Plan</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Select the plan that matches your competitive ambitions and take your game to the next level.
          </p>
        </div>
        
        <PricingToggle isMonthly={isMonthly} setIsMonthly={setIsMonthly} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard 
            plan="Basic" 
            price={isMonthly ? "$19.63" : "$188.45"}
            features={basicFeatures} 
            cta="Join now" 
          />
          <PricingCard 
            plan="Advanced" 
            price={isMonthly ? "$29.63" : "$284.45"}
            features={advancedFeatures} 
            cta="Upgrade my game" 
            highlight={true} 
          />
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500 reveal">
          All plans include a 7-day money-back guarantee
        </div>
      </div>
      
      <div className="section-line mt-20"></div>
    </section>
  );
};

export default PricingSection;
