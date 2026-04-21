# FASTag India Backend Development Guide

## Project Overview
This guide provides a complete end-to-end backend architecture for the FASTag India project, including user management, admin panel, payment processing, and mobile app support with cookie-based authentication.

## Technology Stack
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens + HTTP-only cookies
- **Payment Gateway**: Razorpay/PayU integration
- **File Upload**: Multer with AWS S3/Cloudinary
- **Email Service**: Nodemailer with Gmail/SendGrid
- **SMS Service**: Twilio/MSG91
- **Documentation**: Swagger/OpenAPI

## Project Structure
```
fasttag-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── environment.js
│   │   ├── payment.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Admin.js
│   │   ├── FASTag.js
│   │   ├── Transaction.js
│   │   ├── Order.js
│   │   ├── Vehicle.js
│   │   ├── Bank.js
│   │   ├── SupportTicket.js
│   │   └── KYCDocument.js
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── userAuthController.js
│   │   │   └── adminAuthController.js
│   │   ├── user/
│   │   │   ├── profileController.js
│   │   │   ├── fastagController.js
│   │   │   ├── rechargeController.js
│   │   │   ├── orderController.js
│   │   │   └── supportController.js
│   │   ├── admin/
│   │   │   ├── dashboardController.js
│   │   │   ├── userManagementController.js
│   │   │   ├── kycController.js
│   │   │   ├── transactionController.js
│   │   │   └── supportController.js
│   │   ├── common/
│   │   │   ├── paymentController.js
│   │   │   ├── uploadController.js
│   │   │   └── notificationController.js
│   ├── routes/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── admin/
│   │   └── common/
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── adminAuth.js
│   │   ├── validation.js
│   │   ├── rateLimiting.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── paymentService.js
│   │   ├── emailService.js
│   │   ├── smsService.js
│   │   └── uploadService.js
│   └── utils/
│       ├── constants.js
│       ├── helpers.js
│       └── validators.js
├── tests/
├── docs/
└── package.json
```

## Data Models

### 1. User Model
```javascript
const userSchema = {
  _id: ObjectId,
  name: String,
  email: String, // unique
  phone: String, // unique
  password: String, // hashed
  isVerified: Boolean,
  emailVerifiedAt: Date,
  phoneVerifiedAt: Date,
  profile: {
    avatar: String,
    dateOfBirth: Date,
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String
    }
  },
  kyc: {
    status: String, // 'pending', 'verified', 'rejected'
    documents: [{
      type: String, // 'aadhar', 'pan', 'driving_license'
      url: String,
      verifiedAt: Date
    }]
  },
  wallet: {
    balance: Number,
    transactions: [ObjectId] // ref: Transaction
  },
  preferences: {
    notifications: {
      email: Boolean,
      sms: Boolean,
      push: Boolean
    },
    language: String
  },
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date,
  status: String // 'active', 'inactive', 'suspended'
}
```

### 2. Admin Model
```javascript
const adminSchema = {
  _id: ObjectId,
  name: String,
  email: String, // unique
  password: String, // hashed
  role: String, // 'super_admin', 'admin', 'support'
  permissions: [String], // ['user_management', 'kyc_verification', 'transaction_monitoring']
  twoFactorEnabled: Boolean,
  twoFactorSecret: String,
  lastLoginAt: Date,
  loginHistory: [{
    ip: String,
    userAgent: String,
    loginAt: Date,
    location: String
  }],
  createdAt: Date,
  updatedAt: Date,
  status: String // 'active', 'inactive'
}
```

### 3. FASTag Model
```javascript
const fastagSchema = {
  _id: ObjectId,
  tagId: String, // unique FASTag number
  userId: ObjectId, // ref: User
  vehicleId: ObjectId, // ref: Vehicle
  bankId: ObjectId, // ref: Bank
  balance: Number,
  status: String, // 'active', 'inactive', 'blocked', 'expired'
  issueDate: Date,
  expiryDate: Date,
  rechargeHistory: [ObjectId], // ref: Transaction
  usageHistory: [ObjectId], // ref: Transaction
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Vehicle Model
```javascript
const vehicleSchema = {
  _id: ObjectId,
  userId: ObjectId, // ref: User
  registrationNumber: String, // unique
  vehicleType: String, // 'car', 'truck', 'bus', 'motorcycle'
  brand: String,
  model: String,
  color: String,
  rcDocument: {
    url: String,
    verifiedAt: Date,
    status: String // 'pending', 'verified', 'rejected'
  },
  insurance: {
    policyNumber: String,
    expiryDate: Date,
    documentUrl: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Order Model
```javascript
const orderSchema = {
  _id: ObjectId,
  orderId: String, // unique order ID
  userId: ObjectId, // ref: User
  type: String, // 'fastag_purchase', 'recharge'
  items: [{
    type: String,
    quantity: Number,
    price: Number,
    details: Object
  }],
  amount: {
    subtotal: Number,
    tax: Number,
    discount: Number,
    total: Number
  },
  payment: {
    method: String, // 'card', 'upi', 'netbanking', 'wallet'
    status: String, // 'pending', 'completed', 'failed', 'refunded'
    transactionId: String,
    paymentGateway: String,
    paidAt: Date
  },
  delivery: {
    address: Object,
    status: String, // 'pending', 'shipped', 'delivered', 'cancelled'
    trackingId: String,
    estimatedDelivery: Date,
    deliveredAt: Date
  },
  status: String, // 'pending', 'processing', 'completed', 'cancelled'
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Transaction Model
```javascript
const transactionSchema = {
  _id: ObjectId,
  transactionId: String, // unique
  userId: ObjectId, // ref: User
  fastagId: ObjectId, // ref: FASTag
  type: String, // 'recharge', 'toll_payment', 'refund'
  amount: Number,
  status: String, // 'pending', 'completed', 'failed'
  description: String,
  metadata: {
    tollPlaza: String,
    location: String,
    vehicleNumber: String,
    receiptUrl: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Support Ticket Model
```javascript
const supportTicketSchema = {
  _id: ObjectId,
  ticketId: String, // unique
  userId: ObjectId, // ref: User
  subject: String,
  description: String,
  category: String, // 'technical', 'billing', 'general'
  priority: String, // 'low', 'medium', 'high', 'urgent'
  status: String, // 'open', 'in_progress', 'resolved', 'closed'
  assignedTo: ObjectId, // ref: Admin
  messages: [{
    from: ObjectId, // User or Admin
    fromType: String, // 'user' or 'admin'
    message: String,
    attachments: [String],
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date,
  resolvedAt: Date
}
```

## Authentication Architecture

### Cookie-Based Authentication Strategy
```javascript
// JWT + HTTP-Only Cookies for web
// JWT + Authorization Header for mobile app

const authStrategy = {
  web: {
    accessToken: 'httpOnly cookie, 15min expiry',
    refreshToken: 'httpOnly cookie, 7days expiry',
    csrfToken: 'regular cookie for CSRF protection'
  },
  mobile: {
    accessToken: 'Authorization header, 15min expiry',
    refreshToken: 'stored securely in app, 30days expiry'
  }
}
```

### Authentication Middleware
```javascript
// middleware/auth.js
const authenticateUser = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in cookies (web) or Authorization header (mobile)
    if (req.cookies.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || user.status !== 'active') {
      return res.status(401).json({ success: false, message: 'Invalid token or user inactive.' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

const authenticateAdmin = async (req, res, next) => {
  // Similar logic but for admin users with role checking
};
```

## API Routes Structure

### Authentication Routes
```javascript
// routes/auth/userAuth.js
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
POST /api/auth/verify-email
POST /api/auth/resend-verification
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/verify-otp
POST /api/auth/login-otp

// routes/auth/adminAuth.js
POST /api/admin/auth/login
POST /api/admin/auth/logout
POST /api/admin/auth/refresh-token
POST /api/admin/auth/enable-2fa
POST /api/admin/auth/verify-2fa
```

### SMS OTP Multi-Website Routing Guide (No Login or Signup Logic Change)

Use this approach when one backend serves multiple websites and you want different SMS branding/templates.

#### 1) Request body contract from frontend

Frontend should send these fields to `POST /api/auth/send-sms-otp`:

- `phone` (string, required)
- `purpose` (string, required): `login` or `register` or `forgot-password`
- `fasttag` (boolean, optional): `true` if request is from FASTag website
- `origin` (string, optional): website key, for example `fasttag`, `site2`

Example request:

```json
{
  "phone": "9876543210",
  "purpose": "register",
  "fasttag": true,
  "origin": "fasttag"
}
```

#### 2) Keep auth flow same, only switch SMS utility

Do not change register/login logic. Only update OTP send flow to choose SMS sender utility based on body flags.

```javascript
// controllers/auth/userAuthController.js
const otpService = require('../../services/otpService');
const { sendFasttagOtpSMS, sendDefaultOtpSMS } = require('../../services/sms');

const resolveWebsiteContext = (body) => {
  const isFasttag = body.fasttag === true || body.origin === 'fasttag';
  if (isFasttag) {
    return {
      site: 'fasttag',
      smsSender: sendFasttagOtpSMS,
      templateKey: 'FASTTAG_OTP'
    };
  }

  return {
    site: body.origin || 'default',
    smsSender: sendDefaultOtpSMS,
    templateKey: 'DEFAULT_OTP'
  };
};

const sendSmsOtp = async (req, res) => {
  try {
    const { phone, purpose } = req.body;
    if (!phone || !purpose) {
      return res.status(400).json({ success: false, message: 'phone and purpose are required' });
    }

    const context = resolveWebsiteContext(req.body);
    const otp = await otpService.generateOtp({
      phone,
      purpose,
      site: context.site
    });

    await context.smsSender({
      phone,
      otp,
      templateKey: context.templateKey,
      purpose
    });

    return res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

module.exports = { sendSmsOtp };
```

#### 3) Verify OTP endpoint recommendation

For `POST /api/auth/verify-sms-otp`, keep current verification logic. If you store site/origin with OTP record, include site during verification lookup to avoid cross-site OTP reuse.

```javascript
const verifySmsOtp = async (req, res) => {
  const { phone, otp, purpose } = req.body;
  const site = req.body.fasttag === true || req.body.origin === 'fasttag'
    ? 'fasttag'
    : (req.body.origin || 'default');

  const isValid = await otpService.verifyOtp({ phone, otp, purpose, site });
  if (!isValid) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  return res.json({ success: true, message: 'OTP verified successfully' });
};
```

#### 4) Service layer split (clean and minimal)

```javascript
// services/sms/index.js
const sendFasttagOtpSMS = async ({ phone, otp, templateKey, purpose }) => {
  // Use FASTag route/template/provider settings
  // Example: MSG91 template for FASTag brand
};

const sendDefaultOtpSMS = async ({ phone, otp, templateKey, purpose }) => {
  // Use default route/template/provider settings
};

module.exports = { sendFasttagOtpSMS, sendDefaultOtpSMS };
```

#### 5) Validation and security checks

- Accept only known origins (`fasttag`, `site2`, etc.)
- Rate limit OTP routes per phone and IP
- Keep OTP TTL short (for example, 5 minutes)
- Never expose OTP in API response or logs
- Use same response shape for both utilities

#### 6) Rollout checklist

- Add utility selector in send OTP controller
- Keep login/register controllers untouched
- Add unit test for `fasttag: true` route
- Add unit test for default route
- Add integration test for `register` OTP flow

### User Routes
```javascript
// routes/user/profile.js
GET /api/user/profile
PUT /api/user/profile
PUT /api/user/change-password
POST /api/user/upload-avatar
GET /api/user/wallet
GET /api/user/transactions

// routes/user/fastag.js
POST /api/user/fastag/purchase
GET /api/user/fastag/list
GET /api/user/fastag/:id
PUT /api/user/fastag/:id/status
POST /api/user/fastag/recharge
GET /api/user/fastag/:id/balance
GET /api/user/fastag/:id/history

// routes/user/vehicle.js
POST /api/user/vehicle/add
GET /api/user/vehicle/list
PUT /api/user/vehicle/:id
DELETE /api/user/vehicle/:id
POST /api/user/vehicle/verify

// routes/user/orders.js
POST /api/user/order/create
GET /api/user/order/list
GET /api/user/order/:id
PUT /api/user/order/:id/cancel
GET /api/user/order/:id/track

// routes/user/support.js
POST /api/user/support/ticket
GET /api/user/support/tickets
GET /api/user/support/ticket/:id
POST /api/user/support/ticket/:id/message
```

### Admin Routes
```javascript
// routes/admin/dashboard.js
GET /api/admin/dashboard/stats
GET /api/admin/dashboard/recent-activities
GET /api/admin/dashboard/revenue
GET /api/admin/dashboard/users-growth

// routes/admin/users.js
GET /api/admin/users
GET /api/admin/users/:id
PUT /api/admin/users/:id/status
PUT /api/admin/users/:id/kyc-status
GET /api/admin/users/:id/transactions
GET /api/admin/users/:id/orders

// routes/admin/kyc.js
GET /api/admin/kyc/pending
GET /api/admin/kyc/:id
PUT /api/admin/kyc/:id/approve
PUT /api/admin/kyc/:id/reject

// routes/admin/transactions.js
GET /api/admin/transactions
GET /api/admin/transactions/:id
POST /api/admin/transactions/:id/refund
GET /api/admin/transactions/reports

// routes/admin/support.js
GET /api/admin/support/tickets
GET /api/admin/support/ticket/:id
PUT /api/admin/support/ticket/:id/assign
POST /api/admin/support/ticket/:id/reply
PUT /api/admin/support/ticket/:id/status
```

### Common Routes
```javascript
// routes/common/payment.js
POST /api/payment/initialize
POST /api/payment/verify
POST /api/payment/webhook
GET /api/payment/methods

// routes/common/upload.js
POST /api/upload/document
POST /api/upload/image
DELETE /api/upload/:id

// routes/common/banks.js
GET /api/banks
GET /api/banks/:id
```

## Controller Implementation Examples

### User Authentication Controller
```javascript
// controllers/auth/userAuthController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { sendEmail, sendOTP } = require('../../services/notificationService');

class UserAuthController {
  async register(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      
      // Validation
      const existingUser = await User.findOne({ 
        $or: [{ email }, { phone }] 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email or phone'
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create user
      const user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        isVerified: false
      });
      
      await user.save();
      
      // Send verification email
      await sendEmail(email, 'verify-email', { 
        name, 
        verificationLink: `${process.env.FRONTEND_URL}/verify-email?token=${generateVerificationToken(user._id)}` 
      });
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully. Please verify your email.',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: error.message
      });
    }
  }
  
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Find user
      const user = await User.findOne({ email }).select('+password');
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      if (user.status !== 'active') {
        return res.status(401).json({
          success: false,
          message: 'Account is inactive. Please contact support.'
        });
      }
      
      // Generate tokens
      const accessToken = generateAccessToken(user._id, 'user');
      const refreshToken = generateRefreshToken(user._id, 'user');
      
      // Set cookies for web clients
      if (req.headers['user-agent'] && !req.headers['user-agent'].includes('Mobile')) {
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000 // 15 minutes
        });
        
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
      }
      
      // Update last login
      user.lastLoginAt = new Date();
      await user.save();
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
            kyc: user.kyc
          },
          // For mobile clients, send tokens in response
          ...(req.headers['user-agent'] && req.headers['user-agent'].includes('Mobile') && {
            accessToken,
            refreshToken
          })
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message
      });
    }
  }
}
```

### Admin Authentication Controller
```javascript
// controllers/auth/adminAuthController.js
class AdminAuthController {
  async login(req, res) {
    try {
      const { email, password, twoFactorCode } = req.body;
      
      const admin = await Admin.findOne({ email }).select('+password');
      
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid admin credentials'
        });
      }
      
      // Check 2FA if enabled
      if (admin.twoFactorEnabled) {
        if (!twoFactorCode) {
          return res.status(200).json({
            success: false,
            requiresTwoFactor: true,
            message: 'Two-factor authentication required'
          });
        }
        
        const isValidCode = speakeasy.totp.verify({
          secret: admin.twoFactorSecret,
          encoding: 'base32',
          token: twoFactorCode,
          window: 2
        });
        
        if (!isValidCode) {
          return res.status(401).json({
            success: false,
            message: 'Invalid two-factor code'
          });
        }
      }
      
      // Generate admin tokens
      const accessToken = generateAccessToken(admin._id, 'admin');
      const refreshToken = generateRefreshToken(admin._id, 'admin');
      
      // Set secure cookies
      res.cookie('adminAccessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
      });
      
      // Log admin login
      admin.loginHistory.push({
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        loginAt: new Date(),
        location: req.headers['cf-ipcountry'] || 'Unknown'
      });
      admin.lastLoginAt = new Date();
      await admin.save();
      
      res.json({
        success: true,
        message: 'Admin login successful',
        data: {
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            permissions: admin.permissions
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Admin login failed',
        error: error.message
      });
    }
  }
}
```

## Payment Integration

### Payment Controller
```javascript
// controllers/common/paymentController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');

class PaymentController {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }
  
  async initializePayment(req, res) {
    try {
      const { amount, orderId, currency = 'INR' } = req.body;
      
      const options = {
        amount: amount * 100, // Convert to paisa
        currency,
        receipt: orderId,
        notes: {
          userId: req.user._id,
          orderId
        }
      };
      
      const razorpayOrder = await this.razorpay.orders.create(options);
      
      res.json({
        success: true,
        data: {
          orderId: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          key: process.env.RAZORPAY_KEY_ID
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Payment initialization failed',
        error: error.message
      });
    }
  }
  
  async verifyPayment(req, res) {
    try {
      const { paymentId, orderId, signature } = req.body;
      
      const body = orderId + '|' + paymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
      
      if (expectedSignature === signature) {
        // Payment verified successfully
        // Update order status in database
        await Order.findOneAndUpdate(
          { orderId: orderId.split('_')[1] },
          {
            'payment.status': 'completed',
            'payment.transactionId': paymentId,
            'payment.paidAt': new Date(),
            status: 'processing'
          }
        );
        
        res.json({
          success: true,
          message: 'Payment verified successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Payment verification failed'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Payment verification error',
        error: error.message
      });
    }
  }
}
```

## Frontend Integration

### API Service Configuration
```javascript
// Frontend: services/api.js - Updated for cookie support
class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      credentials: 'include', // Include cookies in requests
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };
    
    // For mobile app, add Authorization header if token exists
    if (this.isMobileApp() && this.getStoredToken()) {
      config.headers['Authorization'] = `Bearer ${this.getStoredToken()}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      // Handle token refresh for mobile
      if (response.status === 401 && this.isMobileApp()) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry request with new token
          config.headers['Authorization'] = `Bearer ${this.getStoredToken()}`;
          const retryResponse = await fetch(url, config);
          return await retryResponse.json();
        }
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  isMobileApp() {
    return navigator.userAgent.includes('Mobile') || window.ReactNativeWebView;
  }
  
  getStoredToken() {
    return localStorage.getItem('accessToken');
  }
  
  async refreshToken() {
    try {
      const response = await fetch(`${this.baseURL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include'
      });
      
      const data = await response.json();
      if (data.success && data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}
```

## Environment Variables
```bash
# .env file
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/fasttag_india
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_refresh_token_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000/admin

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# SMS Service
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number

# File Upload
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

## Deployment Checklist
1. **Security Headers**: Implement CORS, CSP, HSTS
2. **Rate Limiting**: Prevent abuse and DDoS
3. **Input Validation**: Sanitize all inputs
4. **Error Logging**: Implement comprehensive logging
5. **Database Indexing**: Optimize queries
6. **SSL/TLS**: Secure data in transit
7. **Environment Variables**: Secure configuration
8. **Backup Strategy**: Regular database backups
9. **Monitoring**: Health checks and performance monitoring
10. **Documentation**: API documentation with Swagger

This guide provides a complete foundation for your backend development. Each section can be expanded based on specific requirements and business logic needs.