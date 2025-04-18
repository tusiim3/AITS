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
                <div>
                    <div className={styles.lecturer}>
                        <p className={styles.pe}>Add Course </p>
                        <p className={styles.pe}>Course Name:<input  className={styles.input}></input></p>
                        
                        <p className={styles.pe}>Course Code:<input  className={styles.input}></input></p>
                        
                        <p className={styles.pe}>Lecturer:<input  className={styles.input}></input></p>
                        <button>Add Course</button>
                    </div>
                </div>
            </form>
        </div>
    )
}