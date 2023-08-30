import { db } from "../firebase";
import { addDoc, collection, DocumentReference } from "firebase/firestore";

interface Project{
    image: string;         
    title: string;
    description: string;
    positionName: string[]; 
    uid?:any;
}

export class ProjectService{
    async addProject(project:Project):Promise<DocumentReference>{
        debugger;
        console.log(project.uid)
        return await addDoc(collection(db, "projects"), {
            name: project.title,
            image: project.image,
            description: project.description,
            positionName: project.positionName,
            adminId: project.uid,
        });
    }

    

}