import React, { useState } from 'react';
import "./registrar_dashboard.css";
import His from './components/issue_history.jsx';
import Pend from './components/pending_issues.jsx';
import Prof from './components/profile.jsx';
import Manage from './components/manage.jsx';
import axiosInstance from '../axioscomponent.jsx';
import Home from './components/Home.jsx';
import { FiHome,FiLogOut,FiUser, FiClock } from 'react-icons/fi';
import { FaBug, FaUniversity,FaUserCircle } from 'react-icons/fa';

function Student() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('Pending'); // Default view is 'Pending'
  const [clickedButton, setClickedButton] = useState('Pending');

  const handleLogout = async (e) => {
    try {
      const response = await axiosInstance.post("/Logout/");
      console.log(response.data);
      localStorage.removeItem("token");
      window.location.href = '/'; // Corrected this line
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className='registrar-dashboard-container'>
      <div className='left_container'>
          <div className='pp_container'>
            <FaUserCircle size={100} className='pp'/>
            <img src='./logo/martha.jpg' />
          </div>
        <div className='nav'>
        <button
                className={`mybuttons ${clickedButton === 'Home' ? 'clicked' : ''}`}
                onClick={() => {
                  setCurrentView('Home');
                  setClickedButton('Home');
                }}
              >
              <FiHome/> Home
              </button>
              <button
                className={`mybuttons ${clickedButton === 'Pending' ? 'clicked' : ''}`}
                onClick={() => {
                  setCurrentView('Pending');
                  setClickedButton('Pending');
                }}
              >
              <FaBug/> Pending Issues
              </button>
              <button
                className={`mybuttons ${clickedButton === 'IssueHistory' ? 'clicked' : ''}`}
                onClick={() => {
                  setCurrentView('IssueHistory');
                  setClickedButton('IssueHistory');
                }}
              >
              <FiClock/> Issue History
              </button>
              <button
                className={`mybuttons ${clickedButton === 'Manage' ? 'clicked' : ''}`}
                onClick={() => {
                  setCurrentView('Manage');
                  setClickedButton('Manage');
                }}
              >
              <FaUniversity/> Manage college
              </button>
              <button
                className={`mybuttons ${clickedButton === 'Profile' ? 'clicked' : ''}`}
                onClick={() => {
                  setCurrentView('Profile');
                  setClickedButton('Profile');
                }}
              >
              <FiUser/> Profile
              </button>
        </div>

        <button className='logout_button' onClick={handleLogout}>
          <FiLogOut/> Log out
        </button>
      </div>

      <div className='rightcontainer'>
        {currentView === 'Home' && <Home/>}
        {currentView === 'Pending' && <Pend />}
        {currentView === 'IssueHistory' && <His />}
        {currentView === 'Manage' && <Manage />}
        {currentView === 'Profile' && <Prof />}
      </div>
      
    </div>
  );
}

export default Student;
