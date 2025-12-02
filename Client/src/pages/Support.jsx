import { Headphones, MessageCircle, Mail, Phone, Clock, HelpCircle, FileText, Search, User, AlertCircle } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useState } from "react";

const Support = () => {
  const [selectedCategory, setSelectedCategory] = useState("general");
  
  const supportCategories = [
    { id: "general", name: "General Queries", icon: HelpCircle },
    { id: "technical", name: "Technical Issues", icon: AlertCircle },
    { id: "payment", name: "Payment & Billing", icon: FileText },
    { id: "account", name: "Account Management", icon: User },
  ];

  const faqData = {
    general: [
      {
        question: "What is FASTag and how does it work?",
        answer: "FASTag is an electronic toll collection system that uses RFID technology. It's affixed on the windscreen of your vehicle and enables automatic deduction of toll charges from your prepaid wallet when you pass through toll plazas."
      },
      {
        question: "Is FASTag mandatory for all vehicles?",
        answer: "Yes, FASTag is mandatory for all four-wheeler vehicles as per the Ministry of Road Transport and Highways notification. Vehicles without FASTag are charged double toll."
      },
      {
        question: "How long does it take to get my FASTag?",
        answer: "FASTag delivery typically takes 3-7 working days depending on your location. You'll receive SMS updates about the delivery status."
      },
      {
        question: "Can I use one FASTag for multiple vehicles?",
        answer: "No, each FASTag is vehicle-specific and linked to your vehicle's registration number. You need a separate FASTag for each vehicle."
      }
    ],
    technical: [
      {
        question: "My FASTag is not working at toll plazas. What should I do?",
        answer: "Check if your FASTag has sufficient balance, is properly stuck on the windscreen, and is not damaged. If the issue persists, contact our support team for a replacement."
      },
      {
        question: "Why is my FASTag showing as blacklisted?",
        answer: "FASTag can be blacklisted due to insufficient balance, invalid KYC, or technical issues. Contact our support team with your FASTag details for immediate resolution."
      },
      {
        question: "How do I activate my new FASTag?",
        answer: "Your FASTag gets automatically activated within 24 hours of successful KYC verification and first recharge. You'll receive SMS confirmation once activated."
      },
      {
        question: "What if toll is deducted twice from my FASTag?",
        answer: "Double deduction issues are automatically resolved within 7 working days. If not resolved, contact our support team with transaction details for manual resolution."
      }
    ],
    payment: [
      {
        question: "How can I recharge my FASTag?",
        answer: "You can recharge your FASTag through our website, mobile app, UPI, net banking, or at authorized point of sale locations. Recharge is instant and you'll receive SMS confirmation."
      },
      {
        question: "What happens if my FASTag balance is insufficient?",
        answer: "If balance is insufficient, you'll need to pay cash at toll plaza. Your FASTag might get temporarily blocked. Recharge immediately to avoid blacklisting."
      },
      {
        question: "Can I get a refund on my FASTag balance?",
        answer: "Yes, you can request refund of remaining balance when closing your FASTag account. Security deposit is also refundable as per RBI guidelines."
      },
      {
        question: "Are there any charges for FASTag transactions?",
        answer: "No transaction charges for toll payments. However, SMS charges and other bank charges may apply as per your bank's policy."
      }
    ],
    account: [
      {
        question: "How can I check my FASTag balance?",
        answer: "You can check balance through our website, mobile app, SMS (send BAL to 9972078888), or customer care. Balance is also displayed on toll plaza screens."
      },
      {
        question: "How do I update my mobile number or address?",
        answer: "Login to your account on our website/app and update your details in the profile section. Some changes might require document verification."
      },
      {
        question: "Can I transfer my FASTag to a new vehicle?",
        answer: "No, FASTag cannot be transferred between vehicles. You need to close the existing account and apply for a new FASTag for the new vehicle."
      },
      {
        question: "How do I close my FASTag account?",
        answer: "Submit account closure request through our website/app or visit nearest customer service center. Remaining balance and security deposit will be refunded."
      }
    ]
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+91 9172727232",
      availability: "24/7",
      action: "Call Now",
      link: "tel:+919172727232"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your queries via email",
      contact: "support@fastagindia.in",
      availability: "Response within 24 hours",
      action: "Send Email",
      link: "mailto:support@fastagindia.in"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support agents",
      contact: "Available on website",
      availability: "9 AM - 9 PM",
      action: "Start Chat",
      link: "#"
    },
    {
      icon: FileText,
      title: "Ticket Support",
      description: "Submit a support ticket",
      contact: "Online form available",
      availability: "24/7 submission",
      action: "Submit Ticket",
      link: "#"
    }
  ];

  const currentFAQs = faqData[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 backdrop-blur-sm border border-primary/20">
              <Headphones className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">Customer Support</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              We're here to help you with all your FASTag queries and issues
            </p>
            <p className="text-muted-foreground text-sm mt-4 flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              24/7 Support Available
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{method.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                <p className="text-foreground font-medium text-sm mb-2">{method.contact}</p>
                <p className="text-muted-foreground text-xs mb-4">{method.availability}</p>
                <a 
                  href={method.link}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  {method.action}
                </a>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            </div>

            {/* Category Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    selectedCategory === category.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <category.icon className="h-4 w-4" />
                    <span className="font-semibold text-sm">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {currentFAQs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-open:rotate-45 transition-transform">
                      <span className="text-primary text-sm font-bold">+</span>
                    </div>
                  </summary>
                  <div className="p-4 text-muted-foreground leading-relaxed bg-muted/10 rounded-b-lg mt-1">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Service Status */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            
            {/* Current Service Status */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                Service Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">FASTag Services</span>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Payment Gateway</span>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Customer Support</span>
                  <span className="text-green-600 font-medium">Available</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Mobile App</span>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-4">
                Last updated: {new Date().toLocaleString('en-IN')}
              </p>
            </div>

            {/* Support Hours */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                Support Hours
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Phone Support</h4>
                  <p className="text-muted-foreground text-sm">Available 24/7 for emergency issues</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Live Chat</h4>
                  <p className="text-muted-foreground text-sm">Monday to Sunday: 9:00 AM - 9:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Email Support</h4>
                  <p className="text-muted-foreground text-sm">Response within 24 hours on business days</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Service Centers</h4>
                  <p className="text-muted-foreground text-sm">Monday to Saturday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

          </div>

          {/* Additional Resources */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-8 mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              Additional Resources
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <FileText className="h-12 w-12 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">User Manual</h4>
                <p className="text-muted-foreground text-sm mb-3">Complete guide on using FASTag services</p>
                <a href="#" className="text-primary hover:underline text-sm">Download PDF</a>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <Search className="h-12 w-12 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Knowledge Base</h4>
                <p className="text-muted-foreground text-sm mb-3">Comprehensive articles and tutorials</p>
                <a href="#" className="text-primary hover:underline text-sm">Browse Articles</a>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Community Forum</h4>
                <p className="text-muted-foreground text-sm mb-3">Connect with other FASTag users</p>
                <a href="#" className="text-primary hover:underline text-sm">Join Forum</a>
              </div>
            </div>
          </div>

          {/* Emergency Support */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-8 text-center border border-red-500/20">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Emergency Support</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              For urgent issues like FASTag not working at toll plaza or payment failures, 
              call our emergency helpline for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919172727232" 
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Emergency Line
              </a>
              <a 
                href="mailto:emergency@fastagindia.in" 
                className="inline-flex items-center justify-center px-6 py-3 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                Emergency Email
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;