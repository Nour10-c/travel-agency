import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import TripsList from './components/TripsList';
import TripDetail from './components/TripDetail';
import Bookings from './components/Bookings';
import AddTrip from './components/AddTrip';
import './App.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/trips" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/trips" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/trips" />} />
            <Route path="/trips" element={user ? <TripsList /> : <Navigate to="/login" />} />
            <Route path="/trip/:id" element={user ? <TripDetail /> : <Navigate to="/login" />} />
            <Route path="/bookings" element={user ? <Bookings /> : <Navigate to="/login" />} />
            <Route path="/admin/add-trip" element={user ? <AddTrip /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
