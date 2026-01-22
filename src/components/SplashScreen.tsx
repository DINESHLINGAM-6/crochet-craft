import { useEffect, useState } from "react";

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 800); // Wait for fade out
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#f9f7f4] flex items-center justify-center transition-all duration-700 ease-in-out ${
        isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center space-y-6 animate-fade-in relative z-10">
        {/* Animated Logo Icon (Matches Header) */}
        <div className="relative mx-auto w-24 h-24 mb-6">
           <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-primary/20 animate-pulse-slow">
              <span className="text-white font-bold text-5xl">🌸</span>
            </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-poppins font-medium tracking-wide text-foreground animate-slide-up">
            The Flower Hook
          </h1>
          <p className="text-lg text-muted-foreground italic font-light animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Weaving Nature's Beauty
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-3 mt-10">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
