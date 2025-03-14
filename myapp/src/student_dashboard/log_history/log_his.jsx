import React from 'react';
import "./log_his.css";
//import Sidebar from './components/sidebar.jsx';
//import MainContent from './components/MainContent.jsx';

function App() {
  return (
    <div>
      <div className='left_component'>
        
        <button className='log_issue'>LOG ISSUE</button>
        <button className='log_his'>LOG HISTORY</button>
        
        <img src="" className=''></img>
        <button className='logout'>log out</button>
      </div>
      <div className='log_status'>
      </div>
      <div className='log_history'>

      </div>
    </div>
  );
}

export default App;
