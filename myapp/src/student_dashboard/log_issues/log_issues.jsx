import React from 'react';
//import { Courseunit,Complaints,Types } from './components/select_logs.jsx';
//import Simpletextarea from './components/customtext.jsx';
import './log_issues.css';
import logo from "./logo/logo.png"
import Log from "./components/select_log.jsx"
const StudentApp = () => (
    <div className= "body">
        <Log/>
        <div className = "leftcontainer">
        
        </div>
        <div className = "profile-container">
            <img src={logo} alt="User" className='profile-image' />
        </div>
       
    </div>
);

export default StudentApp;

