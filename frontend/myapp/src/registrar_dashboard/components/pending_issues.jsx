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

  

  return (
    <div className={style.container}>
      <div className={isPopupOpen ? style.blurBackground : ""}>
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint.id} className={style.output_box}>
              <p1 className={style.pa} >Course Unit: {complaint.course.course_code}</p1>
              <p1 className={style.pa}>Complaint type: {complaint.complaint_type}</p1>
              <p1 className={style.pa}>Complaint: {complaint.complaint}</p1>
              <p1 className={style.pa}>Description: {complaint.custom_complaint}</p1>
              <button 
                className={style.thebut} 
                onClick={() => openPopup(complaint.id)}
              >
                Forward to Lecturer
              </button>
            </div>
          ))
        ) : (
          <p>Loading complaints...</p>
        )}
        </div>
        <div>
        {isPopupOpen && (
        <>
            <div className={style.popupBackdrop} onClick={closePopup}></div>
            <div className={style.popup}>
              <p2>select a lecturer</p2>
              <Select 
                  options={lecturerOptions}
                  onChange={(selected) => setSelectedLecturer(selected)}
                  placeholder="Search Lecturers"
                  className={style.select}
              />
              <button  className={style.forwardbut} onClick={() => handleForward(selectedComplaintId)}>Forward</button>
              <button className={style.cancelbut} onClick={closePopup}>Cancel</button>
            </div>
        </>
        )}

      </div>
    </div>
  );
}
