import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface OptimizationScreenProps {
  country: string;
  purpose: string;
  onComplete: () => void;
}

export default function OptimizationScreen({ country, purpose, onComplete }: OptimizationScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(onComplete, 500); // Complete after a short delay
        return 100;
      });
    }, 30); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col h-screen justify-center items-center p-6 text-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
        <div className="relative bg-white/10 backdrop-blur-xl rounded-full p-6 border border-white/20">
          <Sparkles className="w-20 h-20 text-yellow-400 animate-bounce" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">
        Optimizing Your Cultural AI Guide for {country} ({purpose})...
      </h1>
      <p className="text-blue-200/80 text-lg mb-8">
        Preparing personalized insights and real-time advice.
      </p>
      <div className="w-full max-w-xs bg-white/10 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-blue-200/60 text-sm mt-4">{progress}% Complete</p>
    </div>
  );
}