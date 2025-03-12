import React from 'react';
import styles from './Sidebar.module.css'; // Sidebar styles

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.profileSection}>
        <div className={styles.profileImage}></div>
      </div>
      <button className={styles.menuButton}>Log History</button>
      <button className={styles.menuButton}>Log Issue</button>
    </div>
  );
}

export default Sidebar;
