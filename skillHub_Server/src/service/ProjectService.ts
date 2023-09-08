import { StringNullableChain } from "lodash";
import { db } from "../firebase";
import {
  getDocs,
  getDoc,
  addDoc,
  collection,
  DocumentReference,
  updateDoc,
  doc,
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
      name: project.title,
      image: project.image,
      description: project.description,
      positionName: project.positionName,
      adminId: project.uid,
      availablePositions: project.availablePositions,
      status: project.status,
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

        if (updatedPositionName.length === 0){
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
}
