import {
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
} from "../firebase";

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
