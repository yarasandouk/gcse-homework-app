import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }        from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyBJNEAXgj8llBi52GV3-rPI5I6ch_3_FFI",
  authDomain:        "gcse-revision-b75d3.firebaseapp.com",
  projectId:         "gcse-revision-b75d3",
  storageBucket:     "gcse-revision-b75d3.firebasestorage.app",
  messagingSenderId: "904812528723",
  appId:             "1:904812528723:web:647fa52a3311af519472a6",
  measurementId:     "G-7HY1RQQP8R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
