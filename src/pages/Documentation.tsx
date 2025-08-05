
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
  Star,
  MessageCircle,
  Bot,
  Flame,
  ChevronRight,
  Lock,
  CheckCircle
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
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { title: "Platform Overview", id: "overview" },
                  { title: "AI Agents", id: "agents" },
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
                  Futmatrix revolutionizes competitive gaming by combining AI-powered coaching 
                  with skill-matched wagered matches for EAFC25 players. We've created the first 
                  ecosystem where your gaming skills directly translate to financial rewards through 
                  fair competition and intelligent training.
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
                  Transform your EAFC25 passion into a profitable venture. Our platform offers 
                  personalized AI coaching, competitive wagered matches, token rewards, and 
                  a sustainable economy where skill determines success.
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

      {/* AI Agents Interaction */}
      <section id="agents" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-neon-green mb-8">AI Agent Interactions</h2>
          
          <div className="grid gap-8">
            {/* Coach Agent */}
            <Card className="bg-gradient-to-r from-teal-950/20 to-teal-900/10 border-teal-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-teal-400 text-2xl">
                  <div className="p-2 bg-teal-600/20 rounded-full">
                    <Brain className="w-6 h-6" />
                  </div>
                  AI Coach Agent
                </CardTitle>
                <CardDescription className="text-teal-300">
                  Your personal EAFC25 performance analyst and skill development mentor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-teal-400" />
                        How to Interact
                      </h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                          Access through the AI Coach section in your dashboard
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                          Upload match screenshots or clips for detailed analysis
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                          Chat in natural language about tactics and strategies
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                          Review personalized training plans and weekly goals
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Bot className="w-4 h-4 text-teal-400" />
                        What the Coach Provides
                      </h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                          Match-by-match performance breakdowns
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                          Weakness identification and improvement strategies
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                          Custom training drills based on your playstyle
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                          Tactical advice for specific opponent types
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-teal-950/30 border border-teal-700/30 rounded-lg">
                    <h4 className="font-semibold text-teal-300 mb-2">💡 Pro Tip: Maximizing Coach Interactions</h4>
                    <p className="text-gray-300 text-sm">
                      Upload screenshots of critical moments (goals conceded, missed opportunities) after losses. 
                      The Coach rewards quality data submissions with tokens (10-30 per upload) while providing 
                      actionable feedback to improve your next performance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rivalizer Agent */}
            <Card className="bg-gradient-to-r from-red-950/20 to-red-900/10 border-red-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-400 text-2xl">
                  <div className="p-2 bg-red-600/20 rounded-full">
                    <Flame className="w-6 h-6" />
                  </div>
                  Rivalizer Agent
                </CardTitle>
                <CardDescription className="text-red-300">
                  Your competitive matchmaking specialist and strategic warfare advisor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-red-400" />
                        How to Interact
                      </h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
                          Challenge through the AI Rivalizer section
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
                          Ask for opponent analysis and scouting reports
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
                          Request match scheduling and optimal timing strategies
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
                          Voice commands for real-time tactical adjustments
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Bot className="w-4 h-4 text-red-400" />
                        What the Rivalizer Provides
                      </h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
                          Skill-matched opponent recommendations
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
                          Pre-match psychological profiles and weaknesses
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
                          Strategic betting advice and risk assessment
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
                          Post-match rivalry analysis and grudge tracking
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-950/30 border border-red-700/30 rounded-lg">
                    <h4 className="font-semibold text-red-300 mb-2">⚡ Pro Tip: Leveraging Rivalizer Intelligence</h4>
                    <p className="text-gray-300 text-sm">
                      The Rivalizer tracks opponent patterns, optimal betting amounts, and win probabilities. 
                      Ask specific questions like "Find me a player I can beat with 80% confidence" or 
                      "What's the best stake amount for my current skill level?"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Communication Tips */}
            <Card className="bg-matrix-dark/50 border-matrix-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Star className="w-5 h-5" />
                  Effective Agent Communication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-matrix-gray/20 rounded-lg">
                    <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">Be Specific</h4>
                    <p className="text-sm text-gray-300">
                      Use clear, detailed questions. Instead of "Help me," ask "Analyze my defending in the last match"
                    </p>
                  </div>
                  <div className="text-center p-4 bg-matrix-gray/20 rounded-lg">
                    <Brain className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">Provide Context</h4>
                    <p className="text-sm text-gray-300">
                      Share your current goals, preferred playstyle, and recent performance for personalized advice
                    </p>
                  </div>
                  <div className="text-center p-4 bg-matrix-gray/20 rounded-lg">
                    <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">Follow Through</h4>
                    <p className="text-sm text-gray-300">
                      Complete training recommendations and upload proof to earn bonus tokens and improve results
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                        Collusion or match-fixing results in permanent ban and token forfeiture
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" />
                        All matches must be played to completion - disconnections are tracked
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
                        Respect daily usage limits based on your subscription plan
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        Maintain respectful communication in all agent interactions
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-3">Account Security</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <Lock className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                        One account per person - multiple accounts will be banned
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                        Keep your wallet credentials secure and never share them
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                        Report any suspicious activity or unauthorized access immediately
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
                          <li>• Spamming AI chat with irrelevant messages</li>
                          <li>• Uploading non-game related images</li>
                          <li>• Mild toxic behavior or inappropriate language</li>
                          <li>• Excessive complaints or unsportsmanlike conduct</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 mb-2">Penalty:</p>
                        <ul className="text-yellow-400 space-y-1">
                          <li>• 50 token fine (must be paid to resume play)</li>
                          <li>• 24-hour ban from all matches</li>
                          <li>• Warning recorded on account</li>
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
                          <li>• Hate speech, harassment, or discrimination</li>
                          <li>• Attempting to exploit or hack the system</li>
                          <li>• Repeated yellow card offenses</li>
                          <li>• Sharing inappropriate content with AI agents</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 mb-2">Penalty:</p>
                        <ul className="text-red-400 space-y-1">
                          <li>• 200 token fine (non-refundable)</li>
                          <li>• 7-day ban from matches and AI access</li>
                          <li>• Potential permanent suspension for repeat offenses</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-matrix-gray/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Important Notes:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Fines must be paid before resuming platform access</li>
                      <li>• No refunds on subscription fees during ban periods</li>
                      <li>• Appeal process available through customer support</li>
                      <li>• All penalty tokens are burned (removed from circulation)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 border-blue-400/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Users className="w-6 h-6" />
                  Community Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Expected Behavior</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>✅ Respectful communication with all users</li>
                      <li>✅ Good sportsmanship in wins and losses</li>
                      <li>✅ Constructive feedback and helpful advice</li>
                      <li>✅ Honest gameplay and fair competition</li>
                      <li>✅ Reporting bugs and issues responsibly</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Prohibited Behavior</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>❌ Harassment, bullying, or toxic behavior</li>
                      <li>❌ Cheating, exploiting, or match manipulation</li>
                      <li>❌ Sharing personal information of other users</li>
                      <li>❌ Promoting external gambling or betting sites</li>
                      <li>❌ Creating multiple accounts to circumvent rules</li>
                    </ul>
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
