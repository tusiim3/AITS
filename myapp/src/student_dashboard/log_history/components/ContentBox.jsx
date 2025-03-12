import React from 'react';
import styles from './ContentBox.module.css'; // ContentBox styles

function ContentBox({ title }) {
  return (
    <div className={styles.contentBox}>
      <h3>{title}</h3>
      {/* Add content here later */}
    </div>
  );
}

export default ContentBox;
