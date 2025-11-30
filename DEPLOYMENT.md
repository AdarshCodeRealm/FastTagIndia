# Vercel Deployment Guide for FASTag Service

## Prerequisites
1. Vercel account (https://vercel.com)
2. GitHub repository with your code
3. Environment variables ready

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

### 2. Connect to Vercel
1. Go to vercel.com and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the root directory of your project

### 3. Configure Environment Variables
In Vercel dashboard, go to Settings > Environment Variables and add:

**Required Variables:**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Strong random string for JWT signing
- `JWT_REFRESH_SECRET` - Another strong random string
- `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
- `CLOUDINARY_API_KEY` - From Cloudinary dashboard  
- `CLOUDINARY_API_SECRET` - From Cloudinary dashboard
- `RAZORPAY_KEY_ID` - From Razorpay dashboard
- `RAZORPAY_KEY_SECRET` - From Razorpay dashboard
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Gmail app password
- `NODE_ENV` - Set to "production"
- `CORS_ORIGIN` - Set to your domain or "*"

### 4. Build Settings
Vercel will auto-detect the configuration from vercel.json files.

### 5. Deploy
Click "Deploy" - Vercel will build and deploy both frontend and backend.

## Important Notes

### API Routes
Your backend will be available at: `https://your-app.vercel.app/api/*`

### Frontend Environment Variables
Add to your Client/.env file:
```
VITE_API_BASE_URL=https://your-app-name.vercel.app/api
```

### Database Connection
- Use MongoDB Atlas (free tier available)
- Whitelist Vercel IP ranges or use 0.0.0.0/0 for all IPs

### File Uploads
- Vercel has limitations on file uploads
- Use Cloudinary for image/document storage
- Temporary files in /tmp directory only

## Troubleshooting

### Common Issues:
1. **Environment variables not loading**: Check variable names match exactly
2. **CORS errors**: Verify CORS_ORIGIN is set correctly
3. **Database connection**: Ensure MongoDB Atlas allows Vercel connections
4. **File upload issues**: Implement Cloudinary for file storage

### Logs
Check deployment logs in Vercel dashboard under Functions tab.

## Alternative: Separate Deployments
You can also deploy frontend and backend separately:

**Frontend (Client):**
- Deploy from `/Client` directory
- Set build command: `npm run build`
- Set output directory: `dist`

**Backend (Server):**
- Deploy from `/Server` directory  
- Vercel will auto-detect Node.js app
- Add environment variables

## Post-Deployment
1. Test all API endpoints
2. Verify payment gateway integration
3. Test file upload functionality
4. Check email notifications
5. Validate CORS policy