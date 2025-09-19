import React, { useState, useEffect } from 'react';
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
  | 'about';

function App() {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage<boolean>('hasSeenOnboarding', false);
  const [pastChats, setPastChats] = useLocalStorage<Chat[]>('pastChats', []);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [pendingChat, setPendingChat] = useState<{ country: string; purpose: Purpose } | null>(null);
  
  const { user: authUser, profile, loading, signUp, signIn, signInWithGoogle, signOut, updateProfile, resetPassword, updatePassword } = useAuth();
  
  // Check authentication status on app load
  useEffect(() => {
    // İlk olarak onboarding durumunu kontrol et
    if (!hasSeenOnboarding) {
      setAppState('onboarding');
      return;
    }

    // Kimlik doğrulama veya profil verileri yükleniyorsa 'optimizing' ekranını göster
    if (loading) {
      setAppState('optimizing');
      return;
    }

    // Yükleme tamamlandıktan sonra kullanıcı durumuna göre yönlendirme yap
    if (authUser) {
      // authUser mevcut ama profil henüz yüklenmediyse veya null ise optimizing'de kal
      // useAuth'taki loading durumu, profilin yüklenmesini de kapsadığı için bu kontrol yeterli.
      // Eğer loading false ise ve authUser var ama profile null ise, profilin oluşturulması gerekiyor.
      if (!profile) {
        setAppState('profile-setup');
      } else if (!profile.isProfileComplete) {
        setAppState('profile-setup');
      } else {
        setAppState('home');
      }
    } else {
      setAppState('auth');
    }
  }, [authUser, profile, loading, hasSeenOnboarding]);

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
    // Onboarding tamamlandıktan sonra, useEffect authUser ve profile durumuna göre yönlendirecektir.
  };
  
  const handleAuthSuccess = async () => {
    // Kimlik doğrulama başarılı olduğunda, useEffect authUser ve profile durumuna göre yönlendirecektir.
    // Bu fonksiyonun içi boş kalabilir, çünkü useEffect zaten durumu izliyor.
  };

  const handleResetPassword = (newPassword: string, confirmPassword: string) => {
    // Şifre sıfırlama ResetPasswordPage'de ele alınır
    setAppState('auth');
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
    setAppState('optimizing');
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

  // Convert profile to User type for compatibility
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

  // 'optimizing' durumu için özel bir yükleme ekranı göster
  if (appState === 'optimizing') {
    if (pendingChat) {
      return (
        <OptimizationScreen
          country={pendingChat.country}
          purpose={pendingChat.purpose}
          onComplete={handleOptimizationComplete}
        />
      );
    } else { // Bu blok, !pendingChat ve loading true olduğunda veya diğer optimizing durumlarında çalışır.
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

  // Render based on current state
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