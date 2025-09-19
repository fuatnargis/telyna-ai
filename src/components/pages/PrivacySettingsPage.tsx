import React, { useState } from 'react';
import { ArrowLeft, Shield, Eye, Download, Trash2, FileText, Users, Globe, Lock } from 'lucide-react';

interface PrivacySettingsPageProps {
  onBack: () => void;
}

export default function PrivacySettingsPage({ onBack }: PrivacySettingsPageProps) {
  const [settings, setSettings] = useState({
    shareUsageData: true,
    personalizedContent: false,
    profileVisibility: 'private',
    dataCollection: true,
    thirdPartySharing: false,
    analyticsTracking: true
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleSelectChange = (setting: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
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
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Privacy Settings
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="relative z-20 px-6 py-8 space-y-8">
        {/* Data Sharing Section */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Data Sharing</h2>
              <p className="text-blue-200/80">Control how your data is used</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Share Anonymous Usage Data</h3>
                  <p className="text-blue-200/80 text-sm">Help us improve the app by sharing anonymous usage data.</p>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.shareUsageData ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.shareUsageData}
                    onChange={() => handleToggle('shareUsageData')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Personalized Content</h3>
                  <p className="text-blue-200/80 text-sm">Receive content tailored to your cultural interests.</p>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.personalizedContent ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.personalizedContent}
                    onChange={() => handleToggle('personalizedContent')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Profile Visibility</h3>
                  <p className="text-blue-200/80 text-sm">Control who can see your profile information.</p>
                </div>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="private" className="bg-slate-800">Private</option>
                  <option value="friends" className="bg-slate-800">Friends Only</option>
                  <option value="public" className="bg-slate-800">Public</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Data Collection Section */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Data Collection</h2>
              <p className="text-blue-200/80">Manage data collection preferences</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Data Collection</h3>
                  <p className="text-blue-200/80 text-sm">Allow collection of interaction data for improvements.</p>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.dataCollection ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.dataCollection}
                    onChange={() => handleToggle('dataCollection')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Third-Party Sharing</h3>
                  <p className="text-blue-200/80 text-sm">Share data with trusted partners for enhanced features.</p>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.thirdPartySharing ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.thirdPartySharing}
                    onChange={() => handleToggle('thirdPartySharing')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Analytics Tracking</h3>
                  <p className="text-blue-200/80 text-sm">Allow analytics tracking for app performance insights.</p>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.analyticsTracking ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.analyticsTracking}
                    onChange={() => handleToggle('analyticsTracking')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Legal & Compliance Section */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Legal & Compliance</h2>
              <p className="text-blue-200/80">Review policies and terms</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <button className="w-full p-6 text-left hover:bg-white/10 transition-colors border-b border-white/10 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Lock className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Privacy Policy</h3>
                    <p className="text-blue-200/80 text-sm">Review our privacy policy</p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-white/60 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button className="w-full p-6 text-left hover:bg-white/10 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Terms of Service</h3>
                    <p className="text-blue-200/80 text-sm">Read our terms and conditions</p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-white/60 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </section>

        {/* Data Management Section */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Data Management</h2>
              <p className="text-blue-200/80">Manage your personal data</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <button className="w-full p-6 text-left hover:bg-white/10 transition-colors border-b border-white/10 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Download className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Download My Data</h3>
                    <p className="text-blue-200/80 text-sm">Export all your personal data</p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-white/60 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button className="w-full p-6 text-left hover:bg-red-500/10 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Trash2 className="w-6 h-6 text-red-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 group-hover:text-red-300 transition-colors">Delete My Account</h3>
                    <p className="text-red-300/80 text-sm">Permanently delete your account and data</p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-red-400/60 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </section>
      </main>

      {/* Save Button */}
      <footer className="relative z-20 sticky bottom-0 bg-slate-900/80 backdrop-blur-xl p-6 border-t border-white/10">
        <button className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
          Save Changes
        </button>
      </footer>
    </div>
  );
}