import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";
import { FeaturesSection } from "../components/features-section";
import { GetInTouchSection } from "../components/get-in-touch-section";
import { Footer } from "../components/footer";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <GetInTouchSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;