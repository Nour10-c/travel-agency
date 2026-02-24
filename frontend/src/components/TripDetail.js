import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tripsAPI, bookingsAPI } from '../services/api';

const TripDetail = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await tripsAPI.getAll();
        const foundTrip = response.data.find(t => t._id === id);
        if (foundTrip) {
          setTrip(foundTrip);
        } else {
          setError('Voyage non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement du voyage');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleBooking = async () => {
    try {
      await bookingsAPI.create({ tripId: id });
      setBookingMessage('Réservation créée avec succès !');
    } catch (err) {
      setBookingMessage('Erreur lors de la réservation');
    }
  };

  if (loading) return <div className="loading">Chargement du voyage...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!trip) return <div className="error-message">Voyage non trouvé</div>;

  return (
    <div>
      <h1 className="page-title">{trip.destination}</h1>
      <div className="trip-detail-card" style={{
        background: 'var(--card-background)',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: 'var(--shadow)',
        maxWidth: '600px',
        margin: '2rem auto'
      }}>
        <div className="trip-image" style={{
          height: '300px',
          background: 'linear-gradient(135deg, var(--accent-color), #f97316)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '4rem',
          fontWeight: '700',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {trip.destination.charAt(0)}
        </div>
        <div className="trip-info">
          <p className="trip-price" style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-color)', marginBottom: '1rem' }}>
            {trip.price} €
          </p>
          <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
            <strong>Dates:</strong> {new Date(trip.dates.start).toLocaleDateString()} - {new Date(trip.dates.end).toLocaleDateString()}
          </p>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {trip.description}
          </p>
          <button onClick={handleBooking} className="btn" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            Réserver ce voyage
          </button>
          {bookingMessage && (
            bookingMessage.includes('succès') ?
              <div className="success-message" style={{ marginTop: '1rem' }}>{bookingMessage}</div> :
              <div className="error-message" style={{ marginTop: '1rem' }}>{bookingMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
