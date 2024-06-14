import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './App.css';
// State for signup form fields
const SignupForm = ({ setShowLogin }) => {
  const [signupFormData, setSignupFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Function to handle input changes in signup form
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });
  };

  // Function to handle signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    let email = signupFormData.email;
    let password = signupFormData.password;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        toast.info("user created and login successfully");
        navigate("/home");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });

    setShowLogin(true);
  };

  return (
    <div className="container">
      <form className="box" onSubmit={handleSignupSubmit}>
      <h2>Sign Up</h2>
      <ToastContainer />
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={signupFormData.email}
          onChange={handleSignupChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={signupFormData.password}
          onChange={handleSignupChange}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

const LoginForm = () => {
  // State for login form fields
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
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

    //firebase login
    signInWithEmailAndPassword(
      auth,
      loginFormData.email,
      loginFormData.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast("Login Successfully");

        navigate("/home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast(errorMessage);
      });
  };

  return (
    <div className='container'>
      <form  className="box"onSubmit={handleLoginSubmit}>
      <h2>Login</h2>
      <ToastContainer />
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={loginFormData.email}
          onChange={handleLoginChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginFormData.password}
          onChange={handleLoginChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

const Auth = () => {
  // State to track whether to show signup or login form
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="container screen">
      {showLogin ? <LoginForm /> : <SignupForm setShowLogin={setShowLogin} />}
      <p>
        {showLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
