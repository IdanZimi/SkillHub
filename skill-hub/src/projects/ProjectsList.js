import Project from "../Project/Project";
import './ProjectsList.css';

function ProjectsList({ projectsList }) {
  return (
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
  );
}

export default ProjectsList;
