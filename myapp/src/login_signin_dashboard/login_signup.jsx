import React, { useState } from 'react';
import axios from "axios";
import './AuthenticationForms.css'; // Import the CSS file
import logo from "./logo/logo.png"

const AuthenticationForms = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    numberType: '',
    personalNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      numberType: '',
      personalNumber: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <img src={logo} alt="University Logo" className="logo" />
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </>
          )}

          <select
            name="numberType"
            value={formData.numberType}
            onChange={handleChange}
            required
          >
            <option value="">Select Number Type</option>
            <option value="student">Student Number</option>
            <option value="lecturer">Lecturer Number</option>
            <option value="registrar">Registrar Number</option>
          </select>

          {formData.numberType && (
            <input
              type="text"
              name="personalNumber"
              placeholder={`Enter ${formData.numberType.charAt(0).toUpperCase() + formData.numberType.slice(1)} Number`}
              value={formData.personalNumber}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit">Enter</button>
        </form>

        <div className="form-switch">
          {isSignUp ? (
            <>
              <p>Already have an account?</p>
              <button type="button" onClick={toggleForm}>Sign In</button>
            </>
          ) : (
            <>
              <p>Don't have an account?</p>
              <button type="button" onClick={toggleForm}>Sign Up</button>
            </>
          )}
        </div>
        {!isSignUp && <a href="#">Forgot Password?</a>}
      </div>
    </div>
  );
};

export default AuthenticationForms;

