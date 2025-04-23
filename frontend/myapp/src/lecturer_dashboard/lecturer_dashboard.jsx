import React, { useState } from 'react';
import './lecturer_dashboard.css';
import Home from "./components/home.jsx";
import Pend from "./components/pending_issues.jsx";
import His from "./components/issue_history.jsx";
import Profile from "./components/profile.jsx";
import axiosInstance from '../axioscomponent.jsx';
import { FiHome,FiLogOut,FiUser, FiClock } from 'react-icons/fi';
import { FaBug, FaUniversity,FaUserCircle } from 'react-icons/fa';

function Lecturer() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('Home'); // Default view is 'logForm'
  const [clickedButton, setClickedButton] = useState('Home');

  const handleLogout = async (e) => {
    try {
      const response = await axiosInstance.post("/Logout/");
      console.log(response.data);
      localStorage.removeItem("token");
      window.location.href = '/'; 
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  