import { Phone, Mail, MapPin, Clock, Headphones, MessageCircle } from "lucide-react";

export function GetInTouchSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.03),transparent_50%)]"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Need help with your FASTag? Our dedicated support team is here to assist you 24/7. 
            Choose your preferred way to reach us.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Customer Support */}
          <div className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-200 hover:border-primary/20 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">Customer Support</h3>
                <p className="text-slate-600 text-sm mb-4">Available 24/7 for all your queries</p>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900 text-lg">+91 9172727232</p>
                  <p className="text-slate-500 text-sm">Toll-free • No charges apply</p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Support */}
          <div className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-200 hover:border-primary/20 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">Email Support</h3>
                <p className="text-slate-600 text-sm mb-4">Quick response guaranteed within 2 hours</p>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900">business@fastagindia.com</p>
                  <p className="text-slate-500 text-sm">Professional assistance</p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                  <MessageCircle className="h-3 w-3" />
                  <span>Response within 2 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Office */}
          <div className="group md:col-span-2 lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-200 hover:border-primary/20 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">Visit Our Office</h3>
                <p className="text-slate-600 text-sm mb-4">Meet our team in person for personalized assistance</p>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900">Office No 143, 93Avenue Mall</p>
                  <p className="text-slate-500 text-sm">Wanowrie, Pune<br />Maharashtra, India</p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>Mon-Fri: 9 AM - 6 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Support Options */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Headphones className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-xl text-slate-900">Need Immediate Help?</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Our expert support team is ready to assist you with FASTag activation, recharge, or any technical issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:+919172727232" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <Phone className="h-4 w-4" />
                Call Now: +91 917-272-7232
              </a>
              <a 
                href="mailto:business@fastagindia.com" 
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 px-6 py-3 rounded-xl font-medium transition-all hover:shadow-md"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}