import React, { useState, useEffect } from "react";
import style from './pending.module.css';
import axiosInstance from "../../axioscomponent";
import Select from 'react-select';
import { toast } from "react-toastify";

export default function Pend() {
  const [complaints, setComplaints] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lecturers, setLecturer] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [loading, setLoading] = useState(true);

  const lecturerOptions = lecturers
  .filter(lecturer => lecturer.number_type === "lecturer_number")
  .map(lecturer => ({
    value: lecturer.id,
    label: lecturer.username
  }));


     {/* retrieve data from the lecturerlist api */}
  const fetchLecturer = async () => {
    try {
        const response = await axiosInstance.get("/Lecturerlist/")
        setLecturer(response.data)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLecturer();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axiosInstance.get("/registrar/issues/");
      const pendingComplaints = response.data.filter(c => c.status === "pending");
      setComplaints(pendingComplaints);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const openPopup = (complaintId) => {
    setSelectedComplaintId(complaintId);
    setSelectedLecturer(null);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedComplaintId(null);
    setSelectedLecturer(null);
  };

  const handleForward = async () => {
    if (!selectedLecturer) {
      toast.error("Please select a lecturer before forwarding!");
      return;
    }

    try {
      await axiosInstance.patch(`/issues/${selectedComplaintId}/assign/`,{
        lecturer_username: selectedLecturer.label
      }); 
      toast.success("Complaint forwarded successfully!");
      closePopup();
      // Optionally refresh complaints list after forwarding
      fetchComplaints();
    } catch (error) {
      console.error("Error forwarding complaint:", error);
      toast.error("Error forwarding complaint. Please try again.");
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
      <div className={isPopupOpen ? style.blurBackground : ""}>
        <h1 className={style.pageTitle}>Pending Issues ({complaints.length})</h1>
          {loading ? (
              <div className={style.loading}>
                  <div className={style.spinner}></div>
                  <p>Loading Pending Issues...</p>
              </div>        
          ) : complaints.length > 0 ? (
              <div className={style.complaintGrid}>
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
                        <div className={style.infoLabel}>Complaint:</div>
                        <p className={style.infoValue}>{complaint.complaint}</p>
                      </div>
                      <div className={style.infoGroup}>
                        <div className={style.infoLabel}>Description:</div>
                        <p className={style.infoValue}>{complaint.custom_complaint}</p>
                      </div>   
                      <div className={style.metaInfo}>
                        <div className={style.metaItem}>
                          <span className={style.metaLabel}>Status:</span>
                          <span className={style.metaValue}>{complaint.status}</span>
                        </div>
                        <div className={style.metaItem}>
                          <span className={style.metaLabel}>Submitted By:</span>
                          <span className={style.metaValue}>{complaint.student?.username}</span>                      
                        </div>
                        <div className={style.metaItem}>
                          <span className={style.metaLabel}>Email:</span>
                          <span className={style.metaValue}>{complaint.student?.email}</span>
                        </div>
                      </div>
                      <div className={style.actionArea}>
                        <button
                          className={style.resolveButton}
                          onClick={e => { e.stopPropagation(); openPopup(complaint.id); }}
                        >
                          Forward to Lecturer
                        </button>
                      </div>
                    </div>   
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={style.emptyState}>
              <p>No pending issues to display.</p>
            </div>
          )}
      </div>
      {isPopupOpen && (
         <>
          <div className={style.popupBackdrop} onClick={closePopup}></div>
          <div className={style.popup}>
            <p>Select a lecturer</p>
            <Select
              options={lecturerOptions}
              onChange={setSelectedLecturer}
              placeholder="Search Lecturers"
              className={style.select}
            />
            <button className={style.forwardbut} onClick={handleForward}>Forward</button>
            <button className={style.cancelbut} onClick={closePopup}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
} 