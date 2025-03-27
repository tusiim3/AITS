import React from "react";



const His = ({ complaints }) => (
    <div>
        <h2>Complaint History</h2>
        {/*}
        {complaints.map(complaint => (
        <div key={complaint.id}>
            <p>{complaint.content}</p>
            <StatusIndicator status={complaint.status} />
            <small>{new Date(complaint.created_at).toLocaleDateString()}</small>
        </div>
        ))}
        */}
    </div>
    );

export default His;