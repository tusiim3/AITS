import React, { useState, useEffect } from "react";
import style from './log_his.module.css';
import axiosInstance from "../../axioscomponent";

export default function Pend() {
    const [complaints, setComplaints] = useState([]);

    const fetchComplaints = async () => {
        try {
            const response = await axiosInstance.get("/issues/history/");
            setComplaints(response.data); // Assuming response.data is an array
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return (
        <div className={style.container}>
            {complaints.length > 0 ? (
                complaints.map((complaint, index) => (
                    <div key={index} className={style.complaint}>
                        <p className={style.pe}>Course Unit: {complaint.course?.course_code || "N/A"}</p>
                        <p className={style.pe}>Complaint Type: {complaint.complaint_type || "N/A"}</p>
                        <p className={style.pe}>Complaint: {complaint.custom_complaint || "N/A"}</p>
                        <p className={style.pe}>Lecturer: {complaint.lecturer || "N/A"}</p>
                        <p className={style.pe}>Status: {complaint.status || "N/A"}</p>
                    </div>
                ))
            ) : (
                <p>No complaints found.</p>
            )}
        </div>
    );
}
