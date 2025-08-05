
-- Users table schema for Futmatrix
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE,
  nickname TEXT,
  eaname TEXT,
  bio TEXT,
  avatar_url TEXT,
  plan_type TEXT DEFAULT 'basic', -- 'basic' or 'advanced'
  
  -- Performance metrics
  win_rate FLOAT DEFAULT 0,
  goals_per_match FLOAT DEFAULT 0,
  pass_accuracy FLOAT DEFAULT 0,
  
  -- Rankings
  global_rank INTEGER,
  
  -- Timestamps
  last_login TIMESTAMP WITH TIME ZONE
);

-- Match proposals table
CREATE TABLE IF NOT EXISTS public.match_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  challenger_id UUID REFERENCES public.profiles(id) NOT NULL,
  opponent_id UUID REFERENCES public.profiles(id) NOT NULL,
  proposed_time TIMESTAMP WITH TIME ZONE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'declined', 'expired'
  
  CONSTRAINT different_players CHECK (challenger_id <> opponent_id)
);

-- Scheduled matches table
CREATE TABLE IF NOT EXISTS public.scheduled_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  player_one_id UUID REFERENCES public.profiles(id) NOT NULL,
  player_two_id UUID REFERENCES public.profiles(id) NOT NULL,
  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled'
  player_one_score INTEGER,
  player_two_score INTEGER,
  
  CONSTRAINT different_players CHECK (player_one_id <> player_two_id)
);

-- Uploaded images table
CREATE TABLE IF NOT EXISTS public.uploaded_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  image_url TEXT NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  match_id UUID REFERENCES public.scheduled_matches(id)
);

-- RLS Policies for secure access control
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_images ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Match proposals policies
CREATE POLICY "Users can see proposals involving them"
  ON public.match_proposals
  FOR SELECT
  USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

CREATE POLICY "Users can create match proposals"
  ON public.match_proposals
  FOR INSERT
  WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Users can update proposals they're involved in"
  ON public.match_proposals
  FOR UPDATE
  USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

-- Scheduled matches policies
CREATE POLICY "Users can see their scheduled matches"
  ON public.scheduled_matches
  FOR SELECT
  USING (auth.uid() = player_one_id OR auth.uid() = player_two_id);

-- Uploaded images policies
CREATE POLICY "Users can see their uploaded images"
  ON public.uploaded_images
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own images"
  ON public.uploaded_images
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
