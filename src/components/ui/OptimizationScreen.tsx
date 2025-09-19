import React, { useEffect, useState } from 'react';
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
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col h-screen justify-center items-center p-6 text-center bg-slate-900">
      <div className="mb-8 animate-pulse">
        <Sparkles className="text-6xl text-slate-100 w-16 h-16" />
      </div>
      <h1 className="text-2xl font-medium text-slate-100 mb-4">
        Optimizing Your Cultural AI Guide...
      </h1>
      <p className="text-slate-400 mb-6 max-w-md">
        Preparing personalized cultural insights for <span className="text-orange-400 font-semibold">{country}</span> focused on <span className="text-blue-400 font-semibold">{purpose}</span>
      </p>
      <div className="w-full max-w-xs bg-slate-700 rounded-full h-2.5">
        <div 
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-slate-500 text-sm mt-4">
        {progress < 30 && "Analyzing cultural patterns..."}
        {progress >= 30 && progress < 60 && "Loading regional customs..."}
        {progress >= 60 && progress < 90 && "Preparing personalized advice..."}
        {progress >= 90 && "Almost ready!"}
      </p>
    </div>
  );
}