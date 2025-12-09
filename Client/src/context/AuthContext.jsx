import { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/api';

// Auth actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING',
  SET_OTP_STEP: 'SET_OTP_STEP',
  CLEAR_OTP_STEP: 'CLEAR_OTP_STEP',
  SET_USER: 'SET_USER',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
  ADMIN_LOGOUT: 'ADMIN_LOGOUT',
};

// Initial state
const initialState = {
  user: null,
  admin: null,
  isAuthenticated: false,
  isAdminAuthenticated: false,
  isLoading: false,
  error: null,
  otpStep: {
    isActive: false,
    type: null, // 'email' or 'sms'
    identifier: '', // email or phone
    purpose: '', // 'login', 'register', 'forgot-password'
  },
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        admin: action.payload,
        isAdminAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        user: null,
        admin: null,
        isAuthenticated: false,
        isAdminAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
    case AUTH_ACTIONS.ADMIN_LOGOUT:
      return {
        ...state,
        user: null,
        admin: null,
        isAuthenticated: false,
        isAdminAuthenticated: false,
        isLoading: false,
        error: null,
        otpStep: {
          isActive: false,
          type: null,
          identifier: '',
          purpose: '',
        },
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AUTH_ACTIONS.SET_OTP_STEP:
      return {
        ...state,
        otpStep: action.payload,
      };
    case AUTH_ACTIONS.CLEAR_OTP_STEP:
      return {
        ...state,
        otpStep: {
          isActive: false,
          type: null,
          identifier: '',
          purpose: '',
        },
      };
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    case AUTH_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing user session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        // Check if tokens exist before attempting to validate session
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        // Only attempt to check session if tokens exist
        if (!accessToken && !refreshToken) {
          console.log('ℹ️ No tokens found, skipping session check');
          return;
        }

        console.log('🔄 Checking existing session with valid tokens...');
        
        // Try to get current user from backend
        const response = await apiService.getCurrentUser();
        
        if (response.success && response.data) {
          console.log('✅ User session restored:', response.data);
          dispatch({ type: AUTH_ACTIONS.SET_USER, payload: response.data });
        }
      } catch (error) {
        console.log('ℹ️ Session validation failed:', error.message);
        // Clear any stored tokens if session is invalid
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    };

    checkExistingSession();
  }, []);

  // ========== USER AUTHENTICATION METHODS ==========

  // Register user
  const registerUser = async (userData) => {
    console.log('👤 AuthContext: Starting registration process');
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const result = await apiService.registerUser(userData);
      console.log('📥 Registration API Response:', result);
      
      if (result.success) {
        // Registration successful, but user might need email verification
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return { 
          success: true, 
          data: result.data,
          message: result.message 
        };
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Login user using email and password
  const loginUser = async (email, password) => {
    console.log('🔑 AuthContext: Starting login process');
    console.log('📧 Email:', email);
    console.log('🔒 Password provided:', !!password);
    
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      // Basic validation
      if (!email || !password) {
        const errorMsg = 'Email and password are required';
        console.error('❌ Validation failed:', errorMsg);
        throw new Error(errorMsg);
      }

      console.log('✅ Validation passed, calling API...');
      
      // Call the backend API login endpoint
      const result = await apiService.loginUser({
        email: email,
        password: password,
      });

      console.log('📥 API Response received:', result);

      if (result && result.success) {
        console.log('✅ Login successful, creating user session...');
        
        const userData = result.data.user;
        
        // For mobile apps, store tokens if provided
        if (apiService.isMobileApp()) {
          if (result.data.accessToken) {
            localStorage.setItem('accessToken', result.data.accessToken);
          }
          if (result.data.refreshToken) {
            localStorage.setItem('refreshToken', result.data.refreshToken);
          }
        }

        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: userData });
        
        console.log('🎉 Login process completed successfully');
        return { success: true, user: userData };
      } else {
        const errorMsg = result?.message || 'Login failed. Please check your credentials.';
        console.error('❌ Login failed from API:', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('💥 Login error in AuthContext:', error);
      
      let errorMessage = error.message;
      
      // Handle common error scenarios
      if (error.message.includes('fetch')) {
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Connection blocked. Please contact support.';
      } else if (error.message.includes('NetworkError')) {
        errorMessage = 'Network error. Please try again later.';
      }
      
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // ========== OTP AUTHENTICATION METHODS ==========

  // Send Email OTP
  const sendEmailOTP = async (email, purpose = 'login') => {
    console.log('📧 AuthContext: Sending email OTP');
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const result = await apiService.sendEmailOTP(email, purpose);
      
      if (result.success) {
        dispatch({ 
          type: AUTH_ACTIONS.SET_OTP_STEP, 
          payload: {
            isActive: true,
            type: 'email',
            identifier: email,
            purpose: purpose,
          }
        });
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('❌ Send Email OTP error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Send SMS OTP
  const sendSMSOTP = async (phone, purpose = 'login') => {
    console.log('📱 AuthContext: Sending SMS OTP');
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const result = await apiService.sendSMSOTP(phone, purpose);
      
      if (result.success) {
        dispatch({ 
          type: AUTH_ACTIONS.SET_OTP_STEP, 
          payload: {
            isActive: true,
            type: 'sms',
            identifier: phone,
            purpose: purpose,
          }
        });
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('❌ Send SMS OTP error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Verify Email OTP
  const verifyEmailOTP = async (email, otp, purpose = 'login') => {
    console.log('✅ AuthContext: Verifying email OTP');
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const result = await apiService.verifyEmailOTP(email, otp, purpose);
      
      if (result.success) {
        if (purpose === 'login' && result.data.user) {
          // Login successful after OTP verification
          dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: result.data.user });
          dispatch({ type: AUTH_ACTIONS.CLEAR_OTP_STEP });
          return { success: true, user: result.data.user };
        } else {
          // OTP verified for other purposes
          dispatch({ type: AUTH_ACTIONS.CLEAR_OTP_STEP });
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
          return { success: true, data: result.data };
        }
      } else {
        throw new Error(result.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('❌ Verify Email OTP error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Verify SMS OTP
  const verifySMSOTP = async (phone, otp, purpose = 'login') => {
    console.log('✅ AuthContext: Verifying SMS OTP');
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const result = await apiService.verifySMSOTP(phone, otp, purpose);
      
      if (result.success) {
        if (purpose === 'login' && result.data.user) {
          // Login successful after OTP verification
          dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: result.data.user });
          dispatch({ type: AUTH_ACTIONS.CLEAR_OTP_STEP });
          return { success: true, user: result.data.user };
        } else {
          // OTP verified for other purposes
          dispatch({ type: AUTH_ACTIONS.CLEAR_OTP_STEP });
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
          return { success: true, data: result.data };
        }
      } else {
        throw new Error(result.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('❌ Verify SMS OTP error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Login with OTP (after verification)
  const loginWithOTP = async (otpData) => {
    console.log('📱 AuthContext: Login with OTP');
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const result = await apiService.loginWithOTP(otpData);
      
      if (result.success) {
        const userData = result.data.user;
        
        // For mobile apps, store tokens if provided
        if (apiService.isMobileApp()) {
          if (result.data.accessToken) {
            localStorage.setItem('accessToken', result.data.accessToken);
          }
          if (result.data.refreshToken) {
            localStorage.setItem('refreshToken', result.data.refreshToken);
          }
        }

        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: userData });
        dispatch({ type: AUTH_ACTIONS.CLEAR_OTP_STEP });
        return { success: true, user: userData };
      } else {
        throw new Error(result.message || 'OTP login failed');
      }
    } catch (error) {
      console.error('❌ OTP login error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // ========== ADMIN AUTHENTICATION METHODS ==========

  // Admin login
  const adminLogin = async (credentials) => {
    console.log('🔑 AuthContext: Starting admin login');
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const result = await apiService.adminLogin(credentials);
      
      if (result.success) {
        const adminData = result.data.admin || result.data.user;
        dispatch({ type: AUTH_ACTIONS.ADMIN_LOGIN_SUCCESS, payload: adminData });
        console.log('✅ Admin login successful');
        return { success: true, admin: adminData };
      } else {
        throw new Error(result.message || 'Admin login failed');
      }
    } catch (error) {
      console.error('❌ Admin login error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Admin logout
  const adminLogout = async () => {
    console.log('👋 AuthContext: Admin logout');
    
    try {
      // Call logout API
      try {
        await apiService.logout();
      } catch (err) {
        console.warn('⚠️ Logout API call failed, continuing with local logout');
      }

      // Clear localStorage
      localStorage.removeItem('admin_session');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Update state
      dispatch({ type: AUTH_ACTIONS.ADMIN_LOGOUT });
      
      console.log('✅ Admin logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Admin logout error:', error);
      // Still clear local state
      dispatch({ type: AUTH_ACTIONS.ADMIN_LOGOUT });
      return { success: true };
    }
  };

  // ========== PROFILE METHODS ==========

  // Update user profile
  const updateProfile = async (profileData) => {
    console.log('✏️ AuthContext: Updating user profile');
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const result = await apiService.updateUserProfile(profileData);
      
      if (result.success) {
        dispatch({ type: AUTH_ACTIONS.UPDATE_PROFILE, payload: result.data });
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('❌ Profile update error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    console.log('🔐 AuthContext: Changing password');
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const result = await apiService.changePassword(passwordData);
      
      if (result.success) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return { success: true, message: result.message };
      } else {
        throw new Error(result.message || 'Password change failed');
      }
    } catch (error) {
      console.error('❌ Password change error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // ========== LOGOUT METHODS ==========

  // Logout user
  const logout = async () => {
    console.log('👋 AuthContext: Logging out user');
    
    try {
      // Call logout API
      await apiService.logout();
      
      // Update state
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      
      console.log('✅ Logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Still clear local state even if API call fails
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: true }; // Return success anyway since local logout worked
    }
  };

  // ========== UTILITY METHODS ==========

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Clear OTP step
  const clearOTPStep = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_OTP_STEP });
  };

  // Set loading state
  const setLoading = (loading) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: loading });
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const result = await apiService.getCurrentUser();
      if (result.success) {
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: result.data });
        return { success: true, user: result.data };
      }
      return { success: false, error: 'Failed to refresh user data' };
    } catch (error) {
      console.error('❌ Refresh user error:', error);
      return { success: false, error: error.message };
    }
  };

  // Context value
  const value = {
    // State
    user: state.user,
    admin: state.admin,
    isAuthenticated: state.isAuthenticated,
    isAdminAuthenticated: state.isAdminAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    otpStep: state.otpStep,
    
    // User Authentication Actions
    loginUser,
    registerUser,
    logout,
    
    // OTP Actions
    sendEmailOTP,
    sendSMSOTP,
    verifyEmailOTP,
    verifySMSOTP,
    loginWithOTP,
    
    // Admin Actions
    adminLogin,
    adminLogout,
    
    // Profile Actions
    updateProfile,
    changePassword,
    
    // Utility Actions
    clearError,
    clearOTPStep,
    setLoading,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Export the context itself (in case needed)
export default AuthContext;