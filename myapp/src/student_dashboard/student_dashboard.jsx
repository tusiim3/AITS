import React, { useState } from 'react';
import Log from './components/log_issues.jsx';
import His from './components/log_history.jsx';

function Student() {
  // State to track which component to render
  const [currentView, setCurrentView] = useState('logForm'); // Default view is 'logForm'

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
        <img src=''></img>
        <button className='mybuttons' onClick={() => setCurrentView('logForm')}>Log Issue</button>
        <button className='mybuttons' onClick={() => setCurrentView('logHistory')}>Log History</button>
      </div>

      <div className='right_container'>
        {currentView === 'logForm' && <LogForm />}
        {currentView === 'logHistory' && <LogHistory />}
      </div>
    </div>
  );
}

export default Student;
