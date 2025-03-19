import React from 'react';
import styles from "./notification.module.css";

function Notif() {
  return (
    <div>
      <div className={styles.left_component}>
        
        <button className={styles.log_issue}>PENDING ISSUES</button>
        <button className={styles.log_his}>ISSUE HISTORY</button>
        <button className={styles.notification}>NOTIFICATION</button>
        <button className={styles.profile}>PROFILE</button>
        
        <img src="" className=''></img>
        <button className={styles.logout}>log out</button>
      </div>
      <div className={styles.pending_issues}>
        <h1>PENDING ISSUES</h1>
      </div>
    </div>
  );
}

export default Notif;
