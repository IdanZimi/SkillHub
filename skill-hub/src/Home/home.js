import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Home({setUserData, logoutUserData}) {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    //const [uid, setuid] = useState("");
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     console.log("inside useeffect of home " + uid)
    //     //setuid(uid)
    //     if (!uid) return navigate("/login");
    //      //fetchUserData();
    // },[uid]);

    useEffect(() => {
        console.log("insdie useeffet homee")
        if (loading) return 
        if (!user) return navigate("/login");
        fetchUserData();
    }, [user, loading]);

    const fetchUserData = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            //setuid(data.uid);
            debugger;
            console.log("about to set uid: " + user?.uid)
            setUserData(name, user?.uid)
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };



    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                <div>{name}</div>
                {/* <div>{user?.email}</div> */}
                <button className="dashboard__btn" onClick={() => {
                    logout()
                    setName("")
                    logoutUserData()
                }}>
                    Logout
                </button>
            </div>
        </div>
    );
}
export default Home;