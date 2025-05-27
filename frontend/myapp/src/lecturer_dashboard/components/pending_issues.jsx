import React, { useState, useEffect } from "react";
import style from './pending.module.css';
import axiosInstance from "../../axioscomponent";
import { toast } from "react-toastify";

export default function Pend() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axiosInstance.get("issues/lecturer-issues/");

                // Filter out resolved complaints
                const unresolvedComplaints = response.data.filter(complaint => complaint.status !== "resolved");
                setComplaints(unresolvedComplaints);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Done loading
            }
        };
        fetchComplaints();
    }, []);

    const handleStatusUpdate = async (e, complaintId, newStatus) => {
        e.stopPropagation();
        try {
            await axiosInstance.patch(`/issues/update-status/${complaintId}/`, {
                status: newStatus
            });
            // Update UI by removing the resolved complaint
            setComplaints(complaints.filter(c => c.id !== complaintId));
            if (expandedId === complaintId) {
                setExpandedId(null);
            };
            toast.success("complaint resolved")
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status")
        }
    };

    const toggleExpand = (complaintId) => {
        setExpandedId(expandedId === complaintId ? null : complaintId);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={style.container}>
            <h1 className={style.pageTitle}>Pending Issues ({complaints.length})</h1>
            {loading && (
                <div className={style.loading}>
                    <div className={style.spinner}></div>
                    <p className={style.loadingText}>Loading Issues...</p>   
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
                                    <div className={style.actionArea}>
                                        <button 
                                            className={style.resolveButton}
                                            onClick={(e) => handleStatusUpdate(e, complaint.id, "resolved")}
                                        >
                                            Mark as Resolved
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : !loading && (
                <div className={style.emptyState}>
                    <p>No issues found</p>
                </div>
            )}
        </div>
    );
}
                                    

                            