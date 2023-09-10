import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './Alterlogin.css'
import { useNavigate } from "react-router-dom";
import { auth, signInWithFacebook, signInWithGoogle, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGoogleLogo
} from '@fortawesome/free-solid-svg-icons';
import { request } from '../httpRequest';

function Alterlogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/about");
    }, [user, loading, navigate]);

    const handleLogin =async (loginMethod) =>{
        try{
        await request.login(loginMethod)
        localStorage.setItem('isAuthenticated', true)
        //navigate('/')
        }catch(err){
            console.error(err.message)
            alert("login failed")
        }
    }
    return (
        <MDBContainer fluid className="p-2 my-5">

            <MDBRow className='min-vh-100' >

                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>

                    <div className="d-flex flex-row align-items-center justify-content-center">

                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                        <MDBBtn floating size='md' tag='a' className='me-2' onClick={signInWithGoogle}>
                            <MDBIcon fab icon='google' />
                        </MDBBtn>
                        <MDBBtn floating size='md' tag='a' className='me-2' onClick={{signInWithFacebook}}>
                            <MDBIcon fab icon='facebook'/>
                        </MDBBtn>
                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <div className="d-flex justify-content-between mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        <a href="!#">Forgot password?</a>
                    </div>

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className='mb-2' size='md' onClick={()=> logInWithEmailAndPassword(email,password)}>Login</MDBBtn>
                        <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                    </div>
                </MDBCol>

            </MDBRow>
        </MDBContainer>
    );
}

export default Alterlogin;