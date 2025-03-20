import React from 'react';
import styles from "./profile.module.css";

function Profile() {
  return (
    <div className={styles.body}>
      <div className={styles.left_component}>
              
        <button className={styles.log_issue}>PENDING ISSUES</button>
        <button className={styles.log_his}>ISSUE HISTORY</button>
        <button className={styles.notification}>NOTIFICATION</button>
        <button className={styles.profile}>PROFILE</button>
        
        <img src="" className=''></img>
        <button className={styles.logout}>log out</button>
      </div>
    </div>
  );
}

export default Profile;
