import React from 'react';
import styles from "./pending.module.css";

function Pending() {
  return (
    <div className={styles.body}>
     <div className={styles.left_component}>
        <button className={styles.log_issue}>PENDING ISSUES</button>
        <button className={styles.log_his}>ISSUE HISTORY</button>
        <button className={styles.notification}>NOTIFICATION</button>
        <button className={styles.profile}>PROFILE</button>
        
        <img src=""></img>
        <button className={styles.logout}>log out</button>
      </div>
      <div className={styles.pending_issues}>
      </div>
    </div>
  );
}

export default Pending;
