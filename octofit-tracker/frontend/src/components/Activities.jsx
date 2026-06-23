import { useEffect, useState } from 'react';
import { apiClient } from '../services/api.ts';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .getActivities()
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (activities.length === 0) return <p>No activities found.</p>;

  return (
    <div>
      <h2>Activities</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {activities.map((activity) => {
          const userName = typeof activity.user === 'string' ? activity.user : activity.user?.name || 'Unknown';
          const activityColor = {
            run: '#ff6b6b',
            cycling: '#4ecdc4',
            yoga: '#ffe66d',
            swimming: '#95e1d3'
          };
          const bgColor = activityColor[activity.type] || '#cccccc';

          return (
            <div
              key={activity._id}
              style={{
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderLeft: `4px solid ${bgColor}`
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', color: bgColor, textTransform: 'uppercase' }}>
                {activity.type}
              </h3>
              <p style={{ margin: '0.5rem 0' }}><strong>Duration:</strong> {activity.durationMinutes} minutes</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Calories Burned:</strong> {activity.caloriesBurned}</p>
              <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>By: {userName}</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#999' }}>
                {new Date(activity.recordedAt).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
