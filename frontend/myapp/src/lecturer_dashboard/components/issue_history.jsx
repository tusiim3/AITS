import React, { useState, useEffect } from "react";
import style from './issue_his.module.css';
import axiosInstance from "../../axioscomponent";

function His() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    const fetchComplaints = async () => {
        try {
            const response = await axiosInstance.get("/Lecturer/issues/");
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
            <h1 className={style.pageTitle}>Issue History ({complaints.length})</h1>
            {loading && (
                <div className={style.loading}>
                    <div className={style.spinner}></div>
                    <p className={style.loadingText}>Loading History...</p>   
                </div>
            )}
                {!loading && complaints.length > 0 ? (
                    <div className={style.complaintsGrid}>
                        {complaints.map((complaint) => (
                            <div key={complaint.id} className={`${style.output_box} ${expandedId === complaint.id ? style.expanded : ""}`} onClick={() => toggleExpand(complaint.id)}>
                                <div className={style.complaintHeader}>
                                    <div className={style.headerLeft}>
                                                                            <h3 className={style.courseCode}>{complaint.course.course_code}</h3>
                                        <span className={style.complaintType}>{complaint.complaint_type}</span>
                                    </div>
                                    <div className={style.headerRight}>
                                        <span className={style.date}>{formatDate(complaint.created_at)}</span>
                                    </div>
                                </div>

                                {expandedId === complaint.id && (
                                    <div className={style.complaintContent}>
                                        <div className={style.infoGroup}>
                                            <div className={style.infoLabel}>Description:</div>
                                            <p className={style.infoValue}>{complaint.complaint}</p>
                                        </div>
                                        <div className={style.metaInfo}>
                                            <div className={style.metaItem}>
                                                <span className={style.metaLabel}>Status:</span>
                                                <span className={style.metaValue}>{complaint.status}</span>
                                            </div>
                                            <div className={style.metaItem}>
                                                <span className={style.metaLabel}>Submitted By:</span>
                                                <span className={style.metaValue}>{complaint.student.username}</span>
                                            </div>
                                            <div className={style.metaItem}>
                                                <span className={style.metaLabel}>Email:</span>
                                                <span className={style.metaValue}>{complaint.student.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : !loading && (
                    <div className={style.emptyState}>
                        <p>No history found.</p>
                    </div>
                )}
            
        </div>
    );
}

export default His;
