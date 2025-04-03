import React, { useState } from 'react';
import Log from './components/log_issues.jsx';
import His from './components/log_history.jsx';
import styles from './studet_dashboard.css';

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

  return (
    <div>
      <div className='left_container'>
        <div className='image-container'><img src=''></img></div>
        
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
      </div>

      <div className='right_container'>
        {currentView === 'logForm' && <LogForm />}
        {currentView === 'logHistory' && <LogHistory />}
      </div>
    </div>
  );
}

export default Student;
