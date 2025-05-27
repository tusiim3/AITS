import React, { useEffect, useState } from "react";
import styles from "./manage.module.css";
import axiosInstance from "../../axioscomponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Manage() {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({
    course_name: "",
    course_code: "",
    lecturer: "",
  });

  const addCourse = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("courses/add/", formData);

      fetchCourses();
      setFormData({
        course_name: "",
        course_code: "",
        lecturer: "",
      });
      toast.success("Course added successfully!");
    } catch (error) {
      toast.error("Error adding course");
      console.error("Error adding course:", error);
    }
  };

  const fetchLecturers = async () => {
    try {
      const response = await axiosInstance.get("issues/lecturer-list/");
      setLecturers(response.data);
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("courses/list/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchLecturers();
    fetchCourses();
  }, []);

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

      <form onSubmit={addCourse}>
        <div className={styles.lecturer}>
          <p className={styles.pe}>Add Course</p>
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
            <select
              name="lecturer"
              value={formData.lecturer}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="">Select Lecturer</option>
              {lecturers.map((lect) => (
                <option key={lect.id} value={lect.id}>
                  {lect.username}
                </option>
              ))}
            </select>
          </p>
          <button type="submit" className={styles.sub}>Add Course</button>
        </div>
      </form>
    </div>
  );
}
