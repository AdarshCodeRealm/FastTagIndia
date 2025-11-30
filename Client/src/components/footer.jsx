import { Car, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Building2, FileText, Shield, CreditCard } from "lucide-react";

const navigationSections = {
  services: [
    { name: "Buy FASTag", href: "/buy-fastag" }, // ✅ Exists
    { name: "Recharge FASTag", href: "/recharge-fastag" }, // ✅ Exists  
    { name: "Track Order", href: "/track-order" }, // ✅ Exists
    { name: "Balance Check", href: "/" }, // → Redirect to home (doesn't exist)
  ],
  support: [
    { name: "Help Center", href: "/" }, // → Redirect to home (doesn't exist)
    { name: "Customer Support", href: "/" }, // → Redirect to home (doesn't exist)
    { name: "FAQ", href: "/" }, // → Redirect to home (doesn't exist)
    { name: "Contact Us", href: "/" }, // → Redirect to home (doesn't exist)
  ],
  company: [
    { name: "About Us", href: "/" }, // → Redirect to home (doesn't exist)
    { name: "Careers", href: "/" }, // → Redirect to home (doesn't exist)
    { name: "Press", href: "/" }, // → Redirect to home (doesn't exist)
    { name: "Partners", href: "/" }, // → Redirect to home (doesn't exist)
  ],
  legal: [
    { name: "Terms & Conditions", href: "/" }, // → Redirect to home (doesn't exist)
    { name: "Privacy Policy", href: "/" }, // → Redirect to home (doesn't exist)
    { name: "Refund Policy", href: "/" }, // → Redirect to home (doesn't exist)
    { name: "Security", href: "/" }, // → Redirect to home (doesn't exist)
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.04),transparent_50%)]"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-3">
            <a href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-2 group-hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="font-bold text-2xl">
                  FasTag<span className="text-primary">India</span>
                </span>
                <p className="text-xs text-slate-400 -mt-1">Fastest FASTag Provider</p>
              </div>
            </a>
            
            <p className="text-slate-300 leading-relaxed mb-6 max-w-sm">
              India&apos;s most trusted FASTag provider with instant activation, secure payments, and 24/7 support.
            </p>

            {/* Social Links */}
            <div>
              <p className="text-sm font-medium text-slate-300 mb-4">Follow us</p>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, label: "Facebook", href: "#" },
                  { Icon: Twitter, label: "Twitter", href: "#" },
                  { Icon: Instagram, label: "Instagram", href: "#" },
                  { Icon: Linkedin, label: "LinkedIn", href: "#" }
                ].map(({ Icon, label, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group"
                  >
                    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Navigation Menus */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Services */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                Services
              </h3>
              <ul className="space-y-3">
                {navigationSections.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors text-sm hover:underline underline-offset-4"
                      onClick={(e) => {
                        // Add click handler for non-existent pages
                        if (link.href === "/" && link.name !== "Balance Check") {
                          e.preventDefault();
                          alert(`${link.name} page is coming soon! Redirecting to home.`);
                          window.location.href = "/";
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Support
              </h3>
              <ul className="space-y-3">
                {navigationSections.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors text-sm hover:underline underline-offset-4"
                      onClick={(e) => {
                        // Add click handler for non-existent pages
                        if (link.href === "/") {
                          e.preventDefault();
                          alert(`${link.name} page is coming soon! Redirecting to home.`);
                          window.location.href = "/";
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Company
              </h3>
              <ul className="space-y-3">
                {navigationSections.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors text-sm hover:underline underline-offset-4"
                      onClick={(e) => {
                        // Add click handler for non-existent pages
                        if (link.href === "/") {
                          e.preventDefault();
                          alert(`${link.name} page is coming soon! Redirecting to home.`);
                          window.location.href = "/";
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Legal
              </h3>
              <ul className="space-y-3">
                {navigationSections.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors text-sm hover:underline underline-offset-4"
                      onClick={(e) => {
                        // Add click handler for non-existent pages
                        if (link.href === "/") {
                          e.preventDefault();
                          alert(`${link.name} page is coming soon! Redirecting to home.`);
                          window.location.href = "/";
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Company Details - Right Side */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Company Details
            </h3>
            
            <div className="space-y-6">
              
              {/* Headquarters */}
              <div className="group">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm mb-1">Headquarters</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      FasTagIndia Pvt. Ltd.<br />
                      Andheri East, Mumbai<br />
                      Maharashtra 400069, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Email */}
              <div className="group">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center shadow-lg flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm mb-1">Business Email</h4>
                    <p className="text-slate-300 text-sm">
                      business@fastagindia.in
                    </p>
                    <p className="text-slate-400 text-xs mt-1">For partnerships & inquiries</p>
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              {/*<div className="bg-slate-800/20 backdrop-blur-sm rounded-lg p-4 border border-slate-700/30">
                <h4 className="font-semibold text-white text-sm mb-3">Registration Details</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">GSTIN:</span>
                    <span className="text-slate-300">27XXXXX1234X1ZX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">CIN:</span>
                    <span className="text-slate-300">U74999MH2020PTC123456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">PAN:</span>
                    <span className="text-slate-300">AAACT1234C</span>
                  </div>
                </div>
              </div>*/}

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-800/30 to-slate-900/50"></div>
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} <span className="text-white font-medium">FasTagIndia Pvt. Ltd.</span> All rights reserved.
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Authorized FASTag provider • RBI Compliant • ISO 27001 Certified
              </p>
            </div>

            {/* Additional Info */}
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm">
                Trusted by <span className="text-primary font-semibold">10L+</span> customers
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Accepted at 800+ toll plazas across India
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}