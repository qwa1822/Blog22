import { initializeApp, FirebaseApp, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

export let app: FirebaseApp;
// Your web app's Firebase configuration
const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGINGSEND_ID,
  VITE_APPID,
} = import.meta.env;

// Initialize Firebase
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGINGSEND_ID,
  AppId: VITE_APPID,
};

try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}
console.log(VITE_API_KEY);

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default firebaseApp;
