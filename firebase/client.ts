import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider,
  User,
  Auth,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";

export type UserType =
  | {
      avatar: string | null | undefined;
      username: string | null;
      email?: string | null;
      uid?: string;
      userId?: string;
    }
  | null
  | undefined;

type OnChangeType = (user: UserType) => void;

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

if (!firebaseConfigString) {
  throw new Error("Firebase configuration not found");
}

const firebaseConfig = JSON.parse(firebaseConfigString);

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage = getStorage(app);

const mapUserFromFirebaseAuthToUser = (user: User): UserType => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChangedHandler = (onChange: OnChangeType) => {
  return firebaseOnAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider();
  return signInWithPopup(auth, githubProvider);
};

export const uploadImage = (file: File): UploadTask => {
  const storageRef = ref(storage, `images/${file.name}`);
  return uploadBytesResumable(storageRef, file);
};
