// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: "unqueue-548b5.firebaseapp.com",
  databaseURL: "https://unqueue-548b5-default-rtdb.firebaseio.com",
  projectId: "unqueue-548b5",
  storageBucket: "unqueue-548b5.appspot.com",
  messagingSenderId: "673597937174",
  appId: "1:673597937174:web:75c4d771d61a5ceefa4737",
  measurementId: "G-8QC6X19KM6",
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
export const auth = getAuth(fireApp);

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://unqueue.netlify.app/dashboard",
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "unqueue.page.link",
};

export async function signInUserWithEmailPass(email: string, password: string) {
  console.log("sigin function called");
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
    });
}

export async function signUpUserWithEmailPass(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
    });
}

export async function logOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("logged out succesfully");
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
}
