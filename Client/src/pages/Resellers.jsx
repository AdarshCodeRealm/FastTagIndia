import { Users, Handshake, TrendingUp, Star, Shield, Target, Award, Calculator, Phone, Mail, CheckCircle, ArrowRight, Building2 } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useState } from "react";

const Resellers = () => {
  const [selectedPlan, setSelectedPlan] = useState("silver");

  const partnershipPlans = [
    {
      id: "silver",
      name: "Silver Partner",
      investment: "₹50,000",
      commission: "3-5%",
      support: "Email & Phone",
      features: [
        "Basic training materials",
        "Standard commission rates",
        "Email support",
        "Monthly settlements",
        "Basic marketing materials"
      ],
      minTarget: "100 FASTag/month",
      benefits: [
        "Instant onboarding",
        "Digital certificates",
        "Basic partner portal access"
      ]
    },
    {
      id: "gold",
      name: "Gold Partner",
      investment: "₹1,00,000",
      commission: "5-7%",
      support: "Priority Support",
      features: [
        "Advanced training program",
        "Higher commission rates",
        "Priority support",
        "Weekly settlements",
        "Branded marketing materials",
        "Regional exclusivity options"
      ],
      minTarget: "300 FASTag/month",
      benefits: [
        "Dedicated account manager",
        "Co-branded materials",
        "Territory protection",
        "Performance bonuses"
      ],
      popular: true
    },
    {
      id: "platinum",
      name: "Platinum Partner",
      investment: "₹2,50,000",
      commission: "7-10%",
      support: "24/7 Dedicated",
      features: [
        "Comprehensive training program",
        "Maximum commission rates",
        "24/7 dedicated support",
        "Daily settlements",
        "Custom marketing materials",
        "Exclusive territory rights",
        "White-label solutions"
      ],
      minTarget: "500 FASTag/month",
      benefits: [
        "Exclusive territory rights",
        "White-label platform",
        "Custom integration support",
        "Premium rewards program"
      ]
    }
  ];

  const businessOpportunities = [
    {
      icon: Building2,
      title: "Retail Outlets",
      description: "Set up FASTag sales counters in your retail stores, petrol pumps, or service centers.",
      earning: "₹20-50 per FASTag"
    },
    {
      icon: Users,
      title: "Corporate Sales",
      description: "Target businesses with fleet vehicles for bulk FASTag purchases.",
      earning: "₹500-2000 per deal"
    },
    {
      icon: Target,
      title: "Online Business",
      description: "Leverage digital marketing to sell FASTag through online channels.",
      earning: "₹25-75 per FASTag"
    },
    {
      icon: Handshake,
      title: "B2B Partnerships",
      description: "Partner with automobile dealers, logistics companies, and transport businesses.",
      earning: "₹1000-5000 per partnership"
    }
  ];

  const supportServices = [
    {
      icon: Award,
      title: "Training & Certification",
      description: "Comprehensive training program with certification"
    },
    {
      icon: Shield,
      title: "Marketing Support",
      description: "Branded materials, digital assets, and campaign support"
    },
    {
      icon: Calculator,
      title: "Business Tools",
      description: "CRM system, sales tracking, and reporting tools"
    },
    {
      icon: TrendingUp,
      title: "Growth Assistance",
      description: "Business development support and expansion guidance"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 backdrop-blur-sm border border-primary/20">
              <Handshake className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">Reseller Program</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Join India's fastest-growing FASTag network and build a profitable business with unlimited earning potential
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Zero inventory risk</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Instant commissions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Complete support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Business Opportunities */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Business Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Multiple ways to generate revenue with our comprehensive FASTag reseller program
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessOpportunities.map((opportunity, index) => (
                <div key={index} className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <opportunity.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{opportunity.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{opportunity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {opportunity.earning}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Plans */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Partnership Plans</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan based on your business goals and investment capacity
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {partnershipPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`relative bg-card rounded-xl border shadow-sm p-8 transition-all hover:shadow-md ${
                    plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-primary mb-1">{plan.investment}</div>
                    <p className="text-muted-foreground text-sm">Initial Investment</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Commission</span>
                      <span className="font-semibold text-foreground">{plan.commission}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Support</span>
                      <span className="font-semibold text-foreground">{plan.support}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Min Target</span>
                      <span className="font-semibold text-foreground">{plan.minTarget}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      plan.popular 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'border border-primary text-primary hover:bg-primary/10'
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Support Services */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Partner Support</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive support system to ensure your success as our partner
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportServices.map((service, index) => (
                <div key={index} className="bg-card rounded-xl border border-border shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Calculator */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <Calculator className="h-6 w-6 text-primary" />
                Earnings Calculator
              </h2>
              <p className="text-muted-foreground">
                Calculate your potential monthly earnings based on sales volume
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-primary mb-1">₹15,000</div>
                <div className="text-sm text-muted-foreground mb-2">Monthly Earnings</div>
                <div className="text-xs text-muted-foreground">100 FASTag sales</div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-primary mb-1">₹45,000</div>
                <div className="text-sm text-muted-foreground mb-2">Monthly Earnings</div>
                <div className="text-xs text-muted-foreground">300 FASTag sales</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-primary mb-1">₹1,25,000</div>
                <div className="text-sm text-muted-foreground mb-2">Monthly Earnings</div>
                <div className="text-xs text-muted-foreground">500 FASTag sales</div>
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">How to Become a Partner</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: "Apply Online", desc: "Submit your application with required documents" },
                { step: 2, title: "Verification", desc: "Our team will verify your business credentials" },
                { step: 3, title: "Agreement", desc: "Sign the partnership agreement and make investment" },
                { step: 4, title: "Launch", desc: "Get training, materials, and start selling FASTag" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute mt-6">
                      <ArrowRight className="h-4 w-4 text-muted-foreground ml-16" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Partner with Us?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of successful partners across India. Start your FASTag business today 
              and become part of India's digital toll payment revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919172727232" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Partner Team
              </a>
              <a 
                href="mailto:partners@fastagindia.in" 
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Partnership Inquiry
              </a>
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Partnership Hotline: +91 9172727232 | Email: partners@fastagindia.in
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resellers;