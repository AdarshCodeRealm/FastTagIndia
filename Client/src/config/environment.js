// Environment Configuration for FASTag India Frontend
// Helper function to safely get environment variables
const getEnvVar = (key, defaultValue = null) => {
  try {
    // In Vite, use import.meta.env for environment variables during development
    if (typeof window !== 'undefined' && import.meta && import.meta.env) {
      return import.meta.env[key] || defaultValue;
    }
    // For production builds, variables are replaced via Vite's define config
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

const config = {
  // API Configuration
  API_BASE_URL: getEnvVar('REACT_APP_API_URL', 'http://localhost:3001/api'),
  
  // App Configuration
  APP_NAME: 'FASTag India',
  APP_VERSION: getEnvVar('REACT_APP_VERSION', '1.0.0'),
  APP_URL: getEnvVar('REACT_APP_URL', 'http://localhost:3000'),
  
  // Payment Gateway
  RAZORPAY_KEY_ID: getEnvVar('REACT_APP_RAZORPAY_KEY_ID'),
  
  // Environment
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  IS_PRODUCTION: getEnvVar('NODE_ENV') === 'production',
  IS_DEVELOPMENT: getEnvVar('NODE_ENV', 'development') === 'development',
  
  // Feature Flags
  ENABLE_OTP_LOGIN: getEnvVar('REACT_APP_ENABLE_OTP_LOGIN', 'true') !== 'false',
  ENABLE_ADMIN_PANEL: getEnvVar('REACT_APP_ENABLE_ADMIN_PANEL', 'true') !== 'false',
  ENABLE_2FA: getEnvVar('REACT_APP_ENABLE_2FA', 'true') !== 'false',
  
  // API Timeout and Retry Configuration
  API_TIMEOUT: parseInt(getEnvVar('REACT_APP_API_TIMEOUT', '10000')),
  API_RETRY_COUNT: parseInt(getEnvVar('REACT_APP_API_RETRY_COUNT', '3')),
  
  // File Upload Configuration
  MAX_FILE_SIZE: parseInt(getEnvVar('REACT_APP_MAX_FILE_SIZE', '5242880')), // 5MB
  ALLOWED_FILE_TYPES: (getEnvVar('REACT_APP_ALLOWED_FILE_TYPES', 'image/jpeg,image/jpg,image/png,application/pdf') || 'image/jpeg,image/jpg,image/png,application/pdf').split(','),
  
  // Session Configuration
  SESSION_TIMEOUT: parseInt(getEnvVar('REACT_APP_SESSION_TIMEOUT', '900000')), // 15 minutes
  REFRESH_TOKEN_BUFFER: parseInt(getEnvVar('REACT_APP_REFRESH_TOKEN_BUFFER', '60000')), // 1 minute
  
  // Debug Configuration
  ENABLE_API_LOGGING: getEnvVar('REACT_APP_ENABLE_API_LOGGING', 'true') === 'true' || getEnvVar('NODE_ENV', 'development') === 'development',
  ENABLE_REDUX_DEVTOOLS: getEnvVar('REACT_APP_ENABLE_REDUX_DEVTOOLS', 'true') === 'true' || getEnvVar('NODE_ENV', 'development') === 'development',
};

// Validation function to ensure required environment variables are set
export const validateConfig = () => {
  const requiredVars = [];
  
  if (config.IS_PRODUCTION) {
    if (!config.RAZORPAY_KEY_ID) {
      requiredVars.push('REACT_APP_RAZORPAY_KEY_ID');
    }
  }
  
  if (requiredVars.length > 0) {
    throw new Error(`Missing required environment variables: ${requiredVars.join(', ')}`);
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

// Export the configuration
export default config;