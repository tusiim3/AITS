import React, { useState, useEffect } from "react";
import style from './issue_his.module.css';
import axiosInstance from "../../axioscomponent";

function His() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    const fetchComplaints = async () => {
        try {
            const response = await axiosInstance.get("/registrar/issues/");
            const filtered = response.data.filter(
                complaint => complaint.status === "assigned" || complaint.status === "resolved"
            );
            setComplaints(filtered);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

     useEffect(() => {
        fetchComplaints();
    }, []);

    const toggleExpand = (complaintId) => {
        setExpandedId(expandedId === complaintId ? null : complaintId);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={style.container}>
            <div>
                {loading ? (
                    <p>Loading history...</p>
                ) : complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <div className={style.output_box} key={complaint.id}>
                            <p>
                                <strong>Course Unit:</strong> {complaint.course?.course_code || "N/A"}
                            </p>
                            <p>
                                <strong>Complaint type:</strong> {complaint.complaint_type}
                            </p>
                            <p>
                                <strong>Complaint:</strong> {complaint.complaint}
                            </p>
                            <p>
                                <strong>Description:</strong> {complaint.custom_complaint}
                            </p>
                            <p>
                                <strong>Lecturer:</strong> {complaint.lecturer ? complaint.lecturer.username : "N/A"}
                            </p>
                            <p>
                                <strong>Status:</strong> {complaint.status}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No assigned or resolved complaints found.</p>
                )}
            </div>
        </div>
    );
}

export default His;
