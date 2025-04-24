import React, { useState, useEffect } from 'react'
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

  const handleNavigation = (viewName) => {
    setCurrentView(viewName);
    setClickedButton(viewName);
  };

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

  // Existing state
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch pending count
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await axiosInstance.get('/api/issues/pending-count');
        setPendingCount(response.data.count);
      } catch (error) {
        console.error('Error fetching pending count:', error);
        setPendingCount(0); // Fallback to 0 on error
      }
    };

    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='left_container'>
          <div className='pp_container'>
            <FaUserCircle size={100} className='pp'/>
            <img src='./logo/martha.jpg' />
          </div>
        <div className='nav'>
          <button className={`mybuttons ${clickedButton === 'Home' ? 'active' : ''}`} onClick={() => handleNavigation('Home')}> <FiHome/> Home</button>
          <button className={`mybuttons ${clickedButton === 'Pending' ? 'active' : ''}`} onClick={() => handleNavigation('Pending')}><FaBug/> Pending Issues <span className="pending-counter">{pendingCount}</span></button>
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

  