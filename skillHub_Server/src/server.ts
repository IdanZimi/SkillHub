import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../config/config.json'
import { sequelize } from "./database";
import { User } from '../models/user.model'
import { UserService } from './service/UserService'
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
    signInWithFacebook,
} from './firebase'
import { ProjectService } from './service/ProjectService';

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
sequelize.sync
const userService = new UserService();
const projectService = new ProjectService()

app.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json("WELCOME TO SKILLHUB");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        //res.status(500).json({ error: "Unable to connect to the database" });
    }
});



app.post('/register', async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    try {
        userService.registerUser(fullName, email, password, [])
        // Here, you would typically perform your registration logic
        // and save the user data to a database or perform other actions.
        // For demonstration purposes, we'll just return a response.

        res.json({ message: 'Registration successful', fullName, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'failed', err: err.message })
    }
});

app.post('/login', async (req: Request, res: Response) => {
    const data  = req.body;
    try {
        await userService.loginUser(data)
        res.json({ message: 'login successful'});
    } catch (err) {
        var errorMessage = err.message;
        console.error("Sign-in error:", errorMessage);
        res.status(500).json({ message: 'failed', err: errorMessage })
    }
});

app.post('/project', async (req: Request, res: Response) => {
    const data  = req.body;
    try {
        console.log("inside project endpoint")
        console.log("data " + data)
        console.log("data uid" + data.uid)
        const docref = await projectService.addProject(data)
        res.json({ message: 'Add project successful', docref});
    } catch (err) {
        var errorMessage = err.message;
        console.error("add project error:", errorMessage);
        res.status(500).json({ message: 'failed', err: errorMessage })
    }
});

app.listen(config.development.serverPort, () => {
    console.log(`Server is running on port ${config.development.serverPort}`);
});
