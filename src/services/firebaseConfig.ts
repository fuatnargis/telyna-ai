import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Firebase yapılandırmasını kontrol et
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error('Firebase yapılandırması eksik! Lütfen .env dosyanızı kontrol edin.');
  // Bu durumda uygulamayı başlatmamak veya bir hata ekranı göstermek daha iyi olabilir.
  // Şimdilik sadece logluyoruz.
} else {
  // console.log('Firebase yapılandırması başarılı.'); // Hata ayıklama günlüğünü kaldır
}

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servislerini export et
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;