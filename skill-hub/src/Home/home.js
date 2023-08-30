import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Home({setUserAuthenticated, logoutUserData}) {
    const [user, loading, error] = useAuthState(auth);
    //const [name, setName] = useState("");
    //const [uid, setuid] = useState("");
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     console.log("inside useeffect of home " + uid)
    //     //setuid(uid)
    //     if (!uid) return navigate("/login");
    //      //fetchUserData();
    // },[uid]);

    useEffect(() => {
        if (loading) return 
        if (!user) return navigate("/login");
        fetchUserData();
    }, [user, loading]);

    const fetchUserData = async () => {
        try {
            //debugger;
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            // setName(data.name);
            setUserAuthenticated();
            localStorage.setItem("uid", data.uid);
            localStorage.setItem("name", data.name);
            console.log("uid in localStorage: ", localStorage.getItem("uid"));
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };



    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                <div>{localStorage.getItem("name")}</div>
                {/* <div>{user?.email}</div> */}
                <button className="dashboard__btn" onClick={() => {
                    logout()
                    //setName("")
                    logoutUserData()
                }}>
                    Logout
                </button>
            </div>
        </div>
    );
}
export default Home;