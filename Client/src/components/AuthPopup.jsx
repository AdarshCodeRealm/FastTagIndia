import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Lock, User, Mail, Key, X, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function AuthPopup({ isOpen, onClose, feature = 'this feature', allowSkip = true }) {
  const navigate = useNavigate()
  const { loginUser, isLoading, error, clearError } = useAuth()
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [showQuickLogin, setShowQuickLogin] = useState(false)

  if (!isOpen) return null

  const handleQuickLogin = async (e) => {
    e.preventDefault()
    clearError()
    
    if (!loginData.email || !loginData.password) {
      return
    }

    const result = await loginUser(loginData.email, loginData.password)
    if (result.success) {
      onClose()
      // Don't redirect here, let the parent component handle it
    }
  }

  const handleFullLogin = () => {
    onClose()
    navigate('/login')
  }

  const handleSignup = () => {
    onClose()
    navigate('/signup')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Login Required</CardTitle>
            </div>
            {allowSkip && (
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <CardDescription>
            Please login to access {feature}. You can browse but payment requires authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Feature Benefits */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800">Why login?</p>
                <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                  <li>• Secure payment processing</li>
                  <li>• Order tracking & history</li>
                  <li>• Priority customer support</li>
                  <li>• Instant delivery updates</li>
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Quick Login Section */}
          {!showQuickLogin ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  onClick={handleFullLogin}
                  className="w-full"
                >
                  <User className="mr-2 h-4 w-4" />
                  Login to Continue
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowQuickLogin(true)}
                  className="w-full"
                >
                  <Key className="mr-2 h-4 w-4" />
                  Quick Login Here
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">or</div>

              <Button 
                variant="outline"
                onClick={handleSignup}
                className="w-full border-green-300 text-green-700 hover:bg-green-50"
              >
                <Mail className="mr-2 h-4 w-4" />
                Request New Account
              </Button>
            </div>
          ) : (
            /* Quick Login Form */
            <form onSubmit={handleQuickLogin} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Quick Login</h3>
                <button 
                  type="button"
                  onClick={() => setShowQuickLogin(false)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Back to options
                </button>
              </div>
              
              <Input
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
              
              <Input
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !loginData.email || !loginData.password}
              >
                {isLoading ? 'Logging in...' : 'Login & Continue'}
              </Button>
            </form>
          )}

          {/* Skip Option */}
          {allowSkip && (
            <>
              <div className="text-center text-sm text-muted-foreground">or</div>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">
                  Continue browsing without login
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onClose}
                  className="text-xs"
                >
                  Skip for now (Limited access)
                </Button>
              </div>
            </>
          )}

          {/* Help Text */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Need help? Call{' '}
              <a href="tel:+919172727232" className="text-primary hover:underline">
                +91 917-272-7232
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPopup