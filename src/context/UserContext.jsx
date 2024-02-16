import { createContext, useEffect, useState, useContext } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendSignInLinkToEmail,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';
import { uploadFile } from '../utils/uploadFile';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  async function logout() {
    await signOut(auth);
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage({ ...message, login: null });
      return Promise.resolve();
    } catch (error) {
      console.log(error.message);
      setMessage({ ...message, login: error.message });
      return Promise.reject(error);
    }
  }


  async function signup(email, password, displayName, file) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const photoURL = await uploadFile(file);

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      sendEmailLink(email);

      setMessage({ ...message, signup: null });
      return Promise.resolve();
    } catch (error) {
      console.log(error.message);
      setMessage({ ...message, signup: error.message });
      return Promise.reject(error);
    }
  }

  async function sendEmailLink(email) {
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: `http://localhost:5173/auth`,
        handleCodeInApp: true,
      });
      alert('Please check your inmail box for further details');
    } catch (error) {
      console.log(error.message);
      setMessage({ ...message, signup: error.message });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setLoading(true); // Adatok betöltése kezdődik
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Adatok betöltése befejeződött
    });
    return () => {
      setLoading(false); // Adatok betöltése befejeződött
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        login,
        signup,
        sendEmailLink,
        resetPassword,
        message,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(UserContext);
};
