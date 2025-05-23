
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  TrendingUp, TrendingDown, Trophy, AlertTriangle, Target, ChevronRight 
} from 'lucide-react';

type InsightsPanelProps = {
  timeFilter: string;
};

const InsightsPanel = ({ timeFilter }: InsightsPanelProps) => {
  // Mock data - in a real app, this would be calculated based on match stats
  const strengths = [
    { id: 1, text: 'Consistent passing accuracy across matches', trend: 'up' },
    { id: 2, text: 'Effective in defensive duels - winning 67% of tackles', trend: 'up' },
    { id: 3, text: 'Great positioning in offensive third', trend: 'stable' },
  ];
  
  const improvements = [
    { id: 1, text: 'Shot conversion rate below average (18%)', trend: 'down' },
    { id: 2, text: 'Vulnerable to counter-attacks on right flank', trend: 'down' },
    { id: 3, text: 'Late-game stamina affecting performance', trend: 'stable' },
  ];
  
  const recommendations = [
    { 
      id: 1, 
      title: 'Finishing Drills',
      description: 'Focus on shot placement under pressure',
      progress: 35,
      date: '3 days ago'
    },
    { 
      id: 2, 
      title: 'Defensive Positioning',
      description: 'Work on tracking back during counter-attacks',
      progress: 65,
      date: '1 week ago'
    },
    { 
      id: 3, 
      title: 'Stamina Training',
      description: 'High-intensity interval training to improve late-game performance',
      progress: 20,
      date: '2 days ago'
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-matrix-dark border-matrix-gray/30">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Analysis of your recent matches</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Strengths */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 flex items-center mb-3">
              <Trophy className="mr-2 h-4 w-4 text-neon-green" />
              Strengths
            </h3>
            <ul className="space-y-3">
              {strengths.map(strength => (
                <li key={strength.id} className="flex items-start bg-matrix-darker p-3 rounded-md border border-matrix-gray/20">
                  {strength.trend === 'up' && <TrendingUp className="h-4 w-4 text-neon-green mt-0.5 mr-2 flex-shrink-0" />}
                  {strength.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-400 mt-0.5 mr-2 flex-shrink-0" />}
                  {strength.trend === 'stable' && <Target className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />}
                  <span className="text-sm">{strength.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Areas to improve */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 flex items-center mb-3">
              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
              Areas to Improve
            </h3>
            <ul className="space-y-3">
              {improvements.map(improvement => (
                <li key={improvement.id} className="flex items-start bg-matrix-darker p-3 rounded-md border border-matrix-gray/20">
                  {improvement.trend === 'up' && <TrendingUp className="h-4 w-4 text-neon-green mt-0.5 mr-2 flex-shrink-0" />}
                  {improvement.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-400 mt-0.5 mr-2 flex-shrink-0" />}
                  {improvement.trend === 'stable' && <Target className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />}
                  <span className="text-sm">{improvement.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-matrix-dark border-matrix-gray/30">
        <CardHeader>
          <CardTitle>Coach Recommendations</CardTitle>
          <CardDescription>Based on your recent performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map(rec => (
            <div 
              key={rec.id} 
              className="bg-matrix-darker p-4 rounded-md border border-matrix-gray/20 hover:border-neon-green/30 transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium group-hover:text-neon-green transition-colors">
                  {rec.title}
                </h4>
                <span className="text-xs text-gray-400">{rec.date}</span>
              </div>
              
              <p className="text-sm text-gray-300 mb-3">{rec.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="w-full bg-matrix-gray/30 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-neon-green h-full rounded-full"
                    style={{ width: `${rec.progress}%` }}
                  ></div>
                </div>
                <ChevronRight className="h-4 w-4 text-neon-green ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
          
          <div className="flex justify-center mt-4">
            <button className="text-neon-green text-sm font-medium hover:text-neon-green/80 flex items-center">
              Visit AI Coach for more recommendations
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;
