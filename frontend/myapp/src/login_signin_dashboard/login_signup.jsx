import React, { useState } from 'react';
import styles from './AuthenticationForms.module.css';
import logo from "./logo/logo.png";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axioscomponent';
import { ToastContainer, toast } from 'react-toastify';

// PasswordInput component for show/hide password
const PasswordInput = ({
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.passwordInputWrapper}>
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.passwordInput}
        autoComplete="new-password"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className={styles.showPasswordButton}
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
};

const AuthenticationForms = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    number_type: '', 
    personal_number: '',
    email: '',
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
    setIsLoading(true)
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        setIsLoading(false)
        return;
      }

      const requestPayload = {
        username: formData.username,
        number_type: formData.number_type,
        [formData.number_type]: formData.personal_number,
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword
      };

      try {
        const response = await axiosInstance.post("/register/", requestPayload, {
          headers: {
            "Content-Type":"application/json",
          },
        });

        if (response.status === 201) {
          toast.success("Registration successful");
          navigate('/'); 
        }
      } catch (error) {
        console.error("Error during registration", error);
        toast.error(error.response?.data?.detail || "Failed to register");
      } finally {
        setIsLoading(false);
      }
    } else {
      handleSignIn(e);
    }
  };

  const handleSignIn = async (e) => {
    setIsLoading(true)
    try {
      const signInPayLoad = {
        number_type: formData.number_type,
        [formData.number_type]: formData.personal_number,
        password: formData.password
      };

      const response = await axiosInstance.post("/login/", signInPayLoad, {
        headers: {
          "Content-Type":"application/json",
        },
      });

      if (response.status === 200) {
        //store the tokens from the backend in local storage
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
       
        toast.success("Signin Successfull", {
          autoClose: 3000,
          onClose: () => navigateBasedOnRole(formData.number_type),
        });
      }

    } catch (error) {
      console.error("Error during signin", error);
      toast.error(error.response?.data?.detail || "Signin failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateBasedOnRole = (role) => {
    if (role === 'student_number') navigate('/student');
    else if (role === 'lecturer_number') navigate('/lecturer');
    else if (role === 'registrar_number') navigate('/registrar');
    else navigate('/');
  }
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      username: '',
      number_type: '',  
      personal_number: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className={styles.body}>
      <ToastContainer position="top-right"/>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <img src={logo} alt="University Logo" className={styles.logo} />
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                name="username"
                placeholder="Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            )}

            <select
              name="number_type"
              value={formData.number_type}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select Number Type</option>
              <option value="student_number">Student Number</option>
              <option value="lecturer_number">Lecturer Number</option>
              <option value="registrar_number">Registrar Number</option>
            </select>

            {formData.number_type && (
              <input
                type="text"
                name="personal_number"
                placeholder={`Enter ${formData.number_type.charAt(0).toUpperCase() + formData.number_type.slice(1)}`}
                value={formData.personal_number}
                onChange={handleChange}
                required
              />
            )}

            {isSignUp && (
              <input
                type="email"
                name="email"
                placeholder='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            )}

            <PasswordInput
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {isSignUp && (
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            <button 
              className={styles.lbutton} 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                isSignUp ? "Sign Up" : "Sign In"
              )}
            </button>
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
