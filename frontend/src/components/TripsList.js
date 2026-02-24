import React, { useState, useEffect } from 'react';
import { tripsAPI } from '../services/api';
import { Link } from 'react-router-dom';

const TripsList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await tripsAPI.getAll();
        setTrips(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des voyages');
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  if (loading) return <div className="loading">Chargement des voyages...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h1 className="page-title">Voyages disponibles</h1>
      {trips.length === 0 ? (
        <div className="empty-state">
          <h3>Aucun voyage disponible</h3>
          <p>Revenez plus tard pour découvrir de nouvelles destinations !</p>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map((trip) => (
            <Link key={trip._id} to={`/trip/${trip._id}`} className="trip-card">
              <div className="trip-image">
                {trip.destination.charAt(0)}
              </div>
              <div className="trip-content">
                <h3 className="trip-title">{trip.destination}</h3>
                <p className="trip-price">{trip.price} €</p>
                <p className="trip-dates">
                  {new Date(trip.dates.start).toLocaleDateString()} - {new Date(trip.dates.end).toLocaleDateString()}
                </p>
                <p className="trip-description">{trip.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsList;
