import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { Purpose } from '../../types';

interface OptimizationScreenProps {
  country: string;
  purpose: Purpose;
  onComplete: () => void;
}

export default function OptimizationScreen({ country, purpose, onComplete }: OptimizationScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 3000; // 3 saniye
    const intervalTime = 50; // 50ms'de bir güncelle
    const steps = totalDuration / intervalTime;
    const increment = 100 / steps;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(onComplete, 500); // Animasyon bittikten sonra 0.5 saniye daha bekle
      }
      setProgress(currentProgress);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col h-screen justify-center items-center p-6 text-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <Sparkles className="w-20 h-20 text-yellow-400 animate-bounce" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
        Kültürel Yapay Zeka Rehberiniz Optimize Ediliyor...
      </h1>
      <p className="text-lg text-blue-200/80 mb-6">
        {country} için {purpose} amacına özel bilgiler yükleniyor.
      </p>
      <div className="w-full max-w-xs bg-white/10 rounded-full h-2.5">
        <div
          id="progress-bar"
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-blue-200/60 mt-3">{Math.round(progress)}% Tamamlandı</p>
    </div>
  );
}