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
    <div style={{ display: 'flex' }}>
      {/* Sidebar with buttons */}
      <div style={{ marginRight: '20px' }}>
        <button onClick={() => setCurrentView('logForm')}>Log Issue</button>
        <button onClick={() => setCurrentView('logHistory')}>Log History</button>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1 }}>
        {currentView === 'logForm' && <LogForm />}
        {currentView === 'logHistory' && <LogHistory />}
      </div>
    </div>
  );
}

export default Student;
