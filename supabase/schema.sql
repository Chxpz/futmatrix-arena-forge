
-- Futmatrix Database Schema v2.0
-- Core Tables

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
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

-- User plans
CREATE TABLE IF NOT EXISTS public.user_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  started_at TIMESTAMP DEFAULT now(),
  ended_at TIMESTAMP,
  source TEXT DEFAULT 'whop'
);

-- Matches
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT now(),
  match_type TEXT, -- 'rivalizer', 'division_rivals', 'friendly'
  is_ranked BOOLEAN DEFAULT false,
  data_coverage_level TEXT, -- 'summary_only', 'advanced'
  game_mode TEXT,
  source_image_url TEXT,
  source_agent TEXT,
  raw_json JSONB,
  
  -- Match stats
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

-- Processed metrics
CREATE TABLE IF NOT EXISTS public.processed_metrics (
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

-- User stats summary
CREATE TABLE IF NOT EXISTS public.user_stats_summary (
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

-- Agent interactions
CREATE TABLE IF NOT EXISTS public.agent_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  agent_type TEXT, -- 'coach', 'rivalizer'
  interaction_type TEXT, -- 'chat', 'match_suggestion', 'plan_adjustment'
  content TEXT,
  payload JSONB,
  timestamp TIMESTAMP DEFAULT now()
);

-- Training plans
CREATE TABLE IF NOT EXISTS public.training_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  start_date DATE,
  end_date DATE,
  checkpoints JSONB,
  stake_amount INT,
  status TEXT, -- 'in_progress', 'completed', 'failed'
  reward_issued BOOLEAN DEFAULT false,
  penalty_applied BOOLEAN DEFAULT false
);

-- Penalties
CREATE TABLE IF NOT EXISTS public.penalties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  card_type TEXT, -- 'yellow', 'red'
  reason TEXT,
  token_fine INT,
  imposed_at TIMESTAMP DEFAULT now(),
  paid BOOLEAN DEFAULT false
);

-- Streaming rewards
CREATE TABLE IF NOT EXISTS public.streaming_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  match_id UUID REFERENCES public.matches(id),
  stream_url TEXT,
  reward_amount INT,
  validated BOOLEAN DEFAULT false,
  issued_at TIMESTAMP DEFAULT now()
);

-- Replay uploads
CREATE TABLE IF NOT EXISTS public.replay_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  match_id UUID REFERENCES public.matches(id),
  content_type TEXT,
  ai_difficulty_tag TEXT,
  reward_amount INT,
  uploaded_at TIMESTAMP DEFAULT now()
);

-- Weekly rankings
CREATE TABLE IF NOT EXISTS public.weekly_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start DATE,
  rank_type TEXT, -- 'week_on_fire', 'rivalizer_arena'
  rankings JSONB -- { position: user_id }
);

-- Views
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

-- RLS Policies
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

-- User policies
CREATE POLICY "Users can view their own data"
  ON public.users FOR ALL
  USING (id = auth.uid()::uuid);

CREATE POLICY "User plans policy"
  ON public.user_plans FOR ALL
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Matches policy"
  ON public.matches FOR ALL
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Processed metrics policy"
  ON public.processed_metrics FOR ALL
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "User stats policy"
  ON public.user_stats_summary FOR ALL
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Agent interactions policy"
  ON public.agent_interactions FOR ALL
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Training plans policy"
  ON public.training_plans FOR ALL
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Penalties policy"
  ON public.penalties FOR ALL
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Streaming rewards policy"
  ON public.streaming_rewards FOR ALL
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Replay uploads policy"
  ON public.replay_uploads FOR ALL
  USING (user_id = auth.uid()::uuid);

-- Public read for rankings
CREATE POLICY "Public rankings read"
  ON public.weekly_rankings FOR SELECT
  USING (true);

-- Functions
CREATE OR REPLACE FUNCTION public.update_user_stats_summary()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats_summary (user_id, matches_played, last_match_at)
  VALUES (NEW.user_id, 1, NEW.timestamp)
  ON CONFLICT (user_id) DO UPDATE SET
    matches_played = user_stats_summary.matches_played + 1,
    last_match_at = NEW.timestamp;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, platform_auth_id, username)
  VALUES (NEW.id, NEW.id::text, COALESCE(NEW.email, 'User' || substr(NEW.id::text, 1, 8)));
  
  INSERT INTO public.user_stats_summary (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_match_insert
  AFTER INSERT ON public.matches
  FOR EACH ROW EXECUTE FUNCTION public.update_user_stats_summary();
