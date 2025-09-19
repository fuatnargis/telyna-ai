import { useState } from 'react';
import { ArrowLeft, Globe, Check, Mic, Volume2, Download } from 'lucide-react';

interface LanguageSettingsPageProps {
  onBack: () => void;
}

export default function LanguageSettingsPage({ onBack }: LanguageSettingsPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [voiceLanguage, setVoiceLanguage] = useState('en');
  const [autoDetect, setAutoDetect] = useState(true);
  const [downloadOffline, setDownloadOffline] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
    { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' }
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleToggle = (setting: string) => {
    if (setting === 'autoDetect') {
      setAutoDetect(!autoDetect);
    } else if (setting === 'downloadOffline') {
      setDownloadOffline(!downloadOffline);
    }
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
            Language Settings
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="relative z-20 px-6 py-8 space-y-8">
        {/* Auto Detection */}
        <section>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Auto-Detect Language</h3>
                  <p className="text-blue-200/80">Automatically detect your preferred language</p>
                </div>
              </div>
              <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${autoDetect ? 'translate-x-7' : 'translate-x-1'}`}></span>
                <input
                  type="checkbox"
                  checked={autoDetect}
                  onChange={() => handleToggle('autoDetect')}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </section>

        {/* Interface Language */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Interface Language</h2>
              <p className="text-blue-200/80">Choose your preferred app language</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden max-h-96 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className="w-full p-4 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                        {language.name}
                      </h3>
                      <p className="text-blue-200/80 text-sm">{language.nativeName}</p>
                    </div>
                  </div>
                  {selectedLanguage === language.code && (
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Voice Language */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Voice & Speech</h2>
              <p className="text-blue-200/80">Configure voice recognition settings</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Mic className="w-6 h-6 text-blue-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Voice Recognition Language</h3>
                    <p className="text-blue-200/80 text-sm">Language for voice commands and dictation</p>
                  </div>
                </div>
                <select
                  value={voiceLanguage}
                  onChange={(e) => setVoiceLanguage(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {languages.slice(0, 10).map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-slate-800">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Volume2 className="w-6 h-6 text-green-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Text-to-Speech</h3>
                    <p className="text-blue-200/80 text-sm">Voice for reading messages aloud</p>
                  </div>
                </div>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-colors">
                  Test Voice
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Offline Languages */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Offline Languages</h2>
              <p className="text-blue-200/80">Download languages for offline use</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Download className="w-6 h-6 text-blue-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Download Offline Support</h3>
                    <p className="text-blue-200/80 text-sm">Enable basic cultural guidance without internet</p>
                  </div>
                </div>
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${downloadOffline ? 'translate-x-7' : 'translate-x-1'}`}></span>
                  <input
                    type="checkbox"
                    checked={downloadOffline}
                    onChange={() => handleToggle('downloadOffline')}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            
            {downloadOffline && (
              <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">Available for Download</h4>
                {languages.slice(0, 5).map((language) => (
                  <div key={language.code} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{language.flag}</span>
                      <div>
                        <h5 className="text-white font-medium">{language.name}</h5>
                        <p className="text-blue-200/60 text-sm">Basic cultural guidance • 15 MB</p>
                      </div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Translation Settings */}
        <section>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Translation Preferences</h3>
                <p className="text-blue-200/80">Configure how translations work</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h4 className="text-white font-medium">Auto-translate messages</h4>
                  <p className="text-blue-200/60 text-sm">Automatically translate AI responses</p>
                </div>
                <label className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className="h-4 w-4 rounded-full bg-white shadow-lg transition-transform translate-x-1 has-[:checked]:translate-x-6"></span>
                  <input type="checkbox" className="sr-only" defaultChecked />
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h4 className="text-white font-medium">Show original text</h4>
                  <p className="text-blue-200/60 text-sm">Display original alongside translation</p>
                </div>
                <label className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-white/20 transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-500 has-[:checked]:to-purple-500">
                  <span className="h-4 w-4 rounded-full bg-white shadow-lg transition-transform translate-x-1"></span>
                  <input type="checkbox" className="sr-only" />
                </label>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Save Button */}
      <footer className="relative z-20 sticky bottom-0 bg-slate-900/80 backdrop-blur-xl p-6 border-t border-white/10">
        <button className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
          Save Language Settings
        </button>
      </footer>
    </div>
  );
}