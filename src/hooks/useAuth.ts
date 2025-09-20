import { useState, useEffect } from 'react';
import { authService, type AuthUser, type UserProfile } from '../services/authService';

export interface UseAuthReturn {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: string | null }>;
  isEmailVerified: boolean;
  resendEmailVerification: () => Promise<{ error: string | null }>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    console.log('useAuth: useEffect started for auth state changes.');
    const unsubscribe = authService.onAuthStateChange(async (authUserFromService) => {
      console.log('useAuth: onAuthStateChange fired. authUserFromService:', authUserFromService ? authUserFromService.email : 'null');

      setUser(authUserFromService);

      if (authUserFromService) {
        console.log('useAuth: Authenticated user found. Fetching user profile for:', authUserFromService.id);
        try {
          const userProfile = await authService.getUserProfile(authUserFromService.id);
          setProfile(userProfile);
          console.log('useAuth: Profile fetched:', userProfile ? userProfile.name : 'null');
          const emailVerified = authService.checkEmailVerification();
          setIsEmailVerified(emailVerified);
          console.log('useAuth: Email verified:', emailVerified);
        } catch (error) {
          console.error('useAuth: Error fetching user profile:', error);
          setProfile(null);
          setIsEmailVerified(false);
        }
        // Profil yüklendikten sonra loading'i false yap
        setLoading(false);
      } else {
        console.log('useAuth: No authenticated user. Clearing profile.');
        setProfile(null);
        setIsEmailVerified(false);
        // Kullanıcı yoksa hemen loading'i false yap
        setLoading(false);
      }
    });

    return () => {
      console.log('useAuth: useEffect cleanup.');
      unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const result = await authService.signUpWithEmail(email, password, name);
      return { error: result.error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: 'Kayıt işlemi başarısız oldu' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await authService.signInWithEmail(email, password);
      return { error: result.error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'Giriş işlemi başarısız oldu' };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await authService.signInWithGoogle();
      return { error: result.error };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { error: 'Google ile giriş başarısız oldu' };
    }
  };

  const signOut = async () => {
    try {
      const result = await authService.signOut();
      if (!result.error) {
        setUser(null);
        setProfile(null);
        setIsEmailVerified(false);
      }
      return result;
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: 'Çıkış işlemi başarısız oldu' };
    }
  };

  const resetPassword = async (email: string) => {
    return await authService.resetPassword(email);
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const result = await authService.updatePassword(newPassword);
      return { error: result.error };
    } catch (error) {
      console.error('Şifre güncellenemedi', error);
      return { error: 'Şifre güncellenemedi' };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { error: 'Kullanıcı oturumu bulunamadı' };
    }
    try {
      const result = await authService.updateUserProfile(user.id, updates);

      if (!result.error && profile) {
        setProfile({ ...profile, ...updates });
      }

      return result;
    } catch (error) {
      console.error('Profil güncellenemedi', error);
      return { error: 'Profil güncellenemedi' };
    }
  };

  const resendEmailVerification = async () => {
    return await authService.resendEmailVerification();
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isEmailVerified,
    resendEmailVerification
  };
}