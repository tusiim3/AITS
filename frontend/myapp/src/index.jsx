import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthenticationForms from './login_signin_dashboard/login_signup.jsx';
import Student from './student_dashboard/student_dashboard.jsx';
import Registrar from './registrar_dashboard/registrar_dashboard.jsx';
import NotFoundPage from './notfoundpage.jsx';
import './index.css'

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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)