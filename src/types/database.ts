export interface User {
  id: string;
  discord_id?: string;
  platform_auth_id?: string;
  username: string;
  whop_id?: string;
  subscription_status?: string;
  created_at: string;
  status: string;
  last_match_at?: string;
  matches_count: number;
}

export interface UserPlan {
  id: string;
  user_id: string;
  plan: string;
  started_at: string;
  ended_at?: string;
  source: string;
}

export interface Match {
  id: string;
  user_id: string;
  timestamp: string;
  match_type?: string;
  is_ranked: boolean;
  data_coverage_level?: string;
  game_mode?: string;
  source_image_url?: string;
  source_agent?: string;
  raw_json?: any;
  score_user?: number;
  score_opponent?: number;
  shots_total?: number;
  passes_attempted?: number;
  pass_accuracy?: number;
  tackles_total?: number;
  dribble_success_rate?: number;
  shot_accuracy?: number;
  tackle_success_rate?: number;
  fouls_committed?: number;
  offsides?: number;
  corners?: number;
  free_kicks?: number;
  penalty_kicks?: number;
  yellow_cards?: number;
  red_cards?: number;
  def_line_breaks_through?: number;
  def_line_breaks_around?: number;
  def_line_breaks_over?: number;
  def_line_breaks_attempted?: number;
}

export interface ProcessedMetrics {
  id: string;
  match_id: string;
  user_id: string;
  shot_efficiency?: number;
  pass_efficiency?: number;
  possession_efficiency?: number;
  defensive_efficiency?: number;
  overall_performance?: number;
  custom_json?: any;
}

export interface UserStatsummary {
  user_id: string;
  matches_played: number;
  wins: number;
  losses: number;
  draws: number;
  win_rate: number;
  goals_scored: number;
  goals_conceded: number;
  avg_shot_efficiency?: number;
  avg_pass_efficiency?: number;
  avg_possession_efficiency?: number;
  avg_defensive_efficiency?: number;
  avg_overall_performance?: number;
  performance_trend_5?: number;
  last_match_at?: string;
}

export interface AgentInteraction {
  id: string;
  user_id: string;
  agent_type: 'coach' | 'rivalizer';
  interaction_type: string;
  content?: string;
  payload?: any;
  timestamp: string;
}

export interface TrainingPlan {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  checkpoints?: any;
  stake_amount?: number;
  status: 'in_progress' | 'completed' | 'failed';
  reward_issued: boolean;
  penalty_applied: boolean;
}

export interface Penalty {
  id: string;
  user_id: string;
  card_type: 'yellow' | 'red';
  reason?: string;
  token_fine?: number;
  imposed_at: string;
  paid: boolean;
}

export interface StreamingReward {
  id: string;
  user_id: string;
  match_id: string;
  stream_url?: string;
  reward_amount?: number;
  validated: boolean;
  issued_at: string;
}

export interface ReplayUpload {
  id: string;
  user_id: string;
  match_id: string;
  content_type?: string;
  ai_difficulty_tag?: string;
  reward_amount?: number;
  uploaded_at: string;
}

export interface WeeklyRanking {
  id: string;
  week_start: string;
  rank_type: 'week_on_fire' | 'rivalizer_arena';
  rankings?: any;
}

export interface CoachUserView {
  user_id: string;
  username: string;
  avg_overall_performance?: number;
  performance_trend_5?: number;
  matches_played: number;
  win_rate: number;
  last_match_at?: string;
}

export interface RivalizerMatchmakingView {
  user_id: string;
  avg_overall_performance?: number;
  win_rate: number;
  matches_played: number;
}