import supabase from '@/lib/supabase';
import type { 
  User, 
  Match, 
  UserStatsummary, 
  AgentInteraction, 
  TrainingPlan, 
  WeeklyRanking,
  CoachUserView,
  RivalizerMatchmakingView 
} from '@/types/database';

// User services
export const userService = {
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserStats(userId: string): Promise<UserStatsummary | null> {
    const { data, error } = await supabase
      .from('user_stats_summary')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Match services
export const matchService = {
  async getUserMatches(userId: string, limit = 10): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  async createMatch(match: Omit<Match, 'id' | 'timestamp'>): Promise<Match> {
    const { data, error } = await supabase
      .from('matches')
      .insert(match)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getMatchById(matchId: string): Promise<Match | null> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', matchId)
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Agent interaction services
export const agentService = {
  async logInteraction(interaction: Omit<AgentInteraction, 'id' | 'timestamp'>): Promise<AgentInteraction> {
    const { data, error } = await supabase
      .from('agent_interactions')
      .insert(interaction)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserInteractions(userId: string, agentType?: 'coach' | 'rivalizer'): Promise<AgentInteraction[]> {
    let query = supabase
      .from('agent_interactions')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });
    
    if (agentType) {
      query = query.eq('agent_type', agentType);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
};

// Training services
export const trainingService = {
  async getUserTrainingPlans(userId: string): Promise<TrainingPlan[]> {
    const { data, error } = await supabase
      .from('training_plans')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createTrainingPlan(plan: Omit<TrainingPlan, 'id'>): Promise<TrainingPlan> {
    const { data, error } = await supabase
      .from('training_plans')
      .insert(plan)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTrainingPlan(planId: string, updates: Partial<TrainingPlan>): Promise<TrainingPlan> {
    const { data, error } = await supabase
      .from('training_plans')
      .update(updates)
      .eq('id', planId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Rankings services
export const rankingsService = {
  async getWeeklyRankings(rankType?: string): Promise<WeeklyRanking[]> {
    let query = supabase
      .from('weekly_rankings')
      .select('*')
      .order('week_start', { ascending: false });
    
    if (rankType) {
      query = query.eq('rank_type', rankType);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
};

// Coach view services
export const coachService = {
  async getCoachUserView(userId: string): Promise<CoachUserView | null> {
    const { data, error } = await supabase
      .from('coach_user_view')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Rivalizer services
export const rivalizerService = {
  async getMatchmakingCandidates(): Promise<RivalizerMatchmakingView[]> {
    const { data, error } = await supabase
      .from('rivalizer_matchmaking_view')
      .select('*')
      .order('avg_overall_performance', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
};

// AI Agent HTTP services
export const aiAgentService = {
  async callCoachAgent(userId: string, input: any): Promise<any> {
    // This would call your external AI agent service
    // Replace with your actual AI agent endpoint
    const response = await fetch('/api/ai/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, input })
    });
    
    if (!response.ok) throw new Error('Coach agent request failed');
    return response.json();
  },

  async callRivalizerAgent(userId: string, input: any): Promise<any> {
    // This would call your external AI agent service
    // Replace with your actual AI agent endpoint
    const response = await fetch('/api/ai/rivalizer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, input })
    });
    
    if (!response.ok) throw new Error('Rivalizer agent request failed');
    return response.json();
  }
};