import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import OnboardingPage from './components/pages/OnboardingPage';
import AuthPage from './components/pages/AuthPage';
import ProfileSetupPage from './components/pages/ProfileSetupPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import WelcomePage from './components/pages/WelcomePage';
import OptimizationScreen from './components/ui/OptimizationScreen';
import ChatPage from './components/pages/ChatPage';
import ProfilePage from './components/pages/ProfilePage';
import EditProfilePage from './components/pages/EditProfilePage';
import PrivacySettingsPage from './components/pages/PrivacySettingsPage';
import NotificationSettingsPage from './components/pages/NotificationSettingsPage';
import HelpSupportPage from './components/pages/HelpSupportPage';
import LanguageSettingsPage from './components/pages/LanguageSettingsPage';
import AboutPage from './components/pages/AboutPage';
import PremiumAdPage from './components/pages/PremiumAdPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Chat, Purpose, User } from './types';
import { firebaseConfig } from './services/firebaseConfig';

type AppState = 
  | 'onboarding'
  | 'auth' 
  | 'profile-setup' 
  | 'premium-ad'
  | 'reset-password'
  | 'home' 
  | 'optimizing' 
  | 'chat' 
  | 'profile'
  | 'edit-profile'
  | 'privacy-settings'
  | 'notification-settings'
  | 'help-support'
  | 'language-settings'
  | 'about'
  | 'error-firebase-config';

function App() {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage<boolean>('hasSeenOnboarding', false);
  const [, setPastChats] = useLocalStorage<Chat[]>('pastChats', []);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [pendingChat, setPendingChat] = useState<{ country: string; purpose: Purpose } | null>(null);
  
  const { user: authUser, profile, loading, signUp, signIn, signInWithGoogle, signOut, updateProfile, resetPassword, updatePassword } = useAuth();
  
  const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId;
  
  useEffect(() => {
    console.log('App.tsx useEffect: Running state determination.');
    console.log(`  isFirebaseConfigured: ${isFirebaseConfigured}`);
    console.log(`  hasSeenOnboarding: ${hasSeenOnboarding}`);
    console.log(`  useAuth.loading: ${loading}`);
    console.log(`  useAuth.authUser: ${authUser ? authUser.email : 'null'}`);
    console.log(`  useAuth.profile: ${profile ? profile.name : 'null'}`);

    if (!isFirebaseConfigured) {
      setAppState('error-firebase-config');
      console.log('App.tsx useEffect: Setting appState to error-firebase-config.');
      return;
    }

    if (!hasSeenOnboarding) {
      setAppState('onboarding');
      console.log('App.tsx useEffect: Setting appState to onboarding.');
      return;
    }

    // Eğer useAuth hala yükleniyorsa veya bir chat başlatılmadıysa optimizing ekranını göster
    if (loading || (pendingChat && appState !== 'optimizing')) {
      setAppState('optimizing');
      console.log('App.tsx useEffect: Setting appState to optimizing (due to useAuth.loading or pendingChat).');
      return;
    }

    // Yükleme tamamlandıktan sonra kullanıcı durumuna göre yönlendirme yap
    if (authUser) {
      if (!profile) {
        // Kullanıcı oturum açmış ama profili henüz yüklenmemiş veya yok
        setAppState('profile-setup');
        console.log('App.tsx useEffect: Setting appState to profile-setup (no profile found or still loading).');
      } else if (!profile.isProfileComplete) {
        setAppState('profile-setup');
        console.log('App.tsx useEffect: Setting appState to profile-setup (profile incomplete).');
      } else {
        setAppState('home');
        console.log('App.tsx useEffect: Setting appState to home.');
      }
    } else {
      setAppState('auth');
      console.log('App.tsx useEffect: Setting appState to auth (no authUser).');
    }
  }, [authUser, profile, loading, hasSeenOnboarding, isFirebaseConfigured, pendingChat]);

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
  };
  
  const handleAuthSuccess = async () => {
    // useAuth hook'u authUser ve profile durumunu güncelleyecek, useEffect durumu yönetecek.
  };

  const handleProfileSetupComplete = async (profileData: any) => {
    if (authUser) {
      const result = await updateProfile({
        ...profileData,
        isProfileComplete: true
      });
      
      if (!result.error) {
        setAppState('premium-ad');
      } else {
        alert('Profil güncellenirken hata oluştu: ' + result.error);
      }
    }
  };

  const handleStartChat = (country: string, purpose: Purpose) => {
    setPendingChat({ country, purpose });
    setAppState('optimizing'); // Chat başlatılmadan önce optimizing ekranına geç
  };

  const handleOptimizationComplete = () => {
    if (pendingChat) {
      const newChat: Chat = {
        id: Date.now().toString(),
        country: pendingChat.country,
        purpose: pendingChat.purpose,
        date: new Date().toLocaleString(),
        messages: []
      };
      
      setPastChats(prev => [newChat, ...prev]);
      
      setCurrentChat(newChat);
      setPendingChat(null);
      setAppState('chat');
    }
  };

  const handleOpenChat = (chat: Chat) => {
    setCurrentChat(chat);
    setAppState('chat');
  };

  const handleBackToHome = () => {
    setCurrentChat(null);
    setAppState('home');
  };

  const handleUpdateChat = (updatedChat: Chat) => {
    setCurrentChat(updatedChat);
  };

  const handleOpenProfile = () => {
    setAppState('profile');
  };

  const handleEditProfile = () => {
    setAppState('edit-profile');
  };

  const handlePrivacySettings = () => {
    setAppState('privacy-settings');
  };

  const handleNotificationSettings = () => {
    setAppState('notification-settings');
  };

  const handleHelpSupport = () => {
    setAppState('help-support');
  };

  const handleLanguageSettings = () => {
    setAppState('language-settings');
  };

  const handleAbout = () => {
    setAppState('about');
  };

  const handleUpdateProfile = async (updatedData: any) => {
    if (authUser) {
      const result = await updateProfile(updatedData);
      if (!result.error) {
        setAppState('profile');
      } else {
        alert('Profil güncellenirken hata oluştu: ' + result.error);
      }
    }
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentChat(null);
    setPendingChat(null);
  };

  const handleBackToProfile = () => {
    setAppState('profile');
  };

  const handleBackToAuth = () => {
    setAppState('auth');
  };

  const handlePremiumAdContinue = () => {
    setAppState('home');
  };

  const handlePremiumAdSkip = () => {
    setAppState('home');
  };

  const user: User | null = profile && authUser ? {
    id: profile.auth_id,
    name: profile.name,
    email: profile.email,
    gender: profile.gender,
    ageRange: profile.ageRange,
    country: profile.country,
    role: profile.role,
    industry: profile.industry,
    isProfileComplete: profile.isProfileComplete
  } : null;

  if (appState === 'error-firebase-config') {
    return (
      <div className="min-h-screen bg-red-900 flex flex-col items-center justify-center text-white p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Hata: Firebase Yapılandırması Eksik!</h1>
        <p className="text-lg mb-6">
          Uygulama başlatılamıyor. Lütfen `.env` dosyanızdaki Firebase API anahtarlarını kontrol edin.
        </p>
        <p className="text-sm text-red-200">
          `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID` gibi değişkenlerin doğru ayarlandığından emin olun.
        </p>
      </div>
    );
  }

  if (appState === 'optimizing') {
    if (pendingChat) {
      return (
        <OptimizationScreen
          country={pendingChat.country}
          purpose={pendingChat.purpose}
          onComplete={handleOptimizationComplete}
        />
      );
    } else {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-slate-500 border-t-blue-500" />
            <span className="text-lg">Verileriniz yükleniyor...</span>
          </div>
        </div>
      );
    }
  }

  switch (appState) {
    case 'onboarding':
      return (
        <OnboardingPage
          onComplete={handleOnboardingComplete}
        />
      );

    case 'auth':
      return (
        <AuthPage
          signUp={signUp}
          signIn={signIn}
          signInWithGoogle={signInWithGoogle}
          onAuthSuccess={handleAuthSuccess}
          onForgotPassword={() => setAppState('reset-password')}
        />
      );

    case 'reset-password':
      return (
        <ResetPasswordPage
          onResetPassword={resetPassword}
          onBack={handleBackToAuth}
          updatePassword={updatePassword}
        />
      );

    case 'profile-setup':
      return (
        <ProfileSetupPage
          onComplete={handleProfileSetupComplete}
        />
      );

    case 'premium-ad':
      return (
        <PremiumAdPage
          onContinue={handlePremiumAdContinue}
          onSkip={handlePremiumAdSkip}
        />
      );

    case 'home':
      return (
        <WelcomePage
          user={user}
          onStartChat={handleStartChat}
          onOpenChat={handleOpenChat}
          onOpenProfile={handleOpenProfile}
        />
      );

    case 'chat':
      if (!currentChat) return null;
      return (
        <ChatPage
          chat={currentChat}
          user={user}
          onBack={handleBackToHome}
          onUpdateChat={handleUpdateChat}
        />
      );

    case 'profile':
      if (!user) return null;
      return (
        <ProfilePage
          user={user}
          onEditProfile={handleEditProfile}
          onChangePassword={() => setAppState('reset-password')}
          onNotificationSettings={handleNotificationSettings}
          onPrivacySettings={handlePrivacySettings}
          onHelpSupport={handleHelpSupport}
          onLanguageSettings={handleLanguageSettings}
          onAbout={handleAbout}
          onLogout={handleLogout}
          onBack={handleBackToHome}
        />
      );

    case 'edit-profile':
      if (!user) return null;
      return (
        <EditProfilePage
          user={user}
          onSave={handleUpdateProfile}
          onBack={handleBackToProfile}
        />
      );

    case 'privacy-settings':
      return (
        <PrivacySettingsPage
          onBack={handleBackToProfile}
        />
      );

    case 'notification-settings':
      return (
        <NotificationSettingsPage
          onBack={handleBackToProfile}
        />
      );

    case 'help-support':
      return (
        <HelpSupportPage
          onBack={handleBackToProfile}
        />
      );

    case 'language-settings':
      return (
        <LanguageSettingsPage
          onBack={handleBackToProfile}
        />
      );

    case 'about':
      return (
        <AboutPage
          onBack={handleBackToProfile}
        />
      );

    default:
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <p className="text-white">Yükleniyor...</p>
        </div>
      );
  }
}

export default App;