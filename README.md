
# Futmatrix - Football Analytics Dashboard

## Project Overview

**URL**: https://lovable.dev/projects/d1b94ff4-fb4b-4b38-b956-dd2000b91102

Futmatrix is a comprehensive football analytics platform that processes match images using AI to extract performance metrics and provides detailed visualizations for player analysis. The frontend is built with React, TypeScript, and modern data visualization libraries.

## Data Requirements & API Specifications

### Core Data Models

#### User Profile Structure
```typescript
interface UserProfile {
  id: string;
  email: string;
  nickname?: string;
  eaname?: string;
  bio?: string;
  avatar_url?: string;
  plan_type: 'basic' | 'advanced';
  
  // Performance metrics
  win_rate: number;           // Percentage (0-100)
  goals_per_match: number;    // Average goals per match
  pass_accuracy: number;      // Percentage (0-100)
  
  // Rankings
  global_rank?: number;       // Global ranking position
  
  // Timestamps
  created_at: string;
  updated_at: string;
  last_login?: string;
}
```

#### Match Data Structure
```typescript
interface MatchData {
  id: string;
  user_id: string;
  date: string;              // ISO date string
  opponent?: string;         // Optional opponent name
  result?: 'Win' | 'Loss' | 'Draw';
  
  // Core match statistics
  goals_scored: number;
  goals_conceded: number;
  possession: number;        // Percentage (0-100)
  shots: number;
  shots_on_target: number;
  passes_attempted: number;
  passes_completed: number;
  pass_accuracy: number;     // Percentage (0-100)
  tackles: number;
  tackles_won: number;
  
  // Efficiency metrics (calculated)
  possession_efficiency: number;    // 0-100
  shot_efficiency: number;         // 0-100
  pass_efficiency: number;         // 0-100
  defensive_efficiency: number;    // 0-100
  overall_performance: number;     // 0-100
  
  // Metadata
  image_urls?: string[];     // URLs to match images
  processed: boolean;        // Whether AI processing is complete
  created_at: string;
  updated_at: string;
}
```

#### Match Proposal Structure (AI Rivalizer)
```typescript
interface MatchProposal {
  id: string;
  challenger_id: string;     // User who sent the proposal
  opponent_id: string;       // User who received the proposal
  proposed_time: string;     // ISO datetime string
  expires_at: string;        // ISO datetime string
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  
  // Opponent details (populated from user profile)
  opponent: {
    name: string;            // nickname or eaname
    avatar: string;          // avatar_url or empty string
    rank: string;            // Format: "#123" from global_rank
    win_rate: number;        // Percentage (0-100)
  };
  
  created_at: string;
  updated_at: string;
}
```

#### Scheduled Match Structure (AI Rivalizer)
```typescript
interface ScheduledMatch {
  id: string;
  player_one_id: string;
  player_two_id: string;
  scheduled_time: string;    // ISO datetime string
  status: 'scheduled' | 'completed' | 'cancelled';
  
  // Match results (only if completed)
  player_one_score?: number;
  player_two_score?: number;
  
  // Opponent details for current user view
  opponent: {
    name: string;
    avatar: string;
    rank: string;
  };
  
  created_at: string;
  updated_at: string;
}
```

#### AI Coach Recommendation Structure
```typescript
interface CoachRecommendation {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: 'finishing' | 'defense' | 'passing' | 'fitness' | 'tactics';
  priority: 'low' | 'medium' | 'high';
  progress: number;          // Percentage (0-100)
  status: 'active' | 'completed' | 'paused';
  created_at: string;
  updated_at: string;
}
```

#### Rankings Data Structure
```typescript
interface RankingEntry {
  rank: number;
  user_id: string;
  name: string;              // nickname or eaname
  avatar_url?: string;
  overall_rating: number;    // 0-100
  matches_played: number;
  win_rate: number;          // Percentage (0-100)
  goals_per_match: number;
  recent_form: string;       // e.g., "WWLWD" (last 5 matches)
  trend: 'up' | 'down' | 'stable';
}
```

### Required API Endpoints

#### 1. Authentication & User Management
**Base URL**: `/api/auth` and `/api/users`

##### Get Current User Profile
```
GET /api/users/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": UserProfile
}
```

##### Update User Profile
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "nickname": string,
  "eaname": string,
  "bio": string,
  "avatar_url": string
}

Response:
{
  "success": true,
  "data": UserProfile
}
```

#### 2. Match Data Management
**Base URL**: `/api/matches`

##### Upload Match Images
```
POST /api/matches/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body: FormData with image files

Response:
{
  "success": true,
  "message": "Match images uploaded successfully",
  "data": {
    "match_id": string,
    "processing_status": "queued" | "processing" | "completed",
    "estimated_completion": string // ISO datetime
  }
}
```

##### Get Match Results
```
GET /api/matches/{match_id}
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": MatchData
}
```

##### Get Match History
```
GET /api/matches
Authorization: Bearer <token>

Query Parameters:
- time_filter: "last5" | "lastMonth" | "last3Months" | "allTime"
- limit: number (default: 50)
- offset: number (default: 0)
- sort: "date" | "performance" | "goals" (default: "date")
- order: "asc" | "desc" (default: "desc")

Response:
{
  "success": true,
  "data": {
    "matches": MatchData[],
    "total_count": number,
    "summary": {
      "total_matches": number,
      "average_goals": number,
      "average_performance": number,
      "win_rate": number,
      "last_match_date": string
    }
  }
}
```

##### Get Dashboard Statistics
```
GET /api/matches/dashboard-stats
Authorization: Bearer <token>

Query Parameters:
- time_filter: "last5" | "lastMonth" | "last3Months" | "allTime"

Response:
{
  "success": true,
  "data": {
    "total_matches": number,
    "average_goals": number,
    "overall_performance": number,
    "last_match": {
      "date": string,
      "result": "Win" | "Loss" | "Draw",
      "opponent": string,
      "score": string // e.g., "3-1"
    },
    "trends": {
      "matches_increase": boolean,
      "goals_increase": boolean,
      "performance_increase": boolean
    },
    "recent_form": string // e.g., "WWLWD"
  }
}
```

##### Get Chart Data
```
GET /api/matches/chart-data
Authorization: Bearer <token>

Query Parameters:
- type: "efficiency" | "matchMetrics" | "radar"
- time_filter: "last5" | "lastMonth" | "last3Months" | "allTime"
- metric?: string // specific metric for trend charts

Response:
{
  "success": true,
  "data": {
    "chart_data": Array<any>, // Format depends on chart type
    "available_metrics": string[], // Available metrics for selection
    "summary": {
      "avg_performance": number,
      "best_performance": number,
      "worst_performance": number,
      "improvement_rate": number
    }
  }
}
```

#### 3. AI Rivalizer System
**Base URL**: `/api/rivalizer`

##### Get Match Proposals
```
GET /api/rivalizer/proposals
Authorization: Bearer <token>

Query Parameters:
- status: "pending" | "all" (default: "pending")
- type: "received" | "sent" | "all" (default: "received")

Response:
{
  "success": true,
  "data": {
    "proposals": MatchProposal[],
    "total_count": number
  }
}
```

##### Send Match Proposal
```
POST /api/rivalizer/proposals
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "opponent_id": string,
  "proposed_time": string, // ISO datetime
  "message": string // optional
}

Response:
{
  "success": true,
  "message": "Match proposal sent successfully",
  "data": MatchProposal
}
```

##### Accept Match Proposal
```
POST /api/rivalizer/proposals/{proposal_id}/accept
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Match proposal accepted",
  "data": {
    "scheduled_match": ScheduledMatch
  }
}
```

##### Decline Match Proposal
```
POST /api/rivalizer/proposals/{proposal_id}/decline
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Match proposal declined"
}
```

##### Get Scheduled Matches
```
GET /api/rivalizer/matches
Authorization: Bearer <token>

Query Parameters:
- status: "upcoming" | "completed" | "all" (default: "all")
- start_date: string // ISO date (optional)
- end_date: string // ISO date (optional)

Response:
{
  "success": true,
  "data": {
    "matches": ScheduledMatch[],
    "total_count": number,
    "upcoming_count": number,
    "completed_count": number
  }
}
```

##### Update Match Results
```
PUT /api/rivalizer/matches/{match_id}/results
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "player_score": number,
  "opponent_score": number
}

Response:
{
  "success": true,
  "message": "Match results updated successfully",
  "data": ScheduledMatch
}
```

##### Find Potential Opponents
```
GET /api/rivalizer/find-opponents
Authorization: Bearer <token>

Query Parameters:
- skill_range: number // +/- rating range (default: 100)
- limit: number (default: 10)

Response:
{
  "success": true,
  "data": {
    "opponents": Array<{
      "user_id": string,
      "name": string,
      "avatar_url": string,
      "rank": number,
      "win_rate": number,
      "compatibility_score": number, // 0-100
      "last_active": string
    }>
  }
}
```

#### 4. AI Coach System
**Base URL**: `/api/coach`

##### Get Coach Recommendations
```
GET /api/coach/recommendations
Authorization: Bearer <token>

Query Parameters:
- status: "active" | "completed" | "all" (default: "active")
- category?: string // optional filter

Response:
{
  "success": true,
  "data": {
    "recommendations": CoachRecommendation[],
    "total_count": number,
    "categories": string[]
  }
}
```

##### Update Recommendation Progress
```
PUT /api/coach/recommendations/{recommendation_id}/progress
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "progress": number, // 0-100
  "status": "active" | "completed" | "paused"
}

Response:
{
  "success": true,
  "message": "Progress updated successfully",
  "data": CoachRecommendation
}
```

##### Generate New Recommendations
```
POST /api/coach/analyze
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Analysis complete",
  "data": {
    "new_recommendations": CoachRecommendation[],
    "insights": Array<{
      "type": "strength" | "weakness" | "improvement",
      "title": string,
      "description": string,
      "trend": "up" | "down" | "stable"
    }>
  }
}
```

##### Get Chat Messages (AI Coach Interface)
```
GET /api/coach/chat/messages
Authorization: Bearer <token>

Query Parameters:
- limit: number (default: 50)
- before: string // message ID for pagination

Response:
{
  "success": true,
  "data": {
    "messages": Array<{
      "id": string,
      "type": "ai" | "user",
      "content": string,
      "timestamp": string,
      "metadata": any // optional
    }>
  }
}
```

##### Send Chat Message (AI Coach Interface)
```
POST /api/coach/chat/messages
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "content": string,
  "context": any // optional context data
}

Response:
{
  "success": true,
  "data": {
    "user_message": {
      "id": string,
      "type": "user",
      "content": string,
      "timestamp": string
    },
    "ai_response": {
      "id": string,
      "type": "ai",
      "content": string,
      "timestamp": string
    }
  }
}
```

#### 5. Rankings System
**Base URL**: `/api/rankings`

##### Get Global Rankings
```
GET /api/rankings/global
Authorization: Bearer <token>

Query Parameters:
- limit: number (default: 100)
- offset: number (default: 0)
- category: "overall" | "goals" | "winRate" | "efficiency" (default: "overall")

Response:
{
  "success": true,
  "data": {
    "rankings": RankingEntry[],
    "total_count": number,
    "user_rank": number, // Current user's rank
    "user_position": RankingEntry // Current user's ranking data
  }
}
```

##### Get Regional Rankings
```
GET /api/rankings/regional
Authorization: Bearer <token>

Query Parameters:
- region: string // user's region
- limit: number (default: 50)
- offset: number (default: 0)

Response:
{
  "success": true,
  "data": {
    "rankings": RankingEntry[],
    "total_count": number,
    "user_rank": number
  }
}
```

##### Get Friends Rankings
```
GET /api/rankings/friends
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "rankings": RankingEntry[],
    "total_count": number,
    "user_rank": number
  }
}
```

### Data Processing Requirements

#### AI Image Processing Pipeline
The backend must process uploaded match images to extract:

1. **Basic Match Statistics**:
   - Goals scored/conceded
   - Total shots and shots on target
   - Possession percentage
   - Pass completion stats
   - Tackle statistics

2. **Calculated Efficiency Metrics**:
   ```typescript
   // Efficiency calculations (0-100 scale)
   possession_efficiency = (possession_percentage / 100) * performance_multiplier
   shot_efficiency = (shots_on_target / total_shots) * 100
   pass_efficiency = (passes_completed / passes_attempted) * 100
   defensive_efficiency = (tackles_won / tackles_attempted) * 100
   overall_performance = weighted_average(all_efficiency_metrics)
   ```

3. **Performance Analysis**:
   - Trend analysis over time
   - Comparison with previous matches
   - Identification of strengths/weaknesses
   - Generation of improvement recommendations

#### Real-time Data Updates
Implement WebSocket connections or Server-Sent Events for:
- Live match proposal notifications
- Real-time chat updates (AI Coach/Rivalizer)
- Match result updates
- Ranking changes

#### Caching Strategy
Implement caching for:
- User rankings (TTL: 5 minutes)
- Match statistics summaries (TTL: 1 hour)
- Chart data (TTL: 30 minutes)
- AI recommendations (TTL: 1 day)

### Database Schema Requirements

#### Core Tables
1. **profiles** - User profile data (already defined in schema.sql)
2. **matches** - Individual match records with statistics
3. **match_proposals** - Rivalizer match proposals (already defined)
4. **scheduled_matches** - Confirmed matches (already defined)
5. **uploaded_images** - Match image metadata (already defined)

#### Additional Required Tables
```sql
-- AI Coach recommendations
CREATE TABLE coach_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  progress INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages for AI interfaces
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  interface_type TEXT NOT NULL, -- 'coach' | 'rivalizer'
  message_type TEXT NOT NULL, -- 'user' | 'ai'
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User rankings cache
CREATE TABLE user_rankings (
  user_id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  global_rank INTEGER,
  regional_rank INTEGER,
  overall_rating FLOAT DEFAULT 0,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Match statistics (detailed)
CREATE TABLE match_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES public.scheduled_matches(id),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  goals_scored INTEGER DEFAULT 0,
  goals_conceded INTEGER DEFAULT 0,
  possession INTEGER DEFAULT 0,
  shots INTEGER DEFAULT 0,
  shots_on_target INTEGER DEFAULT 0,
  passes_attempted INTEGER DEFAULT 0,
  passes_completed INTEGER DEFAULT 0,
  tackles INTEGER DEFAULT 0,
  tackles_won INTEGER DEFAULT 0,
  -- Calculated efficiency metrics
  possession_efficiency FLOAT DEFAULT 0,
  shot_efficiency FLOAT DEFAULT 0,
  pass_efficiency FLOAT DEFAULT 0,
  defensive_efficiency FLOAT DEFAULT 0,
  overall_performance FLOAT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Error Handling

#### Standard Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "User-friendly error message",
    "details": "Technical details for debugging",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

#### Common Error Codes
- `VALIDATION_ERROR` - Invalid request data
- `UNAUTHORIZED` - Invalid or missing authentication
- `FORBIDDEN` - User lacks permission for this action
- `NOT_FOUND` - Requested resource doesn't exist
- `RATE_LIMITED` - User exceeded plan limits
- `PROCESSING_ERROR` - AI analysis failed
- `FILE_TOO_LARGE` - Upload exceeds size limits
- `MATCH_PROPOSAL_EXPIRED` - Proposal no longer valid
- `MATCH_ALREADY_COMPLETED` - Cannot modify completed match
- `INSUFFICIENT_DATA` - Not enough data for analysis

### Performance Requirements

#### Response Time Targets
- Authentication: < 500ms
- Profile operations: < 500ms
- Match history retrieval: < 1 second
- Chart data generation: < 2 seconds
- Image upload acknowledgment: < 2 seconds
- AI processing completion: 30-60 seconds
- Real-time notifications: < 100ms
- Rankings data: < 1 second

#### Rate Limiting (per plan)
**Basic Plan**:
- API calls: 1000/hour
- Image uploads: 3/day
- Match proposals: 5 active simultaneously
- AI chat messages: 50/day

**Advanced Plan**:
- API calls: 5000/hour
- Image uploads: 10/day
- Match proposals: 15 active simultaneously
- AI chat messages: 200/day

### Security Requirements

#### Authentication & Authorization
- JWT token validation for all protected endpoints
- Token refresh mechanism (15-minute access tokens, 7-day refresh tokens)
- Role-based access control (basic/advanced plans)
- Rate limiting per user and IP address

#### Data Validation
- Input sanitization for all user data
- File type/size validation for uploads
- SQL injection prevention
- XSS protection for user-generated content

#### Privacy & Compliance
- GDPR compliance for EU users
- Data retention policies (match data: 2 years, chat logs: 30 days)
- User data export functionality
- Right to deletion implementation

### Development Setup

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For version control

### Local Development

1. **Clone the repository**:
   ```bash
   git clone [your-repository-url]
   cd futmatrix
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create environment variables for development:
   ```bash
   # These should be set in your development environment
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GA_ID=your_google_analytics_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:8080
   - The application will automatically reload when you make changes

### Development Tools

- **Production Readiness Checker**: Visit `/production-checklist` (development only)
- **Dev Mode**: Toggle in the top-left to view/edit code directly
- **Console Logs**: Check browser developer tools for debugging

## Production Deployment

### Pre-Production Checklist

Before deploying to production, ensure the following are completed:

#### 1. Backend Integration (Critical)
- [ ] Supabase project created and configured
- [ ] Database tables and schemas implemented
- [ ] Row Level Security (RLS) policies configured
- [ ] Authentication flows tested
- [ ] API endpoints implemented and tested

#### 2. Environment Variables (Critical)
Set these in your production environment (Supabase Secrets if using Lovable):

```bash
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]

# Analytics (Optional)
VITE_GA_ID=[your-google-analytics-id]

# Payment Processing (Optional)
VITE_STRIPE_PUBLISHABLE_KEY=[your-stripe-publishable-key]
```

#### 3. Legal Documentation (Critical)
- [ ] Privacy Policy created and hosted
- [ ] Terms of Service created and hosted
- [ ] Cookie policy implemented
- [ ] GDPR compliance measures

#### 4. Performance Optimization
- [ ] Image optimization completed
- [ ] Bundle size optimized
- [ ] Lazy loading implemented where appropriate
- [ ] Error boundaries added

#### 5. Monitoring & Analytics
- [ ] Error tracking service configured (Sentry, LogRocket, etc.)
- [ ] Analytics service configured (Google Analytics, Mixpanel, etc.)
- [ ] Performance monitoring setup

### Production Build

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

3. **Test the production build**:
   - Verify all features work correctly
   - Check performance metrics
   - Test on different devices and browsers

### Deployment Options

#### Option 1: Lovable Hosting (Recommended for MVP)
1. Click the "Publish" button in Lovable editor
2. Configure custom domain in Project Settings > Domains (paid plan required)
3. Set environment variables in Supabase Secrets

#### Option 2: Self-Hosting
1. Connect to GitHub via Lovable integration
2. Set up CI/CD pipeline with GitHub Actions
3. Deploy to your preferred hosting service:
   - **Vercel**: Zero-config deployment for React apps
   - **Netlify**: Simple static site hosting
   - **AWS S3 + CloudFront**: Enterprise-grade hosting
   - **Google Cloud Storage**: Google Cloud hosting

#### Option 3: Docker Deployment
```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

### Environment-Specific Configuration

#### Development
- All environment variables can be set in your local environment
- Mock data is used for development
- Development-only routes are enabled

#### Staging
- Use staging Supabase environment
- Enable error reporting but limit analytics
- Test with production-like data

#### Production
- All environment variables must be properly configured
- Enable all monitoring and analytics
- Disable development routes and features

### Security Considerations

1. **Environment Variables**:
   - Never commit API keys to version control
   - Use Supabase Secrets for sensitive data
   - Validate all environment variables on startup

2. **API Security**:
   - Implement proper authentication on all API endpoints
   - Use HTTPS for all communications
   - Validate and sanitize all user inputs

3. **Content Security**:
   - Implement Content Security Policy (CSP)
   - Sanitize user-uploaded content
   - Validate file types and sizes for uploads

### Performance Guidelines

1. **Bundle Size**:
   - Keep total bundle size under 1MB
   - Use code splitting for large components
   - Implement lazy loading for routes

2. **Image Optimization**:
   - Use WebP format where supported
   - Implement responsive images
   - Compress all images before deployment

3. **Caching Strategy**:
   - Cache static assets with long TTL
   - Implement service worker for offline support
   - Use CDN for static content delivery

### Monitoring & Maintenance

#### Health Checks
- Monitor application uptime
- Check API response times
- Monitor error rates

#### Regular Maintenance
- Update dependencies monthly
- Review and rotate API keys quarterly
- Monitor and optimize performance metrics
- Regular security audits

#### Backup Strategy
- Database backups (handled by Supabase)
- Code backups (handled by GitHub)
- Asset backups (implement for user uploads)

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Clear node_modules and reinstall dependencies
   - Verify all environment variables are set

2. **Runtime Errors**:
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check network connectivity

3. **Performance Issues**:
   - Analyze bundle size with build tools
   - Check for memory leaks in React components
   - Monitor network requests

### Getting Help

- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)
- **Community**: [Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Support**: support@futmatrix.com

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

### Integration Checklist

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
- [ ] AI Coach chat interface with real-time responses
- [ ] Rankings calculation and caching system

### Support & Documentation

#### Frontend Contact Points
- Main dashboard: `/dashboard`
- Charts view: `/charts` 
- Upload interface: `/upload`
- User profile: `/profile`
- Rivalizer interface: `/rivalizer`
- AI Rivalizer agent: `/ai-rivalizer`
- AI Coach agent: `/ai-coach`

#### Key Hook Functions
- `useTrendChartData()`: Manages chart data and filtering
- `useRadarComparisonData()`: Handles comparison analytics
- `useUploadImages()`: Manages file upload process

For questions about frontend integration, refer to the component documentation in the respective TypeScript files.
