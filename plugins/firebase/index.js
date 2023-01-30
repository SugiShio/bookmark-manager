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

export const getFirestoreFormat = (object) => {
  return normalizeObject(object)
}

const normalizeObject = (object) => {
  if (object === undefined) {
    return null
  } else if (typeof object === 'string' || object === null) {
    return object
  } else if (Array.isArray(object)) {
    return object.map((o) => {
      return normalizeObject(o)
    })
  } else if (Object.keys(object).length) {
    const result = {}

    Object.keys(object).forEach((key) => {
      result[key] = normalizeObject(object[key])
    })
    return result
  }

  return object
}
