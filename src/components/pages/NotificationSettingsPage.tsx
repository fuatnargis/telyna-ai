import React, { useState } from 'react';
import { ArrowLeft, Bell, MessageCircle, Globe, Zap, Volume2, Vibrate, Clock, Star } from 'lucide-react';

interface NotificationSettingsPageProps {
  onBack: () => void;
}

export default function NotificationSettingsPage({ onBack }: NotificationSettingsPageProps) {
  const [settings, setSettings] = useState({
    enableAll: true,
    newGuideAlerts: true,
    dailyTips: true,
    chatMessages: true,
    emergencyAlerts: false,
    culturalUpdates: true,
    weeklyDigest: true,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: false,
    soundType: 'default'
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
            Notification Settings
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="relative z-20 px-6 py-8 space-y-8">
        {/* Master Control */}
        <section>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Enable All Notifications</h3>
                  <p className="text-blue-200/80">Master control for all notifications</p>
                </div>
              </div>
              <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.enableAll ? 'translate-x-7' : 'translate-x-1'}`}></span>
                <input
                  type="checkbox"
                  checked={settings.enableAll}
                  onChange={() => handleToggle('enableAll')}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </section>

        {/* Notification Types */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Notification Types</h2>
              <p className="text-blue-200/80">Choose what you want to be notified about</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">New Guide Alerts</h3>
                    <p className="text-blue-200/80 text-sm">Get notified when new cultural guides are available</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.newGuideAlerts ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.newGuideAlerts}
                    onChange={() => handleToggle('newGuideAlerts')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Daily Cultural Tips</h3>
                    <p className="text-blue-200/80 text-sm">Receive daily tips about different cultures</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.dailyTips ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.dailyTips}
                    onChange={() => handleToggle('dailyTips')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Chat Message Notifications</h3>
                    <p className="text-blue-200/80 text-sm">Get notified of new messages in your chats</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.chatMessages ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.chatMessages}
                    onChange={() => handleToggle('chatMessages')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Zap className="w-6 h-6 text-red-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Emergency Cultural Support Alerts</h3>
                    <p className="text-blue-200/80 text-sm">Important cultural etiquette alerts for urgent situations</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.emergencyAlerts ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.emergencyAlerts}
                    onChange={() => handleToggle('emergencyAlerts')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Globe className="w-6 h-6 text-purple-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Cultural Updates</h3>
                    <p className="text-blue-200/80 text-sm">Updates about cultural events and holidays</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.culturalUpdates ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.culturalUpdates}
                    onChange={() => handleToggle('culturalUpdates')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-orange-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Weekly Digest</h3>
                    <p className="text-blue-200/80 text-sm">Weekly summary of your cultural learning progress</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.weeklyDigest ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.weeklyDigest}
                    onChange={() => handleToggle('weeklyDigest')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Sound & Vibration */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sound & Vibration</h2>
              <p className="text-blue-200/80">Customize notification alerts</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Volume2 className="w-6 h-6 text-blue-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Notification Sound</h3>
                    <p className="text-blue-200/80 text-sm">Choose your notification sound</p>
                  </div>
                </div>
                <select
                  value={settings.soundType}
                  onChange={(e) => handleSelectChange('soundType', e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="default" className="bg-slate-800">Default</option>
                  <option value="chime" className="bg-slate-800">Chime</option>
                  <option value="bell" className="bg-slate-800">Bell</option>
                  <option value="ping" className="bg-slate-800">Ping</option>
                </select>
              </div>
            </div>
            
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Volume2 className="w-6 h-6 text-green-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Sound Enabled</h3>
                    <p className="text-blue-200/80 text-sm">Play sound for notifications</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.soundEnabled ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={() => handleToggle('soundEnabled')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Vibrate className="w-6 h-6 text-purple-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Vibrate on Notifications</h3>
                    <p className="text-blue-200/80 text-sm">Vibrate device for notifications</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.vibrationEnabled ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.vibrationEnabled}
                    onChange={() => handleToggle('vibrationEnabled')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Quiet Hours</h3>
                    <p className="text-blue-200/80 text-sm">Disable notifications during quiet hours (10 PM - 8 AM)</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${settings.quietHours ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={settings.quietHours}
                    onChange={() => handleToggle('quietHours')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
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