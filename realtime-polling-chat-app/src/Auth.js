import React, { useState,useEffect } from 'react';

// import { socket } from './Home';

import {createUserWithEmailAndPassword,signInWithEmailAndPassword   } from "firebase/auth";
import { auth } from './firebase';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";

const SignupForm = ({setShowLogin}) => {
  // State for signup form fields
  const [signupFormData, setSignupFormData] = useState({
    email: '',
    password: '',
  });
  const navigate=useNavigate();
  

  // Function to handle input changes in signup form
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });

  };

  // Function to handle signup form submission
  const handleSignupSubmit =async (e) => {
    e.preventDefault();
    //send the value to server through socket.io
    // socket.emit("signup",signupFormData)
    let email=signupFormData.email;
    let password=signupFormData.password
    console.log(email,password,auth)
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    toast.info("user created and login successfully")
    navigate('/home');

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
  });

  
    setShowLogin(true);

  };

  return (
    <form onSubmit={handleSignupSubmit}>

      <h2>Sign Up</h2>
      <ToastContainer />
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={signupFormData.email} onChange={handleSignupChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={signupFormData.password} onChange={handleSignupChange} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

const LoginForm = () => {
  // State for login form fields
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  // Function to handle input changes in login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  // Function to handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    // loginFormData.id=socketId;
    // socket.emit("login",loginFormData)

    //firebase login
    signInWithEmailAndPassword(auth, loginFormData.email, loginFormData.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast("Login Successfully");

    navigate('/home');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast(errorMessage);
  });
    
  };

  // useEffect(()=>{
  //   socket.on("getLoginResponse",(data)=>{
  //     console.log(data,"auth")
  //     if(data.sucess){
  //         console.log("login successfull");

  //     }
      
  //   })

  // },[])
  

  return (
    <form onSubmit={handleLoginSubmit}>
      <h2>Login</h2>
      <ToastContainer/>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={loginFormData.email} onChange={handleLoginChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={loginFormData.password} onChange={handleLoginChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

const Auth = () => {
  // State to track whether to show signup or login form
  // const [socketId, setSocketId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  // socket.on("connect",()=>{
  //   setSocketId(socket.id);
  // })
  // useEffect(()=>{
  //   socket.on("getLoginResponse",(data)=>{
  //     console.log(data,"auth")
  //     if(data.sucess){
  //         console.log("login successfull");

  //     }
      
  //   })

  // },[])
  return (
    <div>
      {showLogin ? <LoginForm   /> : <SignupForm  setShowLogin={setShowLogin}/>}
      <p>
        {showLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign Up' : 'Login'}</button>
      </p>
    </div>
  );
};

export default Auth;
