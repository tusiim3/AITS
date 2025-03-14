import React from 'react';
import ReactDOM from 'react-dom/client';
import StudentApp from './student_dashboard/log_issues/log_issues';
//import StudentApp from './student_dashboard/student_dashboard';
//import AuthenticationForms from './login_signin_dashboard/login_signup';
//import App from "./student_dashboard/log_history/log_his.jsx"
//import StudentApp from './student_dashboard/log_issues/log_issues.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StudentApp />
  </React.StrictMode>
)

