import React, { useState } from 'react';
import axios from "axios";
import styles from './AuthenticationForms.module.css';
import logo from "./logo/logo.png";
import { useNavigate } from 'react-router-dom';

const AuthenticationForms = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const [formData, setFormData] = useState({
    username: '',
    number_type: '', 
    personal_number: '',
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const requestPayload = {
      username: formData.username,
      number_type: formData.number_type,
      personal_number: formData.personal_number,
      password: formData.password,
      password2: formData.confirmPassword
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", requestPayload, {
        headers: {
          "Content-Type":"application/json",
        },
      });

      if (response.status === 200) {
        alert("Registration successful!");

        // Redirect based on the number_type
        if (formData.number_type === 'student') {
          navigate('/student');
        } else if (formData.number_type === 'lecturer') {
          navigate('/lecturer');
        } else if (formData.number_type === 'registrar') {
          navigate('/registrar');
        } else {
          navigate('/');  // Default route if no match
        }
      }
    } catch (error) {
      console.error("Error during registration", error);
      alert("Registration failed. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      username: '',
      number_type: '',  // Reset the state here
      personal_number: '',  // Reset the state here
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <img src={logo} alt="University Logo" className={styles.logo} />
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <input
                  type="text"
                  name="username"
                  placeholder="Name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <select
              name="number_type"  // Ensure this matches the state (number_type)
              value={formData.number_type}  // Ensure this matches the state
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select Number Type</option>
              <option value="student">Student Number</option>
              <option value="lecturer">Lecturer Number</option>
              <option value="registrar">Registrar Number</option>
            </select>

            {formData.number_type && (
              <input
                type="text"
                name="personal_number"
                placeholder={`Enter ${formData.number_type.charAt(0).toUpperCase() + formData.number_type.slice(1)} Number`}
                value={formData.personal_number}
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

            <button className={styles.lbutton} type="submit">Enter</button>
          </form>

          <div className={styles.form_switch}>
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
    </div>
  );
};

export default AuthenticationForms;
