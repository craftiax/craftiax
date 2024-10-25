import { db } from './firebase';
import { collection, addDoc, setDoc, doc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

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

export const saveCraftDetails = async (metadataUrl: string, metadata: any) => {
  try {
    const craftCollectionRef = collection(db, 'crafts');
    const craftDocRef = await addDoc(craftCollectionRef, {
      ...metadata,
      metadataUrl,
      createdAt: new Date().toISOString(),
    });
    return craftDocRef.id; // Return the unique ID of the newly created document
  } catch (error) {
    console.error('Error saving craft details:', error);
    return null;
  }
};

export const fetchArtistCrafts = async (artistAddress: string) => {
  const craftsRef = collection(db, 'crafts');
  const q = query(craftsRef, where('artist_address', '==', artistAddress));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    flaresReceived: Math.floor(Math.random() * 100),
    totalUSDC: Math.floor(Math.random() * 500)
  }));
};
