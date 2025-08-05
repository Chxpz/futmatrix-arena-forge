-- Phase 1: Fix Authentication Architecture for Whop App
-- Since users authenticate via Whop (not Supabase Auth), auth.uid() returns NULL
-- We need to use a different approach for RLS that works with Whop user system

-- First, let's create a function to get the current user ID from request context
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS uuid AS $$
BEGIN
  -- This will be set by edge functions when they authenticate the user
  RETURN COALESCE(
    current_setting('app.current_user_id', true)::uuid,
    NULL
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Update all RLS policies to use the new function instead of auth.uid()

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Users can view own plans" ON public.user_plans;
DROP POLICY IF EXISTS "Users can view own matches" ON public.matches;
DROP POLICY IF EXISTS "Users can view own metrics" ON public.processed_metrics;
DROP POLICY IF EXISTS "Users can view own stats" ON public.user_stats_summary;
DROP POLICY IF EXISTS "Users can view own interactions" ON public.agent_interactions;
DROP POLICY IF EXISTS "Users can view own training plans" ON public.training_plans;
DROP POLICY IF EXISTS "Users can view own penalties" ON public.penalties;
DROP POLICY IF EXISTS "Users can view own streaming rewards" ON public.streaming_rewards;
DROP POLICY IF EXISTS "Users can view own uploads" ON public.replay_uploads;

-- Create new policies using the custom function
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (id = public.get_current_user_id());

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (id = public.get_current_user_id());

CREATE POLICY "Users can view own plans" ON public.user_plans
  FOR SELECT USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can view own matches" ON public.matches
  FOR SELECT USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can insert own matches" ON public.matches
  FOR INSERT WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can view own metrics" ON public.processed_metrics
  FOR SELECT USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can insert own metrics" ON public.processed_metrics
  FOR INSERT WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can view own stats" ON public.user_stats_summary
  FOR SELECT USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can view own interactions" ON public.agent_interactions
  FOR SELECT USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can insert own interactions" ON public.agent_interactions
  FOR INSERT WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can view own training plans" ON public.training_plans
  FOR SELECT USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can insert own training plans" ON public.training_plans
  FOR INSERT WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can update own training plans" ON public.training_plans
  FOR UPDATE USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can view own penalties" ON public.penalties
  FOR SELECT USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can view own streaming rewards" ON public.streaming_rewards
  FOR SELECT USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can insert own streaming rewards" ON public.streaming_rewards
  FOR INSERT WITH CHECK (user_id = public.get_current_user_id());

CREATE POLICY "Users can view own uploads" ON public.replay_uploads
  FOR SELECT USING (user_id = public.get_current_user_id());

CREATE POLICY "Users can insert own uploads" ON public.replay_uploads
  FOR INSERT WITH CHECK (user_id = public.get_current_user_id());

-- Fix the security definer function issues identified by linter
-- Update the existing update_user_stats_summary function to use proper search path
CREATE OR REPLACE FUNCTION public.update_user_stats_summary()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

-- Create trigger for automatic stats updates
DROP TRIGGER IF EXISTS update_user_stats_trigger ON public.matches;
CREATE TRIGGER update_user_stats_trigger
  AFTER INSERT ON public.matches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_stats_summary();