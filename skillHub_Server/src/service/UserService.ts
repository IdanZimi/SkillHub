import { db } from "../firebase";
import {
  getDoc,
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

import {
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
} from "../firebase";

export class UserService {
  async registerUser(
    fullName: string,
    email: string,
    password: string,
    skills: string[]
  ): Promise<void> {
    await registerWithEmailAndPassword(fullName, email, password, skills);
  }

  async loginUser(data: any) {
    if (data.provider === "local") {
      try {
        await logInWithEmailAndPassword(data.email, data.password);
      } catch (error) {
        throw error;
      }
    } else {
      data.provider === "google" ? signInWithGoogle : signInWithFacebook;
    }
  }

  async updateUserImage(uid: string, imageURL: string) {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming you want to update the first document found with the given UID
        const userDocRef = querySnapshot.docs[0].ref;

        // Update the user document with the new imageURL
        await updateDoc(userDocRef, { imageURL: imageURL });

        return userDocRef; 
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error updating user's imageURL:", error);
      throw error;
    }
  }

  async getUserImage(uid) {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming you want to update the first document found with the given UID
        const userDocRef = querySnapshot.docs[0].ref;

        // Update the user document with the new imageURL
        const doc = await getDoc(userDocRef);

        return doc.data().imageURL;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error updating user's imageURL:", error);
      throw error;
    }
  }
}
