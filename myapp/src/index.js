import React from 'react';
import ReactDOM from 'react-dom/client';
import Simpletextarea from './components/customtext';
import {Courseunit, Complaints, Types} from './components/select_logs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Simpletextarea />
    <Courseunit />
    <Complaints />
    <Types />
  </React.StrictMode>
)

