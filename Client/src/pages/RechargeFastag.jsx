import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { AuthPopup } from '../components/AuthPopup'
import { useAuth } from '../context/AuthContext'
import invoiceService from '../services/invoice'
import { 
  CreditCard, 
  Smartphone, 
  ArrowRight, 
  IndianRupee, 
  Zap, 
  Shield, 
  CheckCircle2,
  RefreshCw,
  Wallet,
  Car,
  Lock,
  AlertCircle,
  User,
  Download,
  ExternalLink
} from 'lucide-react'

const rechargeAmounts = [
  { value: '200', label: '₹200', popular: false },
  { value: '500', label: '₹500', popular: true },
  { value: '1000', label: '₹1,000', popular: false },
  { value: '2000', label: '₹2,000', popular: false },
  { value: '5000', label: '₹5,000', popular: false },
  { value: 'custom', label: 'Custom Amount', popular: false },
]

const paymentMethods = [
  { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay' },
  { id: 'netbanking', name: 'Net Banking', icon: Wallet, description: 'All major banks supported' },
]

export default function RechargeFastagPage() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [allowBrowsing, setAllowBrowsing] = useState(false)
  const [rechargeComplete, setRechargeComplete] = useState(false)
  const [completedRechargeData, setCompletedRechargeData] = useState(null)
  const [isDownloadingInvoice, setIsDownloadingInvoice] = useState(false)
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    amount: '500',
    customAmount: '',
    paymentMethod: 'upi',
  })

  useEffect(() => {
    if (!isAuthenticated && !allowBrowsing) {
      setShowAuthPopup(true)
    }
  }, [isAuthenticated, allowBrowsing])

  const handleRecharge = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setShowAuthPopup(true)
      return
    }
    
    setIsLoading(true)
    
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    const rechargeData = {
      orderId: 'RL' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      vehicleNumber: formData.vehicleNumber,
      amount: getRechargeAmount(),
      orderDate: new Date().toISOString(),
      paymentMethod: getPaymentMethodName(formData.paymentMethod),
      status: 'confirmed',
      customerName: user?.name,
      customerEmail: user?.email,
      customerPhone: user?.phone,
      rechargeDetails: {
        previousBalance: 150,
        rechargeAmount: parseInt(getRechargeAmount()),
        newBalance: 150 + parseInt(getRechargeAmount()),
        validityExtended: '365 days'
      }
    };

    setCompletedRechargeData(rechargeData);
    setRechargeComplete(true);
    setIsLoading(false);
  }

  const getPaymentMethodName = (method) => {
    const methods = {
      'upi': 'UPI Payment',
      'card': 'Credit/Debit Card',
      'netbanking': 'Net Banking'
    };
    return methods[method] || method;
  }

  const handleDownloadInvoice = async () => {
    if (!completedRechargeData) return;

    setIsDownloadingInvoice(true);
    console.log('🧾 Downloading recharge invoice...');

    try {
      const enhancedRechargeData = {
        ...completedRechargeData,
        user: user
      };

      const result = invoiceService.downloadInvoice(enhancedRechargeData, 'recharge');
      
      if (result.success) {
        console.log('✅ Recharge invoice downloaded successfully');
      } else {
        console.error('❌ Invoice download failed:', result.error);
      }
    } catch (error) {
      console.error('💥 Error downloading invoice:', error);
    } finally {
      setIsDownloadingInvoice(false);
    }
  };

  const handleViewTransaction = () => {
    navigate(`/track-order?orderId=${completedRechargeData.orderId}`);
  };

  const handleAuthPopupClose = () => {
    setShowAuthPopup(false)
    setAllowBrowsing(true)
  }

  const getRechargeAmount = () => {
    return formData.amount === 'custom' ? formData.customAmount : formData.amount
  }

  // Show success screen after recharge completion
  if (rechargeComplete && completedRechargeData) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                
                <h1 className="text-2xl font-bold text-green-900 mb-2">Recharge Successful!</h1>
                <p className="text-green-700 mb-6">
                  Your FASTag has been recharged successfully. The balance is updated instantly.
                </p>
                
                <div className="bg-white rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <p className="text-muted-foreground">Transaction ID</p>
                      <p className="font-medium">{completedRechargeData.orderId}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-muted-foreground">Vehicle Number</p>
                      <p className="font-medium">{completedRechargeData.vehicleNumber}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-muted-foreground">Recharge Amount</p>
                      <p className="font-medium text-green-600">₹{completedRechargeData.amount}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-muted-foreground">Payment Method</p>
                      <p className="font-medium">{completedRechargeData.paymentMethod}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-muted-foreground">Previous Balance</p>
                      <p className="font-medium">₹{completedRechargeData.rechargeDetails.previousBalance}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-muted-foreground">New Balance</p>
                      <p className="font-medium text-primary">₹{completedRechargeData.rechargeDetails.newBalance}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleDownloadInvoice}
                      disabled={isDownloadingInvoice}
                      className="flex-1"
                      variant="outline"
                    >
                      {isDownloadingInvoice ? (
                        <>
                          <Download className="mr-2 h-4 w-4 animate-pulse" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download Receipt
                        </>
                      )}
                    </Button>
                    
                    <Button onClick={handleViewTransaction} className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Transaction
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => setRechargeComplete(false)}
                    className="w-full"
                  >
                    Recharge Again
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Transaction Details</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Balance updated instantly across all toll plazas</li>
                    <li>• SMS confirmation sent to registered mobile number</li>
                    <li>• Validity extended by {completedRechargeData.rechargeDetails.validityExtended}</li>
                    <li>• Receipt available for download anytime</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      {/* Authentication Popup */}
      <AuthPopup 
        isOpen={showAuthPopup}
        onClose={handleAuthPopupClose}
        feature="FASTag recharge and secure payment"
        allowSkip={true}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Recharge FASTag</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Add money to your FASTag wallet instantly. Quick, secure, and hassle-free recharge.
          </p>
          
          {/* Authentication Status Banner */}
          {!isAuthenticated && allowBrowsing && (
            <div className="max-w-md mx-auto mt-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Browsing Mode</p>
                    <p className="text-xs mt-1">
                      You can check recharge options, but{' '}
                      <button 
                        onClick={() => setShowAuthPopup(true)}
                        className="text-yellow-700 hover:underline font-medium"
                      >
                        login is required
                      </button>{' '}
                      for payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="max-w-md mx-auto mt-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-green-800">
                    Welcome back, <span className="font-medium">{user?.name?.split(' ')[0]}</span>! 
                    Ready to recharge your FASTag.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Recharge Your FASTag
                </CardTitle>
                <CardDescription>
                  Enter your vehicle details and select recharge amount
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Authentication Required Notice */}
                {!isAuthenticated && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-orange-800">Authentication Required for Payment</p>
                        <p className="text-orange-700 mt-1">
                          You can browse recharge options, but login is required to complete the payment.
                        </p>
                        <Button 
                          size="sm" 
                          className="mt-3"
                          onClick={() => setShowAuthPopup(true)}
                        >
                          Login to Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleRecharge} className="space-y-6">
                  {/* Vehicle Number */}
                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Vehicle Registration Number</Label>
                    <Input
                      id="vehicleNumber"
                      placeholder="e.g., MH12AB1234"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                      className="uppercase text-lg font-medium"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the vehicle number linked to your FASTag
                    </p>
                  </div>

                  {/* Recharge Amount */}
                  <div className="space-y-4">
                    <Label>Select Recharge Amount</Label>
                    <RadioGroup
                      value={formData.amount}
                      onValueChange={(value) => setFormData({ ...formData, amount: value })}
                      className="grid grid-cols-2 md:grid-cols-3 gap-3"
                    >
                      {rechargeAmounts.map((amount) => (
                        <Label
                          key={amount.value}
                          htmlFor={amount.value}
                          className={`relative flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.amount === amount.value
                              ? 'border-primary bg-primary/5 ring-2 ring-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <RadioGroupItem value={amount.value} id={amount.value} className="sr-only" />
                          {amount.popular && (
                            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                              Popular
                            </div>
                          )}
                          <span className="font-semibold text-lg">{amount.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>

                    {formData.amount === 'custom' && (
                      <div className="space-y-2">
                        <Label htmlFor="customAmount">Enter Custom Amount</Label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="customAmount"
                            type="number"
                            placeholder="Enter amount (Min ₹100)"
                            className="pl-10"
                            min="100"
                            max="50000"
                            value={formData.customAmount}
                            onChange={(e) => setFormData({ ...formData, customAmount: e.target.value })}
                            required={formData.amount === 'custom'}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <Label>Choose Payment Method</Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                      className="space-y-3"
                    >
                      {paymentMethods.map((method) => {
                        const Icon = method.icon
                        return (
                          <Label
                            key={method.id}
                            htmlFor={method.id}
                            className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                              formData.paymentMethod === method.id
                                ? 'border-primary bg-primary/5 ring-2 ring-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                            <Icon className="h-5 w-5 text-primary mt-0.5" />
                            <div className="flex-1">
                              <div className="font-medium">{method.name}</div>
                              <div className="text-sm text-muted-foreground">{method.description}</div>
                            </div>
                          </Label>
                        )
                      })}
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                    disabled={
                      isLoading || 
                      !formData.vehicleNumber || 
                      (formData.amount === 'custom' && (!formData.customAmount || Number(formData.customAmount) < 100)) ||
                      !isAuthenticated
                    }
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Processing Recharge...
                      </>
                    ) : !isAuthenticated ? (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Login Required to Pay
                      </>
                    ) : (
                      <>
                        Pay ₹{getRechargeAmount()}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  
                  {isAuthenticated && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Logged in as {user?.email}</span>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Recharge Benefits Sidebar */}
          <div className="lg:col-span-1">
            {!isAuthenticated && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Login Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Secure payment processing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Transaction history & tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Instant SMS & email confirmations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Priority customer support
                    </li>
                  </ul>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => setShowAuthPopup(true)}
                  >
                    Login Now
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Why Recharge Online?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Instant Credit</h4>
                      <p className="text-sm text-muted-foreground">Balance reflects immediately in your FASTag account</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Secure Payment</h4>
                      <p className="text-sm text-muted-foreground">256-bit SSL encryption for all transactions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">No Hidden Charges</h4>
                      <p className="text-sm text-muted-foreground">Transparent pricing with no processing fees</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">SMS Alerts</h4>
                      <p className="text-sm text-muted-foreground">Get instant confirmation via SMS and email</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our customer support team is available 24/7 to assist you.
                  </p>
                  <Link to="/support" className="text-sm text-primary hover:underline">
                    Contact Support →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}