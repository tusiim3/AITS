import React, { useState, useEffect } from "react";
import style from './issue_his.module.css';
import axiosInstance from "../../axioscomponent";

function His() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    const fetchComplaints = async () => {
        try {
            const response = await axiosInstance.get("/issues/resolved/");
            // Filter resolved complaints
            const resolvedComplaints = response.data.filter(complaint => complaint.status === "resolved");
            setComplaints(resolvedComplaints);
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
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={style.container}>
            <div>
                {loading ? (
                    <p>Loading history...</p>
                ) : complaints.length > 0 ? (
                    complaints.map((complaint, index) => (
                        <div className={style.output_box} key={complaint.id || index}>
                            <p>Course Unit: {complaint.coursenit}</p>
                            <p>Complaint type: {complaint.complaint_type}</p>
                            <p>Complaint: {complaint.complaint}</p>
                            <p>Lecturer: {complaint.lecturer}</p>
                            <div>
                                Status
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No history found.</p>
                )}
            </div>
        </div>
    );
}

export default His;
