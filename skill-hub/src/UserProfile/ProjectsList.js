import Project from "../Project/Project";
import "./ProjectsList.css";
import { MDBRow, MDBCardText } from "mdb-react-ui-kit";
import { useLocation } from 'react-router-dom'

function ProjectsList({ handleDeleteProject, projectsList, projectsTitle }) {
  const currentPath = useLocation().pathname;
  return (
    <div className="mt-1">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <MDBCardText className="lead fw-normal mb-0">
          {projectsTitle}
        </MDBCardText>
        <MDBCardText className="mb-0">
          <a href="#!" className="text-muted">
            Show all
          </a>
        </MDBCardText>
      </div>
      <MDBRow className="py-5">
        <div className="projects-container">
          {projectsList.length !== 0 && projectsList.map((project, index) => (
            <Project
              handleDeleteProject= {handleDeleteProject}
              path = {currentPath}
              key={index}
              id={project.id}
              imageUrl={project.image}
              title={project.title}
              description={project.description}
              positionName={project.positionName}
              adminId={project.adminId}
            />
          ))}
        </div>
      </MDBRow>
    </div>
  );
}

export default ProjectsList;
