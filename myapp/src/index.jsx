import React from 'react';
import ReactDOM from 'react-dom/client';
import StudentApp from './student_dashboard/student_dashboard';
//import AuthenticationForms from './login_signin_dashboard/login_signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StudentApp/>
  </React.StrictMode>
)

