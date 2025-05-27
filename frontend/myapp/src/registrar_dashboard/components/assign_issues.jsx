import React, { useState, useEffect } from 'react';
import './assign_popup.css';
import axiosInstance from '../../axioscomponent';

function AssignPopup({ onClose, onAssign }) {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch lecturers when the popup mounts
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axiosInstance.get('/api/lecturers');
        setLecturers(response.data);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Select a Lecturer to Assign</h3>

        {loading ? (
          <p>Loading...</p>
        ) : lecturers.length === 0 ? (
          <p>No lecturers found.</p>
        ) : (
          <ul>
            {lecturers.map((lecturer) => (
              <li
                key={lecturer.id}
                className="lecturer-item"
                onClick={() => {
                  onAssign(lecturer);
                  onClose();
                }}
              >
                {lecturer.name}
              </li>
            ))}
          </ul>
        )}

        <button className="close-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function AssignIssueComponent({ issueId }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleAssign = async (lecturer) => {
    try {
      const response = await axiosInstance.patch(`/issues/assign/${issueId}/`, {
        lecturer_username: lecturer.name,
      });

      if (response.status === 200) {
        alert(`Issue assigned to ${lecturer.name}`);
      } else {
        alert('Failed to assign issue');
      }
    } catch (err) {
      console.error(err);
      alert('Error assigning issue');
    }
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Assign Issue</button>

      {showPopup && (
        <AssignPopup
          onClose={() => setShowPopup(false)}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
}

export default AssignIssueComponent;
