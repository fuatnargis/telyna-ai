import { useState, useEffect } from 'react';
import { Crown, Star, Globe, Zap, Shield, Users, ArrowRight, Sparkles, Check } from 'lucide-react';

interface PremiumAdPageProps {
  onContinue: () => void;
  onSkip: () => void;
}

export default function PremiumAdPage({ onContinue, onSkip }: PremiumAdPageProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const premiumFeatures = [
    {
      icon: <Crown className="w-12 h-12 text-yellow-400" />,
      title: "Unlimited Cultural Conversations",
      description: "Chat with AI about any culture, anytime, without limits",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Globe className="w-12 h-12 text-blue-400" />,
      title: "Advanced Cultural Insights",
      description: "Deep cultural analysis and personalized recommendations",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-400" />,
      title: "Priority AI Response",
      description: "Get instant responses with our fastest AI models",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-12 h-12 text-green-400" />,
      title: "Offline Cultural Guide",
      description: "Access cultural guidance even without internet",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % premiumFeatures.length);
    }, 3000);

    // Show skip button after 5 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(skipTimer);
    };
  }, [premiumFeatures.length]);

  const benefits = [
    "Unlimited AI conversations",
    "Priority customer support",
    "Advanced cultural analytics",
    "Offline mode access",
    "Custom cultural profiles",
    "Export conversation history"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
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
          <Crown className="w-6 h-6 text-yellow-400/60" />
        </div>
        <div className="absolute top-60 right-20 animate-bounce delay-500">
          <Star className="w-3 h-3 text-purple-400/60" />
        </div>
      </div>

      {/* Skip Button */}
      {showSkip && (
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={onSkip}
            className="text-white/70 hover:text-white transition-all duration-300 text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20"
          >
            Skip
          </button>
        </div>
      )}

      <main className="flex flex-col justify-center items-center px-6 py-16 relative z-10 min-h-screen">
        {/* Premium Badge */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 flex items-center gap-4">
            <Crown className="w-16 h-16 text-yellow-400 animate-bounce" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Telyna Premium
              </h1>
              <p className="text-blue-200/80 text-lg font-medium">Unlock Your Cultural Potential</p>
            </div>
          </div>
        </div>

        {/* Animated Feature Showcase */}
        <div className="w-full max-w-md mb-8 relative group">
          <div className={`absolute inset-0 bg-gradient-to-r ${premiumFeatures[currentFeature].gradient} rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center min-h-[280px] flex flex-col justify-center">
            <div className="mb-6 flex justify-center">
              {premiumFeatures[currentFeature].icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
              {premiumFeatures[currentFeature].title}
            </h2>
            <p className="text-blue-100/90 text-lg leading-relaxed">
              {premiumFeatures[currentFeature].description}
            </p>
          </div>
        </div>

        {/* Feature Indicators */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {premiumFeatures.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentFeature 
                  ? 'w-8 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg' 
                  : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Benefits List */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-8 w-full max-w-md">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Premium Benefits</h3>
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-blue-100/90 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-8 w-full max-w-md text-center">
          <div className="mb-4">
            <span className="text-white/60 text-lg line-through">$9.99/month</span>
            <div className="text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">$4.99</span>
              <span className="text-xl text-blue-200/80">/month</span>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block">
              50% OFF Launch Special
            </div>
          </div>
          <p className="text-blue-200/80 text-sm">
            Limited time offer • Cancel anytime
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            onClick={onContinue}
            className="group w-full h-16 rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-white text-xl font-bold hover:shadow-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-4 relative overflow-hidden"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
            
            <Crown className="w-6 h-6 group-hover:animate-spin relative z-10" />
            <span className="relative z-10">Start Premium Trial</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>

          <button
            onClick={onSkip}
            className="w-full h-14 rounded-2xl bg-white/10 backdrop-blur-xl text-white text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            Continue with Free Version
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 mt-8 text-blue-200/60">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">10K+ Users</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">4.9 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm">Secure</span>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-blue-200/60 text-sm font-medium">
            Join thousands of cultural explorers worldwide
          </p>
        </div>
      </main>
    </div>
  );
}