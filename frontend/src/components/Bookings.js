import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../services/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingsAPI.getAll();
        setBookings(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des réservations');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await bookingsAPI.update(id, { status });
      setBookings(bookings.map(booking =>
        booking._id === id ? { ...booking, status } : booking
      ));
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  if (loading) return <div className="loading">Chargement des réservations...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h1 className="page-title">Mes réservations</h1>
      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>Aucune réservation trouvée</h3>
          <p>Vous n'avez pas encore réservé de voyage. Découvrez nos destinations disponibles !</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h3 className="booking-title">{booking.trip.destination}</h3>
              <div className="booking-details">
                <p><strong>Prix:</strong> {booking.trip.price} €</p>
                <p><strong>Dates:</strong> {new Date(booking.trip.dates.start).toLocaleDateString()} - {new Date(booking.trip.dates.end).toLocaleDateString()}</p>
              </div>
              <span className={`booking-status status-${booking.status || 'pending'}`}>
                {booking.status === 'confirmed' ? 'Confirmée' : booking.status === 'cancelled' ? 'Annulée' : 'En attente'}
              </span>
              <select
                className="select-status"
                value={booking.status || 'pending'}
                onChange={(e) => updateStatus(booking._id, e.target.value)}
              >
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
