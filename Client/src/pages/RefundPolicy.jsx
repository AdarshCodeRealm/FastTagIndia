import { RefreshCw, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner with Background Image */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 backdrop-blur-sm border border-primary/20">
              <RefreshCw className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">Refund Policy</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Clear guidelines for refunds and cancellations
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

          {/* Refund Content */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-8 md:p-12">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    Introduction
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      At FastTagINDIA, a service division of Nexara International Private Limited, we strive to provide excellent service and customer satisfaction. This Refund Policy outlines the terms and conditions for refunds, cancellations, and returns related to our FASTag services.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Please read this policy carefully to understand your rights and our procedures regarding refunds.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Eligibility */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    Refund Eligibility
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <h3 className="text-lg font-semibold text-foreground mb-3">FASTag Purchase Refunds</h3>
                    <ul className="text-muted-foreground space-y-2 ml-6 mb-6">
                      <li>• Duplicate payment for the same FASTag</li>
                      <li>• Technical errors during payment processing</li>
                      <li>• Incorrect vehicle category selection</li>
                      <li>• FASTag not delivered within 15 working days</li>
                      <li>• Defective or damaged FASTag upon delivery</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mb-3">Recharge Refunds</h3>
                    <ul className="text-muted-foreground space-y-2 ml-6 mb-6">
                      <li>• Failed recharge transactions</li>
                      <li>• Duplicate recharge payments</li>
                      <li>• Recharge to incorrect FASTag number</li>
                      <li>• Technical issues during recharge process</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mb-3">Security Deposit Refunds</h3>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• FASTag account closure as per RBI guidelines</li>
                      <li>• Vehicle sold or scrapped (with proper documentation)</li>
                      <li>• Permanent relocation outside India</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Non-Refundable Items */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                    Non-Refundable Items
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      The following are not eligible for refunds:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• Toll deductions for completed journeys</li>
                      <li>• Service charges and processing fees</li>
                      <li>• FASTag replacement due to loss or theft</li>
                      <li>• Convenience fees for online transactions</li>
                      <li>• Refunds requested after 90 days of transaction</li>
                      <li>• FASTag damaged due to user negligence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Process */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-purple-600" />
                    </div>
                    Refund Process
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      
                      {/* Step 1 */}
                      <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">1</div>
                          <h4 className="font-semibold text-foreground">Submit Request</h4>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Contact our customer support with transaction details, reason for refund, and supporting documents.
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-green-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                          <h4 className="font-semibold text-foreground">Verification</h4>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Our team will verify your request and may ask for additional information or documentation.
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-orange-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">3</div>
                          <h4 className="font-semibold text-foreground">Processing</h4>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Once approved, refunds are processed within 5-7 working days to your original payment method.
                        </p>
                      </div>

                      {/* Step 4 */}
                      <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-purple-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">4</div>
                          <h4 className="font-semibold text-foreground">Confirmation</h4>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          You will receive an email confirmation once the refund is successfully processed.
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Timeline */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    Refund Timeline
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border text-sm">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Payment Method</th>
                            <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Processing Time</th>
                            <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Bank Settlement</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-border px-4 py-3 text-muted-foreground">Debit/Credit Card</td>
                            <td className="border border-border px-4 py-3 text-muted-foreground">3-5 working days</td>
                            <td className="border border-border px-4 py-3 text-muted-foreground">5-7 working days</td>
                          </tr>
                          <tr>
                            <td className="border border-border px-4 py-3 text-muted-foreground">Net Banking</td>
                            <td className="border border-border px-4 py-3 text-muted-foreground">3-5 working days</td>
                            <td className="border border-border px-4 py-3 text-muted-foreground">5-7 working days</td>
                          </tr>
                          <tr>
                            <td className="border border-border px-4 py-3 text-muted-foreground">UPI</td>
                            <td className="border border-border px-4 py-3 text-muted-foreground">1-3 working days</td>
                            <td className="border border-border px-4 py-3 text-muted-foreground">3-5 working days</td>
                          </tr>
                          <tr>
                            <td className="border border-border px-4 py-3 text-muted-foreground">Digital Wallet</td>
                            <td className="border border-border px-4 py-3 text-muted-foreground">1-3 working days</td>
                            <td className="border border-border px-4 py-3 text-muted-foreground">3-5 working days</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Important Notes */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    Important Notes
                  </h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6">
                      <ul className="text-amber-800 space-y-3 mb-0">
                        <li>• Refunds will be processed only to the original payment source</li>
                        <li>• Bank processing times may vary during holidays and weekends</li>
                        <li>• For cash payments, refunds will be processed via bank transfer</li>
                        <li>• Partial refunds may apply in case of service usage</li>
                        <li>• International card refunds may take up to 15 working days</li>
                        <li>• GST and other taxes are non-refundable as per government regulations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Cancellation Policy</h2>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You can cancel your FASTag order or service under the following conditions:
                    </p>
                    <ul className="text-muted-foreground space-y-2 ml-6">
                      <li>• FASTag order can be cancelled within 24 hours of placing the order</li>
                      <li>• No cancellation allowed after FASTag dispatch</li>
                      <li>• Recharge transactions cannot be cancelled once completed</li>
                      <li>• Account closure requests must be submitted with proper documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact for Refunds</h2>
              <div className="bg-muted/50 rounded-xl p-6 border-l-4 border-primary">
                <p className="text-muted-foreground mb-4">
                  For refund requests or queries, please contact our customer support team:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Customer Support</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      FasTagIndia<br />
                      Office No.145, 93A/1A1, 93A/2, 93A, 93 Avenue Mall,<br />
                      Wanowrie, Pune City, Pune, Maharashtra, India - 411022<br />
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Refund Contact</h3>
                    <p className="text-muted-foreground text-sm">
                      Email: <a 
                        href="mailto:refunds@fastagindia.in?subject=Refund Request" 
                        className="hover:text-primary transition-colors underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        refunds@fastagindia.in
                      </a><br />
                      Business Email: <a 
                        href="mailto:business@fastagindia.in?subject=Refund Inquiry" 
                        className="hover:text-primary transition-colors underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        business@fastagindia.in
                      </a><br />
                      Phone: <a href="tel:+919172727232" className="hover:text-primary transition-colors">+91 9172727232</a><br />
                      Support Hours: 24/7
                    </p>
                    <div className="mt-3 pt-3 border-t border-muted-foreground/20">
                      <h4 className="font-medium text-foreground text-xs mb-1">Required Information</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        • Transaction ID or Order Number<br />
                        • Registered Mobile Number<br />
                        • Vehicle Registration Number<br />
                        • Reason for Refund Request
                      </p>
                    </div>
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

export default RefundPolicy;