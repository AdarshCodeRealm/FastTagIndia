import { Shield, Eye, Database, Lock, UserCheck, AlertTriangle } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner with Background Image */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 backdrop-blur-sm border border-primary/20">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Your privacy and data security are our top priorities
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

          {/* Privacy Content */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-8 md:p-12">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                    Introduction
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      FastTagINDIA ("we," "our," or "us"), a service division of Nexara International, is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our FASTag services.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      By using our services, you consent to the data practices described in this policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Database className="h-4 w-4 text-purple-600" />
                    </div>
                    Information We Collect
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Personal Information</h3>
                    <ul className="text-muted-foreground space-y-2 ml-6 mb-6">
                      <li>• Name, address, and contact details</li>
                      <li>• Vehicle registration number and details</li>
                      <li>• Government-issued ID proofs (Aadhaar, PAN, etc.)</li>
                      <li>• Bank account and payment information</li>
                      <li>• Mobile number and email address</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mb-3">Transaction Information</h3>
                    <ul className="text-muted-foreground space-y-2 ml-6 mb-6">
                      <li>• FASTag usage and toll transaction history</li>
                      <li>• Recharge and payment records</li>
                      <li>• Account balance and wallet information</li>
                      <li>• Location data for toll plaza transactions</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mb-3">Technical Information</h3>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• Device information and IP address</li>
                      <li>• Browser type and version</li>
                      <li>• Usage patterns and preferences</li>
                      <li>• Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <UserCheck className="h-4 w-4 text-green-600" />
                    </div>
                    How We Use Your Information
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use your information for the following purposes:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• Process FASTag applications and activations</li>
                      <li>• Facilitate toll payments and recharges</li>
                      <li>• Provide customer support and assistance</li>
                      <li>• Send transaction alerts and notifications</li>
                      <li>• Comply with regulatory and legal requirements</li>
                      <li>• Prevent fraud and enhance security</li>
                      <li>• Improve our services and user experience</li>
                      <li>• Send promotional offers (with your consent)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Lock className="h-4 w-4 text-red-600" />
                    </div>
                    Data Security & Protection
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We implement industry-standard security measures to protect your information:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6 mb-6">
                      <li>• SSL encryption for all data transmission</li>
                      <li>• Secure servers with regular security updates</li>
                      <li>• Multi-factor authentication for account access</li>
                      <li>• Regular security audits and monitoring</li>
                      <li>• Restricted access to personal data</li>
                      <li>• PCI DSS compliance for payment processing</li>
                    </ul>
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-1">Security Notice</h4>
                          <p className="text-amber-700 text-sm">
                            While we implement robust security measures, no system is 100% secure. 
                            Please keep your login credentials confidential and report any suspicious activity immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">!</span>
                    </div>
                    Information Sharing & Disclosure
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We may share your information in the following circumstances:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• With authorized banks and payment processors</li>
                      <li>• With toll plaza operators for transaction processing</li>
                      <li>• With government agencies as required by law</li>
                      <li>• With service providers under strict confidentiality agreements</li>
                      <li>• In case of business transfer or acquisition</li>
                      <li>• With your explicit consent for promotional purposes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <UserCheck className="h-4 w-4 text-indigo-600" />
                    </div>
                    Your Data Rights
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You have the following rights regarding your personal data:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• Access your personal information</li>
                      <li>• Correct or update your data</li>
                      <li>• Request deletion of your account</li>
                      <li>• Opt-out of marketing communications</li>
                      <li>• Data portability (where applicable)</li>
                      <li>• File complaints with data protection authorities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies Policy */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Cookies & Tracking</h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use cookies and similar technologies to enhance your experience. These help us:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• Remember your preferences and login status</li>
                      <li>• Analyze website traffic and usage patterns</li>
                      <li>• Provide personalized content and recommendations</li>
                      <li>• Improve our services and troubleshoot issues</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      You can control cookies through your browser settings, but some features may not work properly if disabled.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Us</h2>
              <div className="bg-muted/50 rounded-xl p-6 border-l-4 border-primary">
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Data Protection Officer</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      FasTagIndia<br />
                      Office No 145, 93 Avenue Mall<br />
                      Wanowrie, Pune<br />
                      Maharashtra 411022, India
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Privacy Contact</h3>
                    <p className="text-muted-foreground text-sm">
                      Email: <a 
                        href="mailto:privacy@fastagindia.in?subject=Privacy Policy Inquiry" 
                        className="hover:text-primary transition-colors underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        privacy@fastagindia.in
                      </a><br />
                      Business Email: <a 
                        href="mailto:business@fastagindia.in?subject=Privacy Inquiry" 
                        className="hover:text-primary transition-colors underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        business@fastagindia.in
                      </a><br />
                      Phone: <a href="tel:+919172727232" className="hover:text-primary transition-colors">+91 9172727232</a><br />
                      Response Time: Within 48 hours
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

export default PrivacyPolicy;