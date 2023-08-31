import { db } from "../firebase";
import {
  getDocs,
  addDoc,
  collection,
  DocumentReference,
} from "firebase/firestore";

interface Project {
  image: string;
  title: string;
  description: string;
  positionName: string[];
  uid?: any;
}

export class ProjectService {
  async addProject(project: Project): Promise<DocumentReference> {
    debugger;
    console.log(project.uid);
    return await addDoc(collection(db, "projects"), {
      name: project.title,
      image: project.image,
      description: project.description,
      positionName: project.positionName,
      adminId: project.uid,
    });
  }

  async getProjects() {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      //   querySnapshot.forEach((doc) => {
      //     console.log(`${doc.id} => ${doc.data().name}`);
      //   });
      const projects = [];

      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });

      return projects;

      //return querySnapshot;
    } catch (error) {
      console.error("Unable to fetch projects:", error);
      throw error;
    }
  }
}
