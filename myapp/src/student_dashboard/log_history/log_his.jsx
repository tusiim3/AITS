import React from 'react';
import styles from "./log_his.module.css";
//import Sidebar from './components/sidebar.jsx';
//import MainContent from './components/MainContent.jsx';

function App() {
  return (
    <div className={styles.body}>
      <div className={styles.left_component}>
        
        <button className={styles.log_issue}>LOG ISSUE</button>
        <button className={styles.log_his}>LOG HISTORY</button>
        
        <img src="" className=''></img>
        <button className={styles.logout}>log out</button>
      </div>
      <div className={styles.log_status}></div>
      <div className={styles.log_history}></div>
    </div>
  );
}

export default App;
