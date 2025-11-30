import  { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  
  MapPin, 
  Phone, 
  Mail,
  Search,
  Calendar,
  
  Download,
  ExternalLink
} from 'lucide-react'

const orderStatuses = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle2, completed: true },
  { id: 'processing', label: 'Processing', icon: Package, completed: true },
  { id: 'shipped', label: 'Shipped', icon: Truck, completed: true },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2, completed: false },
]

const sampleOrder = {
  orderId: 'FL12345',
  vehicleNumber: 'MH12AB1234',
  status: 'shipped',
  orderDate: '2024-11-28',
  estimatedDelivery: '2024-11-30',
  trackingNumber: 'BL1234567890',
  amount: 849,
  paymentMethod: 'UPI',
  deliveryAddress: '123 Main Street, Andheri East, Mumbai, Maharashtra - 400069',
  courierPartner: 'Blue Dart',
  tagDetails: {
    vehicleType: 'Private Car',
    issuingBank: 'HDFC Bank',
    tagColor: 'Purple',
    initialBalance: 200,
  }
}

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams()
  const [orderIdInput, setOrderIdInput] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    if (orderId) {
      setOrderIdInput(orderId)
      handleTrackOrder(orderId)
    }
  }, [searchParams])

  const handleTrackOrder = async (orderId = orderIdInput) => {
    if (!orderId || orderId.length < 5) {
      setError('Please enter a valid order ID')
      return
    }

    setIsLoading(true)
    setError('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock successful response
    setOrderData({
      ...sampleOrder,
      orderId: orderId.toUpperCase()
    })
    setIsLoading(false)
  }

  const getStatusIndex = (status) => {
    return orderStatuses.findIndex(s => s.id === status)
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Track Your Order</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enter your order ID to track the status of your FASTag delivery.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-md mx-auto mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    placeholder="e.g., FL12345"
                    value={orderIdInput}
                    onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
                    className="uppercase"
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                <Button 
                  onClick={() => handleTrackOrder()}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Search className="mr-2 h-4 w-4 animate-pulse" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Track Order
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tracking Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Order Status
                  </CardTitle>
                  <CardDescription>Order ID: {orderData.orderId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orderStatuses.map((status, index) => {
                      const Icon = status.icon
                      const currentStatusIndex = getStatusIndex(orderData.status)
                      const isCompleted = index <= currentStatusIndex
                      const isCurrent = index === currentStatusIndex
                      
                      return (
                        <div key={status.id} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isCompleted
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground'
                              } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            {index < orderStatuses.length - 1 && (
                              <div
                                className={`w-0.5 h-8 mt-2 ${
                                  isCompleted ? 'bg-primary' : 'bg-muted'
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <h4 className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {status.label}
                            </h4>
                            {isCurrent && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {status.id === 'shipped' 
                                  ? `Shipped via ${orderData.courierPartner} - Tracking: ${orderData.trackingNumber}`
                                  : 'In progress'
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">{orderData.deliveryAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Expected Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(orderData.estimatedDelivery).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Courier Partner</p>
                      <p className="text-sm text-muted-foreground">
                        {orderData.courierPartner} - {orderData.trackingNumber}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FASTag Details */}
              <Card>
                <CardHeader>
                  <CardTitle>FASTag Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle Number</p>
                      <p className="font-medium">{orderData.vehicleNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle Type</p>
                      <p className="font-medium">{orderData.tagDetails.vehicleType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issuing Bank</p>
                      <p className="font-medium">{orderData.tagDetails.issuingBank}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tag Color</p>
                      <p className="font-medium">{orderData.tagDetails.tagColor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Order Date</span>
                      <span>{new Date(orderData.orderDate).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Method</span>
                      <span>{orderData.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Initial Balance</span>
                      <span>₹{orderData.tagDetails.initialBalance}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{orderData.amount}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Invoice
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Need help?</p>
                      <div className="space-y-1">
                        <Link to="tel:+911800123456" className="flex items-center justify-center gap-2 text-sm text-primary hover:underline">
                          <Phone className="h-4 w-4" />
                          1800-123-456
                        </Link>
                        <Link to="mailto:support@fastagIndia.com" className="flex items-center justify-center gap-2 text-sm text-primary hover:underline">
                          <Mail className="h-4 w-4" />
                          support@fastagIndia.com
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Help Section */}
        {!orderData && !isLoading && (
          <div className="max-w-2xl mx-auto mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Need Help Finding Your Order?</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Your order ID is sent to your email and SMS after successful payment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-left">
                    <h4 className="font-medium mb-2">Contact Support</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <Link to="tel:+911800123456" className="flex items-center gap-2 hover:text-primary">
                        <Phone className="h-4 w-4" />
                        1800-123-456
                      </Link>
                      <Link to="mailto:support@fastagIndia.com" className="flex items-center gap-2 hover:text-primary">
                        <Mail className="h-4 w-4" />
                        support@fastagIndia.com
                      </Link>
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium mb-2">Order ID Format</h4>
                    <p className="text-sm text-muted-foreground">
                      Order IDs start with &apos;FL&apos; followed by 5-6 characters (e.g., FL12345)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}