import React from "react";
import styles from "./manage.module.css";
import axiosInstance from "../../axioscomponent";

export default function Manage() {
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
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return(
        <div className={styles.container}>
            <div>lecturers list</div>
            <div>Add Lecturer</div>
        </div>
    )
}