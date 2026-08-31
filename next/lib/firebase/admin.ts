import "server-only";

import { initializeApp, getApps, cert, type AppOptions, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function buildOptions(): AppOptions | null {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (clientEmail && privateKey) {
    return {
      projectId,
      credential: cert({ projectId, clientEmail, privateKey } as ServiceAccount),
    };
  }
  return { projectId };
}

let firestore: Firestore | undefined;

export function getAdminFirestore(): Firestore | null {
  if (!process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    return null;
  }
  if (!firestore) {
    if (getApps().length === 0) {
      initializeApp(buildOptions()!);
    }
    firestore = getFirestore(getApps()[0]);
  }
  return firestore;
}
