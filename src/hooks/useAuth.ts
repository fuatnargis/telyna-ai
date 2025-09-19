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
    const unsubscribe = authService.onAuthStateChange(async (authUserFromService) => {
      if (isInitialAuthCheckComplete.current) {
        setLoading(true); 
      }
      
      setUser(authUserFromService);
      
      try { 
        if (authUserFromService) {
          const userProfile = await authService.getUserProfile(authUserFromService.id);
          setProfile(userProfile);
          const emailVerified = authService.checkEmailVerification();
          setIsEmailVerified(emailVerified);
        } else {
          setProfile(null);
          setIsEmailVerified(false);
        }
      } catch (error) {
        console.error('Error fetching user profile in onAuthStateChange:', error);
        setProfile(null); 
        setIsEmailVerified(false);
      } finally {
        setLoading(false); 
        isInitialAuthCheckComplete.current = true; // Mark initial check as complete
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Helper to set loading state for auth actions
  const setAuthActionLoading = () => {
    setLoading(true);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setAuthActionLoading(); // Set loading true for this action
    try {
      const result = await authService.signUpWithEmail(email, password, name);
      return { error: result.error };
    } finally {
      // onAuthStateChange will handle setLoading(false) after the auth state updates
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
      }
      return result;
    } finally {
      // onAuthStateChange will handle setLoading(false)
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