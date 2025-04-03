import React from "react";
import style from './log_his.module.css';
import { useState, useEffect } from "react";


export default function Pend() {
    const [complaints, setComplaints] = useState([]);

    const fetchComplaints = async () => {
        try {
            {/* this is where the student's issues api, this will contain all the issues of a particular student
                 */}
            const response = await fetch("#");
            const data = await response.json();
            setComplaints(data);
        } catch (error) {
            console.error("error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return(
        <div className={style.container}>
            <p>Course Unit: {complaints.coursenit}</p>
            <p>Complaint type: {complaints.complaint_type}</p>
            <p>Complaint: {complaints.complaint}</p>
            <p>Lecturer: {complaints.lecturer}</p>
            <div>
                status
            </div>
        </div>
    );
}
