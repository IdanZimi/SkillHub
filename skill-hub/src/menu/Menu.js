import { stack as Menu } from 'react-burger-menu'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faAddressCard, faPeopleGroup, faRightToBracket,
  faRightFromBracket,  
} from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import {logout} from '../firebase'

function MenuComponent({isAauthenticated, logoutUserData}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      // Check if the authentication state exists in localStorage
      const storedAuthState = localStorage.getItem('isAuthenticated');
      if (storedAuthState) {
        setIsAuthenticated(JSON.parse(storedAuthState));
      }
    }, []);
  
    const handleLogin = () => {
      //setIsAuthenticated(true);
      // Store the authentication state in localStorage
      //localStorage.setItem('isAuthenticated', true);
    };
  
    const handleLogout = () => {
      //setIsAuthenticated(false);
      // Remove the authentication state from localStorage
      localStorage.removeItem('isAuthenticated');
      logoutUserData()
      logout()
    };
  
    return (
      <div>
        <Menu width={260}>
          <a id="home" className="bm-item" href={isAauthenticated ? "/":"/login"}><FontAwesomeIcon icon={faHouse} size='lg' flip /> Home</a>
          <a id="about" className="bm-item" href="/about"><FontAwesomeIcon icon={faAddressCard} size='lg' /> About</a>
          <a id="projects" className="bm-item" href="/projects"><FontAwesomeIcon icon={faPeopleGroup} size='lg' /> Projects</a>
          {isAauthenticated ? (
            <a id="logout" className="bm-item" onClick={handleLogout} href="/"><FontAwesomeIcon icon={faRightFromBracket} size='lg' /> Logout</a>
          ) : (
            <a id="login" className="bm-item" href="/login"><FontAwesomeIcon icon={faRightToBracket} size='lg' /> Login</a>
          )}
        </Menu>
      </div>
    );
  }
  
  export default MenuComponent;