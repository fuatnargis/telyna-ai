import { useState } from 'react';
import { Globe, MessageCircle, User, Sparkles, ArrowRight, Star, Zap } from 'lucide-react';
import CountrySelect from '../ui/CountrySelect';
import PurposeSelector from '../ui/PurposeSelector';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Chat, Purpose, User as UserType } from '../../types';

interface WelcomePageProps {
  user?: UserType | null;
  onStartChat: (country: string, purpose: Purpose) => void;
  onOpenChat: (chat: Chat) => void;
  onOpenProfile: () => void;
}

export default function WelcomePage({ user, onStartChat, onOpenChat, onOpenProfile }: WelcomePageProps) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose | ''>('');
  const [pastChats, setPastChats] = useLocalStorage<Chat[]>('pastChats', []);

  const handleStartChat = () => {
    if (!selectedCountry || !selectedPurpose) {
      alert('Please select both country and purpose to continue');
      return;
    }
    onStartChat(selectedCountry, selectedPurpose);
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPastChats(prev => prev.filter(chat => chat.id !== chatId));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Telyna AI
            </h1>
            <p className="text-sm text-blue-200/80 font-medium">Your Cultural Intelligence Assistant</p>
          </div>
        </div>
        <button
          onClick={onOpenProfile}
          className="relative group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
        >
          <User className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-20 px-6 pb-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
              <Star className="w-4 h-4 text-yellow-300 animate-pulse delay-100" />
              <Star className="w-3 h-3 text-yellow-200 animate-pulse delay-200" />
            </div>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-yellow-200 animate-pulse delay-200" />
              <Star className="w-4 h-4 text-yellow-300 animate-pulse delay-100" />
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            {getGreeting()}{user ? `, ${user.name.split(' ')[0]}` : ''}!
          </h2>
          
          <p className="text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto font-medium">
            Navigate cultural differences with confidence and build meaningful connections worldwide
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">195+ Countries</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <MessageCircle className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Real-time</span>
            </div>
          </div>
        </div>

        {/* Selection Cards */}
        <div className="max-w-2xl mx-auto space-y-8 mb-12">
          {/* Country Selection Card */}
          <div className="p-8 relative z-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Select Destination</h3>
                <p className="text-blue-200/80">Choose your target country</p>
              </div>
            </div>
            <CountrySelect
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="🌍 Choose your destination country..."
              className="bg-white/95 text-slate-800 placeholder-slate-500 border-0 shadow-xl rounded-2xl h-14 text-lg font-medium"
            />
          </div>

          {/* Purpose Selection Card */}
          <div className="p-8 relative z-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Your Purpose</h3>
                <p className="text-purple-200/80">What brings you there?</p>
              </div>
            </div>
            <PurposeSelector
              value={selectedPurpose}
              onChange={setSelectedPurpose}
              layout="dropdown"
              placeholder="🎯 Select your purpose..."
              className="bg-white/95 text-slate-800 placeholder-slate-500 border-0 shadow-xl rounded-2xl h-14 text-lg font-medium relative z-0"
            />
          </div>
        </div>

        {/* Recent Conversations */}
        {pastChats.length > 0 && (
          <div className="max-w-2xl mx-auto mb-8 relative z-[-1]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Recent Conversations</h3>
            </div>
            <div className="space-y-4 relative z-[-1]">
              {pastChats.slice(0, 3).map((chat, _index) => (
                <div
                  key={chat.id}
                  onClick={() => onOpenChat(chat)}
                  className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 flex justify-between items-center cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:transform hover:scale-[1.02] shadow-xl relative z-[-1]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                      {chat.country.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xl group-hover:text-blue-200 transition-colors">
                        {chat.country}
                      </div>
                      <div className="text-blue-200/80 group-hover:text-blue-100 transition-colors font-medium">
                        {chat.purpose} • {new Date(chat.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="text-white/60 hover:text-red-400 p-3 rounded-xl hover:bg-red-500/20 transition-all duration-200 relative z-[-1]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-0 sticky bottom-0 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent backdrop-blur-xl p-6 border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleStartChat}
            disabled={!selectedCountry || !selectedPurpose}
            className={`group w-full h-16 rounded-2xl text-xl font-bold transition-all duration-500 flex items-center justify-center gap-4 relative overflow-hidden transform hover:scale-105 active:scale-95 ${
              selectedCountry && selectedPurpose
                ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-lg hover:shadow-2xl hover:shadow-orange-500/40 hover:brightness-110'
                : 'bg-white/20 text-white/50 cursor-not-allowed backdrop-blur-sm border border-white/20 shadow-lg'
            }`}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
            
            {/* Pulse Ring Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/30 via-red-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
            
            {/* Glow Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 opacity-0 group-hover:opacity-50 transition-opacity duration-300" style={{maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-4">
              <Sparkles className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:tracking-wide transition-all duration-300">Start Cultural Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            {/* Floating Particles */}
            <div className="absolute top-2 left-8 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 delay-100"></div>
            <div className="absolute top-4 right-12 w-1.5 h-1.5 bg-yellow-300/70 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 delay-200"></div>
            <div className="absolute bottom-3 left-16 w-1 h-1 bg-pink-300/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 delay-300"></div>
            <div className="absolute bottom-4 right-8 w-1.5 h-1.5 bg-orange-300/70 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 delay-150"></div>
          </button>
          {(!selectedCountry || !selectedPurpose) && (
            <p className="text-center text-blue-200/60 text-sm mt-4 font-medium">
              Please select both destination and purpose to begin your cultural journey
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}