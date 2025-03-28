import React from "react";
import style from './issue_his.module.css';
import { useState, useEffect } from "react";


function His() {
    const [complaints, setComplaints] = useState([]);

    const fetchComplaints = async () => {
        try {
            const response = await fetch("#"); {/* this is where we get our api for history,
                all issues with a status of solved are viewed on this page*/}
            const data = await response.json();
            setComplaints(data);
        } catch (error) {
            console.error("error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return(
        <div className={style.container}>
            <div>
                {complaints.length > 0 ? (
                    complaints.map((complaint, index) => (
                        <div className={style.output_box}>
                            <p>Course Unit: {complaints.coursenit}</p>
                            <p>Complaint type: {complaints.complaint_type}</p>
                            <p>Complaint: {complaints.complaint}</p>
                            <p>Lecturer: {complaints.lecturer}</p>
                            <div>
                                status
                            </div>
                        </div>
                    )) 
                ):(
                    <p>loading history...</p>
                )}
            </div>
        </div>
    );
}

export default His;