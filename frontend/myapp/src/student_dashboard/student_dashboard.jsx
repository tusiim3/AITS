import React, { useState } from 'react';
import Log from './components/log_issues.jsx';
import His from './components/log_history.jsx';
import Profile from './components/profile.jsx';
import './student_dashboard.css';
import './logo/martha.jpg';
import axiosInstance from '../axioscomponent.jsx';

function Student() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('logForm'); // Default view is 'logForm'
  const [clickedButton, setClickedButton] = useState('logForm');

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
    <div>
      <div className='left_container'>
        <div className='circle-container'>
          <img src='./logo/martha.jpg' alt="Logo" />
        </div>

        <button
          className={`mybuttons ${clickedButton === 'logForm' ? 'clicked' : ''}`}
          onClick={() => {
            setCurrentView('logForm');
            setClickedButton('logForm');
          }}
        >
          Log Issue
        </button>
        <button
          className={`mybuttons ${clickedButton === 'logHistory' ? 'clicked' : ''}`}
          onClick={() => {
            setCurrentView('logHistory');
            setClickedButton('logHistory');
          }}
        >
          Log History
        </button>
        <button
          className={`mybuttons ${clickedButton === 'Profile' ? 'clicked' : ''}`}
          onClick={() => {
            setCurrentView('Profile');
            setClickedButton('Profile');
          }}
        >
          Profile
        </button>

        <button className='logout_button' onClick={handleLogout}>
          Log out
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
