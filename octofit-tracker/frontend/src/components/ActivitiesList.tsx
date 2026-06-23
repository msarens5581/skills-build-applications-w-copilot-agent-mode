import { useEffect, useState } from 'react';
import { apiClient, Activity } from '../services/api';

export function ActivitiesList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .getActivities()
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Activities</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {activities.map((activity) => {
          const userName = typeof activity.user === 'string' ? activity.user : activity.user?.name || 'Unknown';
          return (
            <li
              key={activity._id}
              style={{
                padding: '0.5rem',
                margin: '0.5rem 0',
                backgroundColor: '#e8f5e9',
                borderRadius: '4px'
              }}
            >
              <strong>{activity.type.toUpperCase()}</strong> - {activity.durationMinutes} min,{' '}
              {activity.caloriesBurned} cal | By {userName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
