
import { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, 
  TableRow, TableCaption 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDown, ArrowUp, Filter } from 'lucide-react';

type MatchHistoryTableProps = {
  timeFilter: string;
};

type SortField = 'date' | 'opponent' | 'result' | 'goals';
type SortDirection = 'asc' | 'desc';

// Mock match history data
const mockMatchData = [
  {
    id: '1',
    date: '2025-05-22',
    opponent: 'Manchester United',
    result: 'Win',
    goals: 3,
    conceded: 1,
    possession: 62,
    shots: 13,
    passAccuracy: 86
  },
  {
    id: '2',
    date: '2025-05-15',
    opponent: 'Liverpool',
    result: 'Loss',
    goals: 1,
    conceded: 3,
    possession: 48,
    shots: 9,
    passAccuracy: 82
  },
  {
    id: '3',
    date: '2025-05-08',
    opponent: 'Arsenal',
    result: 'Win',
    goals: 2,
    conceded: 0,
    possession: 58,
    shots: 11,
    passAccuracy: 84
  },
  {
    id: '4',
    date: '2025-05-01',
    opponent: 'Chelsea',
    result: 'Draw',
    goals: 2,
    conceded: 2,
    possession: 50,
    shots: 10,
    passAccuracy: 80
  },
  {
    id: '5',
    date: '2025-04-24',
    opponent: 'Tottenham',
    result: 'Win',
    goals: 3,
    conceded: 2,
    possession: 55,
    shots: 14,
    passAccuracy: 79
  }
];

const MatchHistoryTable = ({ timeFilter }: MatchHistoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // In a real app, would fetch matches based on timeFilter
  const matches = mockMatchData;
  
  // Filter matches based on search term
  const filteredMatches = matches.filter((match) => 
    match.opponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.result.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort matches based on sort field and direction
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    
    if (sortField === 'goals') {
      return sortDirection === 'asc' ? a.goals - b.goals : b.goals - a.goals;
    }
    
    // For string fields like opponent and result
    const aValue = a[sortField].toLowerCase();
    const bValue = b[sortField].toLowerCase();
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle sort direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for new sort field
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search matches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-matrix-darker border-matrix-gray/30 focus-visible:ring-neon-green/30"
          />
        </div>
      </div>
      
      <div className="rounded-md border border-matrix-gray/30 overflow-hidden">
        <Table>
          <TableCaption className="mt-4 text-gray-400">
            Showing {sortedMatches.length} of {matches.length} matches
          </TableCaption>
          <TableHeader className="bg-matrix-darker">
            <TableRow className="hover:bg-transparent">
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Date
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('opponent')}
              >
                <div className="flex items-center">
                  Opponent
                  {sortField === 'opponent' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('result')}
              >
                <div className="flex items-center">
                  Result
                  {sortField === 'result' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer text-right"
                onClick={() => handleSort('goals')}
              >
                <div className="flex items-center justify-end">
                  Score
                  {sortField === 'goals' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right">Key Stats</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMatches.length > 0 ? (
              sortedMatches.map((match) => (
                <TableRow key={match.id} className="border-matrix-gray/20 hover:bg-matrix-gray/10">
                  <TableCell className="font-medium">{formatDate(match.date)}</TableCell>
                  <TableCell>{match.opponent}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      match.result === 'Win' ? 'bg-green-600/20 text-green-400' :
                      match.result === 'Draw' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {match.result}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{match.goals} - {match.conceded}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col space-y-1 text-xs">
                      <div>Possession: {match.possession}%</div>
                      <div>Shots: {match.shots}</div>
                      <div>Pass Accuracy: {match.passAccuracy}%</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-neon-green/30 text-neon-green hover:bg-neon-green/10"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                  No matches found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MatchHistoryTable;
