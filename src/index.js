import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './routes/Navbar';
import Login from './routes/Login';
import Daftar from './routes/Daftar';
import Tambah from './routes/Tambah';
import Edit from './routes/Edit';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/tambah" element={<Tambah />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  </BrowserRouter>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
