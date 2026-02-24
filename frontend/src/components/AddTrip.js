import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripsAPI } from '../services/api';

const AddTrip = () => {
  const [formData, setFormData] = useState({
    destination: '',
    price: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const tripData = {
        destination: formData.destination,
        price: parseFloat(formData.price),
        dates: {
          start: new Date(formData.startDate),
          end: new Date(formData.endDate)
        },
        description: formData.description
      };

      await tripsAPI.create(tripData);
      setSuccess('Voyage ajouté avec succès !');
      setFormData({
        destination: '',
        price: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      setTimeout(() => navigate('/trips'), 2000);
    } catch (err) {
      setError('Erreur lors de l\'ajout du voyage');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Ajouter un nouveau voyage</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Destination:</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              placeholder="ex: Paris, France"
            />
          </div>

          <div className="form-group">
            <label>Prix (€):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="1200"
            />
          </div>

          <div className="form-group">
            <label>Date de début:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date de fin:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Décrivez le voyage..."
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Ajout en cours...' : 'Ajouter le voyage'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrip;
