import { Code, Zap, Shield, Book, Globe, Terminal, Layers, Key, CheckCircle, Copy, ExternalLink, Download, PlayCircle, Coffee } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useState } from "react";

const ApiDevelopers = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState("purchase");

  const apiFeatures = [
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "99.9% uptime with lightning-fast response times under 200ms"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Bank-grade security with OAuth 2.0 and RBI compliance"
    },
    {
      icon: Globe,
      title: "RESTful APIs",
      description: "Simple, intuitive REST APIs with JSON responses"
    },
    {
      icon: Book,
      title: "Rich Documentation",
      description: "Comprehensive docs with code examples and SDKs"
    }
  ];

  const apiEndpoints = {
    purchase: {
      method: "POST",
      endpoint: "/api/v1/fastag/purchase",
      description: "Create a new FASTag purchase order",
      code: `{
  "vehicle_number": "MH12AB1234",
  "vehicle_type": "car",
  "customer": {
    "name": "John Doe",
    "mobile": "+919876543210",
    "email": "john@example.com"
  },
  "address": {
    "line1": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  }
}`,
      response: `{
  "success": true,
  "order_id": "FT2025120212345",
  "fastag_id": "34161FA070023456789",
  "amount": 500,
  "status": "processing",
  "estimated_delivery": "2025-12-05"
}`
    },
    recharge: {
      method: "POST",
      endpoint: "/api/v1/fastag/recharge",
      description: "Recharge an existing FASTag",
      code: `{
  "fastag_id": "34161FA070023456789",
  "amount": 1000,
  "payment_method": "upi",
  "customer_mobile": "+919876543210"
}`,
      response: `{
  "success": true,
  "transaction_id": "TXN2025120212345",
  "fastag_id": "34161FA070023456789",
  "amount": 1000,
  "balance": 1500,
  "status": "success"
}`
    },
    balance: {
      method: "GET",
      endpoint: "/api/v1/fastag/balance/{fastag_id}",
      description: "Check FASTag balance and status",
      code: `// No request body required
// Pass FASTag ID in URL path`,
      response: `{
  "success": true,
  "fastag_id": "34161FA070023456789",
  "balance": 1500,
  "status": "active",
  "last_transaction": "2025-12-01T10:30:00Z",
  "vehicle_number": "MH12AB1234"
}`
    },
    webhook: {
      method: "POST",
      endpoint: "Your webhook URL",
      description: "Receive real-time notifications",
      code: `// Webhook payload sent to your endpoint
{
  "event": "fastag.purchase.completed",
  "order_id": "FT2025120212345",
  "fastag_id": "34161FA070023456789",
  "status": "delivered",
  "timestamp": "2025-12-05T14:30:00Z"
}`,
      response: `// Your endpoint should return:
{
  "received": true
}`
    }
  };

  const pricingTiers = [
    {
      name: "Starter",
      price: "Free",
      requests: "1,000/month",
      features: [
        "Basic API access",
        "Standard support",
        "Documentation access",
        "Community support"
      ],
      limitations: "Rate limited to 10 req/min"
    },
    {
      name: "Professional",
      price: "₹2,999/month",
      requests: "50,000/month",
      features: [
        "Full API access",
        "Priority support",
        "Webhook notifications",
        "Advanced analytics",
        "Custom integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      requests: "Unlimited",
      features: [
        "White-label solutions",
        "Dedicated support",
        "Custom endpoints",
        "SLA guarantee",
        "On-premise deployment"
      ]
    }
  ];

  const sdkLanguages = [
    { name: "Node.js", icon: "🟢", status: "Available" },
    { name: "Python", icon: "🐍", status: "Available" },
    { name: "PHP", icon: "🐘", status: "Available" },
    { name: "Java", icon: "☕", status: "Available" },
    { name: "C#/.NET", icon: "🔵", status: "Coming Soon" },
    { name: "Ruby", icon: "💎", status: "Coming Soon" }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 backdrop-blur-sm border border-primary/20">
              <Code className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">API & Developers</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Integrate FASTag services into your applications with our powerful, developer-friendly APIs
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">RESTful APIs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Real-time webhooks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Multiple SDKs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">

          {/* API Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our APIs?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built for developers, by developers. Get started in minutes with our comprehensive API suite.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {apiFeatures.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* API Documentation */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">API Documentation</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our API endpoints with live examples and interactive documentation
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              {/* Endpoint Selector */}
              <div className="border-b border-border">
                <div className="flex overflow-x-auto">
                  {Object.entries(apiEndpoints).map(([key, endpoint]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedEndpoint(key)}
                      className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        selectedEndpoint === key
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }`}
                    >
                      {endpoint.method} {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* API Details */}
              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Request */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        apiEndpoints[selectedEndpoint].method === 'GET' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {apiEndpoints[selectedEndpoint].method}
                      </span>
                      <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                        {apiEndpoints[selectedEndpoint].endpoint}
                      </code>
                      <button
                        onClick={() => copyToClipboard(apiEndpoints[selectedEndpoint].endpoint)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {apiEndpoints[selectedEndpoint].description}
                    </p>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{apiEndpoints[selectedEndpoint].code}</pre>
                    </div>
                  </div>

                  {/* Response */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Response</h4>
                    <div className="bg-slate-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{apiEndpoints[selectedEndpoint].response}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SDK Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">SDKs & Libraries</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Official SDKs for popular programming languages to get you started quickly
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sdkLanguages.map((sdk, index) => (
                <div key={index} className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{sdk.icon}</span>
                    <div>
                      <h3 className="font-bold text-foreground">{sdk.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        sdk.status === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {sdk.status}
                      </span>
                    </div>
                  </div>
                  {sdk.status === 'Available' ? (
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        <Download className="h-4 w-4 mr-2 inline" />
                        Install
                      </button>
                      <button className="px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      Coming soon - Join waitlist for early access
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">API Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transparent pricing with no hidden fees. Start free, scale as you grow.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, index) => (
                <div 
                  key={index}
                  className={`relative bg-card rounded-xl border shadow-sm p-8 transition-all hover:shadow-md ${
                    tier.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-primary mb-1">{tier.price}</div>
                    <p className="text-muted-foreground text-sm">{tier.requests}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {tier.limitations && (
                    <p className="text-xs text-muted-foreground mb-6 text-center">
                      {tier.limitations}
                    </p>
                  )}

                  <button 
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      tier.popular 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'border border-primary text-primary hover:bg-primary/10'
                    }`}
                  >
                    {tier.price === 'Free' ? 'Get Started' : tier.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <Terminal className="h-6 w-6 text-primary" />
                Quick Start Guide
              </h2>
              <p className="text-muted-foreground">
                Get up and running with our API in just a few minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  1
                </div>
                <h3 className="font-semibold text-foreground mb-2">Get API Key</h3>
                <p className="text-muted-foreground text-sm">Sign up and get your API key from the developer dashboard</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  2
                </div>
                <h3 className="font-semibold text-foreground mb-2">Make First Call</h3>
                <p className="text-muted-foreground text-sm">Use our interactive docs to make your first API call</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  3
                </div>
                <h3 className="font-semibold text-foreground mb-2">Build & Scale</h3>
                <p className="text-muted-foreground text-sm">Integrate into your app and scale with our robust infrastructure</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex gap-4">
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  <Key className="h-5 w-5 mr-2 inline" />
                  Get API Key
                </button>
                <button className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors">
                  <PlayCircle className="h-5 w-5 mr-2 inline" />
                  Try Interactive Docs
                </button>
              </div>
            </div>
          </div>

          {/* Developer Resources */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <Book className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Documentation</h3>
              <p className="text-muted-foreground text-sm mb-4">Comprehensive guides and API references</p>
              <button className="text-primary hover:underline text-sm">
                Browse Docs <ExternalLink className="h-3 w-3 ml-1 inline" />
              </button>
            </div>
            
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <Coffee className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Developer Community</h3>
              <p className="text-muted-foreground text-sm mb-4">Connect with other developers and get support</p>
              <button className="text-primary hover:underline text-sm">
                Join Community <ExternalLink className="h-3 w-3 ml-1 inline" />
              </button>
            </div>
            
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <Layers className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Status Page</h3>
              <p className="text-muted-foreground text-sm mb-4">Monitor API uptime and performance</p>
              <button className="text-primary hover:underline text-sm">
                Check Status <ExternalLink className="h-3 w-3 ml-1 inline" />
              </button>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Build?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of developers already building amazing applications with our FASTag APIs. 
              Get started today with our free tier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                <Key className="h-5 w-5 mr-2" />
                Get API Access
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                <Book className="h-5 w-5 mr-2" />
                View Documentation
              </button>
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Developer Support: api-support@fastagindia.in | Documentation: docs.fastagindia.in
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApiDevelopers;