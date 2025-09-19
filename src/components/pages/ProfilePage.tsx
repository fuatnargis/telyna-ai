import { ChevronRight, Globe, Info } from 'lucide-react';
import type { User } from '../../types';

interface ProfilePageProps {
  user: User;
  onEditProfile: () => void;
  onChangePassword: () => void;
  onNotificationSettings: () => void;
  onPrivacySettings: () => void;
  onHelpSupport: () => void;
  onLanguageSettings: () => void;
  onAbout: () => void;
  onLogout: () => void;
  onBack: () => void;
}

export default function ProfilePage({ 
  user, 
  onEditProfile, 
  onChangePassword,
  onNotificationSettings,
  onPrivacySettings,
  onHelpSupport,
  onLanguageSettings,
  onAbout,
  onLogout,
  onBack 
}: ProfilePageProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between p-6">
          <button 
            onClick={onBack}
            className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Profile & Settings
          </h1>
          <div className="w-12"></div>
        </div>
      </header>
      
      <main className="relative z-20 px-6 py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="relative">
            <div className="h-32 w-32 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl border-4 border-white/20">
              {getInitials(user.name)}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white animate-pulse"></div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
              {user.name}
            </h2>
            <p className="text-blue-200/80 text-lg">{user.email}</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm font-medium text-white">{user.role}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm font-medium text-white">{user.industry}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-8 shadow-2xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-blue-200/80 mb-2">Location</h3>
              <p className="text-white font-semibold">{user.country}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-200/80 mb-2">Age Range</h3>
              <p className="text-white font-semibold">{user.ageRange}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-200/80 mb-2">Gender</h3>
              <p className="text-white font-semibold capitalize">{user.gender}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-200/80 mb-2">Status</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={onEditProfile}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold group-hover:text-blue-200 transition-colors">Edit Profile</h3>
                <p className="text-blue-200/60 text-sm">Update your info</p>
              </div>
            </div>
          </button>
          
          <button 
            onClick={onChangePassword}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold group-hover:text-blue-200 transition-colors">Password</h3>
                <p className="text-blue-200/60 text-sm">Change password</p>
              </div>
            </div>
          </button>
        </div>

        {/* Settings Menu */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Settings</h2>
            <p className="text-blue-200/80">Manage your preferences</p>
          </div>
          
          <button 
            onClick={onNotificationSettings}
            className="w-full p-6 text-left hover:bg-white/10 transition-colors border-b border-white/10 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Notification Settings</h3>
                  <p className="text-blue-200/80 text-sm">Manage your notifications</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          
          <button 
            onClick={onPrivacySettings}
            className="w-full p-6 text-left hover:bg-white/10 transition-colors border-b border-white/10 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Privacy Settings</h3>
                  <p className="text-blue-200/80 text-sm">Control your privacy</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          
          <button 
            onClick={onLanguageSettings}
            className="w-full p-6 text-left hover:bg-white/10 transition-colors border-b border-white/10 group"
          >
            <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Language Settings</h3>
                <p className="text-blue-200/80 text-sm">Choose your preferred language</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onHelpSupport}
            className="w-full p-6 text-left hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Help & Support</h3>
                <p className="text-blue-200/80 text-sm">Get help and support</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onAbout}
            className="w-full p-6 text-left hover:bg-white/10 transition-colors border-t border-white/10 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">About Telyna AI</h3>
                  <p className="text-blue-200/80 text-sm">App information and version</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
      
      {/* Logout Button */}
      <footer className="relative z-20 sticky bottom-0 bg-slate-900/80 backdrop-blur-xl p-6 border-t border-white/10">
        <button 
          onClick={onLogout}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 01-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Log Out
        </button>
      </footer>
    </div>
  );
}