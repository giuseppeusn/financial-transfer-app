import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import UserPanel from './pages/UserPanel';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/panel" element={ <UserPanel /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
