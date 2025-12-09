# FASTag India - Frontend Integration Guide

## Project Overview
This guide provides complete frontend integration for the FASTag India project, covering React.js/Next.js implementation with your Node.js backend, authentication with role-based access, state management, and UI components.

## Technology Stack
- **Framework**: React.js 18+ with Next.js 14+ (App Router)
- **State Management**: Redux Toolkit + RTK Query / Zustand
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: JWT with HTTP-only cookies + localStorage fallback
- **Forms**: React Hook Form + Zod validation
- **Payment**: Razorpay SDK integration
- **File Upload**: React Dropzone
- **Charts**: Recharts/Chart.js
- **Icons**: Lucide React
- **Date**: date-fns
- **HTTP Client**: Axios/Fetch with interceptors

## Project Structure
```
fasttag-frontend/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── verify-email/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── fastag/page.tsx
│   │   │   ├── vehicles/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── transactions/page.tsx
│   │   │   └── support/page.tsx
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   │       ├── dashboard/page.tsx
│   │   │       ├── users/page.tsx
│   │   │       ├── kyc/page.tsx
│   │   │       ├── transactions/page.tsx
│   │   │       └── support/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── OTPVerification.tsx
│   │   │   └── PasswordReset.tsx
│   │   ├── dashboard/
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── RecentTransactions.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── WalletBalance.tsx
│   │   ├── fastag/
│   │   │   ├── FASTagCard.tsx
│   │   │   ├── RechargeModal.tsx
│   │   │   ├── PurchaseFlow.tsx
│   │   │   └── BalanceHistory.tsx
│   │   ├── profile/
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── KYCUpload.tsx
│   │   │   ├── ChangePassword.tsx
│   │   │   └── NotificationSettings.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── Footer.tsx
│   │   └── common/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── Pagination.tsx
│   │       ├── DataTable.tsx
│   │       └── FileUpload.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts          # Axios/Fetch client
│   │   │   ├── auth.ts            # Auth endpoints
│   │   │   ├── user.ts            # User endpoints  
│   │   │   ├── fastag.ts          # FASTag endpoints
│   │   │   ├── payment.ts         # Payment endpoints
│   │   │   └── admin.ts           # Admin endpoints
│   │   ├── store/
│   │   │   ├── index.ts           # Redux store setup
│   │   │   ├── authSlice.ts       # Auth state
│   │   │   ├── userSlice.ts       # User data state
│   │   │   ├── fastagSlice.ts     # FASTag state
│   │   │   └── adminSlice.ts      # Admin state
│   │   ├── hooks/
│   │   │   ├── useAuth.ts         # Auth hook
│   │   │   ├── useApi.ts          # API hook
│   │   │   ├── useLocalStorage.ts # LocalStorage hook
│   │   │   └── useDebounce.ts     # Debounce hook
│   │   ├── utils/
│   │   │   ├── constants.ts       # App constants
│   │   │   ├── formatters.ts      # Data formatters
│   │   │   ├── validators.ts      # Form validators
│   │   │   ├── helpers.ts         # Utility functions
│   │   │   └── cn.ts             # className utility
│   │   └── types/
│   │       ├── auth.ts           # Auth types
│   │       ├── user.ts           # User types
│   │       ├── fastag.ts         # FASTag types
│   │       └── api.ts            # API response types
│   ├── middleware.ts              # Next.js middleware
│   └── env.ts                     # Environment validation
├── public/
│   ├── icons/
│   ├── images/
│   └── logos/
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## API Client Setup

### Base API Client Configuration
```typescript
// lib/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
  errors?: string[];
}

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      withCredentials: true, // Important for cookies
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - Add auth token for mobile
    this.client.interceptors.request.use(
      (config) => {
        if (this.isMobileApp()) {
          const token = localStorage.getItem('accessToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - Handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              return this.client(originalRequest);
            }).catch(err => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            await this.refreshToken();
            this.processQueue(null);
            return this.client(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);
            this.handleAuthError();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle other errors
        this.handleApiError(error);
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<void> {
    const response = await this.client.post('/auth/refresh-token');
    
    if (response.data.success) {
      if (this.isMobileApp() && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    } else {
      throw new Error('Token refresh failed');
    }
  }

  private processQueue(error: any) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
    this.failedQueue = [];
  }

  private handleAuthError() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  }

  private handleApiError(error: any) {
    const message = error.response?.data?.message || 'An error occurred';
    
    if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please wait and try again.');
    } else {
      toast.error(message);
    }
  }

  private isMobileApp(): boolean {
    return typeof window !== 'undefined' && 
           (navigator.userAgent.includes('Mobile') || 
            (window as any).ReactNativeWebView);
  }

  // Generic request method
  async request<T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.request(config);
    return response.data;
  }

  // HTTP methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }
}

export const apiClient = new ApiClient();
export type { ApiResponse };
```

## 🔐 Authentication System Overview

The backend now supports **role-based authentication** with separate endpoints for users and admins:

### Login Endpoints:
- **User Login**: `POST /api/auth/login` (role: 'user')
- **Admin Login**: `POST /api/auth/admin-login` (role: 'admin' or 'superadmin')

### User Roles:
- `user` - Regular customers
- `admin` - Admin users 
- `superadmin` - Super admin users

### Authentication API
```typescript
// lib/api/auth.ts
import { apiClient, ApiResponse } from './client';
import { LoginCredentials, RegisterData, User, OTPData } from '../types/auth';

export class AuthAPI {
  // User Registration
  static async register(data: RegisterData): Promise<ApiResponse<{ user: User }>> {
    return apiClient.post('/auth/register', data);
  }

  // User Login (Regular users only)
  static async loginUser(credentials: LoginCredentials): Promise<ApiResponse<{
    user: User;
    accessToken?: string;
    refreshToken?: string;
  }>> {
    return apiClient.post('/auth/login', credentials);
  }

  // Admin Login (Admin users only) 
  static async loginAdmin(credentials: LoginCredentials): Promise<ApiResponse<{
    user: User;
    accessToken?: string;
    refreshToken?: string;
    isAdmin: boolean;
  }>> {
    return apiClient.post('/auth/admin-login', credentials);
  }

  // OTP Login
  static async loginWithOTP(data: OTPData): Promise<ApiResponse<{
    user: User;
    accessToken?: string;
    refreshToken?: string;
  }>> {
    return apiClient.post('/auth/login-otp', data);
  }

  // Send Email OTP
  static async sendEmailOTP(email: string, purpose: string): Promise<ApiResponse<{
    identifier: string;
    type: string;
    purpose: string;
    expiresAt: string;
    otpId: string;
  }>> {
    return apiClient.post('/auth/send-email-otp', { email, purpose });
  }

  // Send SMS OTP
  static async sendSMSOTP(phone: string, purpose: string): Promise<ApiResponse<{
    identifier: string;
    type: string;
    purpose: string;
    expiresAt: string;
    otpId: string;
  }>> {
    return apiClient.post('/auth/send-sms-otp', { phone, purpose });
  }

  // Verify Email OTP
  static async verifyEmailOTP(email: string, otp: string, purpose: string): Promise<ApiResponse> {
    return apiClient.post('/auth/verify-email-otp', { email, otp, purpose });
  }

  // Verify SMS OTP
  static async verifySMSOTP(phone: string, otp: string, purpose: string): Promise<ApiResponse> {
    return apiClient.post('/auth/verify-sms-otp', { phone, otp, purpose });
  }

  // Forgot Password
  static async forgotPassword(email: string): Promise<ApiResponse> {
    return apiClient.post('/auth/forgot-password', { email });
  }

  // Reset Password
  static async resetPassword(email: string, otp: string, newPassword: string): Promise<ApiResponse> {
    return apiClient.post('/auth/reset-password', { email, otp, newPassword });
  }

  // Get Current User
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get('/auth/current-user');
  }

  // Logout
  static async logout(): Promise<ApiResponse> {
    return apiClient.post('/auth/logout');
  }

  // Refresh Token
  static async refreshToken(): Promise<ApiResponse<{
    accessToken: string;
    refreshToken: string;
  }>> {
    return apiClient.post('/auth/refresh-token');
  }
}
```

### FASTag API
```typescript
// lib/api/fastag.ts
import { apiClient, ApiResponse } from './client';
import { FASTag, RechargeData, PurchaseData } from '../types/fastag';

export class FASTagAPI {
  // Get user's FASTag list
  static async getFASTags(): Promise<ApiResponse<FASTag[]>> {
    return apiClient.get('/user/fastag/list');
  }

  // Get specific FASTag details
  static async getFASTag(id: string): Promise<ApiResponse<FASTag>> {
    return apiClient.get(`/user/fastag/${id}`);
  }

  // Purchase new FASTag
  static async purchaseFASTag(data: PurchaseData): Promise<ApiResponse<{
    orderId: string;
    paymentDetails: any;
  }>> {
    return apiClient.post('/user/fastag/purchase', data);
  }

  // Recharge FASTag
  static async rechargeFASTag(data: RechargeData): Promise<ApiResponse<{
    transactionId: string;
    paymentDetails: any;
  }>> {
    return apiClient.post('/user/fastag/recharge', data);
  }

  // Get FASTag balance
  static async getFASTagBalance(id: string): Promise<ApiResponse<{
    balance: number;
    lastUpdated: string;
  }>> {
    return apiClient.get(`/user/fastag/${id}/balance`);
  }

  // Get FASTag transaction history
  static async getFASTagHistory(id: string, page = 1, limit = 10): Promise<ApiResponse<{
    transactions: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>> {
    return apiClient.get(`/user/fastag/${id}/history?page=${page}&limit=${limit}`);
  }
}
```

## State Management with Redux Toolkit

### Store Setup
```typescript
// lib/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { userSlice } from './userSlice';
import { fastagSlice } from './fastagSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    fastag: fastagSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Auth State Management
```typescript
// lib/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthAPI } from '../api/auth';
import { User, LoginCredentials, RegisterData } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  otpStep: {
    isActive: boolean;
    type: 'email' | 'sms' | null;
    identifier: string;
    purpose: string;
  };
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  otpStep: {
    isActive: false,
    type: null,
    identifier: '',
    purpose: '',
  },
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.loginUser(credentials);
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.loginAdmin(credentials);
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Admin login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.register(userData);
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const sendEmailOTP = createAsyncThunk(
  'auth/sendEmailOTP',
  async ({ email, purpose }: { email: string; purpose: string }, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.sendEmailOTP(email, purpose);
      if (response.success) {
        return { email, purpose, data: response.data };
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
    }
  }
);

export const verifyEmailOTP = createAsyncThunk(
  'auth/verifyEmailOTP',
  async ({ email, otp, purpose }: { email: string; otp: string; purpose: string }, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.verifyEmailOTP(email, otp, purpose);
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.getCurrentUser();
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      return rejectWithValue('Failed to get user data');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await AuthAPI.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    } catch (error: any) {
      return rejectWithValue('Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOTPStep: (state) => {
      state.otpStep = {
        isActive: false,
        type: null,
        identifier: '',
        purpose: '',
      };
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Admin login cases
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Send Email OTP cases
      .addCase(sendEmailOTP.fulfilled, (state, action) => {
        state.otpStep = {
          isActive: true,
          type: 'email',
          identifier: action.payload.email,
          purpose: action.payload.purpose,
        };
      })
      
      // Verify Email OTP cases
      .addCase(verifyEmailOTP.fulfilled, (state) => {
        state.otpStep = {
          isActive: false,
          type: null,
          identifier: '',
          purpose: '',
        };
      })
      
      // Get current user cases
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, clearOTPStep, setAuthLoading } = authSlice.actions;
export { authSlice };
```

## React Components

### Authentication Components
```tsx
// components/auth/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { loginUser, loginAdmin, sendEmailOTP, sendSMSOTP } from '@/lib/store/authSlice';
import { RootState, AppDispatch } from '@/lib/store';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const otpSchema = z.object({
  identifier: z.string().min(1, 'Email or phone is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'password' | 'otp'>('password');
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onUserLogin = async (data: LoginFormData) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      router.push('/dashboard');
    }
  };

  const onAdminLogin = async (data: LoginFormData) => {
    const result = await dispatch(loginAdmin(data));
    if (loginAdmin.fulfilled.match(result)) {
      router.push('/admin/dashboard');
    }
  };

  const onOTPRequest = async (data: OTPFormData) => {
    const isEmail = data.identifier.includes('@');
    
    if (isEmail) {
      await dispatch(sendEmailOTP({ 
        email: data.identifier, 
        purpose: 'login' 
      }));
    } else {
      await dispatch(sendSMSOTP({ 
        phone: data.identifier, 
        purpose: 'login' 
      }));
    }
  };

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">
          Welcome to FASTag India
        </CardTitle>
        <CardDescription>
          Choose your login type and sign in
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={userType} onValueChange={(value) => setUserType(value as 'user' | 'admin')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              User Login
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin Login
            </TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="user">
            <form onSubmit={loginForm.handleSubmit(onUserLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="adarshramgirwar1@gmail.com"
                    className="pl-10"
                    {...loginForm.register('email')}
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-password">Password</Label>
                <div className="relative">
                  <Input
                    id="user-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...loginForm.register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In as User'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="admin">
            <form onSubmit={loginForm.handleSubmit(onAdminLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@nexara.com"
                    className="pl-10"
                    {...loginForm.register('email')}
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter admin password"
                    {...loginForm.register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In as Admin'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center space-y-2">
          <Button
            variant="link"
            onClick={() => router.push('/forgot-password')}
            className="text-sm"
          >
            Forgot Password?
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button
              variant="link"
              onClick={() => router.push('/register')}
              className="p-0 h-auto text-primary"
            >
              Sign up
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
```

### OTP Verification Component
```tsx
// components/auth/OTPVerification.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Timer, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { verifyEmailOTP, verifySMSOTP, sendEmailOTP, sendSMSOTP } from '@/lib/store/authSlice';
import { RootState, AppDispatch } from '@/lib/store';

interface OTPVerificationProps {
  onVerificationSuccess: () => void;
  onBack: () => void;
}

export function OTPVerification({ onVerificationSuccess, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const dispatch = useDispatch<AppDispatch>();
  const { otpStep, isLoading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;

    const verifyAction = otpStep.type === 'email' ? verifyEmailOTP : verifySMSOTP;
    const params = otpStep.type === 'email' 
      ? { email: otpStep.identifier, otp: otpValue, purpose: otpStep.purpose }
      : { phone: otpStep.identifier, otp: otpValue, purpose: otpStep.purpose };

    const result = await dispatch(verifyAction(params));
    if (verifyAction.fulfilled.match(result)) {
      onVerificationSuccess();
    }
  };

  const handleResend = async () => {
    const resendAction = otpStep.type === 'email' ? sendEmailOTP : sendSMSOTP;
    const params = otpStep.type === 'email'
      ? { email: otpStep.identifier, purpose: otpStep.purpose }
      : { phone: otpStep.identifier, purpose: otpStep.purpose };

    await dispatch(resendAction(params));
    setTimeLeft(300);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!otpStep.isActive) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Verify OTP
        </CardTitle>
        <CardDescription>
          We've sent a verification code to your {otpStep.type === 'email' ? 'email' : 'phone'}
          <br />
          <span className="font-medium">{otpStep.identifier}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <Label className="text-center block">Enter 6-digit code</Label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
              />
            ))}
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span>Time remaining: {formatTime(timeLeft)}</span>
          </div>

          <Button
            variant="link"
            onClick={handleResend}
            disabled={!canResend || isLoading}
            className="text-sm"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Resend OTP
          </Button>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleVerify}
            disabled={otp.join('').length !== 6 || isLoading}
            className="w-full"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <Button
            variant="outline"
            onClick={onBack}
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Dashboard Components
```tsx
// components/dashboard/DashboardStats.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreditCard, Wallet, Car, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

import { getUserDashboardStats } from '@/lib/store/userSlice';
import { RootState, AppDispatch } from '@/lib/store';

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
}

export function DashboardStats() {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardStats, isLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserDashboardStats());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const stats: StatCard[] = [
    {
      title: 'Total Balance',
      value: `₹${dashboardStats?.totalBalance || '0'}`,
      icon: <Wallet className="h-6 w-6 text-green-600" />,
      change: '+2.5% from last month'
    },
    {
      title: 'Active FASTags',
      value: dashboardStats?.activeFASTags?.toString() || '0',
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
    },
    {
      title: 'Registered Vehicles',
      value: dashboardStats?.totalVehicles?.toString() || '0',
      icon: <Car className="h-6 w-6 text-purple-600" />,
    },
    {
      title: 'This Month Usage',
      value: `₹${dashboardStats?.monthlyUsage || '0'}`,
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      change: '+12% from last month'
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.change && (
              <p className="text-xs text-green-600 mt-1">
                {stat.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

## Payment Integration

### Razorpay Integration
```tsx
// components/payment/RazorpayCheckout.tsx
'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { PaymentAPI } from '@/lib/api/payment';

interface RazorpayCheckoutProps {
  amount: number;
  orderId: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayCheckout({
  amount,
  orderId,
  onSuccess,
  onError,
  disabled = false,
  children
}: RazorpayCheckoutProps) {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      // Initialize payment with backend
      const response = await PaymentAPI.initializePayment({
        amount,
        orderId,
        currency: 'INR'
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      const { orderId: razorpayOrderId, key } = response.data;

      const options = {
        key,
        amount: amount * 100,
        currency: 'INR',
        name: 'FASTag India',
        description: 'FASTag Purchase/Recharge',
        image: '/logo.png',
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          try {
            // Verify payment with backend
            const verifyResponse = await PaymentAPI.verifyPayment({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });

            if (verifyResponse.success) {
              onSuccess(response.razorpay_payment_id);
              toast.success('Payment successful!');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error: any) {
            onError(error);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999'
        },
        notes: {
          orderId
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled');
          }
        }
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        throw new Error('Razorpay SDK not loaded');
      }

    } catch (error: any) {
      onError(error);
      toast.error(error.message || 'Payment initialization failed');
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled}
      className="w-full"
    >
      {children || `Pay ₹${amount}`}
    </Button>
  );
}
```

## Environment Configuration

### Environment Variables
```typescript
// env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  NODE_ENV: process.env.NODE_ENV,
});
```

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig;
```

## Authentication Middleware

### Next.js Middleware
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const publicRoutes = ['/login', '/register', '/forgot-password', '/verify-email'];
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get('accessToken')?.value;
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  // Verify token if exists
  let isValidToken = false;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      isValidToken = true;
    } catch (error) {
      // Token is invalid
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
    }
  }

  // Redirect logic
  if (isAuthRoute && isValidToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicRoute && !isValidToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## Deployment Considerations

### Performance Optimizations
```typescript
// lib/utils/performance.ts

// Lazy loading for heavy components
export const LazyAdminDashboard = lazy(() => import('@/components/admin/Dashboard'));
export const LazyPaymentModal = lazy(() => import('@/components/payment/PaymentModal'));

// Image optimization
export const optimizedImageProps = {
  quality: 75,
  format: 'webp',
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
};

// API request debouncing
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

### Error Handling
```tsx
// components/common/ErrorBoundary.tsx
'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <Alert className="max-w-md">
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription className="mt-2">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </AlertDescription>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
              variant="outline"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reload Page
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Protected Routes by Role
```tsx
// components/auth/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin' | 'superadmin';
  allowedRoles?: ('user' | 'admin' | 'superadmin')[];
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  allowedRoles = ['user'] 
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.push('/unauthorized');
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role as any)) {
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, user, requiredRole, allowedRoles, router]);

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}

// Usage in pages
export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
```

## 🔑 Default Credentials for Testing

After running the database seeding script, use these credentials:

### Admin Login:
- **Email**: `admin@nexara.com`
- **Password**: `Admin@123`
- **Endpoint**: `/api/auth/admin-login`

### Test User Login:
- **Email**: `adarshramgirwar1@gmail.com`  
- **Password**: `securepassword123`
- **Endpoint**: `/api/auth/login`

### New User Registration:
- **Email**: `mirza54727@gmail.com`
- **Password**: `Mirza@123`
- **Phone**: `7758802247`
- **Endpoint**: `/api/auth/register`

This Frontend Integration Guide provides:

1. **Complete API Integration** - Axios client with interceptors, token refresh, error handling
2. **State Management** - Redux Toolkit with async thunks for all API operations
3. **Authentication Flow** - Login, register, OTP verification with proper state management
4. **UI Components** - Modern, accessible components using shadcn/ui
5. **Payment Integration** - Razorpay integration with proper verification
6. **Error Handling** - Comprehensive error boundaries and API error handling
7. **Performance** - Code splitting, lazy loading, debouncing
8. **Security** - Proper token management, middleware protection
9. **TypeScript** - Full type safety throughout the application

Your backend guide covers the server architecture well, but this frontend guide is essential for complete integration. Both guides together provide a full-stack development roadmap for your FASTag India project.