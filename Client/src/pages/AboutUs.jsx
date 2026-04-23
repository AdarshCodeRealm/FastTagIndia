import { Building2, Target, Eye, HeartHandshake, ShieldCheck, Rocket, Users, Award, Clock3, CheckCircle2 } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const valueCards = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description: "We keep every FASTag order and recharge journey clear, secure, and customer-first.",
  },
  {
    icon: Rocket,
    title: "Speed with Reliability",
    description: "From onboarding to support, we focus on fast execution without compromising quality.",
  },
  {
    icon: HeartHandshake,
    title: "Service Commitment",
    description: "Our team is committed to helping vehicle owners and partners at every step.",
  },
  {
    icon: Users,
    title: "People-Powered",
    description: "We build systems and processes that make toll travel easier for everyone in India.",
  },
];

const milestones = [
  { label: "Customers Served", value: "10L+" },
  { label: "Toll Plazas Coverage", value: "800+" },
  { label: "Support Availability", value: "24/7" },
  { label: "Years in Service", value: "5+" },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-background to-primary/5 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(59,130,246,0.10),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(59,130,246,0.07),transparent_40%)]"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Building2 className="h-4 w-4" />
              About FastTagINDIA
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
              Building India&apos;s Trusted FASTag Experience
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto">
              We simplify toll payments with a secure, reliable, and support-driven FASTag platform for individuals, businesses, and partners.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 sm:py-16 space-y-12 sm:space-y-16">
        <section className="grid lg:grid-cols-2 gap-8">
          <article className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To make highway travel frictionless by delivering accessible FASTag services, instant support, and dependable digital infrastructure for every customer segment.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To become India&apos;s most customer-centric FASTag ecosystem by combining speed, trust, and innovation at scale.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">By The Numbers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {milestones.map((item) => (
              <div key={item.label} className="rounded-xl border border-border/60 bg-muted/20 p-5 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="max-w-2xl mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Our Core Values</h2>
            <p className="text-muted-foreground">
              These principles shape every product decision, support interaction, and partnership we build.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {valueCards.map((item) => (
              <article key={item.title} className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-gradient-to-r from-primary/5 to-background p-6 sm:p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">How We Operate</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We combine technology, responsive support, and operational discipline to keep FASTag services smooth for customers and channel partners.
              </p>
              <div className="space-y-3">
                {[
                  "Fast onboarding and KYC support",
                  "Secure payment and recharge workflows",
                  "Dedicated partner and customer assistance",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm text-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-primary" />
                Leadership & Company Snapshot
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><span className="font-medium text-foreground">Parent Brand:</span> Nexara International Private Limited</p>
                <p><span className="font-medium text-foreground">Support Window:</span> 24/7 assistance</p>
                <p><span className="font-medium text-foreground">HQ:</span> Pune, Maharashtra, India</p>
                <p className="pt-2 border-t border-border/60">
                  Share your exact founder/team/registration details and we will replace these placeholders with final content.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
