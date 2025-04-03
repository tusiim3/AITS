import React, { useState } from 'react';
import "./registrar_dashboard.css";
import His from './components/issue_history.jsx';
import Pend from './components/pending_issues.jsx';
import Prof from './components/profile.jsx';
import Notif from './components/notification.jsx';

function Student() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('Pending'); // Default view is 'logForm'

  // Components to display
  const Pending = () => (
    <div>
        <Pend/>
    </div>
  );

  const IssueHistory = () => (
    <div>
        <His/>
    </div>
  );

  const Profile = () => (
    <div>
        <Prof />
    </div>
  );

  const Notification = () => (
    <div>
        <Notif />
    </div>
  )

  return (
    <div>
      <div  className='leftcontainer'>
        <div className='profile_picture_container'>
          <img
          src=''
          alt='Registrar Profile'
          className='profile_picture'
          />
        </div>
        <button className='mybuttons' onClick={() => setCurrentView('Pending')}>Pending Issues</button>
        <button className='mybuttons' onClick={() => setCurrentView('IssueHistory')}>Issue History</button>
        <button className='mybuttons' onClick={() => setCurrentView('Notification')}>Notification</button>
        <button className='mybuttons' onClick={() => setCurrentView('Profile')}>Profile</button>
      </div>
      <div className='rightcontainer'>
        {currentView === 'Pending' && <Pend />}
        {currentView === 'IssueHistory' && <His />}
        {currentView === 'Notification' && <Notif />}
        {currentView === 'Profile' && <Prof />}
      </div>
    </div>
  );
}

export default Student;
