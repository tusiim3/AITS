import React from 'react';
import { Courseunit,Complaints,Types } from './log_issues/components/select_logs';
import Simpletextarea from './log_issues/components/customtext';
import './student_dashboard.css';

const studentApp = () => (
    <div>
        <div className = "bottom-right-corner">
            <Simpletextarea/>
        </div>
        <div className='center'>
            <Courseunit />
            <Complaints />
            <Types />
        </div>
    </div>
);

export default studentApp;

