import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import serviceAccount from '../../firebase-service-account.json';

let db: admin.firestore.Firestore | undefined;

try {
  if (!getApps().length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  db = admin.firestore();
} catch (error) {
  console.error('Firebase admin initialization error', error);
}

export { admin, db };
