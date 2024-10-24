import { db } from './firebase';
import { collection, addDoc, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

export const registerUser = async (address: string, email: string, profileType: string, interests: string[]) => {
  try {
    const userRef = doc(db, 'users', address);
    await setDoc(userRef, {
      email,
      profileType,
      interests,
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

export const getUserProfile = async (address: string) => {
  try {
    const userRef = doc(db, 'users', address);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const updateUserProfileType = async (address: string, profileType: string) => {
  try {
    const userRef = doc(db, 'users', address);
    await updateDoc(userRef, { profileType });
    return true;
  } catch (error) {
    console.error('Error updating user profile type:', error);
    return false;
  }
};
