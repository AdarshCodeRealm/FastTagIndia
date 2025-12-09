// Environment Configuration for FASTag India Frontend
// Helper function to safely get environment variables
const getEnvVar = (key, defaultValue = null) => {
  try {
    // In Vite, use import.meta.env for environment variables
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || defaultValue;
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

// Determine if we're in production
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

const config = {
  // API Configuration - Use environment variable or default based on environment
  API_BASE_URL: getEnvVar('VITE_API_URL') || 
    (isProduction ? 'https://nexara-server.vercel.app/api' : 'http://localhost:3001/api'),
  
  // App Configuration
  APP_NAME: 'FASTag India',
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  APP_URL: getEnvVar('VITE_APP_URL', isProduction ? 'https://fasttag-india.vercel.app' : 'http://localhost:3000'),
  
  // Payment Gateway
  RAZORPAY_KEY_ID: getEnvVar('VITE_RAZORPAY_KEY_ID'),
  
  // Environment
  NODE_ENV: import.meta.env.MODE || 'development',
  IS_PRODUCTION: isProduction,
  IS_DEVELOPMENT: !isProduction,
  
  // Feature Flags
  ENABLE_OTP_LOGIN: getEnvVar('VITE_ENABLE_OTP_LOGIN', 'true') !== 'false',
  ENABLE_ADMIN_PANEL: getEnvVar('VITE_ENABLE_ADMIN_PANEL', 'true') !== 'false',
  ENABLE_2FA: getEnvVar('VITE_ENABLE_2FA', 'true') !== 'false',
  
  // API Timeout and Retry Configuration
  API_TIMEOUT: parseInt(getEnvVar('VITE_API_TIMEOUT', '10000')),
  API_RETRY_COUNT: parseInt(getEnvVar('VITE_API_RETRY_COUNT', '3')),
  
  // File Upload Configuration
  MAX_FILE_SIZE: parseInt(getEnvVar('VITE_MAX_FILE_SIZE', '5242880')), // 5MB
  ALLOWED_FILE_TYPES: (getEnvVar('VITE_ALLOWED_FILE_TYPES', 'image/jpeg,image/jpg,image/png,application/pdf') || 'image/jpeg,image/jpg,image/png,application/pdf').split(','),
  
  // Session Configuration
  SESSION_TIMEOUT: parseInt(getEnvVar('VITE_SESSION_TIMEOUT', '900000')), // 15 minutes
  REFRESH_TOKEN_BUFFER: parseInt(getEnvVar('VITE_REFRESH_TOKEN_BUFFER', '60000')), // 1 minute
  
  // Debug Configuration
  ENABLE_API_LOGGING: getEnvVar('VITE_ENABLE_API_LOGGING', 'false') === 'true' || (import.meta.env.MODE === 'development'),
  ENABLE_REDUX_DEVTOOLS: getEnvVar('VITE_ENABLE_REDUX_DEVTOOLS', 'false') === 'true' || (import.meta.env.MODE === 'development'),
  
  // CORS Configuration
  ALLOW_CREDENTIALS: true,
};

// Validation function to ensure required environment variables are set
export const validateConfig = () => {
  const requiredVars = [];
  
  if (config.IS_PRODUCTION) {
    if (!config.RAZORPAY_KEY_ID) {
      console.warn('⚠️ Missing VITE_RAZORPAY_KEY_ID in production environment');
    }
  }
  
  if (requiredVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${requiredVars.join(', ')}`);
  }
};

// Helper function to get API URL for different environments
export const getApiUrl = (endpoint = '') => {
  const baseUrl = config.API_BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Helper function to check if feature is enabled
export const isFeatureEnabled = (feature) => {
  const featureMap = {
    'otp-login': config.ENABLE_OTP_LOGIN,
    'admin-panel': config.ENABLE_ADMIN_PANEL,
    '2fa': config.ENABLE_2FA,
  };
  
  return featureMap[feature] || false;
};

// Log configuration in development
if (config.IS_DEVELOPMENT) {
  console.log('🔧 Environment Configuration:', {
    NODE_ENV: config.NODE_ENV,
    API_BASE_URL: config.API_BASE_URL,
    APP_URL: config.APP_URL,
    IS_PRODUCTION: config.IS_PRODUCTION,
  });
}

// Export the configuration
export default config;