import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Checkbox } from '../components/ui/checkbox'
import { Car, Phone, Mail, User, ArrowRight, ArrowLeft, Home, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import config from '../config/environment'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const navigate = useNavigate()
  const { sendSignupOTP, signupWithOTP, isLoading, error, clearError } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    otp: '',
    agreeTerms: false,
  })
  const [signupError, setSignupError] = useState('')
  const otpContext = {
    origin: config.OTP_ORIGIN || 'fasttag',
    fasttag: true,
  }

  const handleContinueToOtp = async () => {
    setSignupError('')
    clearError()

    const result = await sendSignupOTP(formData.phone, 'signup', otpContext)
    if (result.success) {
      setStep(2)
    } else {
      setSignupError(result.error || 'Failed to send OTP. Please try again.')
    }
  }

  const handleResendOtp = async () => {
    setSignupError('')
    clearError()

    const result = await sendSignupOTP(formData.phone, 'signup', otpContext)
    if (!result.success) {
      setSignupError(result.error || 'Failed to resend OTP. Please try again.')
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setSignupError('')
    clearError()

    const signupPayload = {
      name: formData.fullName.trim(),
      mobile: formData.phone,
      email: formData.email.trim() || undefined,
      otp: formData.otp,
      purpose: 'signup',
    }

    const signupResult = await signupWithOTP(signupPayload, otpContext)
    if (!signupResult.success) {
      setSignupError(signupResult.error || 'Signup failed. Please try again.')
      return
    }

    toast.success('User created successfully')
    navigate('/login')
  }

  const isStep1Valid =
    formData.fullName.length > 2 &&
    formData.phone.length === 10 &&
    formData.agreeTerms

  return (
    <div className="min-h-screen bg-muted/30 flex">
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
            Join FasTagIndia
            <br />
            Today
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-md">
            Get your FASTag activated in 30 minutes. Enjoy hassle-free toll payments across all national highways.
          </p>

          <div className="space-y-4">
            {[
              'Instant activation & delivery',
              'Secure RBI-compliant payments',
              '24/7 customer support',
              'Auto-recharge facility',
              'Real-time transaction alerts',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground/80" />
                <span className="text-primary-foreground/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-foreground/5 rounded-full" />
      </div>

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
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  1
                </div>
                <div className={`h-0.5 w-8 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  2
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">
                {step === 1 ? 'Create your account' : 'Verify your mobile'}
              </CardTitle>
              <CardDescription>
                {step === 1 ? 'Fill in your details to get started' : 'Enter the OTP sent to your mobile number'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(error || signupError) && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm text-red-800">
                    <p className="font-medium">Signup Failed</p>
                    <p>{error || signupError}</p>
                  </div>
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={(e) => { e.preventDefault(); handleContinueToOtp(); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

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
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-muted-foreground">(Optional)</span></Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked })}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading || !isStep1Valid}
                  >
                    {isLoading ? 'Sending OTP...' : 'Continue & Verify Mobile'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground">We&apos;ve sent a 6-digit OTP to</p>
                    <p className="font-medium">+91 {formData.phone}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                      maxLength={6}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      OTP sent to +91 {formData.phone}{' '}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setStep(1)}
                      >
                        Change
                      </button>
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <button type="button" className="text-primary hover:underline" onClick={() => setStep(1)}>
                      Change mobile number
                    </button>
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                    >
                      Resend OTP
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading || formData.otp.length !== 6}
                  >
                    {isLoading ? 'Creating Account...' : 'Verify & Create Account'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}