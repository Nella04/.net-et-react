import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
      apiKey: "AIzaSyD6O99hvC3H8enQ5mOOH5Avblgw0PRzGzg",
      authDomain: "evarotra-f00eb.firebaseapp.com",
      projectId: "evarotra-f00eb",
      storageBucket: "evarotra-f00eb.firebasestorage.app",
      messagingSenderId: "278629568242",
      appId: "1:278629568242:web:2d0bd1a0f2248dfdc00a6b",
      measurementId: "G-DSZD5GC726"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
