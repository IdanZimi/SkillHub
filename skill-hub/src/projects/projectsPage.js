import React, { useState, useEffect } from "react";
import ProjectRegister from "../ProjectRegister/ProjectRegister";
import Project from "../Project/Project";
import "./projectsPage.css";
import { request } from "../httpRequest";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./projectsPage.css";
import { showNotification } from "../utils/utils";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)({
  position: 'fixed',
  top: '70px',
  right: '20px',
});

function ProjectsPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    //fetchUserData();
  }, [user, loading]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await request.getProjects();
        setProjectsList(projects);
        console.log("in use effect: ", projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleButtonClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = async (project) => {
    if (project) {
      
      const projectID = await request.addProjectToDB(project);
      project.id = projectID
      setProjectsList([...projectsList, project]);
      showNotification("info", "Success!", `${project.title} created`)
    }
    setIsRegisterOpen(false);
  };

  return (
    <div>
      {/* <button className="create__btn" onClick={handleButtonClick}>
        Create +
      </button> */}
      <StyledFab color="primary" aria-label="add" onClick={handleButtonClick}>
        <AddIcon />
      </StyledFab>
      {isRegisterOpen && (
        <ProjectRegister
          onClose={handleCloseRegister}
          isOpen={isRegisterOpen}
        />
      )}
      <div className="projects-container">
        {projectsList.map((project, index) => (
          <Project
            key={index}
            id={project.id}
            imageUrl={project.image}
            title={project.name}
            description={project.description}
            positionName={project.positionName}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
