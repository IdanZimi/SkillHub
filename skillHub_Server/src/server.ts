import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../config/config.json'
import { sequelize } from "./database";
import { User } from '../models/User'
import { UserService } from './service/UserService'

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
sequelize.sync
const userService = new UserService();

app.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json("WELCOME TO SKILLHUB");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        //res.status(500).json({ error: "Unable to connect to the database" });
    }
});


app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers()
        res.status(200).json(users);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        res.status(500).json({ error: "Unable to connect to the database" });
    }
});

app.listen(config.development.serverPort, () => {
    console.log(`Server is running on port ${config.development.serverPort}`);
});
