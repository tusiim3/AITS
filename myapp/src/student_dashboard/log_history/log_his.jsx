import React from 'react';
import styles from './App.module.css'; 
import Sidebar from './components/sidebar.jsx';
import MainContent from './components/MainContent.jsx';

function App() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
