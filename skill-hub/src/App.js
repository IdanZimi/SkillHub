import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from "react-router-dom";
import Login from "./login/login"
import Register from './register/Register'
import MenuComponent from './menu/Menu';
import Home from './Home/home'
import { auth, authStateChanged, db } from './firebase'
import './App.css'
import AlterRegister from './register/alterRegister';
import Alterlogin from './login/alterlogin';
import ProjectPage from './projects/projectPage';
//import RecipeReviewCard from './projects/projectPage';
import AboutPage from './about/AboutPage';
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [uid, setuid] = useState("");
  //const [user, loading, error] = useAuthState(auth);

  const setUserData = (name, uid) =>{
    setName(name);
    setuid(uid)
    setIsAuthenticated(true)
  }

  const logoutUserData = () =>{
    setName('')
    setuid('')
    setIsAuthenticated(false)
  }

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
        <div className="content">
          <div>
            {/* <Nav></Nav> */}
            <MenuComponent isAauthenticated={isAuthenticated} logoutUserData={logoutUserData}> </MenuComponent>
          </div>
          <Router>
            <Routes>
              <Route path="/" element={<Home setUserData={setUserData} logoutUserData={logoutUserData} />} />
              <Route path="/login" element={<Alterlogin />} />
              <Route path="/register" element={<AlterRegister />} />
              <Route path="/projects" element={<ProjectPage name={name} uid={uid} />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Router>
        </div>
        <footer className="footer">
          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-2 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2023. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
  );
}

export default App;
