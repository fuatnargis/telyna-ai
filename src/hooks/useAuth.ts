import { useState, useEffect, useRef } from 'react';
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
  const [loading, setLoading] = useState(true); // Starts true for initial app load
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const isInitialAuthCheckComplete = useRef(false); // To ensure initial loading is handled once

  useEffect(() => {
    console.log('useAuth: useEffect started');
    const unsubscribe = authService.onAuthStateChange(async (authUserFromService) => {
      console.log('useAuth: onAuthStateChange fired. authUserFromService:', authUserFromService ? authUserFromService.email : 'null');
      
      setUser(authUserFromService);
      
      try { 
        if (authUserFromService) {
          console.log('useAuth: Fetching user profile for:', authUserFromService.id);
          const userProfile = await authService.getUserProfile(authUserFromService.id);
          setProfile(userProfile);
          console.log('useAuth: Profile fetched:', userProfile ? userProfile.name : 'null');
          const emailVerified = authService.checkEmailVerification();
          setIsEmailVerified(emailVerified);
          console.log('useAuth: Email verified:', emailVerified);
        } else {
          console.log('useAuth: No authenticated user. Clearing profile.');
          setProfile(null);
          setIsEmailVerified(false);
        }
      } catch (error) {
        console.error('useAuth: Error fetching user profile in onAuthStateChange:', error);
        setProfile(null); 
        setIsEmailVerified(false);
      } finally {
        // Ensure loading is set to false only after the initial check is truly complete
        if (!isInitialAuthCheckComplete.current) {
          console.log('useAuth: Initial auth/profile check complete. Setting loading to false.');
          setLoading(false); 
          isInitialAuthCheckComplete.current = true; // Mark initial check as complete
        } else {
          console.log('useAuth: Subsequent auth state change. Not modifying initial loading state.');
        }
      }
    });

    // Güvenlik zaman aşımı: Eğer 5 saniye içinde auth durumu çözümlenmezse loading'i false yap
    const timeoutId = setTimeout(() => {
      if (!isInitialAuthCheckComplete.current) {
        console.warn('useAuth: Auth state did not resolve within 5 seconds. Forcing loading to false.');
        setLoading(false);
        isInitialAuthCheckComplete.current = true; // Zaman aşımı ile de ilk kontrolü tamamlandı say
      }
    }, 5000); // 5 saniye

    return () => {
      console.log('useAuth: useEffect cleanup.');
      unsubscribe();
      clearTimeout(timeoutId); // Temizleme sırasında zaman aşımını da iptal et
    };
  }, []);

  // Log current loading and user/profile status for debugging
  useEffect(() => {
    console.log(`useAuth: Current state - loading: ${loading}, user: ${user ? user.email : 'null'}, profile: ${profile ? profile.name : 'null'}`);
  }, [loading, user, profile]);


  // Helper to set loading state for auth actions
  const setAuthActionLoading = () => {
    setLoading(true);
    console.log('useAuth: Auth action started. Setting loading to true.');
  };

  const signUp = async (email: string, password: string, name: string) => {
    setAuthActionLoading(); // Set loading true for this action
    try {
      const result = await authService.signUpWithEmail(email, password, name);
      return { error: result.error };
    } finally {
      // onAuthStateChange will handle setLoading(false) after the auth state updates
      // If onAuthStateChange doesn't fire (e.g., due to an error before user is set),
      // the loading state might remain true. We need to ensure it's reset.
      // However, for signUp/signIn, onAuthStateChange *should* fire on success/failure.
      // Let's rely on onAuthStateChange for now, but keep this in mind.
    }
  };

  const signIn = async (email: string, password: string) => {
    setAuthActionLoading(); // Set loading true for this action
    try {
      const result = await authService.signInWithEmail(email, password);
      return { error: result.error };
    } finally {
      // onAuthStateChange will handle setLoading(false)
    }
  };

  const signInWithGoogle = async () => {
    setAuthActionLoading(); // Set loading true for this action
    try {
      const result = await authService.signInWithGoogle();
      return { error: result.error };
    } finally {
      // onAuthStateChange will handle setLoading(false)
    }
  };

  const signOut = async () => {
    setAuthActionLoading(); // Set loading true for this action
    try {
      const result = await authService.signOut();
      if (!result.error) {
        setUser(null);
        setProfile(null);
        setIsEmailVerified(false);
        // Explicitly set loading to false here as onAuthStateChange might not fire for null user immediately
        setLoading(false); 
        console.log('useAuth: Sign out successful. Setting loading to false.');
      }
      return result;
    } finally {
      // If signOut fails, onAuthStateChange might not fire, so loading might remain true.
      // The explicit setLoading(false) above handles success. For failure, it's still handled by onAuthStateChange.
    }
  };

  const resetPassword = async (email: string) => {
    // No need to set loading here, as it's a non-auth state changing action
    return await authService.resetPassword(email);
  };

  const updatePassword = async (newPassword: string) => {
    // This changes auth.currentUser, so onAuthStateChange will fire,
    // but we might want to show loading explicitly for this action too.
    setAuthActionLoading();
    try {
      const result = await authService.updatePassword(newPassword);
      return { error: result.error };
    } finally {
      // onAuthStateChange will handle setLoading(false)
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { error: 'Kullanıcı oturumu bulunamadı' };
    }
    setAuthActionLoading(); // Profile update is also an async action
    try {
      const result = await authService.updateUserProfile(user.id, updates);
      
      if (!result.error && profile) {
        setProfile({ ...profile, ...updates });
      }
      
      return result;
    } finally {
      // onAuthStateChange will handle setLoading(false)
    }
  };

  const resendEmailVerification = async () => {
    // No need to set loading here
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