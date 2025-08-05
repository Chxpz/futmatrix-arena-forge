import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus, Trophy, Medal, Award, Flame, Swords } from 'lucide-react';

// Mock data for Week on-Fire rankings
const weekOnFireData = [
  { 
    position: 1, 
    player: "Alex Johnson", 
    avatar: "", 
    nickname: "AJ23", 
    points: 145, 
    goalsDiff: 12,
    form: "WWW" 
  },
  { 
    position: 2, 
    player: "Maria Rodriguez", 
    avatar: "", 
    nickname: "MR10",  
    points: 132, 
    goalsDiff: 10,
    form: "WWD" 
  },
  { 
    position: 3, 
    player: "James Smith", 
    avatar: "", 
    nickname: "JS7", 
    points: 127, 
    goalsDiff: 8,
    form: "WDW" 
  },
  // More players...
  { 
    position: 4, 
    player: "Sarah Wilson", 
    avatar: "", 
    nickname: "SW19", 
    points: 123, 
    goalsDiff: 7,
    form: "WWL" 
  },
  { 
    position: 5, 
    player: "Daniel Brown", 
    avatar: "", 
    nickname: "DB11", 
    points: 119, 
    goalsDiff: 6,
    form: "DWW" 
  },
  { 
    position: 6, 
    player: "Emma Davis", 
    avatar: "", 
    nickname: "ED21", 
    points: 115, 
    goalsDiff: 5,
    form: "WDL" 
  },
  { 
    position: 7, 
    player: "Michael Johnson", 
    avatar: "", 
    nickname: "MJ9", 
    points: 110, 
    goalsDiff: 4,
    form: "DDW" 
  },
  { 
    position: 8, 
    player: "Olivia Martinez", 
    avatar: "", 
    nickname: "OM17", 
    points: 105, 
    goalsDiff: 3,
    form: "WLW" 
  },
  { 
    position: 9, 
    player: "David Wilson", 
    avatar: "", 
    nickname: "DW14", 
    points: 98, 
    goalsDiff: 1,
    form: "DWD" 
  },
  { 
    position: 10, 
    player: "Sophia Lee", 
    avatar: "", 
    nickname: "SL30", 
    points: 95, 
    goalsDiff: 0,
    form: "LWW" 
  },
  { 
    position: 11, 
    player: "Ryan Clark", 
    avatar: "", 
    nickname: "RC8", 
    points: 92, 
    goalsDiff: -1,
    form: "WLL" 
  },
  { 
    position: 12, 
    player: "Isabella White", 
    avatar: "", 
    nickname: "IW22", 
    points: 88, 
    goalsDiff: -2,
    form: "DLL" 
  },
  { 
    position: 13, 
    player: "Ethan Moore", 
    avatar: "", 
    nickname: "EM6", 
    points: 85, 
    goalsDiff: -3,
    form: "LDL" 
  },
  { 
    position: 14, 
    player: "Ava Thompson", 
    avatar: "", 
    nickname: "AT15", 
    points: 80, 
    goalsDiff: -5,
    form: "LLL" 
  },
  { 
    position: 15, 
    player: "Noah Garcia", 
    avatar: "", 
    nickname: "NG3", 
    points: 75, 
    goalsDiff: -8,
    form: "LLL" 
  }
];

// Mock data for Rivalizer Arena
const rivalizerArenaData = [
  { 
    position: 1, 
    player: "Alex Johnson", 
    avatar: "", 
    nickname: "AJ23", 
    played: 15, 
    won: 12, 
    drawn: 2, 
    lost: 1, 
    points: 38 
  },
  { 
    position: 2, 
    player: "Maria Rodriguez", 
    avatar: "", 
    nickname: "MR10", 
    played: 15, 
    won: 11, 
    drawn: 2, 
    lost: 2, 
    points: 35 
  },
  { 
    position: 3, 
    player: "James Smith", 
    avatar: "", 
    nickname: "JS7", 
    played: 15, 
    won: 10, 
    drawn: 3, 
    lost: 2, 
    points: 33 
  },
  // More players...
  { 
    position: 4, 
    player: "Sarah Wilson", 
    avatar: "", 
    nickname: "SW19", 
    played: 15, 
    won: 9, 
    drawn: 3, 
    lost: 3, 
    points: 30 
  },
  { 
    position: 5, 
    player: "Daniel Brown", 
    avatar: "", 
    nickname: "DB11", 
    played: 15, 
    won: 9, 
    drawn: 2, 
    lost: 4, 
    points: 29 
  },
  { 
    position: 6, 
    player: "Emma Davis", 
    avatar: "", 
    nickname: "ED21", 
    played: 15, 
    won: 8, 
    drawn: 4, 
    lost: 3, 
    points: 28 
  },
  { 
    position: 7, 
    player: "Michael Johnson", 
    avatar: "", 
    nickname: "MJ9", 
    played: 15, 
    won: 8, 
    drawn: 3, 
    lost: 4, 
    points: 27 
  },
  { 
    position: 8, 
    player: "Olivia Martinez", 
    avatar: "", 
    nickname: "OM17", 
    played: 15, 
    won: 8, 
    drawn: 1, 
    lost: 6, 
    points: 25 
  },
  { 
    position: 9, 
    player: "David Wilson", 
    avatar: "", 
    nickname: "DW14", 
    played: 15, 
    won: 7, 
    drawn: 3, 
    lost: 5, 
    points: 24 
  },
  { 
    position: 10, 
    player: "Sophia Lee", 
    avatar: "", 
    nickname: "SL30", 
    played: 15, 
    won: 7, 
    drawn: 2, 
    lost: 6, 
    points: 23 
  },
  { 
    position: 11, 
    player: "Ryan Clark", 
    avatar: "", 
    nickname: "RC8", 
    played: 15, 
    won: 6, 
    drawn: 4, 
    lost: 5, 
    points: 22 
  },
  { 
    position: 12, 
    player: "Isabella White", 
    avatar: "", 
    nickname: "IW22", 
    played: 15, 
    won: 5, 
    drawn: 6, 
    lost: 4, 
    points: 21 
  },
  { 
    position: 13, 
    player: "Ethan Moore", 
    avatar: "", 
    nickname: "EM6", 
    played: 15, 
    won: 5, 
    drawn: 3, 
    lost: 7, 
    points: 18 
  },
  { 
    position: 14, 
    player: "Ava Thompson", 
    avatar: "", 
    nickname: "AT15", 
    played: 15, 
    won: 4, 
    drawn: 3, 
    lost: 8, 
    points: 15 
  },
  { 
    position: 15, 
    player: "Noah Garcia", 
    avatar: "", 
    nickname: "NG3", 
    played: 15, 
    won: 3, 
    drawn: 4, 
    lost: 8, 
    points: 13 
  },
  { 
    position: 16, 
    player: "Mia Moore", 
    avatar: "", 
    nickname: "MM5", 
    played: 15, 
    won: 3, 
    drawn: 3, 
    lost: 9, 
    points: 12 
  },
  { 
    position: 17, 
    player: "Liam Taylor", 
    avatar: "", 
    nickname: "LT11", 
    played: 15, 
    won: 2, 
    drawn: 5, 
    lost: 8, 
    points: 11 
  },
  { 
    position: 18, 
    player: "Charlotte Evans", 
    avatar: "", 
    nickname: "CE20", 
    played: 15, 
    won: 2, 
    drawn: 4, 
    lost: 9, 
    points: 10 
  },
  { 
    position: 19, 
    player: "William Harris", 
    avatar: "", 
    nickname: "WH7", 
    played: 15, 
    won: 2, 
    drawn: 3, 
    lost: 10, 
    points: 9 
  },
  { 
    position: 20, 
    player: "Amelia King", 
    avatar: "", 
    nickname: "AK16", 
    played: 15, 
    won: 1, 
    drawn: 3, 
    lost: 11, 
    points: 6 
  }
];

// Form indicator component
const FormIndicator = ({ result }: { result: string }) => {
  switch(result) {
    case 'W':
      return <span className="inline-block w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">W</span>;
    case 'D':
      return <span className="inline-block w-5 h-5 rounded-full bg-yellow-500 text-white text-xs font-bold flex items-center justify-center">D</span>;
    case 'L':
      return <span className="inline-block w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">L</span>;
    default:
      return null;
  }
};

// Position change indicator
const PositionIndicator = ({ change }: { change: 'up' | 'down' | 'same' }) => {
  if (change === 'up') {
    return <ArrowUp className="h-4 w-4 text-green-500" />;
  } else if (change === 'down') {
    return <ArrowDown className="h-4 w-4 text-red-500" />;
  } else {
    return <Minus className="h-4 w-4 text-gray-400" />;
  }
};

const Rankings = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab') || 'week-on-fire';

  const renderWeekOnFireTable = () => (
    <Card className="bg-matrix-dark border-matrix-gray/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-neon-yellow" />
          Week on-Fire Rankings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Players with the best performance this week</TableCaption>
              <TableHeader className="bg-matrix-darker">
                <TableRow>
                  <TableHead className="w-12">Pos</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-center">Form</TableHead>
                  <TableHead className="text-right">Goals +/-</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weekOnFireData.map((player, index) => (
                  <TableRow key={index} className={index < 3 ? "bg-matrix-gray/10" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {index === 0 && <Trophy className="h-4 w-4 text-yellow-500 mr-1" />}
                        {index === 1 && <Medal className="h-4 w-4 text-gray-400 mr-1" />}
                        {index === 2 && <Award className="h-4 w-4 text-amber-700 mr-1" />}
                        {player.position}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={player.avatar} alt={player.player} />
                          <AvatarFallback className="bg-neon-green/20 text-neon-green text-xs">
                            {player.nickname.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{player.player}</div>
                          <div className="text-xs text-gray-400">{player.nickname}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-1 justify-center">
                        {player.form.split('').map((result, idx) => (
                          <FormIndicator key={idx} result={result} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className={`text-right ${player.goalsDiff > 0 ? 'text-green-500' : player.goalsDiff < 0 ? 'text-red-500' : ''}`}>
                      {player.goalsDiff > 0 ? `+${player.goalsDiff}` : player.goalsDiff}
                    </TableCell>
                    <TableCell className="text-right font-bold">{player.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderRivalizerArenaTable = () => (
    <Card className="bg-matrix-dark border-matrix-gray/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Swords className="h-5 w-5 text-neon-blue" />
          Rivalizer Arena Standings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Season standings in the Rivalizer Arena</TableCaption>
              <TableHeader className="bg-matrix-darker">
                <TableRow>
                  <TableHead className="w-12">Pos</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-center">MP</TableHead>
                  <TableHead className="text-center">W</TableHead>
                  <TableHead className="text-center">D</TableHead>
                  <TableHead className="text-center">L</TableHead>
                  <TableHead className="text-right">Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rivalizerArenaData.map((player, index) => {
                  let rowClass = "";
                  // Styling based on position (similar to football league tables)
                  if (index < 4) rowClass = "border-l-4 border-neon-blue bg-matrix-gray/10"; // Champions League spots
                  if (index >= 4 && index < 6) rowClass = "border-l-4 border-neon-green/70 bg-matrix-gray/5"; // Europa League spots
                  if (index >= rivalizerArenaData.length - 3) rowClass = "border-l-4 border-red-500/70 bg-matrix-gray/5"; // Relegation zone
                  
                  return (
                    <TableRow key={index} className={rowClass}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {index === 0 && <Trophy className="h-4 w-4 text-yellow-500 mr-1" />}
                          {player.position}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={player.avatar} alt={player.player} />
                            <AvatarFallback className="bg-neon-green/20 text-neon-green text-xs">
                              {player.nickname.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{player.player}</div>
                            <div className="text-xs text-gray-400">{player.nickname}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{player.played}</TableCell>
                      <TableCell className="text-center text-green-500">{player.won}</TableCell>
                      <TableCell className="text-center text-yellow-500">{player.drawn}</TableCell>
                      <TableCell className="text-center text-red-500">{player.lost}</TableCell>
                      <TableCell className="text-right font-bold">{player.points}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
              <span className="text-gray-300">Futmatrix Champions positions</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-neon-green"></div>
              <span className="text-gray-300">Qualification positions</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-300">Relegation zone</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {currentTab === 'week-on-fire' ? 'Week on-Fire Rankings' : 'Rivalizer Arena Standings'}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {currentTab === 'week-on-fire' 
            ? 'Players with the best performance this week' 
            : 'Season standings in the Rivalizer Arena'
          }
        </p>
      </div>

      {currentTab === 'week-on-fire' ? renderWeekOnFireTable() : renderRivalizerArenaTable()}
    </div>
  );
};

export default Rankings;
