import { FileText, Shield, CreditCard, Users, AlertCircle } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner with Background Image */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 backdrop-blur-sm border border-primary/20">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">Terms & Conditions</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Please read these terms carefully before using our FASTag services
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Last updated: {new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Terms Content */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-8 md:p-12">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  {/* <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="Professional handshake" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  /> */}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    Introduction
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Welcome to FastTagINDIA ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our FASTag services, website, and mobile application (collectively, the "Service") operated by FastTagINDIA, a service division of Nexara International.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  {/* <img 
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="FASTag services" 
                    className="w-24 h-24 rounded-lg object-cover border-2 border-green-200"
                  /> */}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-green-600" />
                    </div>
                    Our Services
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      FasTagIndia provides the following services:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• FASTag purchase and issuance</li>
                      <li>• FASTag recharge and wallet top-up</li>
                      <li>• Order tracking and status updates</li>
                      <li>• Customer support and assistance</li>
                      <li>• Balance inquiry and transaction history</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  {/* <img 
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="User responsibilities" 
                    className="w-24 h-24 rounded-lg object-cover border-2 border-purple-200"
                  /> */}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    User Responsibilities
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      When using our services, you agree to:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• Provide accurate and complete information during registration</li>
                      <li>• Maintain the security of your account credentials</li>
                      <li>• Use the FASTag only for lawful purposes</li>
                      <li>• Comply with all applicable traffic rules and regulations</li>
                      <li>• Report any issues or discrepancies promptly</li>
                      <li>• Not share your FASTag with unauthorized users</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  {/* <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="Payment and transactions" 
                    className="w-24 h-24 rounded-lg object-cover border-2 border-orange-200"
                  /> */}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">₹</span>
                    </div>
                    Payment Terms
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• All payments must be made in Indian Rupees (INR)</li>
                      <li>• FASTag requires a minimum recharge amount as per RBI guidelines</li>
                      <li>• Security deposits are refundable upon FASTag closure</li>
                      <li>• Transaction charges may apply as per prevailing rates</li>
                      <li>• Failed transactions will be refunded within 5-7 working days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Limitations */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  {/* <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="Legal documentation" 
                    className="w-24 h-24 rounded-lg object-cover border-2 border-red-200"
                  /> */}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    Limitations of Liability
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      FasTagIndia shall not be liable for:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• Technical failures at toll plazas not operated by us</li>
                      <li>• Damages arising from misuse of FASTag</li>
                      <li>• Force majeure events beyond our control</li>
                      <li>• Third-party service interruptions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  {/* <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="Data privacy and security" 
                    className="w-24 h-24 rounded-lg object-cover border-2 border-indigo-200"
                  /> */}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-indigo-600" />
                    </div>
                    Privacy & Data Protection
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed">
                      Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information. By using our services, you consent to the collection and use of information as outlined in our Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="bg-muted/50 rounded-xl p-6 border-l-4 border-primary">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">FastTagINDIA</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Office No.145, 93A/1A1, 93A/2, 93A, 93 Avenue Mall,<br />
                      Wanowrie, Pune City, Pune, Maharashtra, India - 411022<br />
                    </p>
                    <p className="text-muted-foreground text-xs mt-2">
                      A service by <a 
                        href="https://nexaraintl.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:text-primary/80 transition-colors underline"
                      >
                        Nexara International
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Business Contact</h3>
                    <p className="text-muted-foreground text-sm">
                      Email: <a 
                        href="mailto:business@fastagindia.in?subject=Terms and Conditions Inquiry" 
                        className="hover:text-primary transition-colors underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        business@fastagindia.in
                      </a><br />
                      Phone: <a href="tel:+919172727232" className="hover:text-primary transition-colors">+91 9172727232</a><br />
                      Customer Support: Available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;