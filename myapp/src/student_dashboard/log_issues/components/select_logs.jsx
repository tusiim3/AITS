import React from 'react';
import Select, { components } from 'react-select';
import './components.css';

const courseunit = [
    {value: 'ist1204', label: 'Ist1204'},
    {value: 'csc1201', label: 'csc1201'},
    {value: 'csc1204', label: 'csc1204'},
    {value: 'csc1200', label: 'csc1200'},
    {value: 'csc1202', label: 'csc1202'}
]

const complaints = [
    {value: 'missing_marks', label: 'missing marks'},
    {value: 'incorrect_marks', label: 'incorrect marks'},
    {value: 'remarking', label: 'remarking'}
]

const types = [
    {value: 'test', label: 'Test'},
    {value: 'coursework', label: 'Coursework'},
    {value: 'final_exam', label: 'Final Exam'}
]

export const Courseunit = () => (
    <div className='myoptions'>
        <h5 className='h5'>Select Course Unit</h5>
        <Select options={courseunit} />
    </div>
);

export const Complaints  = () => (
    <div className='myoptions'>
        <h5 className='h5'>Select complaint</h5>
        <Select options={complaints} />
    </div>
    
);

export const Types = () => (
    <div className='myoptions'>
        <h5 className='h5'>Select type</h5>
        <Select options={types}/>
    </div>
);