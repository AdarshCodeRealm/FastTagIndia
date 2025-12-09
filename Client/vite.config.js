import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Define environment variables for browser
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
    'process.env.REACT_APP_URL': JSON.stringify(process.env.REACT_APP_URL),
    'process.env.REACT_APP_VERSION': JSON.stringify(process.env.REACT_APP_VERSION),
    'process.env.REACT_APP_RAZORPAY_KEY_ID': JSON.stringify(process.env.REACT_APP_RAZORPAY_KEY_ID),
    'process.env.REACT_APP_ENABLE_OTP_LOGIN': JSON.stringify(process.env.REACT_APP_ENABLE_OTP_LOGIN),
    'process.env.REACT_APP_ENABLE_ADMIN_PANEL': JSON.stringify(process.env.REACT_APP_ENABLE_ADMIN_PANEL),
    'process.env.REACT_APP_ENABLE_2FA': JSON.stringify(process.env.REACT_APP_ENABLE_2FA),
    'process.env.REACT_APP_API_TIMEOUT': JSON.stringify(process.env.REACT_APP_API_TIMEOUT),
    'process.env.REACT_APP_API_RETRY_COUNT': JSON.stringify(process.env.REACT_APP_API_RETRY_COUNT),
    'process.env.REACT_APP_MAX_FILE_SIZE': JSON.stringify(process.env.REACT_APP_MAX_FILE_SIZE),
    'process.env.REACT_APP_ALLOWED_FILE_TYPES': JSON.stringify(process.env.REACT_APP_ALLOWED_FILE_TYPES),
    'process.env.REACT_APP_SESSION_TIMEOUT': JSON.stringify(process.env.REACT_APP_SESSION_TIMEOUT),
    'process.env.REACT_APP_REFRESH_TOKEN_BUFFER': JSON.stringify(process.env.REACT_APP_REFRESH_TOKEN_BUFFER),
    'process.env.REACT_APP_ENABLE_API_LOGGING': JSON.stringify(process.env.REACT_APP_ENABLE_API_LOGGING),
    'process.env.REACT_APP_ENABLE_REDUX_DEVTOOLS': JSON.stringify(process.env.REACT_APP_ENABLE_REDUX_DEVTOOLS),
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})