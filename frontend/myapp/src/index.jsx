import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthenticationForms from './login_signin_dashboard/login_signup.jsx';
import Student from './student_dashboard/student_dashboard.jsx';
import Registrar from './registrar_dashboard/registrar_dashboard.jsx';
import Lecturer from './lecturer_dashboard/lecturer_dashboard.jsx'
import NotFoundPage from './notfoundpage.jsx';
import './index.css';
import 'reactjs-popup/dist/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

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
    element:<Lecturer />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  </React.StrictMode>
)