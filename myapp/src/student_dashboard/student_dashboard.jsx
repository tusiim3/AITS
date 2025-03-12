import React from 'react';
import { Courseunit,Complaints,Types } from './log_issues/components/select_logs.jsx';
import Simpletextarea from './log_issues/components/customtext.jsx';
import './student_dashboard.css';
import logo from "./logo/logo.png"

const StudentApp = () => (
    <div className= "body">
        <div className = "bottom-right-corner">
            <Simpletextarea/>
        </div>
        <div className='middlecontainer'>
            <div>
                <Courseunit />
                <Complaints />
                <Types />
            </div>
        </div>
        <div className = "leftcontainer">
        
        </div>
        <div className = "profile-container">
            <img src={logo} alt="User" className='profile-image' />
        </div>
       
    </div>
);

export default StudentApp;

