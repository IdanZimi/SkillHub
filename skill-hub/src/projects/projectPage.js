import React, { useState, useEffect } from "react";
import ProjectRegister from "../ProjectRegister/ProjectRegister";
import Project from "../Project/Project";
import "./projectPage.css";
import { request } from "../httpRequest";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../utils/utils";


function ProjectPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [projects, setProjects] = useState([]); // State to store projects
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    //fetchUserData();
  }, [user, loading]);

  const handleButtonClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = async (project) => {
    if (project) {
      console.log("In handleCloseRegister, project is: ", project);
      //const userRef = db.collection('users').doc(uid);
      const projectID = await request.addProjectToDB(project);
      project.id = projectID
      setProjects([...projects, project]);
      showNotification("info", "Success!",`${project.title} created`)
    }
    setIsRegisterOpen(false);
  };

  return (
    <div>
      <button className="create__btn" onClick={handleButtonClick}>
        Create +
      </button>
      {isRegisterOpen && (
        <ProjectRegister
          onClose={handleCloseRegister}
          isOpen={isRegisterOpen}
        />
      )}
      <div className="projects-container">
        {projects.map((project, index) => (
          <Project
            key={index}
            imageUrl={project.image}
            title={project.title}
            description={project.description}
            positionName={project.positionName}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
