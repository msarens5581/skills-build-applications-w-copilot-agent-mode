import { useEffect, useState } from 'react';
import { apiClient, User } from '../services/api';

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Users</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li
            key={user._id}
            style={{
              padding: '0.5rem',
              margin: '0.5rem 0',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px'
            }}
          >
            <strong>{user.name}</strong> ({user.role}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
