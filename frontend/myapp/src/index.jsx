import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthenticationForms from './login_signin_dashboard/login_signup.jsx';
import Student from './student_dashboard/student_dashboard.jsx';
import Registrar from './registrar_dashboard/registrar_dashboard.jsx';
import Lecturer from './lecturer_dashboard/lecturer_dashboard.jsx'
import PendingIssues from './lecturer_dashboard/components/pending_issues.jsx';
import IssueHistory from './lecturer_dashboard/components/issue_history.jsx';
import NotFoundPage from './notfoundpage.jsx';
import './index.css';
import 'reactjs-popup/dist/index.css';

const router = createBrowserRouter([
  {
    path:'/',
    element:<AuthenticationForms />,
    errorElement: <NotFoundPage />
  },
  {
    path:'/student',
    element: <Student/>
  },
  {
    path:'/registrar',
    element: <Registrar />
  },
  {
    path:'/lecturer',
    element:<Lecturer />,
    children: [
      {
        path: 'components/pending_issues',
        element: <PendingIssues />
      },
      {
        path: 'components/issue_history',
        element: <IssueHistory />

      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)