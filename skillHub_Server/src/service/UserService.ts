import { db } from '../firebase';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
} from "../firebase";

import {
    getDocs,
    collection,
} from "firebase/firestore";

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

//   async getUserName(uid: String) {
//     try {
//       const querySnapshot = await getDocs(collection(db, "users"));
  
//       const user = querySnapshot.docs.find((doc) => doc.data().uid === uid);
  
//       if (user) {
//         // User with matching uid found, return the user's data
//         return { userName: user.data().name };
//       } else {
//         // User not found, return null or handle as needed
//         return null;
//       }
//     } catch (error) {
//       console.error("Unable to fetch user:", error);
//       throw error;
//     }
//   }
  
  // async checkConnection() {
  //     try {
  //         await sequelize.authenticate();
  //         console.log("Connection has been established successfully.");
  //     }
  //     catch (error) {
  //         throw error;
  //     }
  // }
}
