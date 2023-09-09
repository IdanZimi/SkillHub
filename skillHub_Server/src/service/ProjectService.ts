import { StringNullableChain } from "lodash";
import { db } from "../firebase";
import {
  getDocs,
  addDoc,
  getDoc,
  collection,
  DocumentReference,
  updateDoc,
  doc,
  deleteDoc,
  where,
  query
} from "firebase/firestore";

interface Project {
  image: string;
  title: string;
  description: string;
  positionName: string[];
  uid?: any;
  availablePositions: string[];
  status: string;
}

export class ProjectService {
  async addProject(project: Project): Promise<DocumentReference> {
    debugger;
    return await addDoc(collection(db, "projects"), {
      title: project.title,
      image: project.image,
      description: project.description,
      positionName: project.positionName,
      adminId: project.uid,
      availablePositions: project.availablePositions,
      status: project.status
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

  async updateAvailableSkills(skillsToRemove: string[], pid: string) {
    try {
      // Get a reference to the document in the "projects" collection with the specified ID
      const projectDocRef = doc(db, "projects", pid);

      // Fetch the current document data
      const projectDocSnapshot = await getDoc(projectDocRef);

      if (projectDocSnapshot.exists()) {
        // Get the current positionName array
        const currentPositionName = projectDocSnapshot.data().availablePositions;

        // Remove skillsToRemove from the currentPositionName array
        const updatedPositionName = currentPositionName.filter(
          (position) => !skillsToRemove.includes(position)
        );

        // Update the document with the modified positionName array
        await updateDoc(projectDocRef, {
          availablePositions: updatedPositionName,
        });

        if (updatedPositionName.length === 0) {
          await updateDoc(projectDocRef, {
            status: "active",
          });
        }

        return projectDocRef; // Return a reference to the updated document
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      console.error("Error updating positionName:", error);
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
        console.log("adminUid: " + adminUid)
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
  //delete project by id is deleting also in 'projects-user' tablw intances where projectId exist
  //it changes in 'applies' table all applies with given pid, field 'status' to 'unavailable' 
  async deleteProjectById(projectId) {
    try {
      const q = query(collection(db, "apply"), where("pid", "==", projectId));
      const docs = await getDocs(q);
      if (docs.docs.length > 0) {
        docs.forEach((doc)=>{
          const docRef = doc.ref;
          updateDoc(docRef, {status:'unavailable'})
        })
      }
      const qUsers = query(collection(db, 'projects-users'), where("pid", '==', projectId))
      const docsProjectUsers = await getDocs(qUsers)
      if (docsProjectUsers.docs.length > 0) {
        docsProjectUsers.forEach((doc)=>{
          const docRef = doc.ref;
          deleteDoc(docRef)
        })
      }
      const projectRef = await doc(db, 'projects', projectId);
      await deleteDoc(projectRef);
    } catch (error) {
      console.error("Failed delete project", error);
      throw error;
    }
  }
}