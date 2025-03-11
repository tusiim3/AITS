import React from 'react';
import { Courseunit,Complaints,Types } from './components/select_logs';
import Simpletextarea from './components/customtext';
import './student_dashboard.css';

const App = () => (
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

export default App;

