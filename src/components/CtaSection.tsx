
const CtaSection = () => {
  return (
    <section id="join" className="py-20 relative special-glow">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-xl p-8 border border-neon-green/20 bg-matrix-dark/90 backdrop-blur-md reveal">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-neon-green/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-neon-green glow-text">compete</span> for real?
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
              Join the Futmatrix community today and start your journey to becoming an elite EAFC25 player.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="{BASIC_WHOP_LINK}" 
                className="px-6 py-3 bg-neon-green text-black font-medium rounded-md hover:bg-neon-green/90 transition-all button-glow"
              >
                Join Basic Plan
              </a>
              <a 
                href="{ADVANCED_WHOP_LINK}" 
                className="px-6 py-3 bg-transparent border border-neon-green text-neon-green rounded-md hover:bg-neon-green/10 transition-all button-glow"
              >
                Join Advanced Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
