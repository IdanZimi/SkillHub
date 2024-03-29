import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "../config/config.json";
import { sequelize } from "./database";
import { UserService } from "./service/UserService";
import { ProjectService } from "./service/ProjectService";
import { ApplyService } from "./service/ApplyService";
import { ProjectUserService } from "./service/ProjectUserService";

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
sequelize.sync;
const userService = new UserService();
const projectService = new ProjectService();
const applyService = new ApplyService();
const projectUserService = new ProjectUserService();

app.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json("WELCOME TO SKILLHUB");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        res.status(500).json({ error: "Unable to connect to the database" });
    }
});

app.post("/register", async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    try {
        userService.registerUser(fullName, email, password, []);
        res.json({ message: "Registration successful", fullName, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "failed", err: err.message });
    }
});

app.post("/login", async (req: Request, res: Response) => {
    const data = req.body;
    try {
        await userService.loginUser(data);
        res.json({ message: "login successful" });
    } catch (err) {
        var errorMessage = err.message;
        console.error("Sign-in error:", errorMessage);
        res.status(500).json({ message: "failed", err: errorMessage });
    }
});

app.post("/project", async (req: Request, res: Response) => {
  const project = req.body;
  try {
    const docref = await projectService.addProject(project);
    res.json({ message: "Add project successful", docref });
  } catch (err) {
    var errorMessage = err.message;
    console.error("add project error:", errorMessage);
    res.status(500).json({ message: "failed", err: errorMessage });
  }
});

app.get("/projects", async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getProjects();
        res.status(200).json(projects);
    } catch (error) {
        console.error("Unable to fetch projects:", error);
        res.status(500).json({ error: "Unable to fetch projects" });
    }
});

app.post("/apply", async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const docref = await applyService.addApply(data);
        res.json({ message: "Add apply successfuly", docref });
    } catch (err) {
        var errorMessage = err.message;
        console.error("add apply error:", errorMessage);
        res.status(500).json({ message: "failed", err: errorMessage });
    }
});

app.put("/apply/status", async (req: Request, res: Response) => {
    const { id, status } = req.body;
    try {
        const docref = await applyService.changeApplyStatus(id, status);
        res.json({ message: "Changed status successfuly", docref });
    } catch (err) {
        var errorMessage = err.message;
        console.error("add apply error:", errorMessage);
        res.status(500).json({ message: "failed", err: errorMessage });
    }
});

app.get("/applies", async (req: Request, res: Response) => {
    try {
        const applies = await applyService.getApplies();
        res.status(200).json(applies);
    } catch (error) {
        console.error("Unable to fetch projects:", error);
        res.status(500).json({ error: "Unable to fetch projects" });
    }
});

app.post("/projects/users", async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const applies = await projectUserService.addProjectUser(data);
        res.status(200).json(applies);
    } catch (error) {
        console.error("Unable to fetch projects:", error);
        res.status(500).json({ error: "Unable to fetch projects" });
    }
});

app.get("/projects/users", async (req: Request, res: Response) => {
    const { uid } = req.query;
    try {
        const projects = await projectUserService.getProjectsUsers(uid);
        res.status(200).json(projects);
    } catch (error) {
        console.error("Unable to fetch projects:", error);
        res.status(500).json({ error: "Unable to fetch projects" });
    }
});

app.put("/project/positions", async (req: Request, res: Response) => {
    const { skillsToUpdate, pid } = req.body;
    try {
        const docref = await projectService.updateAvailableSkills(skillsToUpdate, pid);
        res.json({ message: "Changed status successfuly", docref });
    } catch (err) {
        var errorMessage = err.message;
        console.error("add apply error:", errorMessage);
        res.status(500).json({ message: "failed", err: errorMessage });
    }
});

app.get('/projects/:projectId', async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const uid = await projectService.getAdminUidWithProjectId(projectId)
    res.json({ uid });
});

app.delete('/projects/:projectId', async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    try {
        console.log("project to delete: ",projectId)
        await projectService.deleteProjectById(projectId)
        res.json({ messege: 'delete successfuly', projectId });
    }
    catch (error) {
        console.error("Unable to delete project:", error);
        res.status(500).json({ error: "Unable to delete projects" });
    }
});

app.put("/user/image", async (req: Request, res: Response) => {
    const { uid, imageURL } = req.body;
    try {
        const docref = await userService.updateUserImage(uid, imageURL);
        res.json({ message: "Updated image successfuly", docref });
    } catch (err) {
        var errorMessage = err.message;
        console.error("Update image error:", errorMessage);
        res.status(500).json({ message: "failed", err: errorMessage });
    }
});

app.get("/user/image", async (req: Request, res: Response) => {
    const { uid } = req.query;
    try {
        const imageURL = await userService.getUserImage(uid);
        res.json({ message: "Image sent successfuly", imageURL });
    } catch (err) {
        var errorMessage = err.message;
        console.error("Error:", errorMessage);
        res.status(500).json({ message: "failed", err: errorMessage });
    }
});

app.listen(config.development.serverPort, () => {
    console.log(`Server is running on port ${config.development.serverPort}`);
});