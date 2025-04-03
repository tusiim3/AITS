import React, { useState } from 'react';
import styles from './log_issues.module.css';
import axios from 'axios';
import axiosInstance from '../../axioscomponent';

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
    const [IsSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTextareaChange = (event) => {
        setFormData((prev) => ({ ...prev, text: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisplayValue(formData);
    };

    const handleClear = () => {
        setFormData({ select1: "", select2: "", select3: "", text: "" });
    };

    const handleFormSubmit = async(e) => {
        e.preventDefault(); //prevents page refresh
        setIsSubmitting(true); // disablle button and show 'submitting'

    
        const submitPayload = {
            course: displayValue.select1 || "N/A",
            complaint: displayValue.select2 || "N/A",
            complaint_type: displayValue.select3 || "N/A",
            custom_complaint: displayValue.text || "N/A"
        };

        try {
            //acessing the access token stored in the storage


            {/* this is where the log issues api is going to go */}
            const response = await axiosInstance.post("/issues/", submitPayload,{
            });
            if (response.status === 201) {
                alert("issue submitted successfully!");
                setDisplayValue({
                    select1: "",
                    select2: "",
                    select3: "",
                    text:""
                });
            }
    
        } catch(error) { 
                console.error("error during submission", error);
                alert("submission failed, try again");
        } finally {
            setIsSubmitting(false);
        }
    
    };

    return (
        <div>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="courseunit" className={styles.label}>Course Unit</label>
                    <select name="select1" id="courseunit" value={formData.select1} onChange={handleChange} className={styles.select}>
                        <option value="">Select Course</option>
                        <option value="ist1204">Ist1204</option>
                        <option value="csc1201">Csc1201</option>
                        <option value="csc1204">Csc1204</option>
                        <option value="csc1200">Csc1200</option>
                        <option value="csc1202">Csc1202</option>
                    </select>

                    <label htmlFor="complaint" className={styles.label}>Complaint</label>
                    <select name="select2" id="complaint" value={formData.select2} onChange={handleChange} className={styles.select}>
                        <option value="">Select Complaint</option>
                        <option value="missing marks">Missing Marks</option>
                        <option value="correction">Correction</option>
                        <option value="appeal">Appeal</option>
                    </select>

                    <label htmlFor="type" className={styles.label}>Type</label>
                    <select name="select3" id="type" value={formData.select3} onChange={handleChange} className={styles.select}>
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
            <div className={styles.myform}>
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
                    <button type="submit" className={styles.rsubmit_buttons}>Submit Form</button>
                </form>
            </div>
        </div>
    );
}

export default Log;
