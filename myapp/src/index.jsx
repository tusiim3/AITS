import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './student_dashboard/student_dashboard.jsx';
import AuthenticationForms from './login_signin_dashboard/login_signup.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationForms />
  </React.StrictMode>
)

