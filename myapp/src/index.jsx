import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthenticationForms from './login_signin_dashboard/login_signup.jsx';
import App from "./student_dashboard/log_history/log_his.jsx";
import StudentApp from './student_dashboard/log_issues/log_issues.jsx';
import Issue from "./registrar_dashboard/issue_history/issue_history.jsx"
import Pending from './registrar_dashboard/pending_issues/pending.jsx';
import Notif from './registrar_dashboard/notifications/notification.jsx';
import Profile from './registrar_dashboard/profile/profile.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<AuthenticationForms />
  },
  {
    path:'/student',
    element: <StudentApp />
  },
  {
    path:'/registrar',
    element: <Issue />
  },
  {
    path:'/registrar/nofication',
    element: <Notif />
  }
  ,
  {
    path:'/registrar/profile',
    element: <Profile/>
  }
  ,
  {
    path:'/registrar/',
    element: <Pending />
  }
  ,
  {
    path:'/student/history',
    element: <App />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)