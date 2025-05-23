
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, Target } from 'lucide-react';

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section id="join" className="py-20 relative special-glow">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-xl p-8 border border-neon-green/20 bg-matrix-dark/90 backdrop-blur-md reveal">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-neon-green/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-neon-green/5 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green mb-6 animate-glow-pulse">
              <span className="mr-2">⚡</span> ELITE GAMING AWAITS
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to <span className="text-neon-green glow-text">dominate</span><br/>
              the competition?
            </h2>
            
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Join our elite platform and transform your gameplay with professional-grade analytics, 
              AI-powered insights, and tools designed for serious competitors.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-neon-green" />
                <span>Elite Performance Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-neon-green" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-neon-green" />
                <span>Competitive Community</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => navigate('/signup')}
                className="px-8 py-6 text-lg bg-neon-green text-black font-semibold rounded-lg hover:bg-neon-green/90 button-glow transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline" 
                className="px-8 py-6 text-lg bg-transparent border-2 border-neon-green text-neon-green rounded-lg hover:bg-neon-green/10 button-glow transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-6">
              No credit card required • Start competing in minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
