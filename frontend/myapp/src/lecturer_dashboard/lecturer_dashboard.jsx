import React, { useState } from 'react';
import Pend from "./components/pending_issues.jsx";
import His from "./components/issue_history.jsx";
import Profile from "./components/profile.jsx";
import './lecturer_dashboard.css';
import axiosInstance from '../axioscomponent.jsx';

function Student() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('PendIssues'); // Default view is 'logForm'
  const [clickedButton, setClickedButton] = useState('IssueHistory');

  // Components to display
  const PendIssues = () => (
    <div>
      <Pend />
    </div>
  );

  const IssueHistory = () => (
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
          className={`mybuttons ${clickedButton === 'PendIssues' ? 'clicked' : ''}`}
          onClick={() => {
            setCurrentView('PendIssues');
            setClickedButton('PendIssues');
          }}
        >
          Pending Issues
        </button>
        <button
          className={`mybuttons ${clickedButton === 'IssueHistory' ? 'clicked' : ''}`}
          onClick={() => {
            setCurrentView('IssueHistory');
            setClickedButton('IssueHistory');
          }}
        >
          Issue History
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
        {currentView === 'PendIssues' && <Pend/>}
        {currentView === 'IssueHistory' && <His />}
        {currentView === 'Profile' && <ProfileForm />}
      </div>
    </div>
  );
}

export default Student;

