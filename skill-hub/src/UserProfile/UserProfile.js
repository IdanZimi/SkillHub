import React, { useState, useEffect } from "react";
// import Griddle, {
//   plugins,
//   RowDefinition,
//   ColumnDefinition,
// } from "griddle-react";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBInput,
} from "mdb-react-ui-kit";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./UserProfile.css";
import Project from "../Project/Project";
import { request } from "../httpRequest";

function UserProfile({ projectsList, updateProjectsList }) {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [city, setCity] = useState(localStorage.getItem("city") || "");
  const [about, setAbout] = useState(localStorage.getItem("about") || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const filteredProjectsList = projectsList.filter(
    (project) => project.adminId === localStorage.getItem("uid")
  );

  const data = [
    {
      id: 0,
      name: "Ido Yekutiel",
      project: "Project 1",
      skills: ["zivil, developer, ux/ui, FullStack"],
    },
    {
      id: 1,
      name: "Ori Globus",
      project: "Project 777",
      skills: ["I am, the best"],
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await request.getProjects();
        updateProjectsList(projects);
        //console.log("in use effect: ", projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProfileEditSubmit = () => {
    // Here, you can send the updated profile information to your backend API
    // and update the user's information on success.
    // For simplicity, we'll just update the state and localStorage here.
    //localStorage.setItem("name", name);
    //localStorage.setItem("city", city);
    localStorage.setItem("about", about);
    setIsEditMode(false); // Close the edit modal
  };

  return (
    <div className="gradient-custom" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" xl="12">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  <MDBBtn
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                    onClick={() => setIsEditMode(true)}
                  >
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">
                    {localStorage.getItem("name")}
                  </MDBTypography>
                  <MDBCardText>{/* Tel Aviv */}</MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                {/* <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div> */}
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  {isEditMode ? (
                    <div>
                      {" "}
                      <MDBInput
                        className="w-100 p-3 h-25"
                        type="textarea"
                        label="About"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            // Prevent capturing "Enter" key if you want to create new lines
                            e.preventDefault();

                            // Insert a newline character into the textarea value
                            setAbout(about + "\n");
                          }
                        }}
                      />
                      <MDBBtn
                        outline
                        color="dark"
                        style={{ height: "36px", overflow: "visible" }}
                        onClick={handleProfileEditSubmit}
                      >
                        Finish Editing
                      </MDBBtn>
                    </div>
                  ) : (
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      {/* <MDBCardText className="font-italic mb-1">
                        Web Developer
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-1">
                        Lives in New York
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-0">
                        Photographer
                      </MDBCardText> */}
                      <MDBCardText className="font-italic mb-1">
                        {about}
                      </MDBCardText>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">
                    My projects
                  </MDBCardText>
                  <MDBCardText className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </MDBCardText>
                </div>
                <MDBRow className="py-5">
                  {filteredProjectsList.map((project, index) => (
                    <Project
                      key={index}
                      id={project.id}
                      imageUrl={project.image}
                      title={project.name}
                      description={project.description}
                      positionName={project.positionName}
                    />
                  ))}
                </MDBRow>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">
                    Applies
                  </MDBCardText>
                  <MDBCardText className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </MDBCardText>
                </div>
                {/* <Griddle data={data} plugins={[plugins.LocalPlugin]}>
                  <RowDefinition>
                    <ColumnDefinition id="name" title="Name" width={200} />
                    <ColumnDefinition id="project" title="Project Name" width={200} />
                    <ColumnDefinition id="skills" title="Skills" width={200} />
                  </RowDefinition>
                </Griddle> */}
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Project</TableCell>
                        <TableCell>Skills</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.project}</TableCell>
                          <TableCell>{row.skills}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => {}}
                            >
                              Approve
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => {}}
                            >
                              Decline
                            </Button>
                          </TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default UserProfile;
