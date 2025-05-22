import React, { useState, useEffect } from 'react'
import './lecturer_dashboard.css';
import Home from "./components/home.jsx";
import Pend from "./components/pending_issues.jsx";
import His from "./components/issue_history.jsx";
import Profile from "./components/profile.jsx";
import axiosInstance from '../axioscomponent.jsx';
import { FiHome, FiLogOut, FiUser, FiClock } from 'react-icons/fi';
import { FaBug, FaUserCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = "https://aits-groupl-90wo.onrender.com/api/";
function getProfilePicUrl(path) {
  if (!path) return "/logo/martha.jpg"; // fallback image
  return path.startsWith("http") ? path : BACKEND_URL + path;
}


function Lecturer() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('Pending'); // Default view is 'Pending Issues'
  const [clickedButton, setClickedButton] = useState('Pending');
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

  //components to display
  const handleNavigation = (viewName) => {
    setCurrentView(viewName);
    setClickedButton(viewName);
  };

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
    <div className ='container'>{/* Main container for the dashboard */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='left_container'>
        <div className='pp_container'>
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
        <div className='nav'>
          <button className={`mybuttons ${clickedButton === 'Home' ? 'active' : ''}`} onClick={() => handleNavigation('Home')}> <FiHome/> Home</button>
          <button className={`mybuttons ${clickedButton === 'Pending' ? 'active' : ''}`} onClick={() => handleNavigation('Pending')}><FaBug/> Pending Issues</button>
          <button className={`mybuttons ${clickedButton === 'IssueHistory' ? 'active' : ''}`} onClick={() => handleNavigation('IssueHistory')}><FiClock/> Issue History</button>
          <button className={`mybuttons ${clickedButton === 'Profile' ? 'active' : ''}`} onClick={() => handleNavigation('Profile')}> <FiUser/> Profile</button>
        </div>
        <button className='logout_button' onClick={handleLogout}>
          <FiLogOut/> Log out
        </button>
      </div>

      <div className='rightcontainer'>
        {currentView === 'Home' && <Home onNavigate={handleNavigation} />}
        {currentView === 'Pending' && <Pend />}
        {currentView === 'IssueHistory' && <His />}
        {currentView === 'Profile' && <Profile />}
      </div>
    </div>
  );
}

export default Lecturer;

  