import React, { useState, useEffect } from "react";
import style from './log_his.module.css';
import axiosInstance from "../../axioscomponent";

export default function Pend() {
    const [complaints, setComplaints] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

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
            <h1 className={style.pageTitle}>
                Log History ({complaints.length})
            </h1>
            {complaints.length > 0 ? (
                <div className={style.complaintsGrid}>
                    {complaints.map((complaint) => (
                        <div
                            className={`${style.output_box} ${expandedId === complaint.id ? style.expanded : ""}`}
                            key={complaint.id}
                            onClick={() => toggleExpand(complaint.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggleExpand(complaint.id)}
                            aria-expanded={expandedId === complaint.id}
                        >
                            <div className={style.complaintHeader}>
                                <div className={style.headerLeft}>
                                    <h3 className={style.courseCode}>{complaint.course?.course_code || "N/A"}</h3>
                                    <span className={style.complaintType}>{complaint.complaint_type || "N/A"}</span>
                                    <span className={`${style.statusBadge} ${
                                        complaint.status?.toLowerCase() === "resolved"
                                            ? style.resolved
                                            : style.assigned
                                    }`}>
                                        {complaint.status || "N/A"}
                                    </span>
                                </div>
                                <div className={style.headerRight}>
                                    <span className={style.date}>{formatDate(complaint.created_at)}</span>
                                </div>
                            </div>
                            {expandedId === complaint.id && (
                                <div className={style.complaintContent}>
                                    <div className={style.infoGroup}>
                                        <div className={style.infoLabel}>Complaint:</div>
                                        <div className={style.infoValue}>{complaint.complaint || "N/A"}</div>
                                    </div>
                                    <div className={style.infoGroup}>
                                        <div className={style.infoLabel}>Description:</div>
                                        <div className={style.infoValue}>{complaint.custom_complaint || "N/A"}</div>
                                    </div>
                                    <div className={style.metaInfo}>
                                        <div className={style.metaItem}>
                                            <span className={style.metaLabel}>Lecturer:</span>
                                            <span className={style.metaValue}>{complaint.lecturer?.username || "N/A"}</span>
                                        </div>
                                        <div className={style.metaItem}>
                                            <span className={style.metaLabel}>Status:</span>
                                            <span className={style.metaValue}>{complaint.status || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className={style.emptyState}>
                    <p>No complaints found.</p>
                </div>
            )}
        </div>
    );
}