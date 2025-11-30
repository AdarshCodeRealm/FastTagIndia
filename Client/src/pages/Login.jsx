import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Car, Phone, Mail, Lock, ArrowRight, Shield, Zap, ArrowLeft, Home } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState('phone')
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    otp: '',
  })
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = async () => {
    setIsLoading(true)
    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setOtpSent(true)
    setIsLoading(false)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-primary-foreground">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Home</span>
          </Link>

          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="bg-primary-foreground/20 rounded-lg p-2">
              <Car className="h-8 w-8" />
            </div>
            <span className="font-bold text-2xl">
              FasTag<span className="text-primary-foreground/80">India</span>
            </span>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
            Welcome Back to
            <br />
            FasTagIndia
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-md">
            Manage your FASTag, track transactions, and recharge instantly. Hassle-free toll payments across India.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">RBI-Secure Payments</h3>
                <p className="text-sm text-primary-foreground/70">Bank-grade security for all transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Instant Access</h3>
                <p className="text-sm text-primary-foreground/70">View balance and transactions in real-time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-foreground/5 rounded-full" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <div className="bg-primary rounded-lg p-1.5">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">
                FasTag<span className="text-primary">India</span>
              </span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Home</span>
            </Link>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
              <CardDescription>Choose your preferred login method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full grid-cols-2 mb-6 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    loginMethod === 'phone'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  Phone
                </button>
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    loginMethod === 'email'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </button>
              </div>

              {loginMethod === 'phone' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  {!otpSent ? (
                    <Button
                      type="button"
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleSendOtp}
                      disabled={isLoading || formData.phone.length !== 10}
                    >
                      {isLoading ? 'Sending OTP...' : 'Send OTP'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={formData.otp}
                          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                          maxLength={6}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          OTP sent to +91 {formData.phone}{' '}
                          <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() => setOtpSent(false)}
                          >
                            Change
                          </button>
                        </p>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={isLoading || formData.otp.length !== 6}
                      >
                        {isLoading ? 'Verifying...' : 'Verify & Login'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  )}
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don&apos;t have an account? </span>
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By logging in, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}