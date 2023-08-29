import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
    signInWithFacebook,
} from "../firebase";
import './AlterRegister.css'
import {request} from '../httpRequest'

function AlterRegister() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = async () => {
        if (!firstname || !password || !email) {
            alert("Please enter all fields");
            return
        }
        try{
         await request.register({
            fullName: `${firstname} ${lastname}`,
            email:email,
            password:password})
            navigate('/')
         }catch(err){
            alert(err.message)
            console.error(err.message)
         }

        //registerWithEmailAndPassword(`${firstname} ${lastname}`, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);
    return (
        <MDBContainer fluid className='p-4'>

            <MDBRow className='min-vh-100'>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        The best solution <br />
                        <span className="text-primary">for your idea.</span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                        Skill Hub is a platform for finding suitable partners and team members,
                        especially for your project. Whether you are an entrepreneur, a creative individual,
                        or an individual seeking collaboration, our platform connects you with relevant people to bring your ideas to life.
                        With a user-friendly interface, you can explore a diverse community of individuals, showcase your skills,
                        share details about your projects, and connect with potential partners.
                        Skill Hub is the ideal destination to turn dreams into reality,
                        providing a supportive and dynamic environment where innovation thrives.
                    </p>

                </MDBCol>

                <MDBCol md='5'>

                    <MDBCard className='my-5'>
                        <MDBCardBody className='p-5'>

                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'
                                        value={firstname}
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </MDBCol>

                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text'
                                        value={lastname}
                                        onChange={(e) => setLastName(e.target.value)} />
                                </MDBCol>
                            </MDBRow>

                            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />

                            <MDBBtn className='w-100 mb-4' size='md' onClick={register}>sign up</MDBBtn>
                            <div className="text-center">
                                <p>back to <a href="/login">login</a></p>
                                <p>or sign up with: </p>
                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }} onClick={signInWithGoogle}>
                                    <MDBIcon fab icon='google' size="sm" />
                                </MDBBtn>
                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }} onClick={signInWithFacebook}>
                                    <MDBIcon fab icon='facebook' size="sm" />
                                </MDBBtn>
                            </div>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default AlterRegister;