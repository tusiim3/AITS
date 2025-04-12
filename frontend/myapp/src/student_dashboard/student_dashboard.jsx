import React, { useState } from 'react';
import Log from './components/log_issues.jsx';
import His from './components/log_history.jsx';
import Profile from './components/profile.jsx';
import './studet_dashboard.css';
import './logo/martha.jpg';
import axiosInstance from '../axioscomponent.jsx';

function Student() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('logForm'); // Default view is 'logForm'
  const [clickeButton, setClickedButton] = useState('logForm');
  // Components to display
  const LogForm = () => (
    <div>
        <Log/>
    </div>
  );

  const LogHistory = () => (
    <div>
        <His/>
    </div>
  );

  const Profileform = () => (
    <div>
      <Profile />
    </div>
  )

  const handlelogout = async(e) => {
    try {
      const response = await axiosInstance.post("/Logout/");
      console.log(response.data);
      localStorage.removeItem("token");
      window.GeolocationCoordinates.href = '/'
    } catch (error) {
      console.error("Error during logout:", error);
      alert("failed to logout. please try again");
    }
  };

  return (
    <div>
      <div className='left_container'>
        <div className='circle-container'><img src='./logo/martha.jpg'></img></div>
        
        <button className={`mybuttons ${clickeButton === 'logForm' ? 'clicked': ''}`} 
        onClick={() => {
          setCurrentView('logForm');
          setClickedButton('logForm');
          }}>Log Issue</button>
        <button className={`mybuttons ${clickeButton === 'logHistory' ? 'clicked': ''}`}
        onClick={() => {
          setCurrentView('logHistory');
          setClickedButton('logHistory');
          }}>Log History</button>
        <button className={`mybuttons ${clickeButton === 'Profileform' ? 'clicked': ''}`}>Profile</button>

        <button className='logout_button' onClick={handlelogout}>Log out</button>

      </div>

      <div className='right_container'>
        {currentView === 'logForm' && <LogForm />}
        {currentView === 'logHistory' && <LogHistory />}
      </div>
    </div>
  );
}

export default Student;
