import { db } from "../firebase";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  collection,
  DocumentReference,
} from "firebase/firestore";

interface Apply {
  resumeURL: string;
  pid: string;
  ptitle:string;
  uid: string;
  selectedSkills: string[];
  email: string;
  phone: string;
  userName: string;
  status: string;
}

export class ApplyService {
  async addApply(apply: Apply): Promise<DocumentReference> {
    return await addDoc(collection(db, "apply"), {
      uid: apply.uid,
      userName: apply.userName,
      pid: apply.pid,
      ptitle: apply.ptitle,
      email: apply.email,
      phone: apply.phone,
      selectedSkills: apply.selectedSkills,
      resumeURL: apply.resumeURL,
      status: "pending"
    });
  }

  async changeApplyStatus(id: string, status: string): Promise<DocumentReference> {
    const data = {
      status: status
    };

    try{
      const docRef = doc(db, "apply", id);
      updateDoc(docRef, data);
      return docRef;
    } catch (error) {
      console.error("Unable to fetch projects:", error);
      throw error;
    }
  }

  async getApplies() {
    try {
      const querySnapshot = await getDocs(collection(db, "apply"));
      const applies = [];

      querySnapshot.forEach((doc) => {
        applies.push({ id: doc.id, ...doc.data() });
      });
      return applies;
    } catch (error) {
      console.error("Unable to fetch projects:", error);
      throw error;
    }
  }
}
