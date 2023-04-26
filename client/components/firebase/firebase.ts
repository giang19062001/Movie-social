import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAp-kQ9C9aR3KXKy_XpvEXFBn1q2N2lnYs",
  authDomain: "movie-f84f9.firebaseapp.com",
  projectId: "movie-f84f9",
  storageBucket: "movie-f84f9.appspot.com",
  messagingSenderId: "215355700267",
  appId: "1:215355700267:web:667b2994777753ed85e66e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
