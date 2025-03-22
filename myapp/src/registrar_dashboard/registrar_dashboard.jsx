import React, { useState } from 'react';
import "./registrar_dashboard.css";
import Pend from './components/issue_history.jsx';
import His from './components/pending_issues.jsx';
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
      <div  className='left_container'>
        <button className='mybuttons' onClick={() => setCurrentView('Pending')}>Pending Issues</button>
        <button className='mybuttons' onClick={() => setCurrentView('IssueHistory')}>Issue History</button>
        <button className='mybuttons' onClick={() => setCurrentView('Notification')}>Notification</button>
        <button className='mybuttons' onClick={() => setCurrentView('Profile')}>Profile</button>
      </div>
      <div className='right_container'>
        {currentView === 'Pending' && <Pend />}
        {currentView === 'IssueHistory' && <His />}
        {currentView === 'Notification' && <Notif />}
        {currentView === 'Profile' && <Prof />}
      </div>
    </div>
  );
}

export default Student;
