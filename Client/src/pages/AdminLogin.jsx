import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Car, ArrowRight, Shield, Settings, ArrowLeft, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import config from '../config/environment'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { adminLogin, isLoading, error, clearError, isAdminAuthenticated } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loginError, setLoginError] = useState('')

  // Redirect if already authenticated
  if (isAdminAuthenticated) {
    navigate('/admin/dashboard')
    return null
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    clearError()

    console.log('🔑 Admin login attempt started')
    console.log('📧 Email:', formData.email)
    console.log('🔒 Password provided:', !!formData.password)

    try {
      // Validate inputs
      if (!formData.email || !formData.password) {
        setLoginError('Email and password are required')
        return
      }

      const credentials = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      }

      console.log('📤 Sending credentials to backend...')
      const result = await adminLogin(credentials)

      if (result.success) {
        console.log('✅ Admin login successful')
        console.log('👤 Admin data:', result.admin)
        
        // Store admin session data
        if (result.admin) {
          const adminSession = {
            id: result.admin.id || result.admin._id,
            name: result.admin.name,
            email: result.admin.email,
            role: result.admin.role,
            permissions: result.admin.permissions || [],
            loginTime: new Date().toISOString()
          }
          localStorage.setItem('admin_session', JSON.stringify(adminSession))
          console.log('💾 Admin session stored')
        }

        // Navigate to dashboard
        console.log('🚀 Navigating to admin dashboard')
        navigate('/admin/dashboard')
      } else {
        const errorMsg = result.error || 'Admin login failed. Please try again.'
        console.error('❌ Admin login failed:', errorMsg)
        setLoginError(errorMsg)
      }
    } catch (error) {
      console.error('💥 Admin login error:', error)
      const errorMsg = error.message || 'Admin login failed. Please try again.'
      setLoginError(errorMsg)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear errors when user starts typing
    if (loginError) setLoginError('')
    if (error) clearError()
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Side - Admin Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Website</span>
          </Link>

          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white/20 rounded-lg p-2">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <span className="font-bold text-2xl">Admin Portal</span>
              <Badge variant="secondary" className="ml-2 bg-orange-500/20 text-orange-200 border-orange-300">
                Secure Access
              </Badge>
            </div>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
            FASTag India
            <br />
            <span className="text-white/80">Management Console</span>
          </h1>
          
          <p className="text-lg text-white/80 mb-10 max-w-md">
            Secure admin portal for managing users, KYC verification, transactions, and support operations.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Complete Control</h3>
                <p className="text-sm text-white/70">Manage all aspects of the FASTag system</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Authentication</h3>
                <p className="text-sm text-white/70">Advanced security for maximum protection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full" />
      </div>

      {/* Right Side - Admin Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <div className="bg-slate-900 rounded-lg p-1.5">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">
                FasTag<span className="text-slate-900">India</span>
              </span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Site</span>
            </Link>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-slate-600" />
                <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
              </div>
              <CardDescription>
                Enter your admin credentials to access the management console
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Error Display */}
              {(error || loginError) && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <p className="font-medium">Login Failed</p>
                      <p>{error || loginError}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="Enter your admin email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-slate-900 hover:bg-slate-800" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Authenticating...' : 'Login to Admin Panel'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Admin access is logged and monitored for security purposes
          </p>
        </div>
      </div>
    </div>
  )
}