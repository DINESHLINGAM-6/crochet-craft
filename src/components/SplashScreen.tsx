import { useEffect, useState } from "react";
import { Flower2 } from "lucide-react";

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 dark:from-gray-900 dark:via-purple-950 dark:to-pink-950 flex items-center justify-center transition-opacity duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center space-y-6 animate-fade-in">
        {/* Animated Flower Icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-rose-400 rounded-full animate-pulse blur-xl opacity-60"></div>
          <div className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-rose-500 rounded-full w-24 h-24 flex items-center justify-center shadow-2xl animate-[spin_3s_ease-in-out_infinite]">
            <Flower2 className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-poppins font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent animate-[fade-in_1s_ease-out]">
            The Flower Hook
          </h1>
          <p className="text-lg text-muted-foreground animate-[fade-in_1.5s_ease-out]">
            Handcrafted with Love
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
