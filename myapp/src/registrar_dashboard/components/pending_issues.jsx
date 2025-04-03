import React from "react";
import style from './pending.module.css';
import { useState, useEffect } from "react";

export default function Pend() {
    const [complaints, setComplaints] = useState([]);

    const fetchComplaints = async () => {
        try {
            const response = await fetch("#"); {/* this is where we get our api for the pending issues,
                all issues with a status of pending are viewed on this page */}
            const data = await response.json();
            setComplaints(data);
        } catch (error) {
            console.error("error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return (
        <div className={style.container}>
            <div>
                {complaints.length > 0 ? (
                    complaints.map((complaint, index) => (
                        <div key={index} className={style.output_box}>
                            <p>Course Unit: {complaint.coursenit}</p>
                            <p>Complaint type: {complaint.complaint_type}</p>
                            <p>Complaint: {complaint.complaint}</p>
                            <p>Lecturer: {complaint.lecturer}</p>
                            <div>
                                status
                            </div>
                            {/* Dynamic text box for each complaint */}
                            <div className={style.dynamic_text_box}>
                                <p>Issue Details:</p>
                                <p>{complaint.complaint}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>loading complaints...</p>
                )}
            </div>
        </div>
    );
}