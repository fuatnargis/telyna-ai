import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
  onAuthStateChanged,
  sendEmailVerification,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import type { User } from '../types';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  provider?: string;
  emailVerified?: boolean;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: string | null;
}

export interface UserProfile extends User {
  auth_id: string;
  created_at?: any;
  updated_at?: any;
}

export class AuthService {
  private googleProvider: GoogleAuthProvider;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  }

  // Firebase User'ı AuthUser'a dönüştür
  private firebaseUserToAuthUser(firebaseUser: FirebaseUser): AuthUser {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      name: firebaseUser.displayName || undefined,
      avatar_url: firebaseUser.photoURL || undefined,
      provider: firebaseUser.providerData[0]?.providerId || 'email',
      emailVerified: firebaseUser.emailVerified
    };
  }

  // E-posta ve şifre ile kayıt
  async signUpWithEmail(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // E-posta doğrulama gönder
      await sendEmailVerification(firebaseUser);

      const authUser = this.firebaseUserToAuthUser(firebaseUser);
      authUser.name = name;

      // Kullanıcı profilini Firestore'da oluştur
      await this.createUserProfile(authUser, name);

      return { user: authUser, error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      let errorMessage = 'Kayıt işlemi başarısız oldu';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Bu e-posta adresi zaten kullanımda';
          break;
        case 'auth/weak-password':
          errorMessage = 'Şifre çok zayıf. En az 6 karakter olmalı';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Geçersiz e-posta adresi';
          break;
      }
      
      return { user: null, error: errorMessage };
    }
  }

  // E-posta ve şifre ile giriş
  async signInWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authUser = this.firebaseUserToAuthUser(userCredential.user);

      return { user: authUser, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      let errorMessage = 'Giriş işlemi başarısız oldu';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Yanlış şifre';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Geçersiz e-posta adresi';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin';
          break;
      }
      
      return { user: null, error: errorMessage };
    }
  }

  // Google ile giriş
  async signInWithGoogle(): Promise<AuthResponse> {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      const authUser = this.firebaseUserToAuthUser(result.user);

      // Google ile ilk kez giriş yapıyorsa profil oluştur
      const existingProfile = await this.getUserProfile(authUser.id);
      if (!existingProfile) {
        await this.createUserProfile(authUser, authUser.name || authUser.email.split('@')[0]);
      }

      return { user: authUser, error: null };
    } catch (error: any) {
      console.error('Google sign in error:', error);
      let errorMessage = 'Google ile giriş başarısız oldu';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Giriş penceresi kapatıldı';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup engellendi. Lütfen popup engelleyiciyi devre dışı bırakın';
          break;
      }
      
      return { user: null, error: errorMessage };
    }
  }

  // Şifre sıfırlama
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: any) {
      console.error('Reset password error:', error);
      let errorMessage = 'Şifre sıfırlama e-postası gönderilemedi';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Geçersiz e-posta adresi';
          break;
      }
      
      return { error: errorMessage };
    }
  }

  // Şifre güncelleme
  async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      if (!auth.currentUser) {
        return { error: 'Kullanıcı oturumu bulunamadı' };
      }
      
      await firebaseUpdatePassword(auth.currentUser, newPassword);
      return { error: null };
    } catch (error: any) {
      console.error('Update password error:', error);
      let errorMessage = 'Şifre güncellenemedi';
      
      switch (error.code) {
        case 'auth/weak-password':
          errorMessage = 'Şifre çok zayıf. En az 6 karakter olmalı';
          break;
        case 'auth/requires-recent-login':
          errorMessage = 'Şifre değiştirmek için tekrar giriş yapmanız gerekiyor';
          break;
      }
      
      return { error: errorMessage };
    }
  }

  // Çıkış yap
  async signOut(): Promise<{ error: string | null }> {
    try {
      await firebaseSignOut(auth);
      return { error: null };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { error: 'Çıkış işlemi başarısız oldu' };
    }
  }

  // Mevcut kullanıcıyı al
  getCurrentUser(): AuthUser | null {
    const firebaseUser = auth.currentUser;
    return firebaseUser ? this.firebaseUserToAuthUser(firebaseUser) : null;
  }

  // Kullanıcı profili oluştur
  async createUserProfile(authUser: AuthUser, name: string): Promise<void> {
    try {
      const defaultProfile: Partial<UserProfile> = {
        auth_id: authUser.id,
        name: name,
        email: authUser.email,
        gender: 'male',
        ageRange: '25-34',
        country: '',
        role: 'Software Engineer',
        industry: 'Technology',
        isProfileComplete: false,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };

      await setDoc(doc(db, 'user_profiles', authUser.id), defaultProfile);
      console.log('Kullanıcı profili oluşturuldu:', authUser.id);
    } catch (error) {
      console.error('Create user profile error:', error);
      throw error;
    }
  }

  // Kullanıcı profilini al
  async getUserProfile(authId: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'user_profiles', authId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }

      return null;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  }

  // Kullanıcı profilini güncelle
  async updateUserProfile(authId: string, updates: Partial<UserProfile>): Promise<{ error: string | null }> {
    try {
      const docRef = doc(db, 'user_profiles', authId);
      await updateDoc(docRef, {
        ...updates,
        updated_at: serverTimestamp()
      });

      return { error: null };
    } catch (error) {
      console.error('Update user profile error:', error);
      return { error: 'Profil güncellenemedi' };
    }
  }

  // Auth state değişikliklerini dinle
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const authUser = this.firebaseUserToAuthUser(firebaseUser);
        callback(authUser);
      } else {
        callback(null);
      }
    });
  }

  // E-posta doğrulama durumunu kontrol et
  checkEmailVerification(): boolean {
    return auth.currentUser?.emailVerified || false;
  }

  // E-posta doğrulama e-postası gönder
  async resendEmailVerification(): Promise<{ error: string | null }> {
    try {
      if (!auth.currentUser) {
        return { error: 'Kullanıcı oturumu bulunamadı' };
      }

      await sendEmailVerification(auth.currentUser);
      return { error: null };
    } catch (error: any) {
      console.error('Resend email verification error:', error);
      return { error: 'Doğrulama e-postası gönderilemedi' };
    }
  }
}

export const authService = new AuthService();