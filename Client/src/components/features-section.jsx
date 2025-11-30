import {
  CreditCard,
  Zap,
  Shield,
  Bell,
  Smartphone,
  RefreshCw,
  FileCheck,
  Truck,
  Clock,
  Wallet,
  Users,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: CreditCard,
    title: "Easy FASTag Purchase",
    description: "Guided purchase wizard with vehicle type selection, KYC upload, and multiple issuer bank options.",
  },
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Get your FASTag activated within 30 minutes with instant e-KYC and auto-binding to your vehicle.",
  },
  {
    icon: Wallet,
    title: "Multiple Recharge Options",
    description: "Top-up via UPI, netbanking, cards, wallets, and set up auto-topup rules for seamless travel.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Get instant SMS, email, and push notifications for toll deductions, low balance, and receipts.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "PCI-DSS compliant processing with two-factor authentication and encrypted data protection.",
  },
  {
    icon: Smartphone,
    title: "Account Dashboard",
    description: "Manage multiple vehicles, view transaction history, download statements, and track disputes.",
  },
  {
    icon: RefreshCw,
    title: "Auto-Topup",
    description: "Never run low on balance. Set threshold-based auto-topup rules for uninterrupted travel.",
  },
  {
    icon: FileCheck,
    title: "Quick KYC",
    description: "Upload Aadhaar, PAN, and RC with OCR-assisted verification and real-time status tracking.",
  },
  {
    icon: Truck,
    title: "Multiple Delivery Options",
    description: "Choose from home delivery, kiosk pick-up, or installation partner for your convenience.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support via chat, call, and ticketing with visible SLA tracking.",
  },
  {
    icon: Users,
    title: "Fleet Management",
    description: "Bulk FASTag issuance, per-vehicle tracking, and consolidated invoices for businesses.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Downloadable e-receipts, CSV/PDF statements, and toll history for selected date ranges.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need for Seamless Toll Payments
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From purchase to recharge, we've got you covered with a complete suite of features designed for convenience
            and security.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}