
// Environment configuration
export const ENV_CONFIG = {
  // Supabase Configuration
  supabase: {
    url: 'https://qwwahtsehozxbjzeiajt.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3d2FodHNlaG96eGJqemVpYWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjY4MzgsImV4cCI6MjA2OTk0MjgzOH0.aSnUz0UI8wnkjS6yFwXjKG-Lf-Utv5t4DiXbHTE2iWE',
  },

  // Whop Configuration
  whop: {
    appId: 'app_dL08bPo6FsVXvA',
    agentUserId: 'user_3HZ9Mdza3F5Pb',
    companyId: 'biz_G9xMhPjgxfQJbK',
  },

  // Analytics
  analytics: {
    googleAnalyticsId: '',
  },

  // External APIs
  apis: {
    openaiApiKey: '', // This should NEVER be exposed in frontend
    stripePublishableKey: '',
  },

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default ENV_CONFIG;
