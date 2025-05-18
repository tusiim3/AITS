import React, { useState, useEffect } from 'react';
import styles from './log_issues.module.css';
import axiosInstance from '../../axioscomponent';
import { toast } from 'react-toastify';

function Log() {
  const [formData, setFormData] = useState({
    select1: "",
    select2: "",
    select3: "",
    text: ""
  });

  const [displayValue, setDisplayValue] = useState({
    select1: "",
    select2: "",
    select3: "",
    text: ""
  });

  const [courses, setCourses] = useState([]); // State to hold courses from API
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch courses from API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/courses/');
        setCourses(response.data); // Assuming response.data is an array of course objects
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (event) => {
    setFormData(prev => ({ ...prev, text: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisplayValue(formData);
    setFormData({ select1: "", select2: "", select3: "", text: "" });
    setShowPopup(true);
  };

  const handleClear = () => {
    setFormData({ select1: "", select2: "", select3: "", text: "" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitPayload = {
      course: displayValue.select1 || "N/A",
      complaint: displayValue.select2 || "N/A",
      complaint_type: displayValue.select3 || "N/A",
      custom_complaint: displayValue.text || "N/A"
    };

    try {
      const response = await axiosInstance.post("/issues/", submitPayload);
      if (response.status === 201) {
        toast.success("Issue submitted successfully!");
        setDisplayValue({ select1: "", select2: "", select3: "", text: "" });
        setShowPopup(false)
      }
    } catch (error) {
      console.error("Error during submission", error);
      toast.error("Submission failed, try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="courseunit" className={styles.label}>Course Unit</label>
          <select
            name="select1"
            id="courseunit"
            value={formData.select1}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.course_code} value={course.course_code}>
                {course.course_code}
              </option>
            ))}
          </select>

          <label htmlFor="complaint" className={styles.label}>Complaint</label>
          <select
            name="select2"
            id="complaint"
            value={formData.select2}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Complaint</option>
            <option value="missing marks">Missing Marks</option>
            <option value="correction">Correction</option>
            <option value="appeal">Appeal</option>
          </select>

          <label htmlFor="type" className={styles.label}>Type</label>
          <select
            name="select3"
            id="type"
            value={formData.select3}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Type</option>
            <option value="test">Test</option>
            <option value="course work">Course Work</option>
            <option value="final exam">Final Exam</option>
          </select>

          <label htmlFor="customcomplaint" className={styles.label}>Custom Complaint</label>
          <textarea
            name="text"
            id="customcomplaint"
            cols="30"
            rows="10"
            value={formData.text}
            onChange={handleTextareaChange}
            className={styles.textarea}
          ></textarea>

          <button type="button" onClick={handleClear} className={styles.lclear_button}>Clear</button>
          <button type="submit" className={styles.lsubmit_button}>Submit</button>
        </form>
      </div>
      
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>×</button>
            <form onSubmit={handleFormSubmit}>
              <h5>Issue Form</h5>
              <div className={styles.issue}>
                <h3 className={styles.label2}>COURSE UNIT:</h3>
                <p className={styles.par}>{displayValue.select1 || "N/A"}</p>
                <h3 className={styles.label2}>COMPLAINT:</h3>
                <p className={styles.par}>{displayValue.select2 || "N/A"}</p>
                <h3 className={styles.label2}>TYPE:</h3>
                <p className={styles.par}>{displayValue.select3 || "N/A"}</p>
                <h3 className={styles.label2}>CUSTOM COMPLAINT:</h3>
                <p className={styles.par}>{displayValue.text || "N/A"}</p>
              </div>
              <button type="submit" className={styles.rsubmit_buttons} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </button>
            </form>
        </div>
      </div>
    )}
    </div>
  );
}

export default Log;
