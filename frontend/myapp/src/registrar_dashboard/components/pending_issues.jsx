import React, { useState, useEffect } from "react";
import style from './pending.module.css';
import axiosInstance from "../../axioscomponent";
import Select from 'react-select';

export default function Pend() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lecturers, setLecturer] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState([]);


  const lecturerOptions = lecturers.map(lecturer => ({
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
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const openPopup = (complaintId) => {
    setSelectedComplaintId(complaintId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedComplaintId(null);
  };

  const handleForward = async (complaintId) => {
    try {
      await axiosInstance.post(`/forward-issue/${complaintId}`,{
        lecturer_name: selectedLecturer.label
      });
      alert("Complaint forwarded successfully!");
      closePopup();
      // Optionally refresh complaints list after forwarding
      fetchComplaints();
    } catch (error) {
      console.error("Error forwarding complaint:", error);
      alert("Failed to forward complaint.");
    }
  };

  return (
    <div className={style.container}>
      <div className={isPopupOpen ? style.blurBackground : ""}>
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint.id} className={style.output_box}>
              <p className={style.pe}>Course Unit: {complaint.course.course_code}</p>
              <p className={style.pe}>Complaint type: {complaint.complaint_type}</p>
              <p className={style.pe}>Complaint: {complaint.complaint}</p>
              <p className={style.pe}>Description: {complaint.custom_complaint}</p>
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
            <p>select a lecturer</p>
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
