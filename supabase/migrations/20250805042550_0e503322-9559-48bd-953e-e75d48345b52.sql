-- Create users table
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_id TEXT UNIQUE,
  platform_auth_id TEXT UNIQUE,
  username TEXT NOT NULL,
  whop_id TEXT,
  subscription_status TEXT,
  created_at TIMESTAMP DEFAULT now(),
  status TEXT DEFAULT 'active',
  last_match_at TIMESTAMP,
  matches_count INT DEFAULT 0
);

-- Create user_plans table
CREATE TABLE public.user_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  started_at TIMESTAMP DEFAULT now(),
  ended_at TIMESTAMP,
  source TEXT DEFAULT 'whop'
);

-- Create matches table
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT now(),
  match_type TEXT,
  is_ranked BOOLEAN DEFAULT false,
  data_coverage_level TEXT,
  game_mode TEXT,
  source_image_url TEXT,
  source_agent TEXT,
  raw_json JSONB,
  score_user INT,
  score_opponent INT,
  shots_total INT,
  passes_attempted INT,
  pass_accuracy FLOAT,
  tackles_total INT,
  dribble_success_rate FLOAT,
  shot_accuracy FLOAT,
  tackle_success_rate FLOAT,
  fouls_committed INT,
  offsides INT,
  corners INT,
  free_kicks INT,
  penalty_kicks INT,
  yellow_cards INT,
  red_cards INT,
  def_line_breaks_through INT,
  def_line_breaks_around INT,
  def_line_breaks_over INT,
  def_line_breaks_attempted INT
);

-- Create processed_metrics table
CREATE TABLE public.processed_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  shot_efficiency FLOAT,
  pass_efficiency FLOAT,
  possession_efficiency FLOAT,
  defensive_efficiency FLOAT,
  overall_performance FLOAT,
  custom_json JSONB
);

-- Create user_stats_summary table
CREATE TABLE public.user_stats_summary (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  matches_played INT DEFAULT 0,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  draws INT DEFAULT 0,
  win_rate FLOAT DEFAULT 0,
  goals_scored INT DEFAULT 0,
  goals_conceded INT DEFAULT 0,
  avg_shot_efficiency FLOAT,
  avg_pass_efficiency FLOAT,
  avg_possession_efficiency FLOAT,
  avg_defensive_efficiency FLOAT,
  avg_overall_performance FLOAT,
  performance_trend_5 FLOAT,
  last_match_at TIMESTAMP
);

-- Create agent_interactions table
CREATE TABLE public.agent_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  agent_type TEXT,
  interaction_type TEXT,
  content TEXT,
  payload JSONB,
  timestamp TIMESTAMP DEFAULT now()
);

-- Create training_plans table
CREATE TABLE public.training_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  start_date DATE,
  end_date DATE,
  checkpoints JSONB,
  stake_amount INT,
  status TEXT,
  reward_issued BOOLEAN DEFAULT false,
  penalty_applied BOOLEAN DEFAULT false
);

-- Create penalties table
CREATE TABLE public.penalties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  card_type TEXT,
  reason TEXT,
  token_fine INT,
  imposed_at TIMESTAMP DEFAULT now(),
  paid BOOLEAN DEFAULT false
);

-- Create streaming_rewards table
CREATE TABLE public.streaming_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  match_id UUID REFERENCES public.matches(id),
  stream_url TEXT,
  reward_amount INT,
  validated BOOLEAN DEFAULT false,
  issued_at TIMESTAMP DEFAULT now()
);

-- Create replay_uploads table
CREATE TABLE public.replay_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  match_id UUID REFERENCES public.matches(id),
  content_type TEXT,
  ai_difficulty_tag TEXT,
  reward_amount INT,
  uploaded_at TIMESTAMP DEFAULT now()
);

-- Create weekly_rankings table
CREATE TABLE public.weekly_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start DATE,
  rank_type TEXT,
  rankings JSONB
);

-- Create views
CREATE VIEW public.coach_user_view AS
SELECT
  u.id AS user_id,
  u.username,
  uss.avg_overall_performance,
  uss.performance_trend_5,
  uss.matches_played,
  uss.win_rate,
  uss.last_match_at
FROM public.users u
JOIN public.user_stats_summary uss ON u.id = uss.user_id;

CREATE VIEW public.rivalizer_matchmaking_view AS
SELECT
  user_id,
  avg_overall_performance,
  win_rate,
  matches_played
FROM public.user_stats_summary
WHERE matches_played >= 5;

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processed_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.penalties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaming_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.replay_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_rankings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users to access their own data
CREATE POLICY "Users can view own data" ON public.users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own plans" ON public.user_plans
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own matches" ON public.matches
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own metrics" ON public.processed_metrics
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON public.user_stats_summary
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own interactions" ON public.agent_interactions
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own training plans" ON public.training_plans
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own penalties" ON public.penalties
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own streaming rewards" ON public.streaming_rewards
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own uploads" ON public.replay_uploads
FOR SELECT USING (auth.uid() = user_id);

-- Weekly rankings are public view
CREATE POLICY "Anyone can view rankings" ON public.weekly_rankings
FOR SELECT USING (true);

-- Function to update user stats summary
CREATE OR REPLACE FUNCTION update_user_stats_summary()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats_summary (user_id, matches_played, last_match_at)
  VALUES (NEW.user_id, 1, NEW.timestamp)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    matches_played = user_stats_summary.matches_played + 1,
    last_match_at = NEW.timestamp;
  
  UPDATE public.users 
  SET matches_count = matches_count + 1, last_match_at = NEW.timestamp
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update stats when new match is inserted
CREATE TRIGGER update_stats_on_match_insert
  AFTER INSERT ON public.matches
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats_summary();