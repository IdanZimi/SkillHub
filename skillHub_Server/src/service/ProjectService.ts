import { db } from "../firebase";
import {
  getDocs,
  addDoc,
  getDoc,
  collection,
  DocumentReference,
  doc,
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
      const projects = [];

      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      return projects;
    } catch (error) {
      console.error("Unable to fetch projects:", error);
      throw error;
    }
  }

  async getAdminUidWithProjectId(projectId) {
    try {
    const projectRef = await doc(db, 'projects', projectId);
    const projectDoc = await getDoc(projectRef);

    if (projectDoc.exists) {
      // Get the admin UID from the project document
      const adminUid = projectDoc.data().adminId;
      console.log("adminUid: "+ adminUid)
      return adminUid;
    } else {
      // Handle the case where the project document doesn't exist
      return null;
    }
    } catch (error) {
      console.error("Unable to fetch projects:", error);
      throw error;
    }
  }
}