import { useEffect, useState } from 'react';
import { apiClient } from '../services/api.ts';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .getTeams()
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (teams.length === 0) return <p>No teams found.</p>;

  return (
    <div>
      <h2>Teams</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
        {teams.map((team) => (
          <div
            key={team._id}
            style={{
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{team.name}</h3>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>{team.description}</p>
            <div style={{ marginTop: '1rem' }}>
              <strong>Members ({team.members?.length || 0}):</strong>
              <ul style={{ margin: '0.5rem 0 0 1.5rem', padding: 0 }}>
                {team.members && team.members.map((member) => (
                  <li key={member._id} style={{ marginBottom: '0.25rem' }}>
                    {member.name} ({member.role})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
