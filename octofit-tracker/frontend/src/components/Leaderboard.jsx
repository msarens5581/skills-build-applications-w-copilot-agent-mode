import { useEffect, useState } from 'react';
import { apiClient } from '../services/api.ts';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .getLeaderboard()
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (entries.length === 0) return <p>No leaderboard data found.</p>;

  return (
    <div>
      <h2>Team Leaderboard</h2>
      <div style={{ overflow: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Rank</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Team</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Description</th>
              <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '2px solid #ddd' }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => {
              const teamName = typeof entry.team === 'string' ? entry.team : entry.team?.name || 'Unknown';
              const teamDesc = typeof entry.team === 'object' && entry.team?.description ? entry.team.description : '';
              const medalEmoji = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : '';

              return (
                <tr key={entry._id} style={{ borderBottom: '1px solid #eee', hover: { backgroundColor: '#f5f5f5' } }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {medalEmoji} #{entry.rank}
                  </td>
                  <td style={{ padding: '1rem' }}>{teamName}</td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>{teamDesc}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {entry.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
