import { db } from "../firebase";
import {
  getDocs,
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

  async getProjectsUsers(uid) {
    try {
      const projectUsersQuerySnapshot = await getDocs(
        collection(db, "projects-users")
      );
      const usersProjectsList = [];
      projectUsersQuerySnapshot.forEach((doc) => {
        usersProjectsList.push({ id: doc.id, ...doc.data() });
      });

      const projectsQuerySnapshot = await getDocs(collection(db, "projects"));
      const projectsList = [];
      projectsQuerySnapshot.forEach((doc) => {
        projectsList.push({ id: doc.id, ...doc.data() });
      });

      const myProjectsId = usersProjectsList
        .filter(
          (projectUser) => projectUser.uid === uid
        )
        .map((projectUser) => projectUser.pid);

      const matchingProjects = projectsList.filter((project) =>
        myProjectsId.includes(project.id)
      );

      return matchingProjects;
    } catch (error) {
      console.error("Unable to fetch project users with projects:", error);
      throw error;
    }
  }

}
