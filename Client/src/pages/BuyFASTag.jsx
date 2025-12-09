import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthPopup } from "@/components/AuthPopup";
import { useAuth } from "@/context/AuthContext";
import invoiceService from "@/services/invoice";
import {
  Car,
  Truck,
  Bus,
  Bike,
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Shield,
  CreditCard,
  Zap,
  MapPin,
  Phone,
  User,
  Mail,
  IndianRupee,
  Clock,
  BadgeCheck,
  X,
  FileText,
  Lock,
  AlertCircle,
  Download,
  ExternalLink,
} from "lucide-react";

const vehicleTypes = [
  { id: "car", name: "Private Car", icon: Car, price: 499, description: "Sedan, Hatchback, SUV" },
  { id: "bike", name: "Two Wheeler", icon: Bike, price: 299, description: "Motorcycle, Scooter" },
  { id: "commercial", name: "Commercial", icon: Truck, price: 599, description: "Truck, Tempo, LCV" },
  { id: "bus", name: "Bus / Taxi", icon: Bus, price: 699, description: "Public transport vehicles" },
  { id: "fleet", name: "Fleet", icon: Building2, price: 449, description: "Bulk orders (5+ vehicles)" },
];

const banks = [
  { id: "hdfc", name: "HDFC Bank", logo: "/hdfc-bank-logo.png" },
  { id: "icici", name: "ICICI Bank", logo: "/icici-bank-logo.png" },
  { id: "sbi", name: "State Bank of India", logo: "/generic-circular-logo.png" },
  { id: "axis", name: "Axis Bank", logo: "/axis-bank-logo.jpg" },
  { id: "paytm", name: "Paytm Payments Bank", logo: "/paytm-bank-logo.jpg" },
  { id: "kotak", name: "Kotak Mahindra", logo: "/kotak-bank-logo.png" },
];

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function BuyFASTag() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [allowBrowsing, setAllowBrowsing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState(null);
  const [isDownloadingInvoice, setIsDownloadingInvoice] = useState(false);

  const rcFileInputRef = useRef(null);
  const aadhaarFileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    vehicleType: searchParams.get("type") || "",
    vehicleNumber: "",
    chassisNumber: "",
    engineNumber: "",
    vehicleClass: "",
    ownerName: "",
    email: "",
    phone: "",
    aadhaarNumber: "",
    panNumber: "",
    rcDocument: null,
    aadhaarDocument: null,
    rcPreview: "",
    aadhaarPreview: "",
    selectedBank: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    deliveryOption: "standard",
    initialBalance: "200",
    agreeTerms: false,
  });

  const steps = [
    { number: 1, title: "Vehicle Type", description: "Select your vehicle" },
    { number: 2, title: "Vehicle Details", description: "Enter RC details" },
    { number: 3, title: "KYC Upload", description: "Upload documents" },
    { number: 4, title: "Bank Selection", description: "Choose issuer bank" },
    { number: 5, title: "Delivery", description: "Shipping address" },
    { number: 6, title: "Payment", description: "Complete purchase" },
  ];

  const getSelectedVehicle = () => vehicleTypes.find((v) => v.id === formData.vehicleType);

  const calculateTotal = () => {
    const vehicle = getSelectedVehicle();
    const tagPrice = vehicle?.price || 0;
    const securityDeposit = 150;
    const initialBalance = parseInt(formData.initialBalance) || 0;
    const deliveryFee = formData.deliveryOption === "express" ? 99 : 0;
    return tagPrice + securityDeposit + initialBalance + deliveryFee;
  };

  useEffect(() => {
    if (!isAuthenticated && !allowBrowsing) {
      setShowAuthPopup(true);
    }
  }, [isAuthenticated, allowBrowsing]);

  const handleNext = () => {
    if (currentStep === 5 && !isAuthenticated) {
      setShowAuthPopup(true);
      return;
    }
    
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setShowAuthPopup(true);
      return;
    }

    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const orderData = {
      orderId: 'FL' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      vehicleNumber: formData.vehicleNumber,
      amount: calculateTotal(),
      orderDate: new Date().toISOString(),
      paymentMethod: 'Online Payment',
      status: 'confirmed',
      deliveryAddress: `${formData.addressLine1}, ${formData.addressLine2}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      tagDetails: {
        vehicleType: getSelectedVehicle()?.name,
        issuingBank: banks.find(b => b.id === formData.selectedBank)?.name,
        tagColor: 'Purple',
        initialBalance: parseInt(formData.initialBalance)
      },
      customerName: formData.ownerName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      deliveryCharge: formData.deliveryOption === 'express' ? 99 : 0
    };

    setCompletedOrderData(orderData);
    setOrderComplete(true);
    setIsLoading(false);
  };

  const handleDownloadInvoice = async () => {
    if (!completedOrderData) return;

    setIsDownloadingInvoice(true);
    console.log('🧾 Downloading purchase invoice...');

    try {
      const enhancedOrderData = {
        ...completedOrderData,
        user: user
      };

      const result = invoiceService.downloadInvoice(enhancedOrderData, 'purchase');
      
      if (result.success) {
        console.log('✅ Purchase invoice downloaded successfully');
      } else {
        console.error('❌ Invoice download failed:', result.error);
      }
    } catch (error) {
      console.error('💥 Error downloading invoice:', error);
    } finally {
      setIsDownloadingInvoice(false);
    }
  };

  const handleViewOrder = () => {
    navigate(`/track-order?orderId=${completedOrderData.orderId}`);
  };

  const handleRcFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, rcDocument: file, rcPreview: previewUrl });
    }
  };

  const handleAadhaarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, aadhaarDocument: file, aadhaarPreview: previewUrl });
    }
  };

  const removeRcDocument = () => {
    if (formData.rcPreview) URL.revokeObjectURL(formData.rcPreview);
    setFormData({ ...formData, rcDocument: null, rcPreview: "" });
    if (rcFileInputRef.current) rcFileInputRef.current.value = "";
  };

  const removeAadhaarDocument = () => {
    if (formData.aadhaarPreview) URL.revokeObjectURL(formData.aadhaarPreview);
    setFormData({ ...formData, aadhaarDocument: null, aadhaarPreview: "" });
    if (aadhaarFileInputRef.current) aadhaarFileInputRef.current.value = "";
  };

  const handleAuthPopupClose = () => {
    setShowAuthPopup(false);
    setAllowBrowsing(true);
  };

  if (orderComplete && completedOrderData) {
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
                
                <h1 className="text-2xl font-bold text-green-900 mb-2">Order Placed Successfully!</h1>
                <p className="text-green-700 mb-6">
                  Your FASTag order has been confirmed and will be delivered soon.
                </p>
                
                <div className="bg-white rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <p className="text-muted-foreground">Order ID</p>
                      <p className="font-medium">{completedOrderData.orderId}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-muted-foreground">Vehicle Number</p>
                      <p className="font-medium">{completedOrderData.vehicleNumber}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-muted-foreground">Amount Paid</p>
                      <p className="font-medium text-green-600">₹{completedOrderData.amount}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-muted-foreground">Payment Method</p>
                      <p className="font-medium">{completedOrderData.paymentMethod}</p>
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
                          Download Invoice
                        </>
                      )}
                    </Button>
                    
                    <Button onClick={handleViewOrder} className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Track Order
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/buy-fastag')}
                    className="w-full"
                  >
                    Buy Another FASTag
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">What's Next?</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your FASTag will be activated within 30 minutes</li>
                    <li>• You'll receive SMS confirmation once activated</li>
                    <li>• Track your delivery using the order ID</li>
                    <li>• Keep your RC and KYC documents handy for verification</li>
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

      <AuthPopup 
        isOpen={showAuthPopup}
        onClose={handleAuthPopupClose}
        feature="FASTag purchase and secure payment"
        allowSkip={currentStep < 6}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Buy FASTag Online</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get your FASTag delivered and activated in 30 minutes. Accepted at all national toll plazas.
          </p>
          
          {!isAuthenticated && allowBrowsing && (
            <div className="max-w-md mx-auto mt-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Browsing Mode</p>
                    <p className="text-xs mt-1">
                      You can browse and fill details, but{' '}
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
                    Ready to purchase your FASTag.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                      currentStep > step.number
                        ? "bg-primary text-primary-foreground"
                        : currentStep === step.number
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle2 className="h-5 w-5" /> : step.number}
                  </div>
                  <div className="hidden md:block text-center mt-2">
                    <p
                      className={`text-xs font-medium ${currentStep >= step.number ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-8 md:w-16 lg:w-24 mx-1 ${
                      currentStep > step.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Vehicle Type Selection */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Vehicle Type</CardTitle>
                  <CardDescription>Choose the type of vehicle for which you need FASTag</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.vehicleType}
                    onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {vehicleTypes.map((vehicle) => {
                      const Icon = vehicle.icon;
                      return (
                        <Label
                          key={vehicle.id}
                          htmlFor={vehicle.id}
                          className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.vehicleType === vehicle.id
                              ? "border-primary bg-primary/5 ring-2 ring-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={vehicle.id} id={vehicle.id} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5 text-primary" />
                              <span className="font-medium">{vehicle.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{vehicle.description}</p>
                            <p className="text-sm font-semibold text-primary mt-2">
                              <IndianRupee className="h-3 w-3 inline" />
                              {vehicle.price}
                            </p>
                          </div>
                        </Label>
                      );
                    })}
                  </RadioGroup>

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleNext}
                      disabled={!formData.vehicleType}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Vehicle Details */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Details</CardTitle>
                  <CardDescription>Enter your vehicle registration details as per RC</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleTypeSelect">Vehicle Type *</Label>
                    <Select
                      value={formData.vehicleType}
                      onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.name} - {vehicle.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Vehicle Registration Number *</Label>
                    <Input
                      id="vehicleNumber"
                      placeholder="e.g., MH12AB1234"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                      className="uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chassisNumber">Chassis Number (Last 5 digits) *</Label>
                      <Input
                        id="chassisNumber"
                        placeholder="e.g., 12345"
                        maxLength={5}
                        value={formData.chassisNumber}
                        onChange={(e) => setFormData({ ...formData, chassisNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="engineNumber">Engine Number (Last 5 digits)</Label>
                      <Input
                        id="engineNumber"
                        placeholder="e.g., 67890"
                        maxLength={5}
                        value={formData.engineNumber}
                        onChange={(e) => setFormData({ ...formData, engineNumber: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleClass">Vehicle Class</Label>
                    <Select
                      value={formData.vehicleClass}
                      onValueChange={(value) => setFormData({ ...formData, vehicleClass: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Car / Jeep / Van (4-6 seater)</SelectItem>
                        <SelectItem value="lcv">Light Commercial Vehicle</SelectItem>
                        <SelectItem value="bus">Bus / Truck (2 Axle)</SelectItem>
                        <SelectItem value="mav">Multi Axle Vehicle (3+ Axle)</SelectItem>
                        <SelectItem value="hcm">Heavy Construction Machinery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!formData.vehicleNumber || !formData.chassisNumber || !formData.vehicleType}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: KYC Upload */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>KYC Documents</CardTitle>
                  <CardDescription>Upload your identity documents for verification</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Vehicle Owner Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="ownerName"
                          placeholder="As per RC"
                          className="pl-10"
                          value={formData.ownerName}
                          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kycPhone">Mobile Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="kycPhone"
                          placeholder="10-digit mobile"
                          className="pl-10"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kycEmail">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="kycEmail"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                      <Input
                        id="aadhaarNumber"
                        placeholder="12-digit Aadhaar"
                        maxLength={12}
                        value={formData.aadhaarNumber}
                        onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input
                        id="panNumber"
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        className="uppercase"
                        value={formData.panNumber}
                        onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>RC Document *</Label>
                      {formData.rcDocument ? (
                        <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {formData.rcDocument.type.startsWith("image/") ? (
                                <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                                  <img
                                    src={formData.rcPreview || "/placeholder.svg"}
                                    alt="RC Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                                  <FileText className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium truncate max-w-[120px]">{formData.rcDocument.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(formData.rcDocument.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={removeRcDocument}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => rcFileInputRef.current?.click()}
                          className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                        >
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Upload RC Copy</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF or Image (Max 5MB)</p>
                        </div>
                      )}
                      <input
                        ref={rcFileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={handleRcFileChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Aadhaar Document *</Label>
                      {formData.aadhaarDocument ? (
                        <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {formData.aadhaarDocument.type.startsWith("image/") ? (
                                <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                                  <img
                                    src={formData.aadhaarPreview || "/placeholder.svg"}
                                    alt="Aadhaar Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                                  <FileText className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium truncate max-w-[120px]">
                                  {formData.aadhaarDocument.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(formData.aadhaarDocument.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={removeAadhaarDocument}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => aadhaarFileInputRef.current?.click()}
                          className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                        >
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Upload Aadhaar</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF or Image (Max 5MB)</p>
                        </div>
                      )}
                      <input
                        ref={aadhaarFileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={handleAadhaarFileChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!formData.ownerName || !formData.phone || !formData.email || !formData.aadhaarNumber}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Bank Selection */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Issuing Bank</CardTitle>
                  <CardDescription>Choose your preferred bank for FASTag issuance</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.selectedBank}
                    onValueChange={(value) => setFormData({ ...formData, selectedBank: value })}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {banks.map((bank) => (
                      <Label
                        key={bank.id}
                        htmlFor={bank.id}
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.selectedBank === bank.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={bank.id} id={bank.id} />
                        <img src={bank.logo || "/placeholder.svg"} alt={bank.name} className="h-8 object-contain" />
                        <span className="font-medium">{bank.name}</span>
                      </Label>
                    ))}
                  </RadioGroup>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 inline mr-1" />
                      All banks are NPCI-authorized FASTag issuers. Your tag will be linked to the selected bank.
                    </p>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!formData.selectedBank}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Delivery Address */}
            {currentStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                  <CardDescription>Where should we deliver your FASTag?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="addressLine1"
                        placeholder="House/Flat No., Building Name"
                        className="pl-10"
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      placeholder="Street, Locality, Landmark"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData({ ...formData, state: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input
                        id="pincode"
                        placeholder="6-digit PIN"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Label>Delivery Option</Label>
                    <RadioGroup
                      value={formData.deliveryOption}
                      onValueChange={(value) => setFormData({ ...formData, deliveryOption: value })}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <Label
                        htmlFor="standard"
                        className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.deliveryOption === "standard"
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="standard" id="standard" className="mt-1" />
                        <div>
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-primary" />
                            <span className="font-medium">Standard Delivery</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">2-3 business days</p>
                          <p className="text-sm font-medium text-green-600 mt-1">FREE</p>
                        </div>
                      </Label>
                      <Label
                        htmlFor="express"
                        className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.deliveryOption === "express"
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="express" id="express" className="mt-1" />
                        <div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <span className="font-medium">Express Delivery</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Same day / Next day</p>
                          <p className="text-sm font-medium text-primary mt-1">+ Rs. 99</p>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!formData.addressLine1 || !formData.city || !formData.state || !formData.pincode}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 6: Payment */}
            {currentStep === 6 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review & Pay</CardTitle>
                  <CardDescription>Confirm your order details and complete payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Summary */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Order Summary</h4>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Vehicle:</span>
                        <span className="font-medium">{formData.vehicleNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tag Type:</span>
                        <span className="font-medium">{getSelectedVehicle()?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Issuing Bank:</span>
                        <span className="font-medium">{banks.find((b) => b.id === formData.selectedBank)?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery:</span>
                        <span className="font-medium">
                          {formData.city}, {formData.state}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Initial Balance */}
                  <div className="space-y-3">
                    <Label>Initial FASTag Balance</Label>
                    <RadioGroup
                      value={formData.initialBalance}
                      onValueChange={(value) => setFormData({ ...formData, initialBalance: value })}
                      className="grid grid-cols-3 gap-3"
                    >
                      {["200", "500", "1000"].map((amount) => (
                        <Label
                          key={amount}
                          htmlFor={`balance-${amount}`}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                            formData.initialBalance === amount
                              ? "border-primary bg-primary/5 ring-2 ring-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={amount} id={`balance-${amount}`} className="sr-only" />
                          <span className="font-medium">Rs. {amount}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked })}
                    />
                    <label htmlFor="agreeTerms" className="text-sm text-muted-foreground leading-tight">
                      I agree to the{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        Terms & Conditions
                      </a>{" "}
                      and authorize the deduction of security deposit (refundable).
                    </label>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.agreeTerms || isLoading}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isLoading ? "Processing..." : `Pay Rs. ${calculateTotal()}`}
                      <CreditCard className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">FASTag Price</span>
                    <span>Rs. {getSelectedVehicle()?.price || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span>Rs. 150</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Initial Balance</span>
                    <span>Rs. {formData.initialBalance || 0}</span>
                  </div>
                  {formData.deliveryOption === "express" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Express Delivery</span>
                      <span>Rs. 99</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span className="text-primary">Rs. {calculateTotal()}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Activation in 30 minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>RBI-secure payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span>NHAI-accepted tag</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}