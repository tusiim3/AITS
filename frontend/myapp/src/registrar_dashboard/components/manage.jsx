import React, { useEffect, useState } from "react";
import styles from "./manage.module.css";
import axiosInstance from "../../axioscomponent";
import { ToastContainer, toast } from 'react-toastify';


export default function Manage() {
  const [courses, getCourse] = useState([])
  const [lecturers, getLecturer] = useState([]);
  const [lecturer, postLecturer] = useState([]);
  const [formData, setFormData] = useState({
    course_name: "",
    course_code: "", // fixed typo here
    lecturer: "",
  });

  const addLecturer = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/registrar/courses/", formData);

      fetchLecturers();
      setFormData({
        course_name: "",
        course_code: "",
        lecturer: "",
      });
      toast.success("Course added successfully!");
    } catch (error) {
      toast.error("Error adding lecturer")
      console.error("Error adding lecturer");
    }
  };

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const response = await axiosInstance.get("/Lecturerlist/");
      getLecturer(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/courses/");
      getCourse(response.data);
    } catch(error) {
      console.error("Error fetching data", error)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.lecturers}>
        <h4>Lecturers List</h4>
        <ul>
          {lecturers.map((lecturer) => (
            <li key={lecturer.id} className={styles.lectureritem}>
              {lecturer.username} - {lecturer.email}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.courses}>
        <h4>Course List</h4>
        <ul>
          {courses.map((course) => (
            <li key={course.id} className={styles.courseitem}>
              {course.course_name} - {course.course_code}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={addLecturer}>
        <div className={styles.lecturer}>
          <p className={styles.pe}>Add Course </p>
          <p className={styles.pe}>
            Course Name:{" "}
            <input
              name="course_name"
              value={formData.course_name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </p>
          <p className={styles.pe}>
            Course Code:{" "}
            <input
              name="course_code"
              value={formData.course_code}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </p>
          <p className={styles.pe}>
            Lecturer:{" "}
            <input
              name="lecturer"
              value={formData.lecturer}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </p>
          <button type="submit" className={styles.sub}>Add Course</button>
        </div>
      </form>
    </div>
  );
}
