import React, { useState, useEffect } from "react";
import style from './log_his.module.css';
import axiosInstance from "../../axioscomponent";

export default function Pend() {
    const [complaints, setComplaints] = useState([]);

    const fetchComplaints = async () => {
        try {
            const response = await axiosInstance.get("issues/student-history/");
            setComplaints(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                await fetchComplaints();
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        }, 5000);

        return () => clearInterval(intervalId);

    }, []);

    return (
        <div className={style.container}>
            {complaints.length > 0 ? (
                complaints.map((complaint) => (
  <div key={complaint.id} className={style.complaint}>
    <p className={style.pe}>Course Unit: {complaint.course?.course_code || "N/A"}</p>
    <p className={style.pe}>Complaint Type: {complaint.complaint_type || "N/A"}</p>
    <p className={style.pe}>Complaint: {complaint.custom_complaint || "N/A"}</p>
    <p className={style.pe}>Lecturer: {complaint.lecturer?.username || "N/A"}</p>
    <p className={style.pe}
      style={{backgroundColor:
        complaint.status.toLowerCase() === 'pending' ? 'grey' :
        complaint.status.toLowerCase() === 'resolved' ? 'green' : 'transparent'
      }}>
      Status: {complaint.status || "N/A"}
    </p>
  </div>
))

            ) : (
                <p>No complaints found.</p>
            )}
        </div>
    );
}
