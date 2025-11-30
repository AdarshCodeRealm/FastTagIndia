import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Zap, Shield, CheckCircle2, ArrowRight, Clock, Users, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Announcement Badge */}
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20"
            >
              <span className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse" />
              Instant FASTag activation in 30 minutes
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Badge>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                Buy & Recharge FASTag
                <span className="block text-primary">Instant Activation</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Get FASTag delivered & activated in 30 minutes. Secure payments, automatic toll payments, and 24/7
                support across all national highways.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/buy-fastag">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all w-full sm:w-auto"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Buy FASTag Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/recharge-fastag">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-foreground/20 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground text-lg px-8 py-6 rounded-xl transition-all bg-transparent w-full sm:w-auto"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Recharge Your FASTag
                </Button>
              </a>
            </div>

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span>All national toll plazas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-secondary" />
                <span>RBI-secure payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-5 w-5 text-secondary" />
                <span>1M+ customers</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative lg:pl-8">
            <div className="relative">
              {/* Main Card Visual */}
              <div className="bg-card rounded-3xl shadow-2xl p-8 border border-border">
                {/* FASTag Card Preview */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground mb-6 transform hover:scale-[1.02] transition-transform">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-sm opacity-80">FASTag</p>
                      <p className="text-lg font-semibold">FasTagIndia</p>
                    </div>
                    <div className="bg-primary-foreground/20 rounded-lg p-2">
                      <CreditCard className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-2xl font-mono tracking-wider">•••• •••• •••• 4589</div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="opacity-70 text-xs">Vehicle</p>
                        <p className="font-medium">MH 12 AB 1234</p>
                      </div>
                      <div className="text-right">
                        <p className="opacity-70 text-xs">Balance</p>
                        <p className="font-medium">₹1,250</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <Clock className="h-6 w-6 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">30</p>
                    <p className="text-xs text-muted-foreground">Min Activation</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <MapPin className="h-6 w-6 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">800+</p>
                    <p className="text-xs text-muted-foreground">Toll Plazas</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">100%</p>
                    <p className="text-xs text-muted-foreground">Secure</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-2xl p-4 shadow-lg animate-pulse">
                <Zap className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Tag Activated</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by leading banks and organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {["NHAI", "ICICI Bank", "HDFC Bank", "Axis Bank", "SBI", "Paytm"].map((partner) => (
              <div key={partner} className="text-lg font-semibold text-muted-foreground">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}