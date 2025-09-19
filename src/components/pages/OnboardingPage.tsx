import React, { useState } from 'react';
import { Globe, MessageCircle, Users, Lightbulb, ArrowRight, Check, Sparkles, Star, Zap, Shield, Brain, Heart } from 'lucide-react';

interface OnboardingPageProps {
  onComplete: () => void;
}

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      title: "Navigate Any Culture with Confidence",
      subtitle: "AI-powered cultural guidance for international professionals and travelers",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
      icon: <Globe className="w-20 h-20 text-blue-400 mx-auto mb-6" />,
      features: [
        { icon: <Globe className="w-5 h-5" />, text: "195+ Countries", color: "text-blue-400" },
        { icon: <Zap className="w-5 h-5" />, text: "Real-time Advice", color: "text-yellow-400" },
        { icon: <Shield className="w-5 h-5" />, text: "Cultural Etiquette", color: "text-green-400" }
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Personalized Cultural Intelligence",
      subtitle: "Get tailored advice based on your profile, destination, and specific purpose",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
      icon: <Brain className="w-20 h-20 text-purple-400 mx-auto mb-6" />,
      features: [
        { icon: <Brain className="w-5 h-5" />, text: "Smart Matching", color: "text-purple-400" },
        { icon: <Users className="w-5 h-5" />, text: "Personal Profile", color: "text-pink-400" },
        { icon: <Heart className="w-5 h-5" />, text: "Context Aware", color: "text-red-400" }
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Avoid Cultural Mistakes",
      subtitle: "Learn what to do, what not to do, and get insider tips from cultural experts",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
      icon: <Lightbulb className="w-20 h-20 text-yellow-400 mx-auto mb-6" />,
      features: [
        { icon: <Check className="w-5 h-5" />, text: "Do's & Don'ts", color: "text-green-400" },
        { icon: <Lightbulb className="w-5 h-5" />, text: "Insider Tips", color: "text-yellow-400" },
        { icon: <Star className="w-5 h-5" />, text: "Expert Guidance", color: "text-orange-400" }
      ],
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Stars */}
        <div className="absolute top-20 left-20 animate-bounce delay-300">
          <Star className="w-4 h-4 text-yellow-400/60" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-700">
          <Sparkles className="w-5 h-5 text-blue-400/60" />
        </div>
        <div className="absolute bottom-40 left-32 animate-bounce delay-1000">
          <Star className="w-3 h-3 text-purple-400/60" />
        </div>
      </div>

      {/* Skip Button */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={handleSkip}
          className="text-white/70 hover:text-white transition-all duration-300 text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20"
        >
          Skip
        </button>
      </div>

      <main className="flex-grow flex flex-col justify-center items-center px-6 py-16 relative z-10">
        {/* Animated Icon */}
        <div className="mb-8 relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${currentStepData.gradient} rounded-3xl blur-xl opacity-30 animate-pulse`}></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            {currentStepData.icon}
          </div>
        </div>

        {/* Image with Modern Frame */}
        <div className="w-full max-w-sm mb-8 relative group">
          <div className={`absolute inset-0 bg-gradient-to-r ${currentStepData.gradient} rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-2 border border-white/20">
            <img
              alt={currentStepData.title}
              className="w-full h-64 object-cover rounded-2xl shadow-2xl"
              src={currentStepData.image}
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="text-center max-w-md relative">
          <h1 className="text-white text-4xl font-bold leading-tight tracking-tight mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            {currentStepData.title}
          </h1>
          <p className="text-blue-100/90 text-lg font-medium leading-relaxed mb-8">
            {currentStepData.subtitle}
          </p>

          {/* Modern Features Grid */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {currentStepData.features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <span className="text-white font-semibold text-lg group-hover:text-blue-200 transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
              <Star className="w-3 h-3 text-yellow-300 animate-pulse delay-100" />
            </div>
            <Sparkles className="w-6 h-6 text-blue-400 animate-bounce" />
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-purple-300 animate-pulse delay-200" />
              <Star className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full px-6 pb-8 relative z-10">
        {/* Modern Progress Indicators */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-3 rounded-full transition-all duration-500 ${
                index === currentStep 
                  ? `w-12 bg-gradient-to-r ${currentStepData.gradient} shadow-lg` 
                  : index < currentStep 
                    ? 'w-3 bg-green-400 shadow-md' 
                    : 'w-3 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 max-w-md mx-auto">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 h-14 rounded-2xl bg-white/10 backdrop-blur-xl text-white text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className={`flex-1 h-14 rounded-2xl bg-gradient-to-r ${currentStepData.gradient} text-white text-lg font-bold hover:shadow-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Sparkles className="w-5 h-5 group-hover:animate-spin relative z-10" />
            <span className="relative z-10">
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
        </div>

        {/* Bottom Decorative Text */}
        <div className="text-center mt-6">
          <p className="text-blue-200/60 text-sm font-medium">
            Join thousands of cultural explorers worldwide
          </p>
        </div>
      </footer>
    </div>
  );
}