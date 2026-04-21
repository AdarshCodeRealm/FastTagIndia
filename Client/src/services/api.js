// API Service for FASTag India Backend Integration
import config from '../config/environment';
import { BASE_URL } from '../constants/api';
const API_BASE_URL = BASE_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  // Helper method to detect mobile app
  isMobileApp() {
    return typeof window !== 'undefined' && 
           (navigator.userAgent.includes('Mobile') || 
            window.ReactNativeWebView);
  }

  // Helper method to get stored token for mobile
  getStoredToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  // Helper method to make HTTP requests with enhanced error handling
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      credentials: 'include', // Include cookies for CORS requests
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    // For mobile app, add Authorization header if token exists
    if (this.isMobileApp()) {
      const token = this.getStoredToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    // Log request details only in development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log('🌐 API Request:', {
        method: config.method || 'GET',
        url,
        headers: config.headers,
        body: config.body ? JSON.parse(config.body) : null,
      });
    }

    try {
      const response = await fetch(url, config);
      
      // Handle 401 - Token refresh logic
      if (response.status === 401 && !options._retry) {
        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then(() => {
            return this.makeRequest(endpoint, { ...options, _retry: true });
          });
        }

        this.isRefreshing = true;

        try {
          await this.refreshToken();
          this.processQueue(null);
          // Retry original request
          return this.makeRequest(endpoint, { ...options, _retry: true });
        } catch (refreshError) {
          this.processQueue(refreshError);
          this.handleAuthError();
          throw refreshError;
        } finally {
          this.isRefreshing = false;
        }
      }

      // Try to parse response as JSON
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (parseError) {
          console.error('❌ Failed to parse JSON response:', parseError);
          throw new Error('Invalid response from server');
        }
      } else {
        // If response is not JSON, it might be HTML error page (CORS error from browser)
        const textData = await response.text();
        if (textData.includes('<!DOCTYPE') || textData.includes('<html')) {
          console.error('❌ CORS Error: Server returned HTML instead of JSON');
          throw new Error('CORS Error: Backend server may not have proper CORS headers configured. Please ensure the backend allows cross-origin requests from ' + window.location.origin);
        }
        throw new Error('Server returned invalid response format');
      }

      // Only log in development
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        console.log('📥 API Response:', {
          status: response.status,
          statusText: response.statusText,
          data,
        });
      }

      // Handle different error status codes
      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please wait and try again.');
        } else if (response.status === 403) {
          throw new Error('Access forbidden. You do not have permission to access this resource.');
        } else if (response.status === 404) {
          throw new Error('Endpoint not found. Please check the API URL configuration.');
        } else {
          throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
        }
      }

      return data;
    } catch (error) {
      console.error('❌ API Request failed:', {
        endpoint,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  // Token refresh logic
  async refreshToken() {
    try {
      const response = await fetch(`${this.baseURL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success && this.isMobileApp()) {
        // For mobile, store new tokens
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
        }
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
      }
      
      if (!data.success) {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      throw error;
    }
  }

  // Process failed queue after token refresh
  processQueue(error) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
    this.failedQueue = [];
  }

  // Handle authentication errors
  handleAuthError() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
  }

  // ========== AUTHENTICATION METHODS ==========
  
  // User Registration
  async registerUser(userData) {
    console.log('👤 API: Registering new user:', {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    });

    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
      }),
    });
  }

  // User Login
  async loginUser(credentials) {
    console.log('🔑 API: Attempting user login with credentials:', {
      email: credentials.email,
      hasPassword: !!credentials.password,
    });

    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
  }

  // OTP Login
  async loginWithOTP(data) {
    console.log('📱 API: OTP Login attempt');
    return this.makeRequest('/auth/login-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Send Email OTP
  async sendEmailOTP(email, purpose = 'login') {
    console.log('📧 API: Sending email OTP to:', email);
    return this.makeRequest('/auth/send-email-otp', {
      method: 'POST',
      body: JSON.stringify({ email, purpose }),
    });
  }

  // Send SMS OTP
  async sendSMSOTP(phone, purpose = 'login', otpContext = {}) {
    console.log('📱 API: Sending SMS OTP to:', phone);
    const origin = otpContext.origin || config.OTP_ORIGIN || 'fasttag';
    const fasttag = typeof otpContext.fasttag === 'boolean' ? otpContext.fasttag : origin === 'fasttag';
    return this.makeRequest('/auth/send-sms-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, purpose, origin, fasttag }),
    });
  }

  // Send Signup OTP
  async sendSignupOTP(phone, purpose = 'signup', otpContext = {}) {
    console.log('📱 API: Sending signup OTP to:', phone);
    const origin = otpContext.origin || config.OTP_ORIGIN || 'fasttag';
    const fasttag = typeof otpContext.fasttag === 'boolean' ? otpContext.fasttag : origin === 'fasttag';
    return this.makeRequest('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, purpose, origin, fasttag }),
    });
  }

  // Verify Email OTP
  async verifyEmailOTP(email, otp, purpose = 'login') {
    console.log('✅ API: Verifying email OTP');
    return this.makeRequest('/auth/verify-email-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp, purpose }),
    });
  }

  // Verify SMS OTP
  async verifySMSOTP(phone, otp, purpose = 'login', otpContext = {}) {
    console.log('✅ API: Verifying SMS OTP');
    return this.makeRequest('/auth/verify-sms-otp', {
      method: 'POST',
      body: JSON.stringify({
        phone,
        otp,
        purpose,
        origin: otpContext.origin || config.OTP_ORIGIN || 'fasttag',
        fasttag: typeof otpContext.fasttag === 'boolean' ? otpContext.fasttag : (otpContext.origin || config.OTP_ORIGIN || 'fasttag') === 'fasttag',
      }),
    });
  }

  // Complete Signup With OTP
  async signupWithOTP(userData, otpContext = {}) {
    console.log('👤 API: Completing signup with OTP:', {
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile || userData.phone,
    });

    const origin = otpContext.origin || config.OTP_ORIGIN || 'fasttag';
    const fasttag = typeof otpContext.fasttag === 'boolean' ? otpContext.fasttag : origin === 'fasttag';

    return this.makeRequest('/auth/signup-with-otp', {
      method: 'POST',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile || userData.phone,
        otp: userData.otp,
        purpose: userData.purpose || 'signup',
        origin,
        fasttag,
      }),
    });
  }

  // Admin Login
  async adminLogin(credentials) {
    console.log('🔑 API: Admin login attempt');
    console.log('📧 Email:', credentials.email);
    return this.makeRequest('/auth/admin-login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Get Current User
  async getCurrentUser() {
    console.log('👤 API: Getting current user');
    return this.makeRequest('/auth/current-user', {
      method: 'GET',
    });
  }

  // Logout
  async logout() {
    console.log('👋 API: Logging out user');
    
    try {
      const result = await this.makeRequest('/auth/logout', {
        method: 'POST',
      });
      
      // Clear tokens for mobile
      if (this.isMobileApp()) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      
      return result;
    } catch (error) {
      console.warn('⚠️ Logout API call failed, but continuing with local logout:', error);
      // Clear tokens anyway
      if (this.isMobileApp()) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      return { success: true };
    }
  }

  // ========== USER PROFILE METHODS ==========

  // Get user profile
  async getUserProfile() {
    console.log('👤 API: Getting user profile');
    return this.makeRequest('/user/profile', { method: 'GET' });
  }

  // Update user profile
  async updateUserProfile(profileData) {
    console.log('✏️ API: Updating user profile');
    return this.makeRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Change password
  async changePassword(passwordData) {
    console.log('🔐 API: Changing password');
    return this.makeRequest('/user/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }

  // Get user wallet
  async getUserWallet() {
    console.log('💰 API: Getting user wallet');
    return this.makeRequest('/user/wallet', { method: 'GET' });
  }

  // Get user transactions
  async getUserTransactions(page = 1, limit = 10) {
    console.log('📋 API: Getting user transactions');
    return this.makeRequest(`/user/transactions?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  }

  // ========== FASTAG METHODS ==========

  // Get user's FASTags
  async getFASTags() {
    console.log('🏷️ API: Getting user FASTags');
    return this.makeRequest('/user/fastag/list', { method: 'GET' });
  }

  // Get specific FASTag
  async getFASTag(id) {
    console.log('🏷️ API: Getting FASTag:', id);
    return this.makeRequest(`/user/fastag/${id}`, { method: 'GET' });
  }

  // Purchase FASTag
  async purchaseFASTag(orderData) {
    console.log('🛒 API: Creating FASTag purchase order');
    return this.makeRequest('/user/fastag/purchase', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Recharge FASTag
  async rechargeFASTag(rechargeData) {
    console.log('⚡ API: Processing FASTag recharge');
    return this.makeRequest('/user/fastag/recharge', {
      method: 'POST',
      body: JSON.stringify(rechargeData),
    });
  }

  // Get FASTag balance
  async getFASTagBalance(id) {
    console.log('💰 API: Getting FASTag balance:', id);
    return this.makeRequest(`/user/fastag/${id}/balance`, { method: 'GET' });
  }

  // Get FASTag history
  async getFASTagHistory(id, page = 1, limit = 10) {
    console.log('📋 API: Getting FASTag history:', id);
    return this.makeRequest(`/user/fastag/${id}/history?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  }

  // ========== VEHICLE METHODS ==========

  // Add vehicle
  async addVehicle(vehicleData) {
    console.log('🚗 API: Adding vehicle');
    return this.makeRequest('/user/vehicle/add', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    });
  }

  // Get user vehicles
  async getUserVehicles() {
    console.log('🚗 API: Getting user vehicles');
    return this.makeRequest('/user/vehicle/list', { method: 'GET' });
  }

  // Update vehicle
  async updateVehicle(id, vehicleData) {
    console.log('🚗 API: Updating vehicle:', id);
    return this.makeRequest(`/user/vehicle/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    });
  }

  // Delete vehicle
  async deleteVehicle(id) {
    console.log('🚗 API: Deleting vehicle:', id);
    return this.makeRequest(`/user/vehicle/${id}`, { method: 'DELETE' });
  }

  // Verify vehicle
  async verifyVehicle(vehicleNumber) {
    console.log('🚗 API: Verifying vehicle:', vehicleNumber);
    return this.makeRequest('/user/vehicle/verify', {
      method: 'POST',
      body: JSON.stringify({ vehicleNumber }),
    });
  }

  // ========== ORDER METHODS ==========

  // Create order
  async createOrder(orderData) {
    console.log('📦 API: Creating order');
    return this.makeRequest('/user/order/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Get user orders
  async getUserOrders(page = 1, limit = 10) {
    console.log('📦 API: Getting user orders');
    return this.makeRequest(`/user/order/list?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  }

  // Get specific order
  async getOrder(orderId) {
    console.log('📦 API: Getting order:', orderId);
    return this.makeRequest(`/user/order/${orderId}`, { method: 'GET' });
  }

  // Track order
  async trackOrder(orderId) {
    console.log('📦 API: Tracking order:', orderId);
    return this.makeRequest(`/user/order/${orderId}/track`, { method: 'GET' });
  }

  // Cancel order
  async cancelOrder(orderId) {
    console.log('📦 API: Cancelling order:', orderId);
    return this.makeRequest(`/user/order/${orderId}/cancel`, {
      method: 'PUT',
    });
  }

  // ========== SUPPORT METHODS ==========

  // Create support ticket
  async createSupportTicket(ticketData) {
    console.log('🎫 API: Creating support ticket');
    return this.makeRequest('/user/support/ticket', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  }

  // Get user tickets
  async getUserTickets() {
    console.log('🎫 API: Getting user tickets');
    return this.makeRequest('/user/support/tickets', { method: 'GET' });
  }

  // Get specific ticket
  async getTicket(ticketId) {
    console.log('🎫 API: Getting ticket:', ticketId);
    return this.makeRequest(`/user/support/ticket/${ticketId}`, { method: 'GET' });
  }

  // Add message to ticket
  async addTicketMessage(ticketId, message) {
    console.log('💬 API: Adding message to ticket:', ticketId);
    return this.makeRequest(`/user/support/ticket/${ticketId}/message`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // ========== PAYMENT METHODS ==========

  // Initialize payment
  async initializePayment(paymentData) {
    console.log('💳 API: Initializing payment');
    return this.makeRequest('/payment/initialize', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Verify payment
  async verifyPayment(verificationData) {
    console.log('✅ API: Verifying payment');
    return this.makeRequest('/payment/verify', {
      method: 'POST',
      body: JSON.stringify(verificationData),
    });
  }

  // Get payment methods
  async getPaymentMethods() {
    console.log('💳 API: Getting payment methods');
    return this.makeRequest('/payment/methods', { method: 'GET' });
  }

  // ========== COMMON METHODS ==========

  // Get banks
  async getBanks() {
    console.log('🏦 API: Fetching available banks');
    return this.makeRequest('/banks', { method: 'GET' });
  }

  // Upload document
  async uploadDocument(file, documentType) {
    console.log('📄 API: Uploading document:', {
      type: documentType,
      filename: file.name,
      size: file.size,
    });

    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', documentType);

    const config = {
      method: 'POST',
      body: formData,
      // Remove Content-Type header to let browser set it with boundary
      headers: {
        ...this.defaultHeaders,
        'Content-Type': undefined,
      },
    };

    // Remove undefined Content-Type
    delete config.headers['Content-Type'];

    return this.makeRequest('/upload/document', config);
  }

  // Upload image
  async uploadImage(file) {
    console.log('🖼️ API: Uploading image:', file.name);

    const formData = new FormData();
    formData.append('image', file);

    const config = {
      method: 'POST',
      body: formData,
      headers: {
        ...this.defaultHeaders,
        'Content-Type': undefined,
      },
    };

    delete config.headers['Content-Type'];

    return this.makeRequest('/upload/image', config);
  }

  // Health check
  async checkServerHealth() {
    console.log('🏥 API: Checking server health');
    return this.makeRequest('/health', { method: 'GET' });
  }

  // ========== ADMIN METHODS ==========

  // Check if admin endpoints are available
  async isAdminEndpointAvailable() {
    try {
      const response = await fetch(`${this.baseURL}/admin/health`, {
        method: 'GET',
        credentials: 'include',
        signal: AbortSignal.timeout(2000), // 2 second timeout
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Admin Dashboard Stats
  async getAdminDashboardStats() {
    console.log('📊 API: Getting admin dashboard stats');
    try {
      return await this.makeRequest('/admin/dashboard/stats', { method: 'GET' });
    } catch (error) {
      console.warn('⚠️ Admin dashboard stats endpoint unavailable, client should use fallback data:', error.message);
      throw error;
    }
  }

  // Get all users (admin)
  async getUsers(page = 1, limit = 10, filters = {}) {
    console.log('👥 API: Getting users (admin)');
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });
      return await this.makeRequest(`/admin/users?${queryParams}`, { method: 'GET' });
    } catch (error) {
      console.warn('⚠️ Get users endpoint unavailable, client should use fallback data:', error.message);
      throw error;
    }
  }

  // Get specific user (admin)
  async getUser(userId) {
    console.log('👤 API: Getting user (admin):', userId);
    return this.makeRequest(`/admin/users/${userId}`, { method: 'GET' });
  }

  // Update user status (admin)
  async updateUserStatus(userId, status) {
    console.log('🔄 API: Updating user status (admin):', userId, status);
    return this.makeRequest(`/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Get pending KYC (admin)
  async getPendingKYC() {
    console.log('📋 API: Getting pending KYC (admin)');
    return this.makeRequest('/admin/kyc/pending', { method: 'GET' });
  }

  // Approve KYC (admin)
  async approveKYC(kycId) {
    console.log('✅ API: Approving KYC (admin):', kycId);
    return this.makeRequest(`/admin/kyc/${kycId}/approve`, { method: 'PUT' });
  }

  // Reject KYC (admin)
  async rejectKYC(kycId, reason) {
    console.log('❌ API: Rejecting KYC (admin):', kycId);
    return this.makeRequest(`/admin/kyc/${kycId}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  }

  // Get all transactions (admin)
  async getAllTransactions(page = 1, limit = 10, filters = {}) {
    console.log('💰 API: Getting all transactions (admin)');
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });
    return this.makeRequest(`/admin/transactions?${queryParams}`, { method: 'GET' });
  }

  // Get all support tickets (admin)
  async getAllSupportTickets(page = 1, limit = 10, filters = {}) {
    console.log('🎫 API: Getting all support tickets (admin)');
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });
    return this.makeRequest(`/admin/support/tickets?${queryParams}`, { method: 'GET' });
  }

  // Assign ticket (admin)
  async assignTicket(ticketId, adminId) {
    console.log('👨‍💼 API: Assigning ticket (admin):', ticketId, adminId);
    return this.makeRequest(`/admin/support/ticket/${ticketId}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ adminId }),
    });
  }

  // Reply to ticket (admin)
  async replyToTicket(ticketId, message) {
    console.log('💬 API: Replying to ticket (admin):', ticketId);
    return this.makeRequest(`/admin/support/ticket/${ticketId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Update ticket status (admin)
  async updateTicketStatus(ticketId, status) {
    console.log('🔄 API: Updating ticket status (admin):', ticketId, status);
    return this.makeRequest(`/admin/support/ticket/${ticketId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // ========== UTILITY METHODS ==========

  // Method to update base URL (useful for different environments)
  updateBaseURL(newURL) {
    console.log('🔄 API: Updating base URL from', this.baseURL, 'to', newURL);
    this.baseURL = newURL;
  }

  // Method to add authentication token to headers (for mobile)
  setAuthToken(token) {
    if (token) {
      localStorage.setItem('accessToken', token);
      console.log('🔐 API: Auth token stored');
    } else {
      localStorage.removeItem('accessToken');
      console.log('🔓 API: Auth token removed');
    }
  }
}

// Create and export a single instance
const apiService = new ApiService();

export default apiService;

// Named exports for specific methods if needed
export {
  apiService,
  API_BASE_URL,
};