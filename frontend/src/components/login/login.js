import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Component } from 'react';
import { Link } from 'react-router-dom'

import "./login.css";


var id = ''

function Login() {


  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "1",
      password: "1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };



  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        id = uname.value;
        setIsSubmitted(true);

      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };


  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}

        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}

        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div className="button-container">
        <button><Link to="/signup">Sign Up</Link></button>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>
          <div>
            <text>User is successfully logged in </text>
          </div>
          <div>
            {id}
            <a href={`/home/${id}`} className="button-container"> Next </a>
          </div>
        </div> : renderForm}
      </div>
    </div>
  );

}

export default Login