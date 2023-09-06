import { db } from "../firebase";
import {
  getDocs,
  addDoc,
  collection,
  DocumentReference,
} from "firebase/firestore";

interface Apply {
  resumeURL: string;
  pid: string;
  uid: string;
  selectedSkills: string[];
  email: string;
  phone: string;
}

export class ApplyService {
  async addApply(apply: Apply): Promise<DocumentReference> {
    return await addDoc(collection(db, "apply"), {
      uid: apply.uid,
      pid: apply.pid,
      email: apply.email,
      phone: apply.phone,
      selectedSkills: apply.selectedSkills,
      resumeURL: apply.resumeURL,
    });
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
