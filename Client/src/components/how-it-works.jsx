import { Car, Upload, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Car,
    step: "01",
    title: "Select Vehicle Type",
    description: "Choose your vehicle category - Car, Truck, Bus, Taxi, or Two-Wheeler.",
  },
  {
    icon: Upload,
    step: "02",
    title: "Upload KYC Documents",
    description: "Submit Aadhaar, PAN, RC copy with instant OCR-assisted verification.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Make Payment",
    description: "Pay securely via UPI, cards, netbanking, or digital wallets.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Get Activated",
    description: "Receive your FASTag and start enjoying cashless toll payments.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From selection to activation, the entire process takes less than 30 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-border">
                  <ArrowRight className="absolute -right-3 -top-2.5 h-5 w-5 text-primary" />
                </div>
              )}

              <div className="text-center group">
                {/* Step Number */}
                <div className="text-6xl font-bold text-muted/40 mb-4 group-hover:text-primary/20 transition-colors">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <item.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}