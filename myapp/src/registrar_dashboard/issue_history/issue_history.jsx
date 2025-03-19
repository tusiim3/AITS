import React from 'react';
import classes from "./issue_history.module.css";

function Issue() {
  return (
    <div>
      <div className={classes.left_component}>
        
        <button className={classes.log_issue}>PENDING ISSUES</button>
        <button className={classes.log_his}>ISSUE HISTORY</button>
        <button className={classes.notification}>NOTIFICATION</button>
        <button className={classes.profile}>PROFILE</button>
        
        <img src=""></img>
        <button className={classes.logout}>log out</button>
      </div>
      <div className={classes.pending_issues}>
        <h5>pending issues</h5>
      </div>
    </div>
  );
}

export default Issue;
