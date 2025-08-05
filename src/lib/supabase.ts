import { createClient } from '@supabase/supabase-js';
import { ENV_CONFIG } from '@/config/env.config';

// Check if Supabase credentials are available
if (!ENV_CONFIG.supabase.url || !ENV_CONFIG.supabase.anonKey) {
  console.warn('Supabase credentials not found. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  ENV_CONFIG.supabase.url || 'https://placeholder.supabase.co',
  ENV_CONFIG.supabase.anonKey || 'placeholder-anon-key'
);

export default supabase;