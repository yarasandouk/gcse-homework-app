import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJNEAXgj8llBi52GV3-rPI5I6ch_3_FFI",
  authDomain: "gcse-revision-b75d3.firebaseapp.com",
  projectId: "gcse-revision-b75d3",
  storageBucket: "gcse-revision-b75d3.firebasestorage.app",
  messagingSenderId: "904812528723",
  appId: "1:904812528723:web:647fa52a3311af519472a6",
  measurementId: "G-7HY1RQQP8R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.handleSignup = async function(e) {
  e.preventDefault();
  const errorEl = document.getElementById('signup-error');
  errorEl.textContent = '';

  const role = document.querySelector('input[name="role"]:checked').value;
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    try {
      await setDoc(doc(db, 'users', cred.user.uid), {
        username,
        email,
        role,
        createdAt: new Date().toISOString()
      });
    } catch {
      await cred.user.delete();
      errorEl.textContent = 'Failed to save your account. Please try again.';
      return;
    }
    window.location.href = role === 'teacher' ? 'teacher-dashboard.html' : 'student-dashboard.html';
  } catch (err) {
    errorEl.textContent = friendlyError(err.code);
  }
};

window.handleLogin = async function(e) {
  e.preventDefault();
  const errorEl = document.getElementById('login-error');
  errorEl.textContent = '';

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, 'users', cred.user.uid));
    const role = snap.exists() ? snap.data().role : 'student';
    window.location.href = role === 'teacher' ? 'teacher-dashboard.html' : 'student-dashboard.html';
  } catch (err) {
    errorEl.textContent = friendlyError(err.code);
  }
};

function friendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'That email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.'
  };
  return map[code] || 'Something went wrong. Please try again.';
}
