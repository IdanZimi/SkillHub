import { db } from "../firebase";
import {
  addDoc,
  collection,
  DocumentReference,
} from "firebase/firestore";

interface ProjectUser {
  pid: string;
  uid?: any;
}

export class ProjectUserService {
  async addProjectUser(projectUser: ProjectUser): Promise<DocumentReference> {
    return await addDoc(collection(db, "projects-users"), {
      pid: projectUser.pid,
      uid: projectUser.uid,
    });
  }
}
