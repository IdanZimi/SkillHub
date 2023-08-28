import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from "react-router-dom";
import Login from "./login/login"
import Register from './register/Register'
import MenuComponent from './menu/Menu';
import Home from './Home/home'
import { auth, authStateChanged } from './firebase'
import './App.css'
import AlterRegister from './register/alterRegister';
import Alterlogin from './login/alterlogin';
import Nav from './nav/nav'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = authStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        setIsAuthenticated(true)
        // Perform any necessary actions for an authenticated user
      } else {
        // User is not authenticated
        setIsAuthenticated(false)
        // Perform any necessary actions for an unauthenticated user
      }
    });

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
      <div className='app'>
        <div className="content">
          <div>
            {/* <Nav></Nav> */}
            <MenuComponent isAauthenticated={isAuthenticated}> </MenuComponent>
          </div>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Alterlogin />} />
              <Route path="/register" element={<AlterRegister />} />
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
