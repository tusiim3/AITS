import React from "react";
import style from './pending.module.css';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Pend() {
    const [complaints, setComplaints] = useState([]);

    const fetchComplaints = async () => {
        try {
            const response = await fetch("#"); // this is where we get our api for the pending issues,all issues with a status of pending are viewed on this page*/}
            const data = await response.json();
            setComplaints(data);
        } catch (error) {
            console.error("error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleForward = async (complaintId) => {
        try {
            await axios.post(`YOUR_BACKEND_URL/api/forward-issue/${complaintId}`);
            alert("Complaint forwarded successfully!");
        } catch (error) {
            console.error("Error forwarding complaint:", error);
            alert("Failed to forward complaint.");
        }
    };
    

    return(
        <div className={style.container}>
            <div>
                {complaints.length > 0 ? (
                    complaints.map((complaint, index) => (
                        <div className={style.output_box}>
                            <p>Course Unit: {complaint.coursenit}</p>
                            <p>Complaint type: {complaint.complaint_type}</p>
                            <p>Complaint: {complaint.complaint}</p>
                            <p>Lecturer: {complaint.lecturer}</p>
                            <button onClick={() => handleForward(complaint.id)}>Forward to Lecturer</button>
                        </div>
                    )) 
                ):(
                    <p>loading complaints...</p>
                )}
            </div>
        </div>
    );
}
