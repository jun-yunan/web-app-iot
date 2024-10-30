// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCiYwFzwq6kD-D3A6n65Bzc0ma6H5RasfU',
  authDomain: 'web-app-iot-b1a0e.firebaseapp.com',
  databaseURL:
    'https://web-app-iot-b1a0e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'web-app-iot-b1a0e',
  storageBucket: 'web-app-iot-b1a0e.appspot.com',
  messagingSenderId: '949495369772',
  appId: '1:949495369772:web:d6db0533e3fb0e54864189',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbFirebase = getDatabase(app);
export default dbFirebase;
