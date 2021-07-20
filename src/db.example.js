/**
 * rename this file to db.js
 * update it with firebase config
 */

import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  // ... Update me
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export default db
