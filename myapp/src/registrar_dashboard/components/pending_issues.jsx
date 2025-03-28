import React from "react";
import style from './pending.module.css';
import { useState, useEffect } from "react";


export default function Pend() {
    const [complaints, setComplaints] = useState([]);

    const fetchComplaints = async () => {
        try {
            const response = await fetch("#"); {/* this is where we get our api for the pending issues,
                all issues with a status of pending are viewed on this page*/}
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
            <div>
                {complaints.length > 0 ? (
                    complaints.map((complaint, index) => (
                        <div className={style.output_box}>
                            <p>Course Unit: {complaints.coursenit}</p>
                            <p>Complaint type: {complaints.complaint_type}</p>
                            <p>Complaint: {complaints.complaint}</p>
                            <p>Lecturer: {complaints.lecturer}</p>
                            <div>
                                status
                            </div>
                        </div>
                    )) 
                ):(
                    <p>loading complaints...</p>
                )}
            </div>
        </div>
    );
}
