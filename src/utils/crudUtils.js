import { db } from '../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

export async function addPost(formData) {
  try {
    console.log(formData);
    const collectionRef = collection(db, 'posts');
    const newItem = { ...formData, timestamp: serverTimestamp() };
    const newDocRef = await addDoc(collectionRef, newItem);
    console.log('Document added with ID: ', newDocRef.id);
    return newDocRef.id; // Optionally return the ID of the new document
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error; // Re-throwing the error makes it possible to catch it outside of this function
  }
}

// Get posts
export async function readPosts(setPosts) {
  try {
    const collectionRef = collection(db, 'posts');
    const queryRef = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      return unsubscribe;
    });
  } catch (error) {
    console.error('Error getting document: ', error);
    throw error;
  }
}

// Get a single post
export async function getPostById(db, postId) {
  try {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    throw error;
  }
}

// Update a post
export async function updatePost(db, postId, updateData) {
  try {
    const docRef = doc(db, 'posts', postId);
    await updateDoc(docRef, updateData);
    console.log('Document updated');
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
}

// Delete a post
export async function deletePost(db, postId) {
  try {
    const docRef = doc(db, 'posts', postId);
    await deleteDoc(docRef);
    console.log('Document deleted');
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
}
