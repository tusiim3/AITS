import React, { useEffect, useState } from 'react';
import Log from './components/log_issues.jsx';
import His from './components/log_history.jsx';
import Profile from './components/profile.jsx';
import './student_dashboard.css';
import './logo/martha.jpg';
import axiosInstance from '../axioscomponent.jsx';
import { FiLogOut,FiUser,FiClock } from "react-icons/fi";
import {FaBug, FaUserCircle} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = "http://127.0.0.1:8000";
function getProfilePicUrl(path) {
  if (!path) return "/logo/martha.jpg"; // fallback image
  return path.startsWith("http") ? path : BACKEND_URL + path;
}


function Student() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('logForm'); // Default view is 'logForm'
  const [clickedButton, setClickedButton] = useState('logForm');
  const [profilePic, setProfilePic] = useState(null);
  

  useEffect(() =>{
    axiosInstance.get('/profile/')
    .then(res => {
      setProfilePic(res.data.profile_picture);
    })
    .catch(err => {
      console.error('Failed to fetch profile picture',err)
    });
  }, []);
  
  // Components to display
  const LogForm = () => (
    <div>
      <Log />
    </div>
  );

  const LogHistory = () => (
    <div>
      <His />
    </div>
  );

  const ProfileForm = () => (
    <div>
      <Profile />
    </div>
  );

  const handleLogout = async (e) => {
    try {
      const refreshtoken = localStorage.getItem("refreshToken")
      const response = await axiosInstance.post("/Logout/",{
        refresh_token : refreshtoken

      });
      console.log(response.data);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken")
      window.location.href = '/';
      toast.success("logout")
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className='student-dashboard-container'>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='left_container'>
        <div className='circle-container'>
          {profilePic ? (
            <img
            src={getProfilePicUrl(profilePic)}
            alt="Profile"
            className="sidebar-profile-pic"
            />
          ) : ( 
          <FaUserCircle size={100} className='pp'/>
        )}
        </div>
        <button
          className={`mybuttons ${clickedButton === 'logForm' ? 'clicked' : ''}`}
          onClick={() => {
            setCurrentView('logForm');
            setClickedButton('logForm');
          }}
        >
          <FaBug/> Log Issue
        </button>
        <button
          className={`mybuttons ${clickedButton === 'logHistory' ? 'clicked' : ''}`}
          onClick={() => {
            setCurrentView('logHistory');
            setClickedButton('logHistory');
          }}
        >
        <FiClock/> Log History
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

        <button className='logout_button' onClick={handleLogout}>
          <FiLogOut size={15}/>Logout
        </button>
      </div>

      <div className='right_container'>
        {currentView === 'logForm' && <LogForm />}
        {currentView === 'logHistory' && <LogHistory />}
        {currentView === 'Profile' && <ProfileForm />}
      </div>
    </div>
  );
}

export default Student;
