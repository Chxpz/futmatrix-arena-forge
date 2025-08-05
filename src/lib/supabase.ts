import { createClient } from '@supabase/supabase-js';
import { ENV_CONFIG } from '@/config/env.config';

export const supabase = createClient(
  ENV_CONFIG.supabase.url,
  ENV_CONFIG.supabase.anonKey
);

export default supabase;