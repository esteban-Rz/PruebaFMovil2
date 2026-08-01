// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; 

//libreria Para que tenga autoguardado la sesion 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4HSfPbU7fblnW8rMpnAV_endlnZ0nD2s",
  authDomain: "unidad2-c3c91.firebaseapp.com",
  projectId: "unidad2-c3c91",
  storageBucket: "unidad2-c3c91.firebasestorage.app",
  messagingSenderId: "951785320147",
  appId: "1:951785320147:web:1c2cad3dba2d85338fae26",
  //measurementId: "G-XVFDS5ZE00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// const base de datos 
export const db = getFirestore(app);
export const auth = Platform.OS === 'web'
  ? getAuth(app)
  : (() => {
      // Import dinámico para que 'getReactNativePersistence' 
      // solo se intente cargar en plataformas nativas.
      const { getReactNativePersistence } = require('firebase/auth');
      return initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
    })();

// export
export default app;