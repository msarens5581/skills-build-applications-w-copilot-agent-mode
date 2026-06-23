import { useEffect, useState } from 'react';
import { apiClient } from '../services/api.ts';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .getWorkouts()
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (workouts.length === 0) return <p>No workouts found.</p>;

  const difficultyColor = {
    beginner: '#4caf50',
    intermediate: '#ff9800',
    advanced: '#f44336'
  };

  return (
    <div>
      <h2>Available Workouts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {workouts.map((workout) => (
          <div
            key={workout._id}
            style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{workout.name}</h3>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>{workout.description}</p>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ margin: '0.5rem 0' }}>
                <strong>Duration:</strong> {workout.durationMinutes} minutes
              </p>
              <p style={{
                margin: '0.5rem 0',
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: difficultyColor[workout.difficulty],
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                {workout.difficulty}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
