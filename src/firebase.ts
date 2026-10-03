import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFunctions, type Functions } from 'firebase/functions';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Fill these in from your Firebase project settings (Project settings > General > Your apps),
// or set them as VITE_FIREBASE_* environment variables in a .env file (see .env.example).
// Until this is filled in, isFirebaseConfigured() returns false and the site falls back to
// local demo behavior everywhere it would otherwise call the backend.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

let app: FirebaseApp | null = null;
let functionsInstance: Functions | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured() && getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  functionsInstance = getFunctions(app);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);

  // Uncomment while developing against the local Firebase emulator suite:
  // connectFunctionsEmulator(functionsInstance, 'localhost', 5001);
}

export {
  app,
  functionsInstance as functions,
  authInstance as auth,
  dbInstance as db,
};
