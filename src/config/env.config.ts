
// Environment configuration
// Note: In Lovable, these would be managed through Supabase secrets
export const ENV_CONFIG = {
  // Supabase Configuration (these should be in Supabase secrets in production)
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },

  // Analytics (should be in Supabase secrets)
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GA_ID || '',
  },

  // External APIs (should be in Supabase secrets)
  apis: {
    openaiApiKey: '', // This should NEVER be exposed in frontend
    stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  },

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default ENV_CONFIG;
