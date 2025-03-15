import React from 'react';
import "./profile.css";

function Profile() {
  return (
    <div>
      <div className='left_component'>
        
        <button className='log_issue'>PENDING ISSUES</button>
        <button className='log_his'>ISSUE HISTORY</button>
        <button className='notification'>NOTIFICATION</button>
        <button className='profile'>PROFILE</button>
        
        <img src="" className=''></img>
        <button className='logout'>log out</button>
      </div>
      <div className='pending_issues'>
      </div>
    </div>
  );
}

export default Profile;
