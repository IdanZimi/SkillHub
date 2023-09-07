import Project from "../Project/Project";
import "./ProjectsList.css";
import { MDBRow, MDBCardText } from "mdb-react-ui-kit";

function ProjectsList({ projectsList, projectsTitle }) {
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
      </MDBRow>
    </div>
  );
}

export default ProjectsList;
