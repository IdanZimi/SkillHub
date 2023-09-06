import "./AboutPage.css";
import React, { useState, useEffect } from "react";
import SearchMenu from "../menu/search-menu/searchMenu";
import { handleSearch } from "../menu/Menu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; 


const AboutPage = () => {
  // const [filteredContent, setFilteredContent] = useState([]);
  // const [user, loading, error] = useAuthState(auth);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location
  const isAboutPage = location.pathname === "/about"; 

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/login");
  //   //fetchUserData();
  // }, [user, loading]);

  // const handleSearchTextChange = (searchText) => {
  //   // Use the handleSearch function to filter content based on the search query
  //   handleSearch(searchText, setFilteredContent, filteredContent); // Replace contentData with your actual data
  // };
  return (
    
    <div className="restaurant-landing-page">
           {!isAboutPage && (
        <SearchMenu
          isAauthenticated={user !== null}
          //onSearch={handleSearchTextChange}
          showSearch={false} 
        />
      )}
            <div className="home-page-text-container">
        <b className="skill-hub">
          <span>Skill Hub</span>
          {/* <span className="span">{` `}</span> */}
        </b>
        <div className="skill-hub-is-container">
          <p className="skill-hub-is">
            Skill Hub is a platform for finding suitable partners and team
            members, especially for your project. Whether you are an entrepreneur, a
            creative individual,or an individual seeking collaboration, our platform connects you
            with relevant people to bring your ideas to life.
          </p>
        </div>
      </div>
      <img
        className="banner-background-icon"
        alt=""
        src="https://d1xzdqg8s8ggsr.cloudfront.net/64e9c4535f2161d7bc1b2d01/a596728a-42e9-4295-922b-284a186d270b_1693042441567274234?Expires=-62135596800&Signature=oTmqfQCONbFxMZ67o3uBOxOwl2ZDskR~dQobbuus0BntjK6SJ8pW54wz7CBbNwb4UaiA6NJwcyNs9mubdhP8xA5infIeoKRNGeyCOLAUcoo1doJ2c2V63a9MR0vTSH3jQKwCK8tG2wztmShR5e1BYL7COagmgtGTZgZEjzdVuTuHqn5-JvMewuFdDxUnv6TTJAZBQmptjLvrUsjdC8ooYYWTlefakTvl-CoTmWxYjhoXQcnwx5dzXmQEi~wACzhsvd-KILr~ASUUw2O6MzGS-oooTb84SbtgwKKWdEM-C-krBUA8iqoT1dZVntKHute3OiFPxIVsdnDcp2qtxBlUyQ__&Key-Pair-Id=K1P54FZWCHCL6Jg"
      />

    </div>
  );
};

export default AboutPage;