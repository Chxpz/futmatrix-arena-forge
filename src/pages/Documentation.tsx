import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Trophy, 
  Brain, 
  Gamepad2, 
  Coins, 
  Shield, 
  Target,
  BarChart3,
  Zap,
  Star
} from 'lucide-react';

const Documentation = () => {
  useEffect(() => {
    document.title = 'Futmatrix Rules & Documentation';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete guide to Futmatrix platform rules, tokenomics, and earning strategies for EAFC25 players.');
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-matrix-darker">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-green to-cyan-400 bg-clip-text text-transparent">
              Futmatrix Rules & Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master the platform, maximize your earnings, and dominate EAFC25 with our comprehensive guide
            </p>
          </div>

          {/* Quick Navigation */}
          <Card className="bg-matrix-dark/50 border-matrix-gray/30 mb-12">
            <CardHeader>
              <CardTitle className="text-neon-green">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Platform Overview", id: "overview" },
                  { title: "Earning Strategies", id: "earning" },
                  { title: "Tokenomics", id: "tokenomics" },
                  { title: "Platform Rules", id: "rules" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="p-3 bg-matrix-gray/20 hover:bg-neon-green/10 border border-matrix-gray/30 hover:border-neon-green/50 rounded-lg transition-all text-sm text-gray-300 hover:text-neon-green"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="overview" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-neon-green mb-8">Platform Overview</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-matrix-dark/50 border-matrix-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Target className="w-5 h-5" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Futmatrix is the world's first competitive gaming platform that combines AI-powered coaching 
                  with skill-matched wagered matches for EAFC25 players. We're building an ecosystem where 
                  skill directly translates to financial rewards.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-matrix-dark/50 border-matrix-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Trophy className="w-5 h-5" />
                  Value Proposition
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Transform your EAFC25 skills into real income through competitive matches, 
                  AI-driven improvement, and token rewards. The better you play, the more you earn.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-neon-green/10 to-cyan-400/10 border-neon-green/30 mb-8">
            <CardHeader>
              <CardTitle className="text-neon-green">Core Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Gamepad2 className="w-8 h-8 text-neon-green mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Rivalizer Arena</h3>
                  <p className="text-sm text-gray-300">Skill-matched wagered matches with real money on the line</p>
                </div>
                <div className="text-center">
                  <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">AI Coach</h3>
                  <p className="text-sm text-gray-300">Personalized training and performance analysis</p>
                </div>
                <div className="text-center">
                  <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Token Economy</h3>
                  <p className="text-sm text-gray-300">Earn and trade platform tokens for additional rewards</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="bg-matrix-gray/30" />

      {/* Earning Strategies */}
      <section id="earning" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-neon-green mb-8">How to Make Money on Futmatrix</h2>
          
          <div className="grid gap-8">
            {/* Primary Income Sources */}
            <Card className="bg-matrix-dark/50 border-matrix-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <DollarSign className="w-6 h-6" />
                  Primary Income Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-4 border-neon-green pl-4">
                    <h3 className="font-semibold text-white mb-2">1. Rivalizer Match Winnings</h3>
                    <p className="text-gray-300 mb-2">
                      Win wagered matches against skill-matched opponents. Both players bet on themselves, winner takes all.
                    </p>
                    <div className="bg-matrix-gray/20 p-3 rounded-lg">
                      <p className="text-sm text-neon-green font-mono">
                        Example: You bet 50 tokens on yourself, opponent bets 50 tokens. 
                        You win → You get 95 tokens (5% platform fee)
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-cyan-400 pl-4">
                    <h3 className="font-semibold text-white mb-2">2. Streaming Rewards</h3>
                    <p className="text-gray-300 mb-2">
                      Stream your matches on Twitch and earn bonus tokens for content creation.
                    </p>
                    <div className="bg-matrix-gray/20 p-3 rounded-lg">
                      <p className="text-sm text-cyan-400 font-mono">
                        Base reward: 20 tokens for winners, 10 tokens for losers who stream
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4">
                    <h3 className="font-semibold text-white mb-2">3. Training & Data Contribution</h3>
                    <p className="text-gray-300 mb-2">
                      Upload match analysis data and complete AI Coach training programs for token rewards.
                    </p>
                    <div className="bg-matrix-gray/20 p-3 rounded-lg">
                      <p className="text-sm text-purple-400 font-mono">
                        10-30 tokens per quality data submission, weekly training bonuses
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earning Potential */}
            <Card className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border-yellow-400/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <TrendingUp className="w-6 h-6" />
                  Monthly Earning Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-matrix-dark/30 rounded-lg">
                    <Badge variant="outline" className="border-green-400 text-green-400 mb-2">Beginner</Badge>
                    <div className="text-2xl font-bold text-white mb-1">$50-150</div>
                    <p className="text-sm text-gray-300">5-10 wins/month</p>
                  </div>
                  <div className="text-center p-4 bg-matrix-dark/30 rounded-lg">
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400 mb-2">Intermediate</Badge>
                    <div className="text-2xl font-bold text-white mb-1">$200-500</div>
                    <p className="text-sm text-gray-300">15-25 wins/month</p>
                  </div>
                  <div className="text-center p-4 bg-matrix-dark/30 rounded-lg">
                    <Badge variant="outline" className="border-red-400 text-red-400 mb-2">Elite</Badge>
                    <div className="text-2xl font-bold text-white mb-1">$1000+</div>
                    <p className="text-sm text-gray-300">30+ wins/month + streaming</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="bg-matrix-gray/30" />

      {/* Tokenomics */}
      <section id="tokenomics" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-neon-green mb-8">Platform Tokenomics</h2>
          
          <div className="grid gap-8">
            {/* Token Overview */}
            <Card className="bg-matrix-dark/50 border-matrix-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Coins className="w-6 h-6" />
                  Token Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">Token Utility</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                        Self-betting in Rivalizer matches
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Staking for training commitments
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        Payment for penalty fines
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        Trading on DEX exchanges
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">Token Supply</h3>
                    <div className="bg-matrix-gray/20 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-neon-green mb-1">10,000,000</div>
                      <p className="text-sm text-gray-300">Fixed total supply (no inflation)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Token Distribution */}
            <Card className="bg-matrix-dark/50 border-matrix-gray/30">
              <CardHeader>
                <CardTitle className="text-cyan-400">Token Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Player Rewards Pool", percentage: "50%", amount: "5,000,000", color: "bg-neon-green" },
                    { label: "Platform Treasury", percentage: "20%", amount: "2,000,000", color: "bg-cyan-400" },
                    { label: "Team & Foundation", percentage: "15%", amount: "1,500,000", color: "bg-purple-400" },
                    { label: "Ecosystem Growth", percentage: "10%", amount: "1,000,000", color: "bg-yellow-400" },
                    { label: "DEX Liquidity", percentage: "5%", amount: "500,000", color: "bg-blue-400" }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-matrix-gray/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 ${item.color} rounded`}></div>
                        <span className="text-white font-medium">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{item.percentage}</div>
                        <div className="text-gray-400 text-sm">{item.amount} tokens</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Economics Model */}
            <Card className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border-green-400/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <BarChart3 className="w-6 h-6" />
                  Sustainable Economics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">Revenue Sources</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Subscription fees ($19.63-$29.63/month)</li>
                      <li>• Match platform fees (5% of wagered amounts)</li>
                      <li>• Penalty fines for misconduct</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">Token Sinks</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Platform fees (burned or treasury)</li>
                      <li>• Penalty payments</li>
                      <li>• Training stake slashing</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-matrix-dark/30 rounded-lg">
                  <p className="text-sm text-green-400">
                    <strong>Sustainability Promise:</strong> 10% of all platform revenue is used to buy back tokens 
                    from the market, ensuring continuous value support and reward pool funding.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="bg-matrix-gray/30" />

      {/* Platform Rules */}
      <section id="rules" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-neon-green mb-8">Platform Rules & Guidelines</h2>
          
          <div className="grid gap-8">
            {/* Fair Play Rules */}
            <Card className="bg-matrix-dark/50 border-matrix-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Shield className="w-6 h-6" />
                  Fair Play & Conduct
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">Match Integrity</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" />
                        Only self-betting allowed - you can only bet on yourself to win
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" />
                        Match results are automatically verified through game APIs
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" />
                        Collusion or match-fixing results in permanent ban
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-3">AI Coach Usage</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        Upload only genuine match data and screenshots
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        No spam or irrelevant content in AI interactions
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        Respect daily usage limits based on your plan
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Penalty System */}
            <Card className="bg-matrix-dark/50 border-matrix-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Zap className="w-6 h-6" />
                  Penalty System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                    <h3 className="font-semibold text-yellow-400 mb-2">Yellow Card - Warning</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-300 mb-2">Offenses:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Spamming AI chat</li>
                          <li>• Uploading irrelevant images</li>
                          <li>• Mild toxic behavior</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 mb-2">Penalty:</p>
                        <ul className="text-yellow-400 space-y-1">
                          <li>• 50 token fine</li>
                          <li>• 24-hour match ban</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-400/10 border border-red-400/30 rounded-lg">
                    <h3 className="font-semibold text-red-400 mb-2">Red Card - Serious Violation</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-300 mb-2">Offenses:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Hate speech or harassment</li>
                          <li>• Attempting to exploit the system</li>
                          <li>• Repeated yellow card offenses</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 mb-2">Penalty:</p>
                        <ul className="text-red-400 space-y-1">
                          <li>• 200 token fine</li>
                          <li>• 7-day match ban</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documentation;
