import { Button } from "@/components/ui/button";
import { CreditCard, Zap, ArrowRight, Phone, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Ready to Experience Cashless Toll Payments?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join over 1 million customers who trust FastLane for their FASTag needs. Get started today and enjoy instant
            activation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Buy FASTag — Activate in 30 mins
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 rounded-xl transition-all bg-transparent"
            >
              <Zap className="mr-2 h-5 w-5" />
              Recharge — Instant Top-up
            </Button>
          </div>

          {/* Support Options */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>24/7 Support: 1800-XXX-XXXX</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-primary-foreground/40 rounded-full" />
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>Live chat available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}