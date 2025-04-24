import React, { useState } from 'react'
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

  return (
    <div>
      <div className='left_container'>
          <div className='pp_container'>
            <FaUserCircle size={100} className='pp'/>
            <img src='./logo/martha.jpg' />
          </div>
        <div className='nav'>
          <button className={`mybuttons ${clickedButton === 'Home' ? 'active' : ''}`} onClick={() => {setCurrentView('Home'); setClickedButton('Home')}}> <FiHome/> Home</button>
          <button className={`mybuttons ${clickedButton === 'Pending' ? 'active' : ''}`} onClick={() => {setCurrentView('Pending'); setClickedButton('Pending')}}><FaBug/> Pending Issues</button>
          <button className={`mybuttons ${clickedButton === 'IssueHistory' ? 'active' : ''}`} onClick={() => {setCurrentView('IssueHistory'); setClickedButton('IssueHistory')}}><FiClock/> Issue History</button>
          <button className={`mybuttons ${clickedButton === 'Profile' ? 'active' : ''}`} onClick={() => {setCurrentView('Profile'); setClickedButton('Profile')}}><FiUser/> Profile</button>
        </div>
        <button className='logout_button' onClick={handleLogout}>
          <FiLogOut/> Log out
        </button>
      </div>

      <div className='rightcontainer'>
        {currentView === 'Home' && <Home />}
        {currentView === 'Pending' && <Pend />}
        {currentView === 'IssueHistory' && <His />}
        {currentView === 'Profile' && <Profile />}
      </div>
    </div>
  );
}

export default Lecturer;

  