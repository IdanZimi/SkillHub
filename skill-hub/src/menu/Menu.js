import './Menu.css'
import SearchMenu from './search-menu/searchMenu';
import React, { useState, useEffect } from 'react';

function MenuComponent({logoutUserData}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [projectsList, setProjectsList] = useState([]); 

  
    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('isAuthenticated'));
    }, []);

    
    return (
      <div>
        <SearchMenu setIsAuthenticated={setIsAuthenticated} isAauthenticated={isAuthenticated} logoutUserData={logoutUserData}></SearchMenu>
      </div>
    );
  }
  
  export default MenuComponent;