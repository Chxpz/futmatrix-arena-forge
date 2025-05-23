
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import FeatureDetail from '../components/FeatureDetail';
import AnalyticsShowcaseSection from '../components/AnalyticsShowcaseSection';
import PricingSection from '../components/PricingSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import AIAgentsSection from '../components/AIAgentsSection';

const Index = () => {
  useEffect(() => {
    // Update page title
    document.title = 'Futmatrix - Elite Platform for EAFC25 Players';
    
    // Update description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Futmatrix is the elite platform for EAFC25 players chasing performance, money and visibility.');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-matrix-darker overflow-hidden">
      <ScrollReveal />
      <NavBar />
      <HeroSection />
      <AIAgentsSection />
      <FeaturesSection />
      <FeatureDetail />
      <AnalyticsShowcaseSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
