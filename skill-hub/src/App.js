import React, { useState } from "react";
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projectsList, setProjectsList] = useState([]);

  const updateProjectsList = (projects) => {
    setProjectsList(projects);
  }

  const setUserAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const logoutUserData = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("uid");
    localStorage.removeItem("name");
  };

  // useEffect(() => {
  //   const unsubscribe = authStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("inside use effect of app")
  //       setIsAuthenticated(true)
  //       fetchUserData(user.uid)
  //       console.log("user:", user)
  //       // Perform any necessary actions for an authenticated user
  //     } else {
  //       // User is not authenticated
  //       setIsAuthenticated(false)
  //       setuid('')
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  //   const fetchUserData = async (uid) => {
  //     try {
  //         const q = query(collection(db, "users"), where("uid", "==", uid));
  //         const doc = await getDocs(q);
  //         const data = doc.docs[0].data();
  //         setUserData(data.name, data.uid)
  //     } catch (err) {
  //         console.error(err);
  //         alert("An error occured while fetching user data");
  //     }
  // };

  return (
      <div className='app'>
        <div id="content">
          <div>
            <ReactNotifications/>
            <MenuComponent isAauthenticated={isAuthenticated} logoutUserData={logoutUserData}> </MenuComponent>
          </div>
          <Router>
            <Routes>
              <Route path="/" element={<Home setUserAuthenticated={setUserAuthenticated} logoutUserData={logoutUserData} />} />
              <Route path="/login" element={<Alterlogin />} />
              <Route path="/register" element={<AlterRegister />} />
              <Route path="/projects" element={<ProjectsPage projectsList={projectsList} updateProjectsList={updateProjectsList}/>} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/profile" element={<UserProfile projectsList={projectsList} updateProjectsList={updateProjectsList}/>} />
            </Routes>
          </Router>
        </div>
        {/* <footer className="footer">
          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-2 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2023. All rights reserved.
            </div>
          </div>
        </footer> */}
    </div>
  );
}

export default App;