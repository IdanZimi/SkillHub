import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import MenuComponent from "./menu/Menu";
import Home from "./Home/home";
import "./App.css";
import AlterRegister from "./register/alterRegister";
import Alterlogin from "./login/alterlogin";
import ProjectsPage from "./projects/ProjectsPage";
import AboutPage from './about/AboutPage';
import { ReactNotifications, store } from 'react-notifications-component'
import UserProfile from "./UserProfile/UserProfile";
import { request } from "./httpRequest";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await request.getProjects();
        setProjectsList(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);


  const setUserAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const logoutUserData = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("uid");
    localStorage.removeItem("name");
  };


  ;
  return (
    <div className='app'>
      <div id="content">
        <div>
          <ReactNotifications />
          <MenuComponent isAauthenticated={isAuthenticated} logoutUserData={logoutUserData}> </MenuComponent>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home setUserAuthenticated={setUserAuthenticated} logoutUserData={logoutUserData} />} />
            <Route path="/login" element={<Alterlogin />} />
            <Route path="/register" element={<AlterRegister />} />
            <Route path="/projects" element={<ProjectsPage projectsList={projectsList} setProjectsList={setProjectsList} logoutUserData={logoutUserData} />} />
            <Route path="/about" element={<AboutPage setUserAuthenticated={setUserAuthenticated} logoutUserData={logoutUserData} />} />
            <Route path="/profile" element={<UserProfile projectsList={projectsList} setProjectsList={setProjectsList} logoutUserData={logoutUserData} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;