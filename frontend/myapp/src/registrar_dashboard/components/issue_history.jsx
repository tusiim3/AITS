import React, { useState, useEffect } from "react";
import style from './issue_his.module.css';
import axiosInstance from "../../axioscomponent";

function His() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    const fetchComplaints = async () => {
        try {
            const response = await axiosInstance.get("issues/assigned/");
            const response2 = await axiosInstance.get("issues/resolved/");
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
            <h1 className={style.pageTitle}>
                Issue History ({complaints.length})
            </h1>
            {loading ? (
                <div className={style.loading}>
                    <div className={style.spinner}></div>
                    <p>Loading history...</p>
                </div>
            ) : complaints.length > 0 ? (
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
                                    <span className={style.complaintType}>{complaint.complaint_type}</span>
                                    <span className={`${style.statusBadge} ${complaint.status === "resolved" ? style.resolved : style.assigned}`}>
                                        {complaint.status}
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
                                        <div className={style.infoValue}>{complaint.complaint}</div>
                                    </div>
                                    <div className={style.infoGroup}>
                                        <div className={style.infoLabel}>Description:</div>
                                        <div className={style.infoValue}>{complaint.custom_complaint || "N/A"}</div>
                                    </div>
                                    <div className={style.metaInfo}>
                                        <div className={style.metaItem}>
                                            <span className={style.metaLabel}>Lecturer:</span>
                                            <span className={style.metaValue}>{complaint.lecturer ? complaint.lecturer.username : "N/A"}</span>
                                        </div>
                                        <div className={style.metaItem}>
                                            <span className={style.metaLabel}>Status:</span>
                                            <span className={style.metaValue}>{complaint.status}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className={style.emptyState}>
                    <p>No assigned or resolved complaints found.</p>
                </div>
            )}
        </div>
    );
}

export default His;
