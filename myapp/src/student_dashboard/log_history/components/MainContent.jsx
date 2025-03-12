import React from 'react';
import styles from './MainContent.module.css'; // MainContent styles
import ContentBox from './ContentBox';

function MainContent() {
  return (
    <div className={styles.mainContent}>
      <h2>LOG HISTORY</h2>
      <ContentBox title="Issue Status" />
      <ContentBox title="Issue History" />
    </div>
  );
}

export default MainContent;
