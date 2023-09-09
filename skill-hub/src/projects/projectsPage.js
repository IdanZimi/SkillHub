import React, { useState, useEffect } from "react";
import ProjectRegister from "../ProjectRegister/ProjectRegister";
import Project from "../Project/Project";
import { request } from "../httpRequest";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./ProjectsPage.css";
import { showNotification } from "../utils/utils";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
//import ProjectsList from "./ProjectsList";
import SearchMenu from "../menu/search-menu/searchMenu";
import { handleLogout } from "../menu/search-menu/searchMenu";
import { useLocation } from "react-router-dom";
//import SearchMenu from "../menu/search-menu/searchMenu";
//import { handleLogout } from "../menu/search-menu/searchMenu";
//import MenuComponent, { handleSearch } from "../menu/Menu";
import MuiAlert from '@mui/material/Alert';
import NoResult from "../NoResult/NoResult";
import { setSearchResults } from "../menu/search-menu/searchMenu";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledFab = styled(Fab)({
  position: "fixed",
  top: "70px",
  right: "20px",
});
//shirab
// const handleSearch = (searchQuery, setSearchResults, filteredProjects) => {

//   // if (!projectsList) {
//   //   // Handle the case where projectsList is undefined or null
//   //   setSearchResults([]);
//   //   return;
//   // }
//   const filtered = filteredProjects.filter((project) =>
//     project.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   setSearchResults(filtered);
// };

function ProjectsPage({ projectsList, setProjectsList }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false)
  // const location = useLocation(); // Get the current route location

  // // Initialize isProjectsPage based on the route
  // const isProjectsPage = location.pathname === "/projects";
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    //fetchUserData();
  }, [user, loading]);

  useEffect(() => {
    try {
      setLoadingProjects(true)
      //const projects = await request.getProjects();
      console.log("in use effect in projectpage, projects", projectsList)
      //console.log("projects ", projectsList)
      setFilteredProjects(projectsList); // Initialize filteredProjects with all projects
      //setProjectsList(projects);
      //console.log("in use effect: ", projects);
      //setProjectsList(projects);
      setLoadingProjects(false)
      //console.log("in use effect: ", projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }


    //fetchProjects();
  }, [projectsList]);

  const handleButtonClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = async (project) => {
    if (project) {
      const projectID = await request.addProjectToDB(project);
      project.id = projectID;
      const newProjectsList = [...projectsList, project];
      setProjectsList(newProjectsList);
      showNotification("info", "Success!", `${project.title} created`);
    }
    setIsRegisterOpen(false);
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      // If the search query is empty or only contains whitespace, show all projects.
      setFilteredProjects(projectsList);
    } else {
      const filtered = projectsList.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // Update the filtered projects state
      setFilteredProjects(filtered);
    }
  };
  return (
    <div>
      <StyledFab color="primary" aria-label="add" onClick={handleButtonClick}>
        <AddIcon />
      </StyledFab>
      {isRegisterOpen && (
        <ProjectRegister
          onClose={handleCloseRegister}
          isOpen={isRegisterOpen}
        />
      )}
      <SearchMenu
        isAauthenticated={user !== null}
        onSearch={handleSearch}
        showSearch={true}
      />

      <div className="projects-container">
        {filteredProjects.map((project, index) => (
          <Project
            key={index}
            id={project.id}
            imageUrl={project.image}
            title={project.title}
            description={project.description}
            positionName={project.availablePositions}
            adminId={project.adminId}
            status={project.status}
          />
        ))}

        {filteredProjects.length === 0 ? (
          <NoResult />) : null}
      </div>
    </div>
  );
}

export default ProjectsPage;
