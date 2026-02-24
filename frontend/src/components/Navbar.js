import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">TARE-TARE VOYAGE</Link>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/trips">Voyages</Link>
            <Link to="/bookings">Mes réservations</Link>
            {user.role === 'admin' && (
              <Link to="/admin/add-trip">Ajouter voyage</Link>
            )}
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
