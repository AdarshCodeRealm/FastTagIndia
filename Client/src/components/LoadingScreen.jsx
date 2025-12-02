import { Car, Zap } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background fade-in">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="bg-primary rounded-lg p-3 animate-pulse">
            <Car className="h-12 w-12 text-primary-foreground" />
          </div>
          <div className="absolute -top-1 -right-1">
            <div className="bg-secondary rounded-full p-1 animate-bounce">
              <Zap className="h-4 w-4 text-secondary-foreground" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="font-bold text-3xl text-foreground mb-2">
            FastTag<span className="text-primary">INDIA</span>
          </h1>
          <p className="text-muted-foreground text-sm">Loading your experience...</p>
        </div>

        {/* Loading Animation */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full loading-animation"></div>
        </div>

        {/* Powered By */}
        <div className="text-center text-xs text-muted-foreground mt-4">
          Powered by{" "}
          <span className="text-foreground font-medium">Nexara International</span>
        </div>
      </div>
    </div>
  );
}