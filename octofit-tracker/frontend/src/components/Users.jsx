import { useEffect, useState } from 'react';
import { apiClient } from '../services/api.ts';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div>
      <h2>Users</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{user.name}</h3>
            <p style={{ margin: '0.25rem 0' }}><strong>Email:</strong> {user.email}</p>
            <p style={{ margin: '0.25rem 0' }}><strong>Role:</strong> <span style={{ backgroundColor: '#e0f2f1', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{user.role}</span></p>
            <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#666' }}>Joined: {new Date(user.joinedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
