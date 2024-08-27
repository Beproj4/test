import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyC7rn2LYOC1aFmIehBXUMLNQp8_2yWDx3k",
//   authDomain: "plypicker-tom.firebaseapp.com",
//   projectId: "plypicker-tom",
//   storageBucket: "plypicker-tom.appspot.com",
//   messagingSenderId: "227398741391",
//   appId: "1:227398741391:web:dcf3789444318afb122ffa",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCyRlzl45MwLMO3zQoqSawEFnejKlEmjUE",
  authDomain: "plypicker-test.firebaseapp.com",
  projectId: "plypicker-test",
  storageBucket: "plypicker-test.appspot.com",
  messagingSenderId: "106675150459",
  appId: "1:106675150459:web:60f180d3a1155d08414cde"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,