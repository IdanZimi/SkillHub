import "./AboutPage.css";
import React, { useState, useEffect } from "react";
import SearchMenu from "../menu/search-menu/searchMenu";
import { handleSearch } from "../menu/Menu";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; 
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db, logout } from "../firebase";


const AboutPage = ({setUserAuthenticated, logoutUserData}) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation(); 
  const isAboutPage = location.pathname === "/about"; 

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserData();
  }, [user, loading]);

  const fetchUserData = async () => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setUserAuthenticated();
        localStorage.setItem("uid", data.uid);
        localStorage.setItem("name", data.name);
    } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
    }
};
 
  return (
    
    <div className="restaurant-landing-page">
           {isAboutPage && (
        <SearchMenu
          isAauthenticated={user !== null}
          //onSearch={handleSearchTextChange}
          showSearch={false} 
          logoutUserData={logoutUserData}
        />
      )}
            <div className="home-page-text-container">
        <b className="skill-hub">
          <span>SKILL HUB</span>
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