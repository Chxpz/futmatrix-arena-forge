
// Application configuration for production deployment
export const APP_CONFIG = {
  // App Information
  app: {
    name: 'Futmatrix',
    description: 'Elite Platform for EAFC25 Players chasing performance, money and visibility',
    version: '1.0.0',
    author: 'Futmatrix',
  },

  // External Links
  links: {
    // Social Media
    twitter: 'https://twitter.com/futmatrix',
    discord: 'https://discord.gg/futmatrix',
    youtube: 'https://youtube.com/@futmatrix',
    
    // Legal
    privacyPolicy: 'https://futmatrix.com/privacy-policy',
    termsOfService: 'https://futmatrix.com/terms-of-service',
    
    // Support & Documentation
    supportEmail: 'support@futmatrix.com',
    helpCenter: 'https://help.futmatrix.com',
    
    // External Services (these would typically be in environment variables in a real deployment)
    eaSports: 'https://www.ea.com/games/ea-sports-fc',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },

  // Feature Flags
  features: {
    enableAnalytics: true,
    enableErrorReporting: true,
    enableBetaFeatures: false,
    maintenanceMode: false,
  },

  // UI Configuration
  ui: {
    defaultTheme: 'dark',
    maxUploadSize: 10 * 1024 * 1024, // 10MB
    supportedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
  },

  // API Configuration
  api: {
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  },
};

export default APP_CONFIG;
