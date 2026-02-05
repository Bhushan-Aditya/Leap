import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Session from './pages/Session';
import './index.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/session" element={<Session />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
