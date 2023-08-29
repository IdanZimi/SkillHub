import React, { useState } from 'react';
import ProjectRegister from '../ProjectRegister/ProjectRegister';
import Project from '../Project/Project';
import "./projectPage.css";


function ProjectPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [projects, setProjects] = useState([]); // State to store projects

  const handleButtonClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = (project) => {
    if (project) {
      setProjects([...projects, project]);
    }
    setIsRegisterOpen(false);
  };

  return (
    <div> 
      <button className='create__btn' onClick={handleButtonClick}>Create +</button>
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
  )
}

export default ProjectPage;

