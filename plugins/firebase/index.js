import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBh8MU4Ghwgo8cJnL3HiE29SbgZEYOwW6o',
  authDomain: 'bookmark-manager-fdbdd.firebaseapp.com',
  projectId: 'bookmark-manager-fdbdd',
  storageBucket: 'bookmark-manager-fdbdd.appspot.com',
  messagingSenderId: '836070041793',
  appId: '1:836070041793:web:68c0dfa618b2e781984c40',
  measurementId: 'G-ZGXNY9SREB',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
