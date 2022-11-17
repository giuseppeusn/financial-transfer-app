import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import UserPanel from './pages/UserPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/panel" element={ <UserPanel /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
