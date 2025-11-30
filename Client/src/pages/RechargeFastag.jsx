import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
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
  Car
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
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    amount: '500',
    customAmount: '',
    paymentMethod: 'upi',
  })

  const handleRecharge = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate recharge process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Redirect to success page or show success message
    navigate('/')
  }

  const getRechargeAmount = () => {
    return formData.amount === 'custom' ? formData.customAmount : formData.amount
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Recharge FASTag</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Add money to your FASTag wallet instantly. Quick, secure, and hassle-free recharge.
          </p>
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
                      (formData.amount === 'custom' && (!formData.customAmount || Number(formData.customAmount) < 100))
                    }
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Processing Recharge...
                      </>
                    ) : (
                      <>
                        Pay ₹{getRechargeAmount()}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Recharge Benefits Sidebar */}
          <div className="lg:col-span-1">
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