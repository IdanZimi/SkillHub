import { List, Card } from "@mui/material";
import Project from "../Project/Project";

function UserProfile() {
  const Projects = [
    {
      id: 1,
      founder: "ido",
      status: false,
    },
    {
      id: 2,
      founder: "idan",
      status: true,
    },
  ];
  const userName = "ido";
  return (
    // {founding projects}
    // {projects im part of}
    // 
    <div className="container">
      <List sx={{ width: "650px" }}>
        {Projects.map((project) => (
          <Card
            component="form"
            sx={{ minWidth: "100%" }}
            data-testid="tagList-newTag-card"
          >
            {/* imageUrl, title, description, positionName */}
            {/* key={index}
            imageUrl={project.image}
            title={project.title}
            description={project.description}
            positionName={project.positionName} */}
            <Project id={project.id} founder={project.founder} status={project.status} user={userName}/>
          </Card>
        ))}
      </List>
    </div>
  );
}

export default UserProfile;
