import React from 'react';

import './log_issues.css';
import logo from "./logo/logo.png"
import Log from "./components/select_log.jsx"
import Myform from "./components/issue_form.jsx"

const StudentApp = () => (
    <div className= "body">
        <Log/>
        <Myform/>
        <div className = "leftcontainer">
        <img src={logo} alt="User" className='profile-image' />
        </div>
       
    </div>
);

export default StudentApp;

