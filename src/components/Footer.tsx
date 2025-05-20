
const Footer = () => {
  return (
    <footer className="py-12 bg-matrix-darker relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img 
              src="/lovable-uploads/43b4aae5-404e-48b7-9d0b-f05717d5161a.png" 
              alt="Futmatrix" 
              className="h-10 w-auto" 
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Pricing</a>
            <a href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Terms of Service</a>
          </div>
        </div>
        
        <div className="border-t border-matrix-gray/30 mt-8 pt-8 text-center md:text-left">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Futmatrix. All rights reserved. Not affiliated with EA Sports.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
