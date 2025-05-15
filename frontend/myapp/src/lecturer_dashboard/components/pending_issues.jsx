import React, { useState, useEffect } from "react";
import style from './pending.module.css';
import axiosInstance from "../../axioscomponent";

export default function Pend() {
    const [complaints, setComplaints] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axiosInstance.get("/Lecturer/issues/");
                setComplaints(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchComplaints();
    }, []);

    const handleStatusUpdate = async (e, complaintId, newStatus) => {
        e.stopPropagation();
        try {
            await axiosInstance.patch(`/issues/update_status/${complaintId}/`, {
                status: newStatus
            });
            // Update UI by removing the resolved complaint
            setComplaints(complaints.filter(c => c.id !== complaintId));
            if (expandedId === complaintId) {
                setExpandedId(null);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className={style.container}>
            <div className="header">
                {complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <div key={complaint.id} className={style.output_box}>
                            <p className={style.pe}>Course Unit: {complaint.course.course_code}</p>
                            <p className={style.pe}>Complaint type: {complaint.complaint_type}</p>
                            <p className={style.pe}>Status: {complaint.status}</p>
                            <button
                                className={style.thebut}
                                onClick={() => handleStatusUpdate(complaint.id, "resolved")}
                            >
                                Mark as Resolved
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No issues found</p>
                )}
            </div>
        </div>
    );
}
