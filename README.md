
# Futmatrix - Football Analytics Dashboard

## Project Overview

**URL**: https://lovable.dev/projects/d1b94ff4-fb4b-4b38-b956-dd2000b91102

Futmatrix is a comprehensive football analytics platform that processes match images using AI to extract performance metrics and provides detailed visualizations for player analysis. The frontend is built with React, TypeScript, and modern data visualization libraries.

## Frontend Architecture

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts library for data visualizations
- **State Management**: @tanstack/react-query for server state
- **Routing**: React Router DOM

### Key Components Structure

```
src/
├── components/
│   ├── dashboard/          # Analytics dashboard components
│   │   ├── TrendLineChart.tsx        # Line charts with moving averages
│   │   ├── RadarComparisonChart.tsx  # Performance comparison charts
│   │   ├── TrendChart.tsx           # Main trend analysis component
│   │   ├── ChartMetricSelector.tsx   # Metric selection controls
│   │   ├── PerformanceMetrics.tsx    # KPI cards display
│   │   ├── MatchHistoryTable.tsx     # Match history with filtering
│   │   ├── StatsSummary.tsx          # Overview statistics
│   │   └── InsightsPanel.tsx         # AI insights and recommendations
│   ├── upload/             # Image upload functionality
│   │   ├── UploadCard.tsx           # Main upload interface
│   │   ├── UploadArea.tsx           # Drag & drop area
│   │   ├── PreviewArea.tsx          # Image preview with progress
│   │   ├── ImagePreview.tsx         # Individual image preview
│   │   ├── UploadProgress.tsx       # Upload progress indicator
│   │   └── InstructionsCard.tsx     # Upload instructions
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── hooks/
│   ├── use-trend-chart-data.ts      # Chart data management
│   ├── use-radar-comparison-data.ts # Radar chart data
│   └── use-upload-images.ts         # Image upload logic
├── pages/
│   ├── Dashboard.tsx       # Main analytics dashboard
│   ├── Charts.tsx         # Detailed charts view
│   ├── Upload.tsx         # Match image upload
│   ├── Profile.tsx        # User profile management
│   ├── Rivalizer.tsx      # Player matchmaking system
│   └── [other pages]
└── layouts/
    └── DashboardLayout.tsx # Common dashboard layout
```

## Data Structures & API Integration

### Core Data Models

#### Match Data Structure
```typescript
interface MatchData {
  matchId: string | number;
  date: string;              // Format: "MMM D" (e.g., "Apr 1")
  opponent?: string;         // Optional opponent name
  result?: string;           // Optional match result
  
  // Efficiency Metrics (0-100 scale)
  possessionEfficiency: number;
  shotEfficiency: number;
  passEfficiency: number;
  defensiveEfficiency: number;
  overallPerformance: number;
  
  // Match Statistics
  goalsScored: number;
  possession: number;        // Possession percentage (0-100)
  shots: number;
  passesAttempted: number;
  passAccuracy: number;      // Pass accuracy percentage (0-100)
  tackles: number;
  
  // Optional metadata
  imageUrl?: string;         // URL to match image
}
```

#### User Profile Structure
```typescript
interface UserProfile {
  id: string;
  email: string;
  planType: 'free' | 'basic' | 'premium';
  maxUploads: number;        // Based on plan: free=1, basic=3, premium=5
}
```

#### Rivalizer Data Structures

##### Match Proposal
```typescript
interface MatchProposal {
  id: string;
  opponent: {
    name: string;
    avatar: string;          // URL to avatar image or empty string
    rank: string;            // Format: "#123"
    winRate: number;         // Percentage (0-100)
  };
  proposedTime: string;      // Format: "Today, 8:30 PM" or "Tomorrow, 7:00 PM"
  expiresIn: string;         // Format: "3 hours", "12 hours"
  status?: 'pending' | 'accepted' | 'declined' | 'expired';
}
```

##### Scheduled Match
```typescript
interface ScheduledMatch {
  id: string;
  opponent: {
    name: string;
    avatar: string;          // URL to avatar image or empty string
    rank: string;            // Format: "#123"
  };
  date: Date;                // Match date
  time: string;              // Format: "8:30 PM"
  status: 'upcoming' | 'completed';
  result?: {                 // Only present if status is 'completed'
    playerScore: number;
    opponentScore: number;
  };
}
```

### Required API Endpoints

#### 1. Match Image Upload & Processing
**Endpoint**: `POST /api/matches/upload`

**Request Format**:
- Content-Type: `multipart/form-data`
- Authentication: Bearer token in Authorization header
- Body: Image files with field names `match_image_0`, `match_image_1`, etc.

**Expected Response**:
```json
{
  "success": true,
  "message": "Match images processed successfully",
  "data": {
    "matchId": "uuid-string",
    "metrics": {
      "possessionEfficiency": 74,
      "shotEfficiency": 63,
      "passEfficiency": 82,
      "defensiveEfficiency": 71,
      "overallPerformance": 72,
      "goalsScored": 2,
      "possession": 62,
      "shots": 13,
      "passesAttempted": 502,
      "passAccuracy": 86,
      "tackles": 16
    },
    "date": "2024-05-23",
    "imageUrl": "https://storage.url/match-image.jpg"
  }
}
```

#### 2. Match History Retrieval
**Endpoint**: `GET /api/matches`

**Query Parameters**:
- `timeFilter`: "last5" | "lastMonth" | "last3Months" | "allTime"
- `limit`: number (optional)
- `offset`: number (optional for pagination)

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "matches": [MatchData[]],
    "totalCount": number,
    "summary": {
      "totalMatches": number,
      "averageGoalsPerMatch": number,
      "averageOverallPerformance": number,
      "lastMatchDate": "2024-05-23"
    }
  }
}
```

#### 3. User Profile & Plan Information
**Endpoint**: `GET /api/user/profile`

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "planType": "premium",
    "maxUploads": 5,
    "matchesThisMonth": 12,
    "totalMatches": 45
  }
}
```

#### 4. Rivalizer - Match Proposals

##### Get Pending Match Proposals
**Endpoint**: `GET /api/rivalizer/proposals`

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "proposals": [MatchProposal[]],
    "totalCount": number
  }
}
```

##### Accept Match Proposal
**Endpoint**: `POST /api/rivalizer/proposals/{proposalId}/accept`

**Expected Response**:
```json
{
  "success": true,
  "message": "Match proposal accepted",
  "data": {
    "scheduledMatch": {
      "id": "match-uuid",
      "opponent": {
        "name": "Opponent Name",
        "avatar": "avatar-url",
        "rank": "#123"
      },
      "date": "2024-05-24",
      "time": "8:30 PM",
      "status": "upcoming"
    }
  }
}
```

##### Decline Match Proposal
**Endpoint**: `POST /api/rivalizer/proposals/{proposalId}/decline`

**Expected Response**:
```json
{
  "success": true,
  "message": "Match proposal declined"
}
```

#### 5. Rivalizer - Scheduled Matches

##### Get Scheduled Matches
**Endpoint**: `GET /api/rivalizer/matches`

**Query Parameters**:
- `status`: "upcoming" | "completed" | "all" (default: "all")
- `startDate`: ISO date string (optional)
- `endDate`: ISO date string (optional)

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "matches": [ScheduledMatch[]],
    "totalCount": number
  }
}
```

##### Update Match Results
**Endpoint**: `PUT /api/rivalizer/matches/{matchId}/results`

**Request Body**:
```json
{
  "playerScore": number,
  "opponentScore": number
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Match results updated",
  "data": {
    "updatedMatch": ScheduledMatch
  }
}
```

### Frontend Data Processing

#### Chart Data Transformations
The frontend expects data in specific formats for different chart types:

1. **Line Charts**: Array of MatchData objects sorted by date
2. **Radar Charts**: Comparison objects with `recent` vs `average` values
3. **Moving Averages**: Calculated client-side for last 3 matches

#### Time Filtering
The frontend implements client-side filtering but can also send filter parameters to the backend:
- `last5`: Last 5 matches
- `lastMonth`: Last 30 days
- `last3Months`: Last 90 days
- `allTime`: All historical data

## Authentication & Security

### Required Authentication Flow
1. Users authenticate via Supabase (Google OAuth recommended)
2. Frontend receives JWT token from Supabase
3. All API calls include `Authorization: Bearer <token>` header
4. Backend should verify JWT with Supabase public key

### File Upload Security
- Maximum file size: 10MB per image
- Allowed formats: PNG, JPG, JPEG
- Maximum files per upload based on user plan
- Virus scanning recommended on backend

## Environment Variables

### Frontend Environment Variables
```env
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key]
VITE_MATCH_UPLOAD_API_URL=https://api.futmatrix.com/api/matches/upload
```

### Expected Backend Configuration
The backend should be configurable via environment variables for:
- Database connection strings
- Supabase JWT verification
- File storage configuration (AWS S3, etc.)
- AI processing service URLs
- Rate limiting settings

## Error Handling

### Expected Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "User-friendly error message",
    "details": "Technical details for debugging"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Invalid request data
- `UNAUTHORIZED`: Invalid or missing authentication
- `RATE_LIMITED`: User exceeded plan limits
- `PROCESSING_ERROR`: AI analysis failed
- `FILE_TOO_LARGE`: Upload exceeds size limits
- `MATCH_PROPOSAL_EXPIRED`: Attempt to accept an expired match proposal
- `MATCH_ALREADY_COMPLETED`: Attempt to update results of a completed match

## Performance Requirements

### Response Time Expectations
- Image upload acknowledgment: < 2 seconds
- Image processing completion: 3-5 seconds
- Match history retrieval: < 1 second
- Profile data: < 500ms
- Match proposals retrieval: < 500ms
- Match scheduling operations: < 1 second

### Rate Limiting
Implement rate limiting based on user plans:
- **Free**: 1 upload/day, 100 API calls/hour, max 3 pending match proposals
- **Basic**: 3 uploads/day, 500 API calls/hour, max 5 pending match proposals
- **Premium**: 5 uploads/day, 1000 API calls/hour, max 10 pending match proposals

## Database Schema Recommendations

### Core Tables Needed
1. **users**: User profiles and plan information
2. **matches**: Match data and metrics
3. **match_images**: Uploaded image metadata
4. **user_sessions**: Authentication sessions
5. **usage_tracking**: API usage for rate limiting
6. **match_proposals**: Rivalizer match proposals
7. **scheduled_matches**: Confirmed and scheduled matches
8. **player_stats**: Player performance statistics for matchmaking

### Key Relationships
- Users have many Matches
- Matches have many Match Images
- Users have Usage Tracking records
- Users can have many Match Proposals (both sent and received)
- Users can have many Scheduled Matches
- Users have one Player Stats record

## Rivalizer Feature

### Feature Overview
The Rivalizer system enables players to:
1. Receive match proposals from other players
2. Accept or decline match proposals
3. View a calendar of upcoming and past matches
4. Record match results
5. Track their performance against other players

### Match Proposal Workflow
1. Player receives match proposals in the Rivalizer dashboard
2. Each proposal shows opponent details, proposed time, and expiration
3. Player can accept or decline the proposal
4. On acceptance, a scheduled match is created in both players' calendars
5. On decline, the proposal is removed from the system

### Match Calendar Features
1. Visual calendar showing all scheduled matches
2. Date-based filtering of matches
3. Display of match details for selected dates
4. Differentiation between upcoming and completed matches
5. Display of match results for completed matches

### Matchmaking System (Future Feature)
1. Player ranking system based on match results
2. Skill-based matchmaking for fair competition
3. Geographic proximity considerations for in-person matches
4. Time zone matching for online matches
5. Automated match proposals based on player availability

## AI Processing Pipeline

### Image Analysis Requirements
The backend AI should extract these metrics from football match images:
1. **Possession data**: Ball control percentages
2. **Shot data**: Total shots, shots on target
3. **Pass data**: Attempted passes, successful passes
4. **Defensive data**: Tackles, interceptions
5. **Goal data**: Goals scored

### Processing Workflow
1. Receive uploaded images
2. Queue for AI processing
3. Extract raw statistics
4. Calculate efficiency percentages
5. Store results in database
6. Notify frontend of completion

## Testing & Development

### Mock Data
The frontend currently uses comprehensive mock data for development. Replace with real API calls by updating the hooks in `src/hooks/`.

### Development Setup
```bash
npm install
npm run dev
```

### Build & Deployment
```bash
npm run build
npm run preview
```

## Integration Checklist

For smooth backend integration, ensure:
- [ ] All API endpoints match expected request/response formats
- [ ] Authentication with Supabase JWT verification
- [ ] File upload handling with size/type validation
- [ ] Error responses follow the specified format
- [ ] Rate limiting implementation
- [ ] Database schema supports all required fields
- [ ] AI processing pipeline extracts all metrics
- [ ] CORS configuration for frontend domains
- [ ] SSL/HTTPS configuration
- [ ] Monitoring and logging setup
- [ ] Rivalizer match proposal system implementation
- [ ] Match calendar and scheduling system implementation

## Support & Documentation

### Frontend Contact Points
- Main dashboard: `/dashboard`
- Charts view: `/charts` 
- Upload interface: `/upload`
- User profile: `/profile`
- Rivalizer interface: `/rivalizer`

### Key Hook Functions
- `useTrendChartData()`: Manages chart data and filtering
- `useRadarComparisonData()`: Handles comparison analytics
- `useUploadImages()`: Manages file upload process

For questions about frontend integration, refer to the component documentation in the respective TypeScript files.

```

### Rivalizer Component Implementation

The Rivalizer page (`src/pages/Rivalizer.tsx`) is a comprehensive matchmaking system with the following key features:

1. **Match Proposals Section**:
   - Displays pending match proposals from other players
   - Shows opponent details (name, avatar, rank, win rate)
   - Shows proposed match time and expiration time
   - Provides accept/decline functionality

2. **Match Calendar Section**:
   - Visual calendar showing scheduled matches
   - Date selection to view matches on specific days
   - Displays upcoming and completed matches
   - Shows match results for completed matches

3. **Match Details Dialog**:
   - Detailed view of match proposals
   - Opponent information and statistics
   - Accept/decline buttons with confirmation

When integrating with the backend, the Rivalizer component expects the following data flows:

1. **Get Match Proposals**:
   - Fetch pending match proposals on page load
   - Update proposals in real-time when changes occur

2. **Accept/Decline Proposals**:
   - Send acceptance/rejection to the backend
   - Update the UI based on response
   - Display toast notifications for confirmation

3. **Calendar Integration**:
   - Fetch scheduled matches for calendar display
   - Support date-based filtering
   - Update match status and results

4. **Real-time Updates**:
   - Update proposals when they expire
   - Notify users of new match proposals
   - Update match results in real-time

The current implementation uses mock data and local state management, which should be replaced with API calls to the endpoints described in the API section.
