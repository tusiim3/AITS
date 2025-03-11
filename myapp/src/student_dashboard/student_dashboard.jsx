import React from 'react';
import { Courseunit,Complaints,Types } from './log_issues/components/select_logs';
import Simpletextarea from './log_issues/components/customtext';
import './student_dashboard.css';
import logo from "./logo/logo.png"

const StudentApp = () => (
    <div className= "body">
        <div className = "bottom-right-corner">
            <Simpletextarea/>
        </div>
        <div className='center'>
            <Courseunit />
            <Complaints />
            <Types />
        </div>
        <div className = "profile-container">
            <img src={logo} alt="User" className='profile-image' />
        </div>
    </div>
);

export default StudentApp;

