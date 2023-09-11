import React, { useState, useEffect } from "react";
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

import "./UserProfile.css";
import { request } from "../httpRequest";
import { showNotification } from "../utils/utils";
import ProjectsList from "./ProjectsList";
import AppliesList from "./AppliesList";
import { styled } from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import img from "../static/images/defaultProfilePicture.jpg";
import backgroundCardImage from '../static/images/darkBackground.jpg';

function UserProfile({ projectsList, setProjectsList, logoutUserData }) {
  const [about, setAbout] = useState(localStorage.getItem("about") || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [appliesList, setAppliesList] = useState([]);
  const [projectUserList, setProjectUserList] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const filteredProjectsList = projectsList.filter(
    (project) => project.adminId === localStorage.getItem("uid")
  );

  const myProjects = projectsList.filter(
    (project) => project.adminId === localStorage.getItem("uid")
  );
  const applicationsForMyProjects = appliesList
    .filter((apply) => myProjects.some((project) => project.id === apply.pid))
    .filter(
      (apply) => apply.status != "Approved" && apply.status != "Declined"
    );

  const ApplicationsSent = appliesList.filter(
    (apply) => apply.uid === localStorage.getItem("uid")
  );

  useEffect(() => {
    try {
      fetchUserProfilePicture();
      fetchApplies();
      fetchProjectsUsers();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const fetchUserProfilePicture = async () => {
    try {
      const profilePictureUrl = await request.getUserProfilePicture(
        localStorage.getItem("uid")
      );
      setProfileImageUrl(profilePictureUrl);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  const fetchApplies = async () => {
    try {
      const applies = await request.getApplies();
      setAppliesList(applies);
    } catch (error) {
      console.error("Error fetching applies:", error);
    }
  };
  const handleDeleteProject = async (id) => {
    const deletedProjectId = await request.deleteProjectById(id);
    if (deletedProjectId) {
      const updatedProjectList = projectsList.filter(
        (project) => project.id !== deletedProjectId.id
      );
      setProjectsList(updatedProjectList);
      showNotification("info", "Success!", "Project deleted");
    }
  };

  const approveApplyHandler = async (apply) => {
    try {
      await request.changeApplyStatus(apply.id, "Approved");
      await request.addToProjectsUsersTable(apply.pid, apply.uid);
      await request.updateAvailablePositions(apply.selectedSkills, apply.pid);
      showNotification(
        "info",
        "Success!",
        `Congratulations! You are one step closer to get started with your project!`
      );
      fetchApplies();
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const declineApplyHandler = async (apply) => {
    try {
      await request.changeApplyStatus(apply.id, "Declined");
      showNotification(
        "info",
        "Success",
        `You have successfully rejected the cantidate's application.`
      );
      fetchApplies();
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const fetchProjectsUsers = async () => {
    try {
      const matchingProjects = await request.getProjectsOfUser(
        localStorage.getItem("uid")
      );
      setProjectUserList(matchingProjects);
    } catch (error) {
      console.error("Error fetching projects-users:", error);
    }
  };

  const handleProfileEditSubmit = () => {
    localStorage.setItem("about", about);
    setIsEditMode(false);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const storageRef = ref(storage, `${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    uploadTask.on(
      "state_changed",
      null,
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          changeProfilePicture(url);
        });
      }
    );
  };

  const changeProfilePicture = (newImageURL) => {
    setProfileImageUrl(newImageURL);
    request.updateProfilePicture(localStorage.getItem("uid"), newImageURL);
  };

  return (
    <div className="gradient-custom" style={{}}>
      <MDBContainer className="py-5" style={{ minHeight: "100vh" }} fluid>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" xl="12">
            <MDBCard style={{backgroundColor:'AliceBlue'}}>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{
                  backgroundImage: `url(${backgroundCardImage})`,
                  backgroundSize: 'cover', 
                  backgroundRepeat: 'no-repeat',
                  height: '200px'
                }}
              
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={profileImageUrl ? profileImageUrl : img}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    // style={{ width: "200px", height: "300px", zIndex: "1" }}
                  />
                  <MDBBtn
                    onClick={() => document.getElementById("fileInput").click()}
                    outline
                    color="dark"
                    style={{
                      height: "36px",
                      overflow: "visible",
                      marginBottom: "5px",
                    }}
                  >
                    Upload Image
                    <VisuallyHiddenInput
                      id="fileInput"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </MDBBtn>
                  <MDBBtn
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                    onClick={() => setIsEditMode(true)}
                  >
                    Edit Bio
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">
                    <MDBCardText
                      className="font-italic mb-1"
                      style={{ color: "white", fontWeight:"bold" }}
                    >
                      {localStorage.getItem("name").toUpperCase()}
                    </MDBCardText>
                  </MDBTypography>
                </div>
              </div>
              <MDBCardBody className="text-black p-4 mt-5">
              <div className="mb-5">
                  <p className="lead fw-normal mt-5 mb-1">About</p>
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
                            e.preventDefault();
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
                      <MDBCardText className="font-italic mb-1">
                        {about}
                      </MDBCardText>
                    </div>
                  )}
                </div>
                <ProjectsList
                  projectsList={filteredProjectsList}
                  projectsTitle="Projects I've created"
                  handleDeleteProject={handleDeleteProject}
                />
                <AppliesList
                  appliesList={applicationsForMyProjects}
                  appliesTitle="My projects' applies"
                  projectsList={projectsList}
                  approveApplyHandler={approveApplyHandler}
                  declineApplyHandler={declineApplyHandler}
                />
                <ProjectsList
                  projectsList={projectUserList}
                  projectsTitle="Projects I've joined"
                />
                <AppliesList
                  appliesList={ApplicationsSent}
                  appliesTitle="Applies I've sent"
                  projectsList={projectsList}
                  approveApplyHandler={approveApplyHandler}
                  declineApplyHandler={declineApplyHandler}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default UserProfile;
