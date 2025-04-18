import React, { useState } from "react";
import styles from "./manage.module.css";
import axiosInstance from "../../axioscomponent";

export default function Manage() {
    const [lecturers, getLecturer] = useState([]);
    const [lecturer, postLecturer] = useState([]);

    const addLecturer = async(e) => {
        try{
            const response = await axiosInstance.post("#")
        } catch (error) {
            console.error("Error adding lecturer")
        }
    }

    const lecturerList = async(e) => {
        try {
            const response = await axiosInstance.get("#")
            getLecturer(response.data)
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return(
        <div className={styles.container}>
            <div>lecturers list
                <div className={styles.lecturers}></div>
            </div>
            <form>
                <div>Add Course
                    <div className={styles.lecturer}>
                        <p>Course Name:</p>
                        <input  className={styles.input}></input>
                        <p>Course Code:</p>
                        <input  className={styles.input}></input>
                        <p>Lecturer</p>
                        <input  className={styles.input}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}