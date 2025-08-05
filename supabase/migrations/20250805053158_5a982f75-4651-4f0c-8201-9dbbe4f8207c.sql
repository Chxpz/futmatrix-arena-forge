-- Fix the security definer view issues
-- The linter detected views with SECURITY DEFINER, let's check and fix them

-- Drop and recreate the views without SECURITY DEFINER
DROP VIEW IF EXISTS public.coach_user_view;
DROP VIEW IF EXISTS public.rivalizer_matchmaking_view;

-- Recreate coach_user_view without SECURITY DEFINER
CREATE VIEW public.coach_user_view AS
SELECT 
    u.id as user_id,
    u.username,
    s.avg_overall_performance,
    s.performance_trend_5,
    s.matches_played,
    s.win_rate,
    s.last_match_at
FROM public.users u
LEFT JOIN public.user_stats_summary s ON u.id = s.user_id;

-- Recreate rivalizer_matchmaking_view without SECURITY DEFINER  
CREATE VIEW public.rivalizer_matchmaking_view AS
SELECT 
    u.id as user_id,
    s.avg_overall_performance,
    s.win_rate,
    s.matches_played
FROM public.users u
LEFT JOIN public.user_stats_summary s ON u.id = s.user_id
WHERE s.matches_played >= 5; -- Only users with sufficient match history

-- Fix the remaining function search path issue
-- Update handle_new_user function to have proper search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.user_stats_summary (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;