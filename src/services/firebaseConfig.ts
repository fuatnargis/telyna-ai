import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Firebase yapılandırmasını kontrol et
// Sadece var olup olmadığını değil, aynı zamanda boş string olup olmadığını da kontrol edelim.
const isConfigComplete = 
  firebaseConfig.apiKey && firebaseConfig.apiKey.length > 0 &&
  firebaseConfig.authDomain && firebaseConfig.authDomain.length > 0 &&
  firebaseConfig.projectId && firebaseConfig.projectId.length > 0 &&
  firebaseConfig.storageBucket && firebaseConfig.storageBucket.length > 0 &&
  firebaseConfig.messagingSenderId && firebaseConfig.messagingSenderId.length > 0 &&
  firebaseConfig.appId && firebaseConfig.appId.length > 0;

if (!isConfigComplete) {
  console.error('Firebase yapılandırması eksik veya hatalı! Lütfen .env dosyanızı kontrol edin.');
  // Bu durumda uygulamayı başlatmamak veya bir hata ekranı göstermek daha iyi olabilir.
  // Şimdilik sadece logluyoruz.
} else {
  // console.log('Firebase yapılandırması başarılı.'); // Hata ayıklama günlüğünü kaldır
}

// Firebase'i başlat
const app = isConfigComplete ? initializeApp(firebaseConfig) : null;

// Auth ve Firestore servislerini export et
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export default app;