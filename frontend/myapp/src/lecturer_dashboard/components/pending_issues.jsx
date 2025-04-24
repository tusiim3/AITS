import React from "react";
import style from './pending.module.css';
import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axioscomponent";

export default function Pend() {
    const [complaints, setComplaints] = useState([]);
    const [notification, setNotification] = useState(null);

    const fetchComplaints = async () => {
        try {
            const response = await axiosInstance.get("/registrar/issues/") // this is where we get our api for the pending issues,all issues with a status of pending are viewed on this page*/}
            setComplaints(response.data);
        } catch (error) {
            console.error("error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleResolve = async (complaintId, studentEmail, registrarEmail) => {
        try {
            await axiosInstance.patch(`/registrar/issues/${complaintId}/`, {
                status: "resolved"
            });

            await axiosInstance.post(`/registrar/issues/${complaintId}/notify/`, {
                message: "Your issue has been resolved",
                student_email: studentEmail,
                registrar_email: registrarEmail
            });

            setComplaints(complaints.filter(complaint => complaint.id !== complaintId));
        
            setNotification({
                type: "success",
                message: "Issue resolved and notifications sent."
            });

            setTimeout(() => {
                setNotification(null);
            }, 3000); // Clear notification after 3 seconds

        } catch (error) {
            console.error("Error resolving issue:", error);
            setNotification({
                type: "error",
                message: "Failed to resolve issue. Please try again."
            });
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    };
    

    return(
        <div className={style.container}>
            {/* Notification Banner */}
            {notification && (
                <div className={`${style.notification} ${style[notification.type]}`}>
                    {notification.message}
                </div>
            )}
            <div>
                {complaints.length > 0 ? (
                    complaints.map((complaint, index) => (
                        <div key={complaint.id} className={style.output_box}>
                            <p className={style.pe}>Course Unit: {complaint.course.course_code}</p>
                            <p className={style.pe}>Complaint type: {complaint.complaint_type}</p>
                            <p className={style.pe}>Complaint: {complaint.complaint}</p>
                            <p className={style.pe}>Lecturer: {complaint.lecturer}</p>
                            <p className={style.pe}>Description:{complaint.custom_complaint}</p>
                            <p className={style.pe}>Status: {complaint.status}</p>
                            <p className={style.pe}>Date: {complaint.date}</p>
                            <p className={style.pe}>Student Email: {complaint.student_email}</p>  
                           
                            <button className={style.thebut} onClick={() => handleResolve(complaint.id, complaint.student_email, complaint.registrar_email)}>Mark as Resolved</button>
                        </div>
                    )) 
                ):(
                    <p>No pending issues found</p>
                )}
            </div>
        </div>
    );
}