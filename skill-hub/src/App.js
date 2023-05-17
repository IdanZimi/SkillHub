//import './App.css';
import { stack as Menu } from 'react-burger-menu'
import './styles/Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAddressCard, faPeopleGroup, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the authentication state exists in localStorage
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Store the authentication state in localStorage
    localStorage.setItem('isAuthenticated', true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Remove the authentication state from localStorage
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <div className='container'>
      <Menu>
        <a id="home" className="bm-item" href="/"><FontAwesomeIcon icon={faHouse} size='xl' flip /> Home</a>
        <a id="about" className="bm-item" href="/about"><FontAwesomeIcon icon={faAddressCard} size='xl' /> About</a>
        <a id="projects" className="bm-item" href="/projects"><FontAwesomeIcon icon={faPeopleGroup} size='xl' /> Projects</a>
        {isAuthenticated ? (
          <a id="logout" className="bm-item" onClick={handleLogout} href="/"><FontAwesomeIcon icon={faRightFromBracket} size='xl' /> Logout</a>
        ) : (
          <a id="login" className="bm-item" onClick={handleLogin} href="/login"><FontAwesomeIcon icon={faRightToBracket} size='xl' /> Login</a>
        )}
      </Menu>
    </div>
  );
}

export default App;
