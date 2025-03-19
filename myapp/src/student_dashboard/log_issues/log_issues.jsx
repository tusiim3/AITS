import React from 'react';

import styles from './log_issues.module.css';
import logo from "./logo/logo.png"
import martha from "../logo/martha.jpg"
import Log from "./components/select_log.jsx"
import Myform from "./components/issue_form.jsx"

const StudentApp = () => (
    <div className= {styles.body}>
        <Log/>
        <Myform/>
        <div className = {styles.left_container}>
            <button className={styles.log_issue}>LOG ISSUE</button>
            <button className={styles.log_his}>LOG HISTORY</button>
                    
            <img src="" className=''></img>
            <button className={styles.logout}>log out</button>
            <img src={martha} alt="User" className={styles.profile_image} />
        </div>
       
    </div>
);

export default StudentApp;

