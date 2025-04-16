import React, { useState } from 'react';
import "./registrar_dashboard.css";
import His from './components/issue_history.jsx';
import Pend from './components/pending_issues.jsx';
import Prof from './components/profile.jsx';
import Manage from './components/manage.jsx';

function Student() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('Pending'); // Default view is 'Pending'

  return (
    <div>
      <div className='left_container'>
          <div className='profile_picture_container'>
            <img
              src=''
              className='profile_picture'
              alt="Profile"
            />
          </div>
        <div className='nav_section'>
          <button className='mybuttons' onClick={() => setCurrentView('Pending')}>Pending Issues</button>
          <button className='mybuttons' onClick={() => setCurrentView('IssueHistory')}>Issue History</button>
          <button className='mybuttons' onClick={() => setCurrentView('Manage')}>Manage college</button>
          <button className='mybuttons' onClick={() => setCurrentView('Profile')}>Profile</button>
        </div>
      </div>

      <div className='rightcontainer'>
        {currentView === 'Pending' && <Pend />}
        {currentView === 'IssueHistory' && <His />}
        {currentView === 'Manage' && <Manage />}
        {currentView === 'Profile' && <Prof />}
      </div>
    </div>
  );
}

export default Student;
