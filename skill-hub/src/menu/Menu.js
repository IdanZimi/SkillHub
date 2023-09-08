import { stack as Menu } from 'react-burger-menu'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faAddressCard, faPeopleGroup, faRightToBracket,
  faRightFromBracket, faUser
} from '@fortawesome/free-solid-svg-icons';
import SearchMenu from './search-menu/searchMenu';
import React, { useState, useEffect } from 'react';
import {logout} from '../firebase'
import { request } from "../httpRequest";



// export const  handleSearch = (searchQuery, setSearchResults, projectsList) => {
//   // Perform the search based on searchQuery and set searchResults
//   // This can be fetching data from your backend or filtering data
//   // Example: setSearchResults(filteredResults);
//   const filtered = projectsList.filter((project) =>
//   project.name.toLowerCase().includes(searchQuery.toLowerCase())
// );
// setSearchResults(filtered);
// };

function MenuComponent({logoutUserData}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [projectsList, setProjectsList] = useState([]); // Add this state

  
    useEffect(() => {
      // Check if the authentication state exists in localStorage
      //const storedAuthState = localStorage.getItem('isAuthenticated');
      //if (storedAuthState) {
        setIsAuthenticated(localStorage.getItem('isAuthenticated'));
      //}
    }, []);

    
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const projects = await request.getProjects();
  //       setProjectsList(projects);
  //       //setFilteredProjects(projects); // Initialize filteredProjects with all projects

  //       console.log("in use effect: ", projects);
  //     } catch (error) {
  //       console.error("Error fetching projects:", error);
  //     }
  //   };

  //   fetchProjects();
  // }, []);



  
    const handleLogin = () => {
      //setIsAuthenticated(true);
      // Store the authentication state in localStorage
      //localStorage.setItem('isAuthenticated', true);
    };
  
    // const handleLogout = () => {
    //   //setIsAuthenticated(false);
    //   // Remove the authentication state from localStorage
    //   localStorage.removeItem('isAuthenticated');
    //   logoutUserData()
    //   logout()
    // };
  
    return (
      <div>
        <SearchMenu setIsAuthenticated={setIsAuthenticated} isAauthenticated={isAuthenticated} logoutUserData={logoutUserData}></SearchMenu>
        {/* <Menu width={260}>
          <a id="home" className="bm-item" href={isAauthenticated ? "/":"/login"}><FontAwesomeIcon icon={faHouse} size='lg' flip /> Home</a>
          <a id="about" className="bm-item" href="/about"><FontAwesomeIcon icon={faAddressCard} size='lg' /> About</a>
          <a id="projects" className="bm-item" href="/projects"><FontAwesomeIcon icon={faPeopleGroup} size='lg' /> Projects</a>
          <a id="profile" className="bm-item" href="/profile"><FontAwesomeIcon icon={faUser} size='lg' /> Profile</a>
          {isAauthenticated ? (
            <a id="logout" className="bm-item" onClick={handleLogout} href="/"><FontAwesomeIcon icon={faRightFromBracket} size='lg' /> Logout</a>
          ) : (
            <a id="login" className="bm-item" href="/login"><FontAwesomeIcon icon={faRightToBracket} size='lg' /> Login</a>
          )}
        </Menu> */}
      </div>
    );
  }
  
  export default MenuComponent;